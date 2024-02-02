var express = require('express');
var { User } = require('../db');
var router = express.Router();

/* GET users listing. */
router.get('/current', async function(req, res, next) {
  const user = await User.findById(req.userId);
  res.status(200).json(user);
});

module.exports = router;
