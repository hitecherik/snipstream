'use strict';

function Loop(array) {
  this.array = array;
  this.index;
  this.func;
  this.done;

  this.forEach = function(func, done) {
    this.index = -1;
    this.func = func;
    this.done = done;
    this.next();
  };

  this.next = function() {
    this.index++;

    if (this.index < this.array.length) {
      this.func(this.array[this.index]);
    } else {
      this.done();
    }
  };
};

chrome.runtime.onMessage.addListener(function(data, _, send) {
  if (data.type == 'name') {
    var matches = /\\u0026name=(.+?)\\"/.exec(document.body.innerHTML);
    send(matches.length > 1 ? matches[1] : null);
  }

  if (data.type == 'trailer') {
    var loop = new Loop(data.response);

    document.getElementsByTagName('video')[0].pause();
    document.body.className += ' snipstream';

    var video = el.firstChild.contentDocument.getElementsByTagName('video')[0];
    video.play();

    loop.forEach(function(pair) {
      var recurse = function() {
        if (video.currentTime > pair.end) {
          loop.next();
        } else {
          setTimeout(function() {
            recurse();
          }, 100);
        };
      };

      video.currentTime = pair.start;
      recurse();
    }, function() {
      video.currentTime = 0;
      video.pause();
    });
  }
});

var el = document.createElement('div');
el.innerHTML = '<iframe width="840" height="472.5" style="margin-left: -420px; margin-top: -236.25px;" src="https://www.youtube.com/embed/nKW8Ndu7Mjw?controls=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
document.body.appendChild(el);
