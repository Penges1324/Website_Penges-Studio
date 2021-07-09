var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../libs/config.js');
const fetch = require("node-fetch");

var connection = mysql.createConnection(config.dbOptions);

const userData = {
  ip: '',
  city: '',
  region: '',
  country: ''
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res){
  var username = req.body.username;
	var password = req.body.password;
  
  if(username && password){
    connection.query('SELECT * FROM userLogin WHERE username = ? AND password = ?', [username, password], function(error, results, field){
      if(results != null && results.length > 0){
        req.session.loggedin = true;
        req.session.username = username;

        fetch("https://ipinfo.io/json?token=37f01cead50cf9").then(
          (response) => response.json()
        ).then(
          (jsonResponse) =>{
            userData.ip = jsonResponse['ip'];
            userData.city = jsonResponse['city'];
            userData.region = jsonResponse['region'];
            userData.country = jsonResponse['country']
            connection.query('UPDATE userlogin SET data = ? WHERE username = ?', [JSON.stringify(userData), username], function(error, results, field){
            });
          } 
        )

        res.redirect('/');
      }
      else{
        res.send('Falsche Daten!');
      }
      res.end();
    });
  }
});

module.exports = router;
