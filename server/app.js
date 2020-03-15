const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');

let app = express();

let config = require('./config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//======================================================
// connect database
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true});

//======================================================
// routing rest
const index = require('./routes/index');
app.use('/',index);



//======================================================
// cors
const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  credentials: true
};
app.use( cors(corsOptions) );
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,token');
  next();
};
app.use(allowCrossDomain);

//======================================================
// graphql routing
const extensions = ({document, variables, operationName, result, context,}) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

const schema = require('./app/schema/schema');
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true,
  context: { startTime: Date.now() },
  extensions
}));

//======================================================

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
