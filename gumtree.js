const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = {
	
	gumtreeSearch: function(searchItem, filterType, callback) {
		var filters = ['/k0?sort=price_desc','/k0?sort=price_asc','/k0','/k0?sort=rank'];
		const items = [];
		const filtered = [];
		const options = {
			uri: ('https://www.gumtree.com.au/s-' + searchItem + filters[filterType]),
			transform: function (body) {
			return cheerio.load(body);
			}
		};

		rp(options)
			.then(function($) {
			let first = $('.user-ad-collection--row .user-ad-collection__list-wrapper').children();
			first.each(function(i, elem) {
				let namePrice = $(this).attr('aria-label');
				let url = $(this).attr('href');
				if(namePrice != undefined && url != undefined) items.push([namePrice, url]);
			});
			
			for (let i = 0; i < 5; i++) {
				let tmp = [];
				a = result[i];
				b = a[0].split("\n");
				tmp.push(b[0]);
				tmp.push(b[1].slice(6, b[1].length));
				tmp.push("https://www.gumtree.com.au" + a[1]);
				filtered.push(tmp);
			}
			
			callback(filtered);
			})
			.catch(function (err) {
				console.log(err);
			});
	}
}