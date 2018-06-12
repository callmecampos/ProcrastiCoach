function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function urlMatch() {
}

function hello() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        var links = ['www.reddit.com', 'www.facebook.com', 'www.instagram.com', 'www.twitter.com', 'www.youtube.com', 'www.netflix.com'];
        var url = new URL(tabs[0].url);
        var domain = url.hostname;
        var urlMatch = links.indexOf(domain) > -1;

        if (getElementByXpath('/html/body/label/input').checked && urlMatch) {
            prompt("Why are you on this page?", "Explain here...");
        }
    });
}

getElementByXpath('/html/body/label/input').addEventListener('click', hello);
window.addEventListener('load', hello);
// check if switch is on
// if so, check if on listed website
// if so, show popup asking user their purpose for visiting the website
// periodically remind user in off-to-side pop-up
// provide support and have work-mode, fun-mode, movie-mode, etc.
