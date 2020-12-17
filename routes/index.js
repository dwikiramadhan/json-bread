var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Home' });
});

router.get('/add', function(req, res, next) {
  res.render('pages/add', { title: 'Add' });
});

module.exports = router;
