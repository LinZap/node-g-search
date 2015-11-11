'use strict';

var pg = require('pg'),
	util = require('util');

module.exports = {

	connect: function(opt){
		//postgres://user:password@host:port/database
		var connStr = "postgres://"+opt.user+":"+opt.password+"@"+opt.host;
			connStr+= ":"+(opt.port||5432)+"/"+opt.dbname;

		if(this.client) pg.end();

		return new Promise(function(resolve,reject){
			
			pg.connect(connStr,function(err, client, done) {

				// can not handle err, throw err
				if(err){ console.error("%s",err); return; }
				this.client = client;
				this.done = done;
				resolve(client);

			}.bind(this));
		}.bind(this));
	},

	query: function(){
		var sql = this.transformSQL(arguments[0]),
			params = arguments[1] || [];
		return new Promise(function(resolve,reject){
		
			this.client.query(sql, params, function(err,result){
				if(err) return reject(err);
				resolve(result);
			})

		}.bind(this))
	},


	// only reslove
	queryIgnore: function(){
		var sql = this.transformSQL(arguments[0]),
			params = arguments[1] || [],
			retry = arguments[2] || 3;

		return new Promise(function(resolve,reject){

			q.call(this,retry);
			
			function q(retry){
				if(retry){
					this.client.query(sql, params, function(err,result){
						if(err) q.call(this,--retry);
						else resolve(result);
					})
				}else resolve(false);	
			}
		}.bind(this))
	},

	close: function(){
		if(this.done) this.done();
		if(this.client) pg.end();
	},

	transformSQL: function(sql){
		var str = "",
			number = 0;
		for (var i = 0; i < sql.length; i++) 
			if(sql[i]=='?') str += "$"+(++number);
			else str += sql[i];
		return str;
	}

};