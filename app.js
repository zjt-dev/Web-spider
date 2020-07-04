/*
 * @Author: your name
 * @Date: 2020-06-03 20:37:39
 * @LastEditTime: 2020-07-04 21:02:51
 * @LastEditors: ZJT
 * @Description: In User Settings Edit
 * @FilePath: \codeTest\Reptile\app.js
 */ 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs')
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');

var app = express();
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())   
// view engine setup
app.set('views', path.join(__dirname, 'views'))
// 让 ejs 模板文件 使用 扩展名 为 html 的文件
app.engine('.html', ejs.__express)
// app.set('view engine', 'html')
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
