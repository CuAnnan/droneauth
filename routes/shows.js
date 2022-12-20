const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/ShowController');

router.get('/:user/', function(req, res, next){
    Controller.showUserShows(req, res).catch((e)=>{
        console.log(e);
        res.redirect('/500');
    });
});

router.get('/', function(req, res, next){
    if(req.session.user) {
        Controller.indexAction(req, res)
    } else {
        res.redirect('/users/login');
    }
});

module.exports = router;