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
}

function clearAfterLogin() {
    document.getElementById('inputFormID').remove();
    document.getElementById('title').innerHTML="WebSketch";
}

function setColor(color) {
    if (color == "black") {
        context.strokeStyle="#000000"
    }
    else {
        context.strokeStyle="#000000"
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
    insideCanvas = true;
}

function mouseLeftCanvas(event) {
    document.body.style.cursor = "help"
    insideCanvas = false;
}

function mouseDown(event) {
    drawingMode = true;
}

function mouseUp(event) {
    drawingMode = false;
}