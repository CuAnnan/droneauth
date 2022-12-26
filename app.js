const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const conf = require('./conf');



const indexRouter   = require('./routes/index');
const usersRouter   = require('./routes/users');
const streamsRouter = require('./routes/streams');
const showsRouter   = require('./routes/shows.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// session setup
let sess = {
  secret:"I'm never really sure what to put here so it's always kinda stream of consciousness",
  resave: true,
  saveUninitialized: true,
  cookie:{}
}

if(app.get('env')==='production')
{
  sess.cookie.secure=true;
}

app.use(session(sess));

// make the user available to the session
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/streams', streamsRouter);
app.use('/shows', showsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.locals.STREAMNAME='stream';

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
