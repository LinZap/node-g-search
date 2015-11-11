# Node Google Search Crawler

[![Join the chat at https://gitter.im/LinZap/node-g-search](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/LinZap/node-g-search?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Node Google Search Crawler

## Introduction
```js
var g = require('node-g-search');

g.search("bon jovi")
.then(function(d){
	
	if(d.data)
		for (var i = 0; i < d.data.length; i++) {
			console.log(d.data[i].title);
			console.log(d.data[i].href);
			console.log(d.data[i].des);
		}
})

```

## Installation

	npm install --save node-g-search


## Search API

### g.search(q[,page[,retry]])

### g.searchAll(q[,retry])

### g.pg()
 
 
## Connect to PostgreSQL
[node-postgres](https://github.com/brianc/node-postgres) built-in
and complete access layer to node-postgres via Promises/A+.

```js
var g = require('node-g-search'),
    db = g.pg();

var p = db.connect({
	user:'user',
	password: 'pwd',
	host: 'localhost',
	dbname: 'dbname'
})

.then(function(res){
	console.log(res.rows[0].ans);
	return res.rows[0].ans;
},function(err){
	console.log('%s',err);
})

```
  
   
  
  
  
## Pg Client API

### db.connect(option)
```js
{
	user:'user',
	password: 'pwd',
	host: 'localhost',
	dbname: 'dbname'
}
```
  
### db.query(sql [,params]) 
use [Prepared Statements](https://github.com/brianc/node-postgres/wiki/Prepared-Statements)   
`$1`,`$2`or`?` 
return  Promise<[result](https://github.com/brianc/node-postgres/wiki/Query#result-object)> object
  
```sql
	 select * from table where id=?
```
  
### db.queryIgnore(sql [,params [,retry]]) 
  
 
### db.close()

