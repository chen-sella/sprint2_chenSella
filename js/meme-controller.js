'use strict';
var gKey;
var gElCanvas;
var gCtx;
var gStorageMeme;
var gCurrLineIdx;

function init() {
  gElCanvas = document.getElementById('meme-canvas');
  gCtx = gElCanvas.getContext('2d');
  gKey = getKey();
  renderGallary();
}

function renderGallary() {
  var imgs = getImgs();
  var strHTML = imgs
    .map((img) => {
      return `<div class"grid-item">
                    <img src="${img.url}" class="grid-img" onclick="renderMeme(${img.id})">
                </div>`;
    })
    .join('');
  var elGrid = document.querySelector('.grid-container');
  elGrid.innerHTML = strHTML;
}

function renderMeme(imgId) {
  createMeme(imgId);
  var elGrid = document.querySelector('.grid-container');
  elGrid.innerHTML = '';
  var elAbout = document.querySelector('.about-container');
  elAbout.style.visibility = 'hidden';
  var elBody = document.querySelector('body');
  elBody.classList.add('editor-show');
  updateGlobals();
  renderImg();
}

function renderImg() {
  var memeImg = new Image();
  memeImg.src = gStorageMeme.selectedImgUrl;
  gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onTyping(text) {
  updateMemeText(text);
  updateGlobals();
  var text = gStorageMeme.lines[gCurrLineIdx].txt;
  drawText(text);
}

function drawText(text, x = gElCanvas.width / 2, y = 40) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = `${gStorageMeme.lines[gCurrLineIdx].color}`;
  gCtx.fillStyle = 'white';
  gCtx.font = `${gStorageMeme.lines[gCurrLineIdx].size}px Impact`;
  gCtx.textAlign = `${gStorageMeme.lines[gCurrLineIdx].align}`;
  gCtx.clearRect(0, 40, gElCanvas.width, 60);
  renderImg();
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function onChangeFont(action) {
  updateFont(action);
  updateGlobals();
  drawText(gStorageMeme.lines[gCurrLineIdx].txt);
}

function onChangeAlignment(action) {
  updateAlignment(action);
  updateGlobals();
  drawText(gStorageMeme.lines[gCurrLineIdx].txt);
}

function updateGlobals(){
    gStorageMeme = loadFromStorage(gKey);
    gCurrLineIdx = gStorageMeme.selectedLineIdx;
}