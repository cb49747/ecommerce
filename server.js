var express = require('express');
var morgan = require('morgan');

var app = express();

// Middleware
app.use(morgan('dev'));

app.get('/', function(req, res) {
	var name = "Chris";
	res.json("My Name is " + name);
});

app.get('/catname', function(req, res) {
	var name = "Millie";
	res.json("My Cat's Name is " + name);
});

app.listen(3000, function(err) {
	if (err) throw err;
	console.log("Server is Running");
});
