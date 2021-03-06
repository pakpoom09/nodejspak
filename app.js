/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var request = require("request");
var app = require('express')();
var bodyParser = require('body-parser');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

app.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});

app.post('/newuser', function (req, res) {
    var json = req.body;
    var que = json.sentence;
    var options = { method: 'GET',
     url: 'https://www.googleapis.com/language/translate/v2',
      qs:
       { key: 'AIzaSyDMjLu2DRBN1D9wfKakAogwRZrCdZa-cn4',
         target: 'en',
         source: 'th',
         q: que },
      headers:
       { 'postman-token': '7763d91e-5280-dd22-0d37-f928455d3819',
         'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      var x = JSON.parse(body);
      //console.log(x.data.translations.translatedText);
     //console.log(x['data']['translations']);
     res.send(x);
    });

});
