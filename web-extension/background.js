'use strict';

var BASE_URL = 'https://www.youtube.com/watch?v=';
var API_URL = 'http://snipstream.eyechess.org/'

function Requester() {
  this._request;
  this._response;

  this.get = function(url, func) {
    this._request = new XMLHttpRequest();
    this._request.onreadystatechange = function() {
      if (this._request.readyState === XMLHttpRequest.DONE &&
          this._request.status === 200) {
        this._response = this._request.responseText;
        func(this._response);
      }
    }.bind(this);

    this._request.open('GET', url, true);
    this._request.send();
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

    requester.get(API_URL + videoId, function(response) {
      chrome.tabs.sendMessage(tab.id, { response: JSON.parse(response) });
    });
  });
});
