var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('streams', {title:'Streams', 'scripts':['https://vjs.zencdn.net/7.0.0/video.min.js', '/js/loadPlayer.js'], 'styles':['https://vjs.zencdn.net/7.0.0/video-js.css']})
});

module.exports = router;