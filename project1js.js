"use strict";

// Global variables and Constants

var canvas;
var context;

var drawingMode = false;  // drawing or moving?
var insideCanvas = false; // inside out outside canvas?
// where the mouse was
var previousX, previousY = 0;
// where the mouse is 
var currentX, currentY = 0;
var penType = "pen";
var userName;
var password;

function initialize() {
    canvas = document.getElementById('drawingCanvasId');
    context = canvas.getContext('2d');
    context.lineCap = "round";
    setColor('black');
	setLineWidth('1');
    hideCanvas();
}

function clearCanvas() {
    //The following hard coded values are dependent on the size of canvas

    var confirmClear = confirm("Do you really want to clear the canvas?");
    if (confirmClear === true) {
        context.clearRect(0, 0, 600, 600);
    }
}

function clickLogin(form) {
    if (!form.checkValidity()) {
        alert("Please check your input, username must be at least 3 characters, \n Password must be at least 5 charcters")
    }
    else {
        clearAfterLogin();
        document.getElementById('logoutButtonId').style.display = "block";
        showCanvas();
    }
}

function clickLogout() {
    document.getElementById('title').innerHTML="Welcome to WebSketch!";
    hideCanvas()
}

function clearAfterLogin() {
    document.getElementById('title').innerHTML="WebSketch";
}

function setColor(color) {
    if (color == "black") {
        context.strokeStyle="#000000";
        if (penType == "erase") {
            document.getElementById('drawingCanvasEraser').id = "drawingCanvasId";
        }
        penType = "pen"
    }
    else if (color == "white") {
        context.strokeStyle="#FFFFFF"
        if (penType == "pen") {
            document.getElementById('drawingCanvasId').id = 'drawingCanvasEraser';
        }
        penType = "erase"
    }
    else {
        context.strokeStyle="#FF0000"
        if (penType = "erase") {
            document.getElementById('drawingCanvasEraser').id = "drawingCanvasId";
        }
        penType = "pen"
        
    }
    // Will add more colors here when that functionality is added 
}

function fillCanvas() {
    console.log("test 1");
    context.beginPath();
    context.rect(0, 0, 600, 600);
    context.fillStyle = "red";
    context.fill();
    console.log("test")
    
}

function setLineWidth(width) {
    context.lineWidth = width;
}

function mouseMovement(event) {
    // function to handle when mouse moves
    previousX = currentX;
    previousY = currentY;
    currentX = event.clientX - canvas.offsetLeft;
    currentY = event.clientY - canvas.offsetTop;
    startDrawing()
}

function startDrawing() {
    // Will start drawing
    if (insideCanvas && drawingMode) {
        context.beginPath();
        context.moveTo(previousX, previousY);
        context.lineTo(currentX, currentY);
        context.stroke();
        context.closePath();
    }
}

function mouseEnteredCanvas(event) {
    // showing that the mouse is now inside the canvas's borders 
    insideCanvas = true;
}

function mouseLeftCanvas(event) {
    // showing that the mouse is now outside the canvas's borders 
    insideCanvas = false;
}

function mouseDown(event) {
    // function starts when the user clicks their mouse 
    drawingMode = true;
}

function mouseUp(event) {
    // function starts when the user stops clicking their moues 
    drawingMode = false;
}

function hideCanvas() {
    document.getElementById("controlDivId").style.display = "none";
    document.getElementById("canvasDivId").style.display = "none";
    document.getElementById("logoutButtonId").style.display = "none";
    document.getElementById("inputFormId").style.display = "block";
    document.getElementById("marqueeId").style.display = "block";

}

function showCanvas() { 
    document.getElementById("logoutButtonId").style.display = "block";
    document.getElementById("controlDivId").style.display = "block";
    document.getElementById("canvasDivId").style.display = "block";
    document.getElementById("marqueeId").style.display = "none";
    document.getElementById("inputFormId").style.display = "none";
}

function saveDrawing() {
    var confirmSave = confirm("Do you want to download your drawing?");
    if (confirmSave === true) {

        // get canvas data 
        var image = canvas.toDataURL();  
  
        // create temporary link  
        var tmpLink = document.createElement( 'a' );  
        tmpLink.download = 'image.png'; // set the name of the download file 
        tmpLink.href = image;  
      
        // temporarily add link to body and initiate the download  
        document.body.appendChild( tmpLink );  
        tmpLink.click();  
        document.body.removeChild( tmpLink ); 
    }
}