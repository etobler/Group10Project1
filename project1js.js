"use strict";

// Global variables and Constants

var canvas;
var context;

var drawingMode = false;  // drawing or moving?

function initialize() {
    canvas = document.getElementById('drawingCanvasId');
    context = canvas.getContext('2d');
    context.lineCap = "round";
}

function clearCanvas() {
    //The following hard coded values are dependent on the size of canvas

    var confirmClear = confirm("Do you really want to clear the canvas?");
    if (confirmClear === true) {
        context.clearRect(0, 0, 1000, 1000);
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