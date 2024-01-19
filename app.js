var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var { Token } = require("./db");

var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var authRouter = require('./routes/auth');

var app = express();

// app.use(logger('dev'));

// Treats HTTP request body as a JSON
app.use(express.json());

// Performs URL encoding/decoding
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`Url: ${req.path}`);
    console.log(`HTTP method: ${req.method}`);
    console.log("HTTP BOdy:", req.body);
    console.log("Cookies:", req.cookies);

    next();
});

app.use(async (req, res, next) => {
    const {
        cookies: { token },
    } = req;

    const tokenBody = token && await Token.findOne({ token });
    req.userId = tokenBody?.userId;

    next();
});

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/auth', authRouter);

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
    res.send({ err });
});

module.exports = app;
