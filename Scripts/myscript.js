function getXMLDisplayString() {
    return new Promise((resolve, reject) => {
        var transaction = db.transaction(["sites"], "readwrite");
        var objectStore = transaction.objectStore("sites");
        var request = objectStore.openCursor();
        var displayString = "<site-list version=\"pending\">" + "\n";

        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                var jsonData = '{' +
                    '"Url":"' + cursor.value.url + '",' +
                    '"CompatMode":"' + cursor.value.compatMode + '",' +
                    '"OpenIn":"' + cursor.value.openIn + '",' +
                    '"StandaloneIE":' + cursor.value.standaloneIE + ',' +
                    '"AllowRedirect":' + cursor.value.allowRedirect + ',' +
                    '"Comment":"' + cursor.value.comment +
                '"}';
                var xml = json2xmlAdvance(jsonData);
                var prettyXml = formatXml(xml);
                displayString += indent(prettyXml, 2) + "\n";
                cursor.continue();
            }
            else {
                displayString += "</site-list>";
                resolve(displayString);
            };
        }
        request.onerror = function (event) {
            reject(event);
        }
    });
}

function json2xmlAdvance(json) {
    var a = JSON.parse(json)
    var c = document.createElement("site");
    var t = function (v) {
        return {}.toString.call(v).split(' ')[1].slice(0, -1).toLowerCase();
    };
    var f = function (f, c, a, s) {
        var openInNode;
        for (var k in a) {
            var v = a[k];
            switch (k) {
                case "Url":
                    c.setAttribute(k, v);
                    break;
                case "Comment":
                    if (v != null && v != "") {
                        c.setAttribute(k, v);
                    }
                    break;
                case "OpenIn":
                    openInNode = document.createElement("open-in");
                    if (t(v) != "null") {
                        openInNode.appendChild(document.createTextNode(v));
                    }
                    c.appendChild(openInNode);
                    break;
                case "CompatMode":
                    var compatModeNode = document.createElement("compat-mode");
                    if (t(v) != "null") {
                        compatModeNode.appendChild(document.createTextNode(v));
                    }
                    c.appendChild(compatModeNode);
                    break;
                case "StandaloneIE":
                    if (v == true) {
                        openInNode.setAttribute("app", v);
                    }
                    break;
                case "AllowRedirect":
                    if (v == true) {
                        openInNode.setAttribute("allow-redirect", v);
                    }
                    break;
            }
        }
    };
    f(f, c, a, t(a) == "array");
    return c.outerHTML;
}

function formatXml(xml, tab) { // tab = optional indent value, default is tab (\t)
    var formatted = '', indent= '';
    tab = tab || '  ';
    xml.split(/>\s*</).forEach(function(node) {
        if (node.match( /^\/\w/ )) indent = indent.substring(tab.length); // decrease indent by one 'tab'
        formatted += indent + '<' + node + '>\r\n';
        if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;              // increase indent
    });
    return formatted.substring(1, formatted.length-3);
}

function indent(str, numOfIndents) {
    str = str.replace(/^(?=.)/gm, new Array(numOfIndents + 1).join(' '));
    return str;
}