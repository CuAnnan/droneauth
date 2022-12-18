//IIFE
(function($){
    $(function(){
        $('.delete-rtmp-button').click(function(){
            let $button = $(this);
            let $row = $button.closest('.row');
            $.ajax({
                'method':'DELETE',
                'url':'/streams',
                'data':$row.data()
            }).done((response)=>{
                $row.remove();
            });
        });

        $('.copy-rtmp-button').click(function(){
            let $button = $(this);
            let $row = $button.closest('.row');
            let $span = $('.rtmpLink', $row);
            let link = $span.text();
            navigator.clipboard.writeText(link).then(function(){
                $button.text('Copied!');
                window.setTimeout(function(){
                    $button.text('Copy')
                },1000);
            });
        });
    });
})(window.jQuery);