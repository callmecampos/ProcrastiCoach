''' Based on AdBlock source code. '''

var translate = function (messageID, args) {
  if (Array.isArray(args)) {
    for (var i = 0; i < args.length; i++) {
      if (typeof args[i] !== 'string') {
        args[i] = args[i].toString();
      }
    }
  } else if (args && typeof args !== 'string') {
    args = args.toString();
  }

  return chrome.i18n.getMessage(messageID, args);
};

// Determine what language the user's browser is set to use
var determineUserLanguage = function () {
    if ((typeof navigator.language !== 'undefined') &&
        navigator.language)
        return navigator.language.match(/^[a-z]+/i)[0];
    else
        return null;
  };

// Inputs: key:string.
// Returns object from localStorage.
// The following two functions should only be used when
// multiple 'sets' & 'gets' may occur in immediately preceding each other
// ext.storage.get & set instead
var storage_get = function(key) {
  var store = localStorage;
  var json = store.getItem(key);
  if (json == null)
    return undefined;
  try {
    return JSON.parse(json);
  } catch (e) {
    log("Couldn't parse json for " + key, e);
    return undefined;
  }
};

// Returns undefined.
var storage_set = function(key, value) {
  var store = localStorage;
  try {
    store.setItem(key, JSON.stringify(value));
  } catch (ex) {
    console.log(ex)
  }
};
