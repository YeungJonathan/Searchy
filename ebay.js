var express = require('express');
var app = express();
var request = require('request');
var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

app.get("/", function(req, res){
	var url = "http://svcs.ebay.com/services/search/FindingService/v1";
	url += "?OPERATION-NAME=findItemsByKeywords";
	url += "&SERVICE-VERSION=1.0.0";
	url += "&SECURITY-APPNAME=ZainShro-unihack-PRD-3b1d2c993-833e8ddf";
	url += "&GLOBAL-ID=EBAY-AU";
	url += "&RESPONSE-DATA-FORMAT=JSON";
	url += "&callback=_cb_findItemsByKeywords";
	url += "&REST-PAYLOAD";
	url += "&keywords=PS4";


	request(url, function(error, response, body){
		if(response.statusCode == 200 && !error){
			
			var data = body;
			console.log(data);
		}	

		else{
			console.log("error occured, code:" + error)
			console.log("statusCode" + response.statusCode)
		}
	})
	console.log(url);
})



app.listen(port, hostname, function(){
	console.log("Server has started")
})