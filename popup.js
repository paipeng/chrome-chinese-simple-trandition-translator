function onSelection(payload) {
    console.log('Got selection: ' + payload.method);

    if (payload.method === 'onSelection') {

        console.log('Got selection: ' + payload.html);
        var html = payload.text;

        chrome.runtime.getBackgroundPage(function (eventPage) {

            //updateQRCode(payload.text);

            doTranslation(html);

        });
        chrome.extension.onMessage.removeListener(window.onSelection);
    }

};


function isChineseSimple(html, jsons) {
    for (var i = 0; i < jsons.length; i++) {
        var json = jsons[i];

        if (html.search(json.jf)) {
            return true;
        }
    }
    return false;
}

function doTranslation(html) {
    /*
     //Creating Elements
     var btn = document.createElement("BUTTON")
     var t = document.createTextNode("CLICK ME");
     btn.appendChild(t);
     //Appending to DOM
     document.body.appendChild(btn);
     */

    loadJSON(chrome.extension.getURL('fonts.json'), function (response) {
        //console.log("fonts json " + response);
        var jsons = JSON.parse(response);

        var search = undefined;
        var replace = undefined;

        var isSimple = isChineseSimple(html, jsons);

        if (isSimple) {
            console.log("j->f")
        } else {
            console.log("f->j")
        }


        for (var i = 0; i < jsons.length; i++) {
            var json = jsons[i];
            if (isSimple) {
                search = json.jf;
                replace = json.fj;
            } else {
                search = json.fj;
                replace = json.jf;
            }
            html = html.replace(new RegExp(search, 'g'), replace);
        }

        console.log("converted html " + html);


        //var btn = document.createElement("BUTTON")
        //var t = document.createTextNode(html);
        //btn.appendChild(t);
        //Appending to DOM
        //document.body.appendChild(t);


        var newPayload = {
            "method": "onTranslated",
            "html": html
        };

        document.body.insertAdjacentHTML("beforeend", html);
    });

}

chrome.extension.onMessage.addListener(onSelection);

chrome.tabs.executeScript(null, {file: "content.js"});


document.addEventListener("DOMContentLoaded", function () {
});


function loadJSON(url, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}