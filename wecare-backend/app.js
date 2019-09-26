var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var cors = require('cors');
var port = process.env.PORT || 3001;

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'nickhsiao',
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

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(cors());

app.get('/names', (req, res) => {
  con.query('SELECT * FROM users', function (error, results, fields) {  
      if (error) throw error;
      else {
           return res.json({
             data: results
           })
      };
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




con.query('SELECT * from users', function (err, users, fields) {
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

/* app.listen(port, () => {
  console.log(`Listening on port ${port} `);
}); */

module.exports = app;
