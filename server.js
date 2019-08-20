const express = require('express')
const app = express()
const port = 3000

//body parser
let body_parser = require('body-parser')
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
//body parser

//mysql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
	host	 	: 'localhost',
	user	 	: 'root',
	password	: '',
	database	: 'belajar_express'
});

connection.connect();



let data = [{
		'name': 'Intan',
		'email': 'email@mail.com',
		'phone': '0879685747'
	},
	{
		'name': 'Maharani',
		'email': 'mail@mail.com',
		'phone': '0815722892'
	}]

app.get('/', (req, res) => res.send('Hello World'))

app.get('/logs', (req, res) =>{
	console.log('open  page logs');
	res.send('');
});

app.get('/user', (req, res) => {
	if(req.params.id>data.length-1){
		res.send(404);
	}else{
		res.sen(data[reg.params.id], 200);
	}
})

app.post('/user', (req, res)=>{
	var response = {
		'name':req.body.name,
		'email':req.body.email,
		'phone':req.body.phone
	}
	data.push(response);

	res.send(response, 201);
})

app.put('/user', (req, res)=>{
	var response = {
		'name':req.body.name,
		'email':req.body.email,
		'phone':req.body.phone
	}

	data[req.params.id] = response;

	res.send(response, 200);
})
app.delete('/user', (req, res)=>{
	
	data.splice(req.params.id, 1);

	res.send(response, 204);

})


//crud mysql
app.get('/v2/user', (req,res)=>{
	
	connection.query('SELECT * FROM users',function(error, results){
		if(error) throw error;

		res.send(result, 200);
	})
})

app.get('v2/user/:id', (req,res)=>{
	var id = req.params.id;
	connection.query('SELECT * FROM users WHERE id = ?', [id],
		function(error, results){
			if(results.length>0){
				res.send(results[0], 200);
			}else{
				res.send(404);
			}
		})
})
app.post('/v2/user', (req,res)=>{
	var data = {
		name:req.body.name,
		email:req.body.email,
		phone:req.body.phone
	}
	connection.query('INSERT INTO users ('name, email, phone') VALUES (?,?,?)',
		[data.name, data.email,data.phone],
		function(error, results){
			if(error) throw error;
		}
	)
})

ap.put('/v2/user/:id',(req,res)=>{
	var data = {
		name:req.body.name,
		email:req.body.email,
		phone:req.body.phone
	}
	connection.query('UPDATE users SET name=?, email=?, phone=? WHERE id=?',
			[data.name, data.email, data.phone, id],
			function(error, results){
				if(error) thriw error;
				var changedRows = results.changedRows;
				if(changedRos>0){
					data.id = id;
					res.send(data, 200);
				}else{
					res.send(404);
				}
			})
})

app.delet('v2/user/:id', (req,res)=>{
	var id = req.params.id;

	connection.query('DELETE FROM user WHERE id = ?', [id],
		function(error, results){
			if(error) throw error;

			if(results.affectedRows>0){
				res.send(204)
			}else{
				res.send(404)
			}
		})
})

app.get('/error-server', (req, res)=>{
	res.send(500);
})

app.get('/bad-request', (req, res)=>{
	res.send(400)
})

app.get('/created', (req, res)=>{
	res.send(201);
})

app.listen(port, () => console.log('Example app listening on port ${port}!'))
