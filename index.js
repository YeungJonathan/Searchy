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

	let first = $('.user-ad-collection--row .user-ad-collection__list-wrapper');
	let child = first.children();
	items = [];
	child.each(function(i, elem) {
		let namePrice = $(this).attr('aria-label');
		let url = $(this).attr('href');
		items.push([namePrice, url]);
	});	
	console.log(items);
  })
  .catch(function (err) {
    console.log(err);
  });