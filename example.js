var g = require('./index.js'),
	url = require('url'),
	db = g.pg;

var keyword = "超現實主義";

var p = db.connect({
	user:'postgres',
	password: 'postgres',
	host: 'localhost',
	dbname: 'gsearch_zap'
})


.then(function(){
	return db.query('select insertclass(?,?) as cid',[1,keyword])
	.then(function(res){
		console.log(res.rows[0].cid);
		return res.rows[0].cid;
	})
})


.then(function(cid){


	return g.searchAll(keyword,2)
	.then(function(d){

		var proPool = [];

		d.data.forEach(function(item){
			var href = item.href,
				tit = item.title,
				des = item.des;

			proPool.push(inserturl2(cid,tit,des,href));
		})

		d.error.forEach(function(err){
			console.log(err);
		})

		return Promise.all(proPool);
	})

})


.then(function(){
	db.close();
})



/*
inserturl2(
_cid int,
_tit varchar,
_des varchar,
_url varchar,
_scheme varchar,
_host varchar,
_path varchar,
_query varchar)
*/
function inserturl2(_cid,_tit,_des,_url){

	var u = url.parse(_url),
		_scheme = u.protocol.replace(':',''),
		_host = u.host,
		_path = u.path,
		_query = u.query,
		params = [_cid,_tit,_des,_url,_scheme,_host,_path,_query];


	return db.queryIgnore('select inserturl2(?,?,?,?,?,?,?,?)',params)
	.then(function(res){
		return res;
	});
}