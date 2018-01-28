function Loop(array) {
  this.array = array;
  this.index;
  this.func;

  this.forEach = function(func) {
    this.index = -1;
    this.func = func;
    this.next();
  };

  this.next = function() {
    this.index++;

    if (this.index < this.array.length) {
      this.func(this.array[this.index]);
    }
  };
};

chrome.runtime.onMessage.addListener(function(data, _, send) {
  if (data.type == 'name') {
    var matches = /\\u0026name=(.+?)\\"/.exec(document.body.innerHTML);
    send(matches.length > 1 ? matches[1] : null);
  }

  if (data.type == 'trailer') {
    var video = document.getElementsByTagName('video')[0];
    var loop = new Loop(data.response);

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
    });
  }

  if (data.type == 'toast') {
    var element = document.createElement('div')
    element.innerHTML = data.content
    document.body.appendChild(element);
  }
});

