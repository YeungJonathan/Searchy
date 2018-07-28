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
app.get('/results', function(req,res){
	var searchitem = req.query.search;

	// console.log(searchitem)
	var url = "http://svcs.ebay.com/services/search/FindingService/v1";
	url += "?OPERATION-NAME=findItemsByKeywords";
	url += "&SERVICE-VERSION=1.0.0";
	url += "&SECURITY-APPNAME=ZainShro-unihack-PRD-3b1d2c993-833e8ddf";
	url += "&GLOBAL-ID=EBAY-AU";
	url += "&RESPONSE-DATA-FORMAT=JSON";
	url += "&callback=_cb_findItemsByKeywords";
	url += "&REST-PAYLOAD";
	url += "&keywords=searchitem";
    // url += "&paginationInput.entriesPerPage=3";

    request(url, function(error, response, body){
    	if(response.statusCode == 200 && !error){
    			// var data = JSON.parse(body)
    			res.render('results')
    		}

    		else{
    			console.log("error occured, code:" + error)
    			console.log("statusCode" + response.statusCode)
    		}
    	})
})
app.listen(port, hostname, function(){
	console.log("Server has started")
})