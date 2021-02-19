"use strict";

// Global variables and Constants

var canvas;
var context;
var drawingMode = false;  // drawing or moving?
var insideCanvas = false; // inside out outside canvas?
var previousX, previousY = 0; // where the mouse was
var currentX, currentY = 0; // where the mouse is 
var penType = "pen";
var userName;
var password;
var color;
var fillColor = "white"; // setting the background of the canvas to white by default

function initialize() {
    // setting up the canvas element
    canvas = document.getElementById('drawingCanvasId');
    context = canvas.getContext('2d');
    context.lineCap = "round";
	setLineWidth('1');
    hideCanvas();
}

function clearCanvas() {
    //The following hard coded values are dependent on the size of canvas
    var confirmClear = confirm("Do you really want to clear the canvas?");
    if (confirmClear === true) {
        context.clearRect(0, 0, 600, 600);
        fillColor = "white";
    }
}

function clickLogin(form) {
    // if input isn't valid pops up an error message
    if (!form.checkValidity()) {
        alert("Please check your input, username must be at least 3 characters, \n Password must be at least 5 characters")
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

function setColor() {
    // getting color from color picker 
    color = document.getElementById("colorpicker").value;
    context.strokeStyle = color;
    // if the pen type was previously an eraser changing the id to make the pen cursor work
    if (penType == "erase") {
        document.getElementById('drawingCanvasEraser').id = "drawingCanvasId";
    }
    else {
        //nothing 
    }
    penType = "pen";
}

function setEraser() {
    // possibly changing the id to get the eraser cursor to work
    if (penType == "pen") {
            document.getElementById('drawingCanvasId').id = 'drawingCanvasEraser';
    }
    penType = "erase"
    // setting the eraser the same color as the fill
    context.strokeStyle= fillColor;
}

function fillCanvas() {
    // getting color from color picker than putting a rectangle over the canvas of that color
    fillColor = document.getElementById("colorpicker").value;
    console.log(color);
    context.beginPath();
    context.rect(0, 0, 600, 600);
    context.fillStyle = fillColor;
    context.fill();
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
    // function to hide the canvas
    document.getElementById("controlDivId").style.display = "none";
    document.getElementById("canvasDivId").style.display = "none";
    document.getElementById("logoutButtonId").style.display = "none";
    document.getElementById("inputFormId").style.display = "block";
    document.getElementById("marqueeId").style.display = "block";

}

function showCanvas() { 
    // function to display the canvas 
    document.getElementById("logoutButtonId").style.display = "block";
    document.getElementById("controlDivId").style.display = "block";
    document.getElementById("canvasDivId").style.display = "block";
    document.getElementById("marqueeId").style.display = "none";
    document.getElementById("inputFormId").style.display = "none";
}

function saveDrawing() {
    // function to save the drawing
    var confirmSave = confirm("Do you want to download your WebSketch?");
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