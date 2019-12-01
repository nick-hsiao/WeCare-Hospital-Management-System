var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var cors = require('cors');
var port = 3001; //process.env.PORT || was 3000

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'wecare',
  //port: 3001,
  //socketPath: '/private/tmp/mysql.sock'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use(cors());

app.get('/names', (req, res) => {
  con.query('SELECT * FROM Patient', function (error, results, fields) {  
      if (error) throw error;
      else {
           return res.json({
             data: results
           })
      };
  });
});

app.post('/please', (req, res) => {
    let ah = req.query;
    let name = ah.name;
    let email = ah.email;
    let password = ah.password;
    console.log(email);
    console.log(name);
    console.log(password);
});

app.get('/MedHistView', (req, res) => {
    let stupid = req.query;
    let crap = "'" + stupid.email + "'";
    let crap2 = "" + stupid.variable;
    console.log(crap);
    console.log(crap2);
    con.query("SELECT name,email,gender,conditions,surgeries,medication FROM Patient,patientsfillhistory,MedicalHistory WHERE Patient.email = patientsfillhistory.patient AND patientsfillhistory.medhistory = MedicalHistory.uid AND Patient.email=" + crap, function (error, results, fields) {
        if (error) throw error;
        else {
            return res.json({
                data: results
            })
        };
    });
});

app.get('/checklogin', (req, res) => {
  con.query('SELECT * FROM Patient', function (error, results, fields) {  
      if (error) throw error;
      else {
           return res.json({
             data: results
           })
      };
  });
});


app.post('/insert', (req, res) => {
  console.log("hello ive touched");
  con.query('INSERT INTO users (first, last) VALUES ("ok", "ok")', function (error, results, fields) {  
      //console.log(query.sql);
      if (error) throw error;
      else {
        console.log("im hippie");
      };
  });
});

// 
// var query = con.query('INSERT INTO users (first, last) VALUES ("hello", "there")', 
//   function (error, results, fields){  
//        if (error) throw error;});
// console.log(query.sql);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




con.query('SELECT * from Patient', function (err, users, fields) {
  if (err) throw err
  console.log(users);

})


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// app.listen(3001);
// console.log('Example app listening at port:3001');

app.listen(port, () => {
  console.log(`Listening on port ${port} `);
});

module.exports = app;
