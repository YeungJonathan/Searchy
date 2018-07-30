var express = require('express');
var app = express();
var request = require('request');
var http = require('http');

/* var hostname = '127.0.0.1';
var port = 3000;
var items = []; */

module.exports = {

	ebaySearch: function(key, callback){
		
		var url = "http://svcs.ebay.com/services/search/FindingService/v1";
		url += "?OPERATION-NAME=findItemsByKeywords";
		url += "&SERVICE-VERSION=1.0.0";
		url += "&SECURITY-APPNAME=ZainShro-unihack-PRD-3b1d2c993-833e8ddf";
		url += "&GLOBAL-ID=EBAY-AU";
		url += "&RESPONSE-DATA-FORMAT=JSON";
		url += "&callback=_cb_findItemsByKeywords";
		url += "&REST-PAYLOAD";
		url += "&keywords="+key;
		request(url, function(error, response, body){
			if(response.statusCode == 200 && !error){
				
				var temp = [];
				var data = body;
	//			console.log(data);
				var a = data.split("itemId");
	//			console.log(a[1]);
				
				for (var itemNo = 1; itemNo<6;itemNo++){
					
				var index = 29;
				var name = "";
				while (a[itemNo][index]!="]"){
					name+=a[itemNo][index];
					index+=1;
				}
				name = name.slice(0,name.length-1);
				
				var galleryURL = "";
				var galleryFound = false;
				while (galleryFound != true){
					if (a[itemNo][index] == 'g'){
						index+=1;
						if (a[itemNo][index] == 'a'){
							index+=1;
							if (a[itemNo][index] == 'l'){
								index+=1;
								if (a[itemNo][index] == 'l'){
									index+=1;
									if (a[itemNo][index] == 'e'){
										index+=1;
										if (a[itemNo][index] == 'r'){
											index+=1;
											if (a[itemNo][index] == 'y'){
												index+=1;
												if (a[itemNo][index] == 'U'){
													index+=1;
													if (a[itemNo][index] == 'R'){
														index+=1;
														if (a[itemNo][index] == 'L'){
															index+=4;
															galleryFound=true;
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					index+=1;
				};
				
				while (a[itemNo][index]!="]"){
					galleryURL+=a[itemNo][index];
					index+=1;
				}
				galleryURL = galleryURL.slice(0,galleryURL.length-1);
				
				var viewItemURL = '';
				var viewItemURLFound = false;
				while (viewItemURLFound != true){
					if (a[itemNo][index] == 'v'){
						index+=1;
						if (a[itemNo][index] == 'i'){
							index+=1;
							if (a[itemNo][index] == 'e'){
								index+=1;
								if (a[itemNo][index] == 'w'){
									index+=1;
									if (a[itemNo][index] == 'I'){
										index+=1;
										if (a[itemNo][index] == 't'){
											index+=1;
											if (a[itemNo][index] == 'e'){
												index+=1;
												if (a[itemNo][index] == 'm'){
													index+=1;
													if (a[itemNo][index] == 'U'){
														index+=1;
														if (a[itemNo][index]=='R'){
															index+= 1;
															if (a[itemNo][index] == 'L'){
																index+=4;
																viewItemURLFound=true;
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					index+=1;
				};
				
				while (a[itemNo][index]!="]"){
					viewItemURL+=a[itemNo][index];
					index+=1;
				}
				
				viewItemURL= viewItemURL.slice(0,viewItemURL.length-1)
				
				var price = 0;
				var priceFound = false;
				while (priceFound != true){
					if (a[itemNo][index] == 'c'){
						index+=1;
						if (a[itemNo][index] == 'o'){
							index+=1;
							if (a[itemNo][index] == 'n'){
								index+=1;
								if (a[itemNo][index] == 'v'){
									index+=1;
									if (a[itemNo][index] == 'e'){
										index+=1;
										if (a[itemNo][index] == 'r'){
											index+=1;
											if (a[itemNo][index] == 't'){
												index+=1;
												if (a[itemNo][index] == 'e'){
													index+=1;
													if (a[itemNo][index] == 'd'){
															index+=49;
															priceFound=true;														
															}
														}
													}
												}
											}
										}
									}
								}
							}
					index+=1;
				};

				while (a[itemNo][index]!="]"){
					price+=a[itemNo][index];
					index+=1;
				};
				price = price.slice(0,price.length-2);
	//			console.log(price);
				
				items.push([name, galleryURL,viewItemURL,price]);
				}
	//			console.log(items);
				callback(items);
				
			}	
			else{
				console.log("error occured, code:" + error)
				console.log("statusCode" + response.statusCode)
			}
		})
	//	console.log(url);
	}
}