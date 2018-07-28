const rp = require('request-promise');
const cheerio = require('cheerio');


const options = {
	uri: `https://www.gumtree.com.au/s-2k17/k0?sort=price_desc`,
	transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(function ($) {
	/* let link = $('.a-m-us a-aui_149818-c a-aui_152852-c a-aui_51744-c a-aui_57326-c a-aui_72554-c a-aui_accessibility_49860-c a-aui_attr_validations_1_51371-c a-aui_bolt_62845-c a-aui_perf_130093-c a-aui_tnr_140932-c a-aui_ux_113788-c a-aui_ux_114039-c a-aui_ux_138741-c a-aui_ux_145937-c a-aui_ux_59374-c a-aui_ux_60000-c a-meter-animate'.'#a-page'.'#search-main-wrapper'.'#main'.'#searchTemplate'.'#rightContainerATF'.'#rightResultsATF'.'#resultsCol'.'#centerMinus'.'#atfResults'.'#s-results-list-atf'.'#result_0'.'.s-item-container'.'.a-fixed-left-grid-inner'.'.a-fixed-left-grid-col a-col-left'.'.a-row'.'.a-column a-span12 a-text-center'.'.a-link-normal a-text-normal').attr('href'); */
	let first = $('.user-ad-collection--row .user-ad-collection__list-wrapper');
	//console.log(first);
	let child = first.children();
	items = [];
	child.each(function(i, elem) {
		let namePrice = $(this).attr('aria-label');
		let url = $(this).attr('href');
		//let img = child[i].attr('');
		items.push([namePrice, url]);
	});	
	console.log(items);
	//let second = $('.user-ad-row link link--base-color-inherit link--hover-color-none link--no-underline').html();
	//console.log(second);
	/* const objects = [];
	$('.search-results-page__user-ad-wrapper').each(function(i, elem) {
		objects[i] = $(this).attr('aria-label');
	})
	console.log(objects); */
  })
  .catch(function (err) {
    console.log(err);
  });
  
/* request(url, function (error, response, body) {
      if (error){
          return
      }else{
          const $ = cheerio.load(body);
          let link = $('.a-m-us a-aui_149818-c a-aui_152852-c a-aui_51744-c a-aui_57326-c a-aui_72554-c a-aui_accessibility_49860-c a-aui_attr_validations_1_51371-c a-aui_bolt_62845-c a-aui_perf_130093-c a-aui_tnr_140932-c a-aui_ux_113788-c a-aui_ux_114039-c a-aui_ux_138741-c a-aui_ux_145937-c a-aui_ux_59374-c a-aui_ux_60000-c a-meter-animate').find('#a-page').find('#search-main-wrapper').find('#main').find('#searchTemplate').find('#rightContainerATF').find('#rightResultsATF').find('#resultsCol').find('#centerMinus').find('#atfResults').find('#s-results-list-atf').find('#result_0').find('.s-item-container').find('.a-fixed-left-grid-inner').find('.a-fixed-left-grid-col a-col-left').find('.a-row').find('.a-column a-span12 a-text-center').find('.a-link-normal a-text-normal').attr('href');
      }
    });   */
	
/* function gumtreeScrape(searchItem,filter){	
	
	let items = [];
	
	filterType = {cheapest:"/k0?sort=price_asc", expensive: "/k0?sort=price_desc", bestMatch:"/k0?sort=rank", mostRecent:"/k0" }
	filterChoice = filterType.filter;
	document = "https://www.gumtree.com.au/s-" + searchItem + filterChoice;
	let resourceContainer = document.getElementsByClassName("panel-body panel-body--flat-panel-shadow user-ad-collection__list-wrapper");
	
	for (i = 0; i < 5; i++){
		let name = resourceContainer[i].getElementsByClassName("user-ad-row__title").innerText;
		let img = resourceContainer[i].getElementsByClassName("user-ad-row__image image image--is-visible").src;
		let desc = resourceContainer[i].getElementsByClassName("user-ad-row_description user-ad-row_description--regular").innerTet;
		let url = "https://www.gumtree.com.au/" + resourceContainer[i].querySelector("a").href;
		
		items.push([name, img, desc, url]);
		
	}		
	
	console.log(items)
}

gumtreeScrape('fifa18', 'minimum'); */