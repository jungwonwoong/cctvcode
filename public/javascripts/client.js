window.onload = function () {
    const socket = io.connect();
    socket.on('test', (data) => {
        console.log(data);
    })
    
    socket.on('video', (data) => {
        $('#image').attr('src',`data:image/jpeg;base64,${data}`);
        
    })
    var sw;
    $('#onoff').on('click', (e) => {
        sw = $('#onoff').text() == 'on';
        if(sw) {
            $('#onoff').html('off');
        } else {
            $('#onoff').html('on');
            setTimeout(() => {
                $('#image').attr('src', '/images/videostop.jpg');
            }, 40)
        }
        socket.emit('vOnOff', sw);

    })
}