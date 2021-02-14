'use strict';
const KEY = 'meme';

var gKeywords = {
  happy: 5,
  president: 3,
  suit: 3,
  formal: 3,
  trump: 1,
  love: 1,
  puppy: 2,
  kiss: 1,
  nap: 2,
  sleep: 1,
  bed: 1,
  baby: 4,
  tired: 2,
  together: 2,
  cat: 1,
  keyboard: 1,
  bored: 1,
  victory: 1,
  success: 1,
  sea: 1,
  sand: 1,
  crazy: 2,
  explain: 2,
  listen: 2,
  surprised: 2,
  curious: 1,
  hat: 1,
  fascinated: 1,
  laughter: 3,
  evil: 1,
  conspiracy: 1,
  obama: 1,
  fight: 2,
  rival: 1,
  suffocating: 1,
  righteous: 1,
  glasses: 2,
  hand: 4,
  you: 1,
  cheers: 1,
  celebrate: 1,
  toast: 1,
  star: 1,
  congradulations: 1,
  tense: 1,
  gun: 1,
  exactly: 1,
  two: 1,
  scared: 1,
  toystory: 1,
  friends: 1,
  help: 1,
};

var gImgs = [
  {
    id: 1,
    url: 'meme-imgs (square)/1.jpg',
    keywords: ['speech', 'president', 'suit', 'formal', 'trump'],
  },
  {
    id: 2,
    url: 'meme-imgs (square)/2.jpg',
    keywords: ['happy', 'love', 'puppy', 'kiss'],
  },
  {
    id: 3,
    url: 'meme-imgs (square)/3.jpg',
    keywords: ['nap', 'sleep', 'bed', 'puppy', 'baby', 'tired', 'together'],
  },
  {
    id: 4,
    url: 'meme-imgs (square)/4.jpg',
    keywords: ['tired', 'cat', 'keyboard', 'nap', 'bored'],
  },
  {
    id: 5,
    url: 'meme-imgs (square)/5.jpg',
    keywords: ['baby', 'victory', 'success', 'sea', 'sand'],
  },
  {
    id: 6,
    url: 'meme-imgs (square)/6.jpg',
    keywords: ['crazy', 'explain', 'listen', 'suit', 'formal'],
  },
  {
    id: 7,
    url: 'meme-imgs (square)/7.jpg',
    keywords: ['happy', 'baby', 'surprised', 'curious', 'listen'],
  },
  {
    id: 8,
    url: 'meme-imgs (square)/8.jpg',
    keywords: ['happy', 'hat', 'crazy', 'fascinated'],
  },
  {
    id: 9,
    url: 'meme-imgs (square)/9.jpg',
    keywords: ['baby', 'laughter', 'evil', 'conspiracy'],
  },
  {
    id: 10,
    url: 'meme-imgs (square)/10.jpg',
    keywords: ['happy', 'laughter', 'president', 'obama'],
  },
  {
    id: 11,
    url: 'meme-imgs (square)/11.jpg',
    keywords: ['fight', 'rival', 'suffocating'],
  },
  {
    id: 12,
    url: 'meme-imgs (square)/12.jpg',
    keywords: ['righteous', 'glasses', 'hand', 'you'],
  },
  {
    id: 13,
    url: 'meme-imgs (square)/13.jpg',
    keywords: [
      'happy',
      'cheers',
      'celebrate',
      'toast',
      'star',
      'congradulations',
    ],
  },
  {
    id: 14,
    url: 'meme-imgs (square)/14.jpg',
    keywords: ['fight', 'tense', 'glasses', 'gun'],
  },
  {
    id: 15,
    url: 'meme-imgs (square)/15.jpg',
    keywords: ['exactly', 'hand', 'explain'],
  },
  {
    id: 16,
    url: 'meme-imgs (square)/16.jpg',
    keywords: ['laughter', 'surprised', 'hand'],
  },
  {
    id: 17,
    url: 'meme-imgs (square)/17.jpg',
    keywords: ['president', 'suit', 'formal', 'speech', 'hand', 'two'],
  },
  {
    id: 18,
    url: 'meme-imgs (square)/18.jpg',
    keywords: ['scared', 'toystory', 'friends', 'together', 'help'],
  },
];

var gId = 19;
var gMeme;
var gMemes = [];
var gLineIdx = 0;

function getImgs() {
  return gImgs;
}

function createMeme(imgId, canvas) {
  var img = findImg(imgId);

  gMeme = {
    url: img.url,
    selectedLineIdx: 0,
    lines: [
      {
        location: {
          x: canvas.width / 2,
          y: 40 * (gLineIdx + 1),
        },
        id: gLineIdx,
        txt: '',
        size: 40,
        align: 'center',
        color: 'black',
      },
    ],
  };
  saveToStorage(KEY, gMeme);
}

function createNewLine(canvas) {
  gLineIdx++;
  if (gMeme.lines.length === 1) {
    var y = canvas.height - 20;
  } else {
    var y = canvas.height / 2;
  }

  var line = {
    location: {
      x: canvas.width / 2,
      y,
    },
    id: gLineIdx,
    txt: '',
    size: 40,
    align: 'center',
    color: 'black',
  };
  gMeme.selectedLineIdx = gLineIdx;
  gMeme.lines.push(line);
  saveToStorage(KEY, gMeme);
}
function findImg(imgId) {
  return gImgs.find((img) => {
    return img.id === imgId;
  });
}

function updateMemeText(text) {
  gMeme.lines[gMeme.selectedLineIdx].txt = text;
  saveToStorage(KEY, gMeme);
}

function getKey() {
  return KEY;
}

function getLineIdx() {
  return gLineIdx;
}

function updateFont(action) {
  if (action === 'increase') {
    gMeme.lines[gLineIdx].size += 2;
  } else {
    gMeme.lines[gLineIdx].size -= 2;
  }
  saveToStorage(KEY, gMeme);
}

function updateAlignment(action, canvas) {
  if (action === 'left') {
    gMeme.lines[gLineIdx].align = 'right';
  } else if (action === 'center') {
    gMeme.lines[gLineIdx].align = 'center';
  } else {
    gMeme.lines[gLineIdx].align = 'left';
  }
  saveToStorage(KEY, gMeme);
}

function clearLine() {
  if (gMeme.lines.length === 1) {
    console.log('hiiii');
    gMeme.lines[gLineIdx].txt = '';
  } else {
    gMeme.lines.splice(gLineIdx, 1);
    if (gLineIdx != 0) {
      gLineIdx--;
      gMeme.selectedLineIdx = gLineIdx;
    }
  }
  saveToStorage(KEY, gMeme);
}

function saveMeme(canvas) {
  var memeToImg = {
    id: gId,
    url: canvas.toDataURL()
  }
  gMemes.push(memeToImg);
  gId ++;
  saveToStorage('memesDB', gMemes);
}

function moveLineUp() {
  var lineHeight = gMeme.lines[gLineIdx].location.y;
  if (lineHeight < 40) return;

  gMeme.lines[gLineIdx].location.y -= 5;
  saveToStorage(KEY, gMeme);
}

function moveLineDown(canvas) {
  var lineHeight = gMeme.lines[gLineIdx].location.y;
  if (lineHeight > canvas.height) return;

  gMeme.lines[gLineIdx].location.y += 5;
  saveToStorage(KEY, gMeme);
}

function changeFocus() {
  if (gMeme.lines.length === 1) return;
  else if (gMeme.lines.length - 1 === gLineIdx) {
    gLineIdx = 0;
    gMeme.selectedLineIdx = 0;
    saveToStorage(KEY, gMeme);
  } else {
    gLineIdx++;
    gMeme.selectedLineIdx++;
    saveToStorage(KEY, gMeme);
  }
}

function filterImgs(text) {
    var filtered =[];
    gImgs.forEach((img)=>{
       var isContain = img.keywords.some((word)=>{
            return word.startsWith(text)
        })
        if (isContain){
            filtered.push(img)
        }
    })
    return filtered
}

function createImgFromUpload(img){
    var img = {
        id: gId,
        url: img.src,
        keywords: ['preety', 'nice']
    }
    gId ++
    gImgs.push(img);
}