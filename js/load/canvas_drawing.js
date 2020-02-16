var mousePressed = false;
var lastX, lastY;
var ctx;

//resize image with off-screen canvas
function imageToDataUri(img, width, height) {

    // create an off-screen canvas
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');


    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    // canvas with white background
  /*  ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);*/


    // draw source image into the off-screen canvas:
    ctx.drawImage(img, 0, 0, width, height);

    // encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL("image/png");
}

function InitThis() {
    ctx = document.getElementById('sheet').getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, document.getElementById('sheet').width, document.getElementById('sheet').height);
    $('#sheet').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#sheet').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#sheet').mouseup(function (e) {
        mousePressed = false;
        let img = imageToDataUri(document.getElementById("sheet"),28,28)//resize it
        let imgElement = document.getElementById("imageResult").setAttribute("src",img);// display it
        guessIt();
    });
	    $('#sheet').mouseleave(function (e) {
        mousePressed = false;
    });
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 12;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, document.getElementById('sheet').width, document.getElementById('sheet').height);
    document.getElementById("imageResult").setAttribute("src","");
    document.getElementById("result").textContent = "";
}

// init the cancas
document.addEventListener('DOMContentLoaded', InitThis);
