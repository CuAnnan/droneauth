//IIFE
(function($){
    $(function(){
        $('.copy-rtmp-button').click(function(){
            let $button = $(this);
            let $span = $button.prev();
            let link = $span.text();
            navigator.clipboard.writeText(link).then(function(){
                $button.text('Copied!')
            });
        });
    });
})(window.jQuery);