var request = require("request"),
	cheerio = require('cheerio'),
	querystring = require('querystring');

const gurl = "https://www.google.com.tw/search?";
const num = 100;

module.exports = {

	option: {
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
		}
	},

	setQuery: function(q,page){

		var op = {num: num,start: (page-1)*num, filter:0};

		if(typeof q == "object") for(var k in q) op[k] = q[k];
		else op.q = q;

		this.option.url = gurl + querystring.stringify(op);
	},


	setHeader: function(header){
		this.option.headers = header;
	},


	search: function(){

		var	q = arguments[0],
			page = arguments[1] || q.page || 1,
			retry = arguments[2] || 3;

		this.setQuery(q,page);

		return new Promise(function(resolve,reject){

			get.call(this,retry);

			function get(retry){
				if(retry){
					request(this.option,function(error, response, body){
						if(error) get.call(this,--retry);
						else {
							var d = this.fetch(cheerio.load(body));
							d.option = this.option;
							return resolve(d);
						}
					}.bind(this));
				}
				else resolve({ data: false, option:option });
			}

		}.bind(this));
	},




	searchAll: function(){

		var q = arguments[0],
			retry = arguments[1] || 3;

		return this.search(q,1,retry).then(function(res){

			var pagenum = res.pagenum,
				promsPool = [],
				Data = {
					data: res.data,
					error: []
				};
				
			for (var i = 2; i <= pagenum; i++) {
				var prom =  this.search(q,i).then(function(res){
					if(res.data) Data.data = Data.data.concat(res.data);
					else Data.error.push(res.option);
					return res;
				})
				promsPool.push(prom);
			}

			return Promise.all(promsPool).then(function(){ return Data; });

		}.bind(this))
	},



	fetch: function($){

		var a = $('.r').children('a'),
			t = $('.st'),
			p = $('#nav').find('td').not('.navend').length;
			d = [];
		a.each(function(i,el){
			var href = $(el).attr('href'),
				tit = $(el).text(),
				des = t.eq(i).text();
			d.push({ title: tit, href: href, des: des });
		});

		return {
			data: d,
			pagenum: p
		};
	},

	pg: function(){ return require('./lib/node-pg-promise'); }

};
