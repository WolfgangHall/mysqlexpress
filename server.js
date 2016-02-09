var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'coolness_db'
});

var PORT = process.env.PORT || 3000;

app.get("/cast", function(req, res){
    connection.query('SELECT name, id FROM coolChart ORDER by ID;', function(err, data){
        if (err) throw err;

        res.send(data);
    })
});

app.get("/coolness-chart", function(req, res){
    connection.query('SELECT name FROM coolChart ORDER by coolness_points ASC;', function(err, data){
        if (err) throw err;

        res.send(data);
    });
});

app.get("/attitude-chart/:type", function(req, res){

    var inputType = req.params.type;

    connection.query('Select name FROM coolChart WHERE attitude =?', inputType, function(err, data){
        if (err) throw err;

        res.send(data);
    });
});

app.listen(PORT, function(){
    console.log("Listening on port %s", PORT);
});