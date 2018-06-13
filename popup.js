function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// Saves options to chrome.storage
function save_options() {
  var on = getElementByXpath('/html/body/label/span').checked;
  chrome.storage.sync.set({
    enabled: on
  }, function() {
    console.log('Options saved.');
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(['enabled'], function(result) {
    if (result.key == undefined) {
      chrome.storage.sync.set({
        enabled: true
      }, function() {
        console.log('Options saved.');
      });
      getElementByXpath('/html/body/label/span').checked = true;
    } else {
      getElementByXpath('/html/body/label/span').checked = result.key;
    }
  });
}

restore_options();

getElementByXpath('/html/body/label/span').addEventListener('click', save_options);
