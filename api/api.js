var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.post('/register',function(req,res){
    console.log('Register Called');
    //var name1 = console.log(req.body.name);
        if (!req.body) return res.sendStatus(400)
  res.send('welcome' + JSON.stringify(req.body.name));
})

var server = app.listen(3000,function(){
    console.log('api listening on ', server.address().port);
})