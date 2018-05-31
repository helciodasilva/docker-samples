// docker run -d -p 8080:8080 -v /git/myproj:/tmp/here wernight/phantomjs phantomjs /tmp/here/renderpage.js

var system = require('system');
var fs = require('fs');
var webserver = require('webserver');
var args = system.args;

var page = require('webpage').create();

phantom.onError = function(msg, trace) {
    console.log("phantom error: " + msg);
};

page.viewportSize = {
    width: 1280,
    height: 800
}

page.settings.resourceTimeout = 10000;
page.settings.userAgent = 'www.matthowlett.com';

page.onLoadFinished = function(status) {
  console.log('Page Loaded: ' + status);
};

page.clipRect = {
    top: 0,
    left: 0,
    width: 1280,
    height: 800
};

page.onError = function(msg, trace) {
    console.log("page error: " + msg);
};

var server = webserver.create();
var service = server.listen(8080, function(request, response) {
    var url = request.url;

    // .endsWith not working!
    if (url.length > 4 && 
      url[url.length-1] === 'o' && 
      url[url.length-2] === 'c' && 
      url[url.length-3] === 'i' && 
      url[url.length-4] === '.') {
        response.close();
        return;
    }

    var bits = request.url.split('?');
    if (bits.length < 2) {
      response.close();
      return;
    }

    console.log('getting: ' + bits[1]);

    response.statusCode = 200;
    response.setHeader('Content-type', 'text/plain');
    page.open(bits[1], function(status) {
        if (status !== 'success') {
            console.log('Unable to load the address! ' + status + " " + bits[1]);
        } else {
	        console.log("success: " + bits[1]);
	        window.setTimeout(function () {
	            page.render('/tmp/tmp.png');
                var content = fs.read('/tmp/tmp.png', 'b');
                response.write(btoa(content));
                response.close();
	        }, 600);
        }
    });

});