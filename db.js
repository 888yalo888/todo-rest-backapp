var mongoose = require('mongoose');

const DB_URL =
    // process.env.NODE_ENV === 'development'
        // ? 'mongodb://127.0.0.1:27017/todolist'
        'mongodb+srv://olgaorlova241:druYgJ4o6vMYg4Q7@cluster0.e3sqktx.mongodb.net/todolist?retryWrites=true&w=majority';

mongoose.connect(DB_URL);

const Task = mongoose.model('Task', { title: String, userId: String });

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Token = mongoose.model('Token', {
    token: String,
    userId: String,
});

module.exports = {
    Task,
    Token,
    User,
};