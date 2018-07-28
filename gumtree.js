const rp = require('request-promise');
const cheerio = require('cheerio');
let memes = [];
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

gumtreeSearch('ps4', 1, function(result) {
	memes = result;
	console.log(memes);
});