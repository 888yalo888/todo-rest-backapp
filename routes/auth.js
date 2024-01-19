var express = require('express');
var router = express.Router();
var { User, Token } = require('./../db');

router.post('/login', async function (req, res) {
    const loginData = req.body;

    const isExist = await User.exists({ email: loginData.email });

    if (!isExist) {
        res.status(400).end(`This email doesn't exist`);

        return;
    }

    const user = await User.findOne({
        email: loginData.email,
        password: loginData.password,
    });

    if (user) {
        const token = `token-${new Date().toISOString()}`;

        await Token.create({ token, userId: user._id });

        res.send(token);
    } else {
        res.status(400).end(`This email or this password doesn't match`);
    }
});

router.delete('/logout', async function ({ headers: { token } }, res) {
    await Token.findOneAndDelete({ token });
    res.end();
});

router.post('/signup', async function (req, res) {
    const loginData = req.body;

    if (!loginData.email || !loginData.password) {
        res.status(400).end('Email and password are required');

        return;
    }

    const isExists = await User.exists({
        email: loginData.email,
    });

    if (isExists) {
        res.status(400).end('User with this email already exists');

        return;
    }

    const user = await User.create({
        email: loginData.email,
        password: loginData.password,
    });

    const token = `${new Date().toISOString()}-***FOR TEST: ${
        loginData.email
    }***`;

    await Token.create({ token, userId: user._id });

    res.end(token);
});

module.exports = router;
