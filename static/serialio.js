var url = "http://" + document.domain + ":" + location.port;
var socket = io.connect(url + "/update");

var myScale = d3.scaleLinear().domain([-0.314, 0.314]).range([-30, 30]);
 
socket.on('update', function(msg) {
    [p, r] = msg["data"].split(",");
    console.log(p,r)
    processData(_3d.rotateY(p*10)(data));
    processData(_3d.rotateX(r*10)(data));
    
});


var pollTime = 20; 
var poll = setInterval( pollFunc, pollTime); 

function pollFunc(){
    socket.emit('update');
}

function stopPoll() { 
    clearInterval(poll);
}
function resumePoll() {
    poll = setInterval( pollFunc, pollTime);
}