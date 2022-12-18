var express = require('express');
var router = express.Router();
var Controller = require('../Controllers/StreamController')

router.get('/', function(req, res, next){
    Controller.streamPageAction(req, res).catch(function(err){
        console.log(err);
        next();
    });
});

router.post('/verifyStream', function(req, res, next){
    Controller.verifyStream(req, res).catch((err)=>{
        console.log(err);
        next();
    })
});

router.post('/endStream', function(req, res, next){
    Controller.endStream(req, res).catch((err)=>{
        console.log(err);
        next();
    })
})

router.post('/', function(req, res, next){
    Controller.addStream(req,res).then(()=>{
        res.redirect('/users/home');
    }).catch((err)=> {
        console.log(err);
        next();
    });
});

router.delete('/', function(req, res, next){
    Controller.deleteStream(req, res).catch((err)=> {
        console.log(err);
        next();
    });
});

module.exports = router;