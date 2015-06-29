
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("bg.js onMessage");

    if (request.method == "getSelection")
        sendResponse({data: window.getSelection().toString()});
    else
        sendResponse({data: ""}); // snub them.
    //sendResponse({html: document.documentElement.innerHTML});
});


chrome.runtime.onInstalled.addListener(function () {
    var context = "selection";
    var title = "中文简繁字体转换";
    var id = chrome.contextMenus.create({
        "title": title, "contexts": [context],
        "id": "context" + context
    });
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
    var sText = info.selectionText;

    console.log("onclick " + sText);


    chrome.tabs.executeScript(null, {file: "content.js"});
    chrome.tabs.create({url: chrome.extension.getURL('popup.html')})
};


