function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// Saves options to chrome.storage
function save_options() {
  var val = getElementByXpath('/html/body/label/span').checked;
  getElementByXpath('/html/body/label/span').checked = !val;
  chrome.storage.sync.set({ enabled: !val }, function() {
    console.log(getElementByXpath('/html/body/label/span').checked);
    console.log('Options saved.');
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({ enabled: true }, function(items) {

    if (items.enabled == undefined) {
      chrome.storage.sync.set({
        enabled: true
      }, function() {
        console.log('Options saved during restore.');
      });
      getElementByXpath('/html/body/label/span').checked = true;
    } else {
      getElementByXpath('/html/body/label/span').checked = items.enabled;
    }
  });
}

restore_options();

getElementByXpath('/html/body/label/span').addEventListener('click', save_options);
