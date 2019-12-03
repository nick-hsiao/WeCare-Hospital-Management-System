var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var cors = require('cors');
var port = 3001; //process.env.PORT || was 3000

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'i@mr00t!',
  database: 'wecare',
  //port: 3001,
  //socketPath: '/private/tmp/mysql.sock'
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

var email_in_use = "";
var password_in_use = "";

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

app.get('/OneHistory', (req, res) => {
    console.log("in one history");
    let params = req.query;
    let email = params.patientEmail;
    console.log(email);
    let statement = "SELECT * FROM patientsfillhistory,patient,medicalhistory WHERE medhistory=uid AND patient=email"
    statement += " AND email = " + email;
    con.query(statement, function (error, results, fields) {
        if (error) throw error;
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.get('/makeAccount', (req, res) => {
  console.log("hi");
  let ah = req.query;
  let name = ah.name;
  let email = ah.email;
  let password = ah.password;
  let address = ah.address;

  let sql_statement = "INSERT INTO Patient (email, password, name, address) VALUES "  + `("${email}", "${password}", "${name}", "${address}")`;
  console.log(sql_statement);
  con.query(sql_statement,function (error, results, fields) {
    if (error) throw error;
    else {
      email_in_use = email;
      password_in_use = password;
      return res.json({
        data: results
      })
    };
  });
});

app.get('/MedHistView', (req, res) => {
    let stupid = req.query;
    let crap = "'%" + stupid.name + "%'";
    let crap2 = "" + stupid.variable;
    console.log(stupid);
    //console.log(crap2);
    let statement = "SELECT name AS 'Name',patientsfillhistory.medhistory AS 'UID' FROM Patient,patientsfillhistory WHERE Patient.email = patientsfillhistory.patient";
    if (crap != "''")
        statement += " AND Patient.name LIKE " + crap
    con.query(statement, function (error, results, fields) {
        if (error) throw error;
        else {
            return res.json({
                data: results
            })
        };
    });
});

app.get('/checklogin', (req, res) => {
  let params = req.query;
  let email = params.email;
  let password = params.password;
  let sql_statement = `SELECT * FROM Patient WHERE email="${email}" AND password="${password}"`;
  console.log(sql_statement);
  con.query(sql_statement, function (error, results, fields) {
    if (error) {
      console.log("eror");
      return res.status(500).json({ failed: 'error ocurred'})
    }
    else {
      console.log(results);
      //return results;
      if(results.length === 0) {
        console.log("Sdadsdadasdadasdasdas");
      } else {
        var string=JSON.stringify(results);
        var json =  JSON.parse(string);
        email_in_use = json[0].email;
        password_in_use = json[0].password;
        console.log(email_in_use);
        console.log(password_in_use);
      }
      return res.json({
        data: results
      })
    };
  });
});


app.get('/checkDoclogin', (req, res) => {
  let params = req.query;
  let email = params.email;
  let password = params.password;
  let sql_statement = `SELECT * FROM DoctorNurse WHERE email="${email}" AND password="${password}"`;
  console.log(sql_statement);
  con.query(sql_statement, function (error, results, fields) {
    if (error) {
      console.log("eror");
      return res.status(500).json({ failed: 'error ocurred'})
    }
    else {
      console.log(results);
      //return results;
      if(results.length === 0) {
        console.log("Sdadsdadasdadasdasdas");
      } else {
        var string=JSON.stringify(results);
        var json =  JSON.parse(string);
        email_in_use = json[0].email;
        password_in_use = json[0].password;
        console.log(email_in_use);
        console.log(password_in_use);
      }
      return res.json({
        data: results
      })
    };
  });
});

app.post('/schedule', (req, res) => {
  let params = req.query;
  let time = params.time;
  let date = params.date;
  let concerns = params.concerns;
  let symptoms = params.symptoms;

  let sql_statement = `INSERT INTO users (uid, date, starttime, endtime, status) VALUES 
  ("9999, ${date}, ${time}, ${password}, ${password})`;
  con.query('INSERT INTO users (first, last) VALUES ("ok", "ok")', function (error, results, fields) {
    //console.log(query.sql);
    if (error) throw error;
    else {
      console.log("im hippie");
    };
  });
});

app.get('/userInSession', (req, res) => {
  console.log("cowboy beep");
  // var string=JSON.stringify(email_in_use);
  // var json =  JSON.parse(string);
  // console.log(string);
  // console.log(json);
//  let json = {"email": `${email_in_use}`}
//   console.log(json);
  return res.json({email: `${email_in_use}`});
  
});

app.get('/endSession', (req, res) => {
  console.log("attempting to end session");
  email_in_use = "";
  password_in_use ="";
  console.log("hit rock bottom");
  
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
app.use(function (req, res, next) {
  next(createError(404));
});




con.query('SELECT * from Patient', function (err, users, fields) {
  if (err) throw err
  console.log(users);

})


// error handler
app.use(function (err, req, res, next) {
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
