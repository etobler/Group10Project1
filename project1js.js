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
        context.clearRect(0, 0, 500, 500);
    }
}

function clickLogin() {
    document.getElementById('userNameID').value='';
    document.getElementById('passwordID').value='';
    clearAfterLogin();
    showCanvas();
}

function clearAfterLogin() {
    document.getElementById('inputFormID').remove();
    document.getElementById('title').innerHTML="WebSketch";
}

function setColor(color) {
    if (color == "black") {
        context.strokeStyle="#000000"
    }
    else if (color == "white") {
        context.strokeStyle="#FFFFFF"
    }
    else {
        context.strokeStyle="#FF0000"
    }
    // Will add more colors here when that functionality is added 
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
    document.getElementById("inputFormId").style.display = "block";
    document.getElementById("marqueeId").style.display = "block";
}

function showCanvas() {
    document.getElementById("controlDivId").style.display = "block";
    document.getElementById("canvasDivId").style.display = "block";
    document.getElementById("marqueeId").style.display = "none";
    document.getElementById("inputFormId").style.display = "none";
}

