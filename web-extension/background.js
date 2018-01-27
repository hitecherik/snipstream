'use strict';

var BASE_URL = 'https://www.youtube.com/watch?v=';
var API_URL = 'http://snipstream.eyechess.org/'

function Requester() {
  this.request;
  this.response;

  this.get = function(url, func) {
    this.request = new XMLHttpRequest();
    httpRequest.onreadystatechange = this._ready;

    this.request.open('GET', url, true);
    this.request.send();

    return this;
  };

  this._ready = function() {
    if (this.request.readyState === XMLHttpRequest.DONE &&
        this.request.status === 200) {
      this.response = this.request.responseText;
    }
  };

  this.done = function(func) {
    func(this.response);
    return this;
  };
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: BASE_URL },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });

  chrome.pageAction.onClicked.addListener(function(tab) {
    var videoId = tab.url.replace(BASE_URL, '');
    var requester = new Requester();

    requester.get(API_URL + videoId).done(function(response) {
      chrome.tabs.sendMessage(tab.id, { response: response }, function() {});
    });
  });
});
