var express = require('express');
var router = express.Router();
var { User } = require('./../db');

/* GET current. */
router.get('/current', async function({ userId }, res, next) {
    const user = await User.findById(userId);
    if (!user) {
      res.status(403).end('Token header not present');

      return;
    }

    res.send(user); //{ ...user, password: undefined });
});

module.exports = router;
