function clickLogin() {
    document.getElementById('userNameID').value='';
    document.getElementById('passwordID').value='';
    clearAfterLogin();
}

function clearAfterLogin() {
    document.getElementById('inputFormID').remove();
    document.getElementById('title').innerHTML="the Canvas";
}