const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/UserController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next){
  let options = {title:'Login'};
  if(req.query.failed)
  {
    options.error=true;
  }
  res.render('userLogin', options);
});

router.post('/doLogin', function(req, res, next){
  Controller.logUserIn(req, res).then(()=> {
    res.redirect('/users/home');
  }).catch((error)=>{
    console.log(error);
    res.redirect('/users/login?failed=true');
  })
});


router.get('/home', function(req, res, next){
  if(req.session.user) {
    Controller.displayUserHome(req, res).catch((err)=>{
      console.log(err);
      next();
    });
  }
  else
  {
    res.redirect('/users/login');
  }
});

router.get('/logout', function(req, res, next){
  req.session.destroy(function(err){
    res.redirect('/');
  });
});


module.exports = router;
