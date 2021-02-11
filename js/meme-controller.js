'use strict';
var gKey;
var gElCanvas;
var gCtx;
var gStorageMeme;
var gCurrLineIdx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gElBody;

function init() {
  gElCanvas = document.getElementById('meme-canvas');
  gCtx = gElCanvas.getContext('2d');
  gKey = getKey();
  gElBody = document.querySelector('body');
  renderGallary();
  window.addEventListener('resize', () => {
    resizeCanvas();
    // renderImg();
  });
}

function renderGallary() {
  var imgs = getImgs();
  var strHTML = imgs
    .map((img) => {
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
  var elGrid = document.querySelector('.grid-container');
  elGrid.innerHTML = '';
  gElBody.classList.remove('gallary');
  gElBody.classList.add('meme-editor');
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
  updateAlignment(action);
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
  saveMeme();
  gElBody.classList.add('gallary');
  gElBody.classList.remove('meme-editor');
  document.querySelector('.text-input').value = '';
  renderGallary();
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

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth;
//   gElCanvas.height = elContainer.cilentHeight;
  gElCanvas.height = elContainer.offsetHeight;
}

// function canvasClicked(ev) {
//   const { offsetX, offsetY } = ev;
//   console.log(offsetX);
//   console.log(offsetY);
//   var clickedLine = gStorageMeme.lines.find((line) => {
//       var lineLeng = gCtx.measureText(line.txt);
//       console.log(line.x);
//     return (
//       offsetX > line.x-lineLeng &&
//       offsetX < line.x + lineLeng &&
//       offsetY > line.y &&
//       offsetY < gCanvas.height
//     );
//   });
//   console.log(clickedLine);
// //   if (clickedStar)
// //     openModal(clickedStar.name, clickedStar.rate, ev.clientX, ev.clientY);
// //   else closeModal();
// }

// function addMouseListeners() {
//   gElCanvas.addEventListener('mousemove', onMove);
//   gElCanvas.addEventListener('mousedown', onDown);
//   gElCanvas.addEventListener('mouseup', onUp);
// }

// function getEvPos(ev) {
//   var pos = {
//     x: ev.offsetX,
//     y: ev.offsetY,
//   };
//   if (gTouchEvs.includes(ev.type)) {
//     ev.preventDefault();
//     ev = ev.changedTouches[0];
//     pos = {
//       x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//       y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//     };
//   }
//   return pos;
// }
