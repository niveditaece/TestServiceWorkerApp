var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var book = require('./routes/book');
var app = express();
var mongoose = require('mongoose');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', book);
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://nivedita:nivedita@ds111598.mlab.com:11598/swtestdb', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.log('Mongoose default connection error: ' + err.stack));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
console.log('error handler'+err.stack);
  // render the error page
  res.status(err.status );
  res.status(err.status).send('Sorry, we cannot find that!');

});



module.exports = app;