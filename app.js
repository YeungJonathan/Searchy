var express = require('express');
var app = express();
var request = require('request');
var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

app.set('view engine', 'ejs')

app.get('/', function(req, res){
	res.render('search');
})

app.listen(port, hostname, function(){
	console.log("Server has started")
})
