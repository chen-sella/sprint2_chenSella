'use strict';
var gKey;
var gElCanvas;
var gCtx;
var gStorageMeme = loadFromStorage(gKey);
var gCurrLineIdx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gElBody;
var gCurrImgs;
var gImg;

function init() {
  gElCanvas = document.getElementById('meme-canvas');
  gCtx = gElCanvas.getContext('2d');
  gKey = getKey();
  gElBody = document.querySelector('body');
  gCurrImgs = getImgs();
  renderGallary(gCurrImgs);
}

function renderGallary(imgs) {
  var strHTML = imgs.map((img) => {
    return `<div class"grid-item">
                    <img src="${img.url}" class="grid-item" onclick="renderMeme(${img.id})">
                </div>`;
  })
  .join('');
  var elGrid = document.querySelector('.grid-container');
  elGrid.innerHTML = strHTML;
}

function renderMeme(imgId) {
  createMeme(imgId, gElCanvas);
  gElBody.classList.remove('gallary');
  gElBody.classList.add('meme-editor');
  updateGlobals();
  renderImg();
}

function renderImg() {
  var memeImg = new Image();
  memeImg.src = gStorageMeme.url;
  memeImg.onload = function () {
    gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height);
  };
}

function onTyping(text) {
  updateMemeText(text);
  drawLines();
}

function drawLines() {
  updateGlobals();
  renderImg();
  gStorageMeme.lines.forEach((line, idx) => {
    drawText(line, idx);
  });
}

function drawText(line, idx) {
  var currLineIdx = getLineIdx();
  if (idx === currLineIdx) {
    gCtx.strokeStyle = 'red';
  } else {
    gCtx.strokeStyle = `${line.color}`;
  }
  gCtx.lineWidth = 2;
  gCtx.fillStyle = 'white';
  gCtx.font = `${line.size}px Impact`;
  gCtx.textAlign = `${line.align}`;
  gCtx.fillText(line.txt, line.location.x, line.location.y);
  gCtx.strokeText(line.txt, line.location.x, line.location.y);
}

function onChangeFont(action) {
  updateFont(action);
  drawLines();
}

function onChangeAlignment(action) {
  updateAlignment(action, gElCanvas);
  drawLines();
}

function updateGlobals() {
  gStorageMeme = loadFromStorage(gKey);
  gCurrLineIdx = gStorageMeme.selectedLineIdx;
}

function onAddTextLine() {
  createNewLine(gElCanvas);
  document.querySelector('.text-input').value = '';
}

function onDownloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'my-img.jpg';
  gElBody.classList.add('gallary');
  gElBody.classList.remove('meme-editor');
  document.querySelector('.text-input').value = '';
  renderGallary(gCurrImgs);
}

function onClearLine() {
  var clear = confirm('Are you sure?');
  if (clear) {
    clearLine();
    updateGlobals();
    document.querySelector('.text-input').value = '';
    drawLines();
  }
}
function onSaveMeme() {
  saveMeme(gElCanvas);
  gElBody.classList.add('gallary');
  gElBody.classList.remove('meme-editor');
  document.querySelector('.text-input').value = '';
  renderGallary(gCurrImgs);
}

function onLineUp() {
  moveLineUp(gElCanvas);
  updateGlobals();
  drawLines();
}
function onLineDown() {
  moveLineDown(gElCanvas);
  updateGlobals();
  drawLines();
}

function onChangeFocus() {
  changeFocus();
  updateGlobals();
  document.querySelector('.text-input').value =
    gStorageMeme.lines[gCurrLineIdx].txt;
  drawLines();
}

function resizeCanvas(memeImg, imgWidth, imgHeight) {
  const elContainer = document.querySelector('.canvas-container');
 
  if (imgWidth >imgHeight){ //landscape
    elContainer.height = (imgHeight * elContainer.width) / imgWidth;
  }
  else{ //portrait
    elContainer.width = (imgWidth * elContainer.height) / imgHeight;
  }
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
  gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onFilter(text) {
  var filtered = filterImgs(text);
  renderGallary(filtered);
}

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}

function onImgInput(ev) {
  loadImageFromInput(ev, createImgFromUpload);
  setTimeout(() => {
    gCurrImgs = getImgs();
    renderGallary(gCurrImgs);
  }, 1000);
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
    gImg = img;
  };
  reader.readAsDataURL(ev.target.files[0]);
}

function showMemesHistory() {
  document.querySelector('.grid-container').innerHTML = '';
  gElBody.classList.add('gallary');
  gElBody.classList.remove('meme-editor');
  var mems = loadFromStorage('memesDB');
  renderGallary(mems);
}

function showMemesGallary() {
  gElBody.classList.add('gallary');
  gElBody.classList.remove('meme-editor');
  document.querySelector('.grid-container').innerHTML = '';
  renderGallary(gCurrImgs);
}
