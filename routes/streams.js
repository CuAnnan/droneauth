const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/StreamController');

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

router.get('/test/:streamId', function(req, res, next){
    Controller.testStreamToShowRelationship(req, res).catch(function (e){
        console.log(e);
        next();
    });
});

module.exports = router;