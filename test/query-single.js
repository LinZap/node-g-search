var g = require("../index"),
	db = g.pg();


db.connect({
	user:'postgres',
	password: 'postgres',
	host: 'localhost',
	dbname: 'gsearch_zap'
})


.then(function(client){

	return db.query('select ?::int+?::int as ans',[10,20])
	.then(function(res){
		console.log(res.rows[0].ans);
		return res.rows[0].ans;
	},function(err){
		console.log('%s',err);
	})
})


.then(function(){
	db.close();
})
