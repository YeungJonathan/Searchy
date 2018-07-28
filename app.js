var express = require('express');
var app = express();
var request = require('request');
var http = require('http');
const rp = require('request-promise');
const cheerio = require('cheerio');

var hostname = '127.0.0.1';
var port = 8080;


function gumtreeSearch(searchItem, filterType, callback) {
	var filters = ['/k0?sort=price_desc','/k0?sort=price_asc','/k0','/k0?sort=rank'];
	const items = [];
	const options = {
		uri: ('https://www.gumtree.com.au/s-' + searchItem + filters[filterType]),
		transform: function (body) {
			return cheerio.load(body);
		}
	};

	rp(options)
	.then(function($) {
		/* let link = $('.a-m-us a-aui_149818-c a-aui_152852-c a-aui_51744-c a-aui_57326-c a-aui_72554-c a-aui_accessibility_49860-c a-aui_attr_validations_1_51371-c a-aui_bolt_62845-c a-aui_perf_130093-c a-aui_tnr_140932-c a-aui_ux_113788-c a-aui_ux_114039-c a-aui_ux_138741-c a-aui_ux_145937-c a-aui_ux_59374-c a-aui_ux_60000-c a-meter-animate'.'#a-page'.'#search-main-wrapper'.'#main'.'#searchTemplate'.'#rightContainerATF'.'#rightResultsATF'.'#resultsCol'.'#centerMinus'.'#atfResults'.'#s-results-list-atf'.'#result_0'.'.s-item-container'.'.a-fixed-left-grid-inner'.'.a-fixed-left-grid-col a-col-left'.'.a-row'.'.a-column a-span12 a-text-center'.'.a-link-normal a-text-normal').attr('href'); */
		let first = $('.user-ad-collection--row .user-ad-collection__list-wrapper').children();
		//let child = first.children();
		first.each(function(i, elem) {
			let namePrice = $(this).attr('aria-label');
			let url = $(this).attr('href');
			if(namePrice != undefined && url != undefined) items.push([namePrice, url]);
		});
		callback(items);
		})/* 
		.then(function(rp) {
			console.log('third');
			return items;
		}) */
		.catch(function (err) {
			console.log(err);
		});
	}


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
    			gumtreeSearch(searchitem, 1, function(result) {
    				if(result != undefined ) {
    					console.log(result);
    					res.render('results', {result:result});
    				}
    			});
    			
    		}

    		else{
    			console.log("error occured, code:" + error)
    			console.log("statusCode" + response.statusCode)
    		}
    	})

})


	app.get('/graph', function(req, res){
		res.render('graph')
	})
	app.listen(port, hostname, function(){
		console.log("Server has started")
	})
