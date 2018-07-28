let memes = [];
let all = [];


const rp = require('request-promise');
const cheerio = require('cheerio');
function gumtreeScrape(search){	
	const options = {
		uri: 'https://www.gumtree.com.au/s-'+search+'/k0?sort=price_desc',
		transform: function (body) {
	    return cheerio.load(body);
	  }
	};
	
	return rp(options)
	  .then(function ($) {
		let first = $('.user-ad-collection--row .user-ad-collection__list-wrapper');
		let child = first.children();
		child.each(function(i, elem) {
			let namePrice = $(this).attr('aria-label');
			let url = $(this).attr('href');
			if(namePrice != undefined && url != undefined){
				all.push([namePrice, url])};
		return JSON.parse($.all);
	  })
	
	  .catch(function (err) {
	    console.log(err);
	  }).finally(function() {
		
		return all;
	});
});

memes = (gumtreeScrape('2k17'));
console.log(memes);