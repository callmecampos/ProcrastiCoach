function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function time() {
  return new Date().getTime() / 1000;
}

// Restores state using the preferences
// stored in chrome.storage.
chrome.storage.sync.get('enabled', function(result) {
  if (result.key == undefined) {
    chrome.storage.sync.set({ enabled: true }, function() {
        console.log('Options saved in background.');
        chrome.storage.sync.get({
          enabled: true
        }, function(items) {
            console.log('Extension enabled: ' + items.enabled);
        });
    });
  }
});

var called = false;
var lastUrl = '';
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if (!called) {
    called = true;
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
      var links = ['www.reddit.com', 'www.facebook.com', 'www.instagram.com', 'www.twitter.com', 'www.youtube.com', 'www.netflix.com'];
      var url = new URL(tabs[0].url);
      var domain = url.hostname;
      var urlMatch = links.indexOf(domain) > -1;

      chrome.storage.sync.get({
        enabled: true
      }, function(items) {
        console.log('Extension enabled: ' + items.enabled);
        if (domain != lastUrl) {
          lastUrl = domain;
          if (items.enabled && urlMatch) {
            var response = window.prompt("Why are you on this page?", "Explain here...");
            // run some NLP jank
          }
        }
        called = false;
      });
    });
  }
});
