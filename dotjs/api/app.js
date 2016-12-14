var config = require('./config');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

// //view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// var favicon = require('serve-favicon');
// //uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
// var routes = require('./routes/index');
// var users = require('./routes/users');
// app.use('/', routes);
// app.use('/users', users);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//@todo RBAC已简单实现，需要完善
if(config.rbac) { app.use(require('./plugins/rbac')); }

//@todo 路由自动匹配
app.use('/', require('./routes/index'));
app.use('/accounts', require('./routes/accounts'));
app.use('/sign', require('./routes/sign'));
app.use('/roles', require('./routes/roles'));
app.use('/resources', require('./routes/resources'));
app.use('/files', require('./routes/files'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;