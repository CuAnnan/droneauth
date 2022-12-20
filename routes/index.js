const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/500', function(req, res, next){
  res.render('500', {title:'Error'})
})

module.exports = router;
