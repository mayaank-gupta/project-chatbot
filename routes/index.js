var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  const text = req.body.text;
  res.json({
    inputText: text
  })
});

module.exports = router;
