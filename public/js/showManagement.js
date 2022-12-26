//IIFE
(function($){
    // page onload handler
    $(function(){
        $primaryButtons = $('.btn-set-primary');
        $primaryButtons.click(function(){
            let $btn = $(this);
            $primaryButtons.prop('disabled', false);
            $.post('/shows/primaryStream', $btn.data()).then(function(response){
                console.log(response);
                $btn.prop('disabled', true);
            });
        });
    });

})(window.jQuery);