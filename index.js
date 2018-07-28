function gumtreeScrape(search){	
	const rp = require('request-promise');
	const cheerio = require('cheerio');
	let all = [];

	const options = {
		url: 'https://www.gumtree.com.au/s-'+search+'/k0?sort=price_desc',
		transform: function (body) {
	    return cheerio.load(body);
	  }
	};
	rp(options)
	  .then(function ($) {
		let first = $('.user-ad-collection--row .user-ad-collection__list-wrapper');
		let child = first.children();
		child.each(function(i, elem) {
			let namePrice = $(this).attr('aria-label');
			let url = $(this).attr('href');
			all.push([namePrice, url]);
		});
		return all;//		console.log(all);
	  });
//	console.log(items);
//	  .catch(function (err) {
//	    console.log(err);
//	  });
//	return items;
}

console.log(gumtreeScrape('2k17'));