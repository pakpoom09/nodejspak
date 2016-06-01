var request = require("request");
var app = require('express')();
var bodyParser = require('body-parser');

var port = process.env.PORT || 7777;
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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
/*
async.map(entries, function(entry, cb) {
  http.get(options, function(res) {
    // call cb here, first argument is the error or null, second one is the result
  })
}, function(err, res) {
  // this gets called when all requests are complete
  // res is an array with the results
}
*/


app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});
