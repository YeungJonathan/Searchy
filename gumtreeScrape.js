function gumtreeScrape(searchItem,filter){	
	
	var items = [];
	
	filterType = {cheapest:"/k0?sort=price_asc", expensive: "/k0?sort=price_desc", bestMatch:"/k0?sort=rank", mostRecent:"/k0" }
	filterChoice = filterType.filter;
	document = "https://www.gumtree.com.au/s-" + searchItem + filterChoice;
	var resourceContainer = document.getElementsByClassName("panel-body panel-body--flat-panel-shadow user-ad-collection__list-wrapper");
	
	for (i = 0; i < 5; i++){
		var name = resourceContainer[i].getElementsByClassName("user-ad-row__title").innerText;
		var img = resourceContainer[i].getElementsByClassName("user-ad-row__image image image--is-visible").src;
		var desc = resourceContainer[i].getElementsByClassName("user-ad-row__description user-ad-row__description--regular").innerTet;
		var url = "https://www.gumtree.com.au/" + resourceContainer[i].querySelector("a").href;
		
		items.push([name, img, desc, url]);
		
	}		
	
	
}

//var request = require('request');
//var cheerio = require('cheerio');
//request('https://www.gumtree.com.au/s-2k17/k0?sort=price_desc', function (error, response, html) {
//	if (!error && response.statusCode == 200) {
//		var $ = cheerio.load(html);
//		$('p.user-ad-row__title').each(function(i,element){
//			var a = $(this).prev();
//			console.log(a.text());
//		})
//}
//});