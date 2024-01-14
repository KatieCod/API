var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var counterRouter = require('./routes/counter');
var cartRouter = require('./routes/cart');
var ordersRouter = require('./routes/orders');
var categoryRouter = require('./routes/category');
var skinTypeRouter = require('./routes/skinType');
var reviewsRouter = require('./routes/reviews');

const cors = require('cors');
const session = require('express-session'); 

var app = express();

app.use(session({
  secret: 'thisisthebestsecretworldintheworld!',
  resave: false,
  cookie:  {maxAge: 1000*60*30},
  saveUninitialized: false
}))

app.use(cors(
  {origin: ['http://localhost:3000'],
  methods: ['POST', 'GET'],
  credentials: true}
));

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
app.use('/products', productsRouter);
app.use('/counter', counterRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);
app.use('/category', categoryRouter);
app.use('/skinType', skinTypeRouter);
app.use('/reviews', reviewsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
