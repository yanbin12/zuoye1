const express = require('express');
const bodyparse = require('body-parser');
const app=express();
const  mysql=require('mysql');

app.use(bodyparse.urlencoded({}));
const pool=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'yanbin',
	database:'user',
	host:3306
})
app.get('/',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')

	pool.getConnection((err,con)=>{
		if(err) throw err;
		con.query('SELECT * FROM journ',(err,rows)=>{
			res.send(rows)
		})
	})

})
app.get('/dele',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')

	pool.getConnection((err,con)=>{
		if(err) throw err;
		var  uid=req.query.id;
		con.query('DELETE  FROM journ WHERE id='+uid,(err)=>{
			if(err) throw err
		})
	})

})
app.post('',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')

	pool.getConnection((err,con)=>{
		if(err) throw err;
		var  uid=req.body.id;
		var  sval=req.body.val
		con.query("INSERT INTO journ ('name','val')  VALUES ("+uid+","+sval+')',(err)=>{
			if(err) throw err
		})
	})

})
app.listen(8000,(e)=>{
	console.log('启动。。。')
})