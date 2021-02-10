'use strict';


function init() {
  console.log('Hello');
  renderGallary();
}

function renderGallary() {
  var imgs = getImgs();
  var strHTML = imgs
    .map((img) => {
      return `<div class"grid-item">
                    <img src="${img.url}" class="grid-img" onclick="renderMemeGen(this, ${img.id})">
                </div>`;
    })
    .join('');
  var elGrid = document.querySelector('.grid-container');
  elGrid.innerHTML = strHTML;
}

function renderMemeGen(img, imgId) {
  createMeme(imgId);
  var elGrid = document.querySelector('.grid-container');
  elGrid.innerHTML = '';
  var elBody = document.querySelector('body');
  elBody.classList.add('editor-show');
  renderImg();
}

function onTyping(text, id) {
  updateMemeText(text);
  var key = getKey();
  insertText(key);
}

function onChangeFont(action) {
  updateFont(action);
  var key = getKey();
  var lineIdx = getLineIdx();
  var currMeme = loadFromStorage(key);
  drawText(currMeme.lines[lineIdx].txt);
}

// function onAddRow() {
//   var strHTML =   `<input id="input-${gLineIdx}" class="text-input" type="text" oninput="onTyping(this.value, this.id)">`
//   var elInputsCont = document.querySelector('.inputs-container');

// }

function onChangeAlignment(action){
    updateAlignment(action);
    var key = getKey();
    var lineIdx = getLineIdx();
    var currMeme = loadFromStorage(key);
    drawText(currMeme.lines[lineIdx].txt);
}