var webSocket;
var messages = document.getElementById("messages");
var cellSize = 5;
window.cellDataQueue = [];
window.cellData = [];
var FPS = 1000;
var fill = 'rgb(0,0,0)';
var canvas = document.getElementById("canvas");
var msgCount = 0;
if (canvas.getContext) {
    /* Get the size of the canvas and the d */
    var width = canvas.width;
    var height = canvas.height;
    var xCount = width / cellSize;
    var yCount = height / cellSize;

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = fill;
    ctx.fillRect (0, 0, width, height);
}




function openSocket(){
    // Ensures only one connection is open at a time
    if(webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED){
        writeResponse("WebSocket is already opened.");
        return;
    }
    // Create a new instance of the websocket
    webSocket = new WebSocket("ws://localhost:8080/");
     
    /**
     * Binds functions to the listeners for the websocket.
     */
    webSocket.onopen = function(event){
        // For reasons I can't determine, onopen gets called twice
        // and the first time event.data is undefined.
        // Leave a comment if you know the answer.
        if(event.data === undefined)  {
            return;
        }
        
        writeResponse(event.data);
    };

    webSocket.onmessage = function(event){
        data = event.data.split(' ');
        data[0] = data[0].replace(/[[\]]/g,'');
        lastIndex = data.length - 1;
        data[lastIndex] = data[lastIndex].replace(/[[\]]/g,'');

        cellDataQueue.push(data);
        msgCount = msgCount + 1;
        writeResponse("Message Count: " + msgCount);
    };

    webSocket.onclose = function(event){
        writeResponse("Connection closed");
    };
}

/**
 * Sends the value of the text input to the server
 */
function send(){
    var text = document.getElementById("messageinput").value;
    webSocket.send(text);
}

function closeSocket(){
    webSocket.close();
}

function writeResponse(text){
    messages.innerHTML = text;
}

/**
 * Sets the update interval of the draw function
 */
// setInterval(function() {
//     draw();
// }, 1000/FPS);


var animFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                null;


/**
 * Draws the ecosystem on the canvas element
 */
var draw = function() {
    if (cellDataQueue.length > 0) {
        cellData = cellDataQueue.shift();
    }

    for (var x = 0; x < xCount; x++) {
        for (var y = 0; y < yCount; y++) {
            
            var index = x + y * xCount;

            fill = 'rgb('+ cellData[index] + ',' + cellData[index] +',' + cellData[index] + ')';
            drawCell(x, y, fill);
            
        }
    }
    // console.log(index);
    animFrame(draw);
}

function drawCell(x, y, fill) {
    ctx.beginPath();
    ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);    
    ctx.fillStyle  = fill;
    ctx.fill();
}
