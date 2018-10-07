window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var source;

// Audio 用の buffer を読み込む
var getAudioBuffer = function (url, fn) {
  var req = new XMLHttpRequest();
  // array buffer を指定
  req.responseType = 'arraybuffer';

  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 0 || req.status === 200) {
        // array buffer を audio buffer に変換
        context.decodeAudioData(req.response, function (buffer) {
          // コールバックを実行
          fn(buffer);
        });
      }
    }
  };

  req.open('GET', url, true);
  req.send('');
};

// サウンドを再生
var playSound = function (buffer) {
  context = new AudioContext();
  context.createBufferSource().start(0);
  // source を作成
  source = context.createBufferSource();
  // buffer をセット
  source.buffer = buffer;
  // context に connect
  source.connect(context.destination);
  // 再生
  source.start(0);
};

// サウンドを停止
var stopSound = function() {
  if (source != null) {
    source.stop(0);
  }
}

// main
// function AudioPLay(voice) {
//   stopSound();
//   // サウンドを読み込む
//   getAudioBuffer('vo/' + voice, function (buffer) {
//     // サウンドを再生
//     playSound(buffer);
//   });
// }

// window.onload = function () {
//   // サウンドを読み込む
//   getAudioBuffer('vo/hi.mp3', function (buffer) {
//     // 読み込み完了後にボタンにクリックイベントを登録
//     var btn = document.getElementById('btn');
//     btn.onclick = function () {
//       // サウンドを再生
//       playSound(buffer);
//     };
//   });
// };

window.onload = function () {
  var btn = document.getElementsByClassName('btn')
  getAudioBuffer('vo/hi.mp3', function (buffer) {
    playSound(buffer);
  });
  for (let i = 0; i < btn.length; i++) {
    btn[i].onclick = function () {
      var voicesrc = this.getAttribute('data-voisrc');
      console.log(voicesrc);
      getAudioBuffer('vo/' + voicesrc + '.mp3', function (buffer) {
          // サウンドを再生
          playSound(buffer);
      });
    };
  }
};
