var g = require("../index"),
	db = g.pg();


db.connect({
	user:'postgres',
	password: 'postgres',
	host: 'localhost',
	dbname: 'gsearch_zap'
})


.then(function(client){
	return db.query('select now() as now')
	.then(function(res){
		console.log(res.rows[0].now);
	})
})


.then(function(){
	db.close();
})
