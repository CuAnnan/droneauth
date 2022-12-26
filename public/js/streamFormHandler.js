//IIFE
(function($){
    $(function(){
        let $newShowStreams = $('#new-show-streams');
        let $deleteShowStreams = $('.delete-strem-from-show');

        let streamsInShow = {};

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

        $('.show-stream').click(function(){
            let $link = $(this);
            let data = $link.data();
            if(streamsInShow[data._id])
            {
                return;
            }
            streamsInShow[data._id] = true;
            let $row = $(`<div class="row">
                    <input type="hidden" name="streams" value="${data._id}" />
                    <div class="col-1">${data.streamName}</div>
                </div>`);
            $('<div class="col-1"></div>').append(
                $(`<button class="btn btn-danger delete-stream-from-show" data-_id="${data._id}">Remove</button>`).click(function(){
                    let $this = $(this);
                    let $row = $this.closest('.row');
                    $row.remove();
                    delete(streamsInShow[data._id]);
                })
            ).appendTo($row);
            $row.appendTo($newShowStreams);
        });

        $('.copy-rtmp-button').click(copyRTMPLinkToClipboard);
        $('.rtmpLink').click(copyRTMPLinkToClipboard);

        function copyRTMPLinkToClipboard()
        {
            let $this = $(this);
            let $row = $this.closest('.row');
            let $button = $('.copy-rtmp-button', $row);
            let $span = $('.rtmpLink', $row);
            let link = $span.text();
            navigator.clipboard.writeText(link).then(function(){
                $button.text('Copied!');
                window.setTimeout(function(){
                    $button.text('Copy')
                },1000);
            });
        }
    });
})(window.jQuery);