/**
 * Created by paipeng on 27.05.15.
 */


var selection = window.getSelection();
// Only works with a single range
var range = selection.getRangeAt(0);
var container = range.commonAncestorContainer;

var payload = {
    'method': "onSelection",
    'text': selection.toString(),
    'html': container.innerHTML
};


chrome.extension.sendMessage(payload);

