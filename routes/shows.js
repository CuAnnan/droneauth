const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/ShowController');

router.get('/', function(req, res, next){
    Controller.indexAction(req, res).catch(function (e){
        console.log(e);
        next();
    });
});

router.post('/', function(req, res, next){
    Controller.addShow(req, res).catch(function(e){
        console.log(e);
        next();
    });
});

router.get('/:showId',function(req, res, next){
    Controller.showShowPage(req, res).catch(function(e){
        console.log(e);
        next();
    });
});

router.post('/primaryStream', function(req, res, next){
    Controller.setShowPrimaryStream(req, res).catch(function(e){
        console.log(e);
        next();
    });
});

router.get('/:user/:showId', function(req, res, next){
    Controller.showShowPlayer(req, res).catch(function(e){
        console.log(e);
        next();
    });
});

module.exports = router;