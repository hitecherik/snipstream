'use strict';

var BASE_URL = 'https://www.youtube.com/watch?v=';

var RESPONSE = [
  { start: 1.1, end: 2.6 },
  { start: 7.2, end: 8.8 },
  { start: 10.3, end: 11.5 }
];

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
  });
});
