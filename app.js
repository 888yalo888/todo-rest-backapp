var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/task', tasksRouter);
app.use('/auth', authRouter);

app.use(async (req, _res, next) => {
    const {
        headers: { token },
    } = req;

    const tokenBody = await Token.findOne({ token });

    if (tokenBody) {
        const { userId } = tokenBody;

        req.userId = userId;
    }

    next();
});

// app.use('/user', async ({ userId }, res) => {
//     const user = await User.findById(userId);

//     res.send(user);
// });

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
