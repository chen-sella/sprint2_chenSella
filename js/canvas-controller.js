'use strict';

var gElCanvas = document.getElementById('meme-canvas');
var gCtx = gElCanvas.getContext('2d');
var lineIdx = getLineIdx();
var key = getKey();
var gMeme = loadFromStorage(key);

function renderImg() {
  var memeImg = new Image();
  memeImg.src = gMeme.selectedImgUrl;
  gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function insertText(key) {
  var meme = loadFromStorage(key);
  var text = meme.lines[lineIdx].txt;
  drawText(text);
}

function drawText(text, x = gElCanvas.width / 2, y = 40) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = `${gMeme.lines[lineIdx].color}`;
  gCtx.fillStyle = 'white';
  gCtx.font = `${gMeme.lines[lineIdx].size}px Impact`;
  gCtx.textAlign = `${gMeme.lines[lineIdx].align}`;
  gCtx.clearRect( 0, 40, gElCanvas.width, 60);
  renderImg();
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

// function resizeCanvas() {
//     var elContainer = document.querySelector('.meme-canvas')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }

// function onImgInput(ev) {
//     loadImageFromInput(ev, renderImg)
// }

// function loadImageFromInput(ev, onImageReady) {
//     document.querySelector('.share-container').innerHTML = ''
//     var reader = new FileReader()

//     reader.onload = function (event) {
//         var img = new Image()
//         img.onload = onImageReady.bind(null, img)
//         img.src = event.target.result
//         gImg = img
//     }
//     reader.readAsDataURL(ev.target.files[0])
// }

// on submit call to this function
function uploadImg(elForm, ev) {
  ev.preventDefault();
  document.getElementById('imgData').value = gElCanvas.toDataURL('image/jpeg');

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    console.log('uploadedImgUrl:', uploadedImgUrl);
    document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`;
  }

  doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);
  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then(function (res) {
      return res.text();
    })
    .then(onSuccess)
    .catch(function (err) {
      console.error(err);
    });
}
