//IIFE
(function($){
    let player = null;
    $(function(){
        player = videojs('streamContainer');
        player.src({
            src:"http://lyreen.so-4pt.net:8088/stream/hls/stream.m3u8",
            type: 'application/x-mpegURL'
        })
    });
})(window.jQuery);