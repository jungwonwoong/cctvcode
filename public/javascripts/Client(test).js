window.onload = function () {
    const socket = io.connect('/user');
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
    
    
  socket.on('position', (data) => {
    var x = []
    var y = []
    var i=0;
      data.forEach((el) => {
       x = x.concat(el.x)
       y = y.concat(el.y)
      })
      var trace2 = {
        x: x, y: y,
        name: 'density',
        ncontours: 200,
        colorscale: 'Hot',
        reversescale: true,
        showscale: false,
        type: 'histogram2dcontour'
      };
      var data1 = [trace2];
      var layout = {
        width: 960,
        height: 540,
        xaxis: { range: [0, 960] },
        yaxis: { range: [540, 0] }
      };
      Plotly.newPlot('myDiv', data1, layout);
  });

  socket.on('position1', (data) => {

    var x = [], y = [];
    var i = 0;
    var stoppro = true;
    Plotly.newPlot('myDiv', [{
      x: x,
      y: y,
      mode: 'markers'
    }], {
      width: 960,
      height: 540,
      xaxis: { range: [0, 960] },
      yaxis: { range: [540, 0] }
    })

    function compute(i) {
      if (i < data.length) {
        x = data[i].x
        y = data[i].y
        return true;
      } else {
        return false;
      }

    }

    function update() {

      if (compute(i++)) {
        console.log(data.length)
        Plotly.animate('myDiv', {
          data: [{ x: x, y: y }]
        }, {
          transition: {
            duration: 0
          },
          frame: {
            duration: 0,
            redraw: false
          }
        });

        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  })
}
