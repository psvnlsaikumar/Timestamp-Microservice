// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//https://timestamp-generator.glitch.me/api/timestamp/2015-12-25

app.get('/api/timestamp', function(req, res, next){
    res.json({"unix": Date.now(),
              "utc": new Date().toUTCString()
               })
});

app.get('/api/timestamp/:date_string', function(req, res, next){
    let date_string = req.params.date_string;
    let date_in_utc = new Date(date_string).toUTCString();
    let date_in_unix = new Date(date_string).getTime();

  
    if (/\d{5,}/.test(date_string)) {
    var dateInt = parseInt(date_string);
    res.json({ unix: date_string, utc: new Date(dateInt).toUTCString() });
  }
  
  if(date_in_utc == "Invalid Date"){
    res.json({"error":"Invalid Date"});
  }else{
     res.json({"unix": date_in_unix,
     "utc": date_in_utc});
  }   
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});