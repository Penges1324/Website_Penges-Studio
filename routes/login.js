var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../libs/config.js');

/*var connection = mysql.createConnection({
	host     : 'localhost',
  port     : '3306',
	user     : 'pengesst',
	password : 'Pesa!739',
	database : 'pengesst_'
});*/

var connection = mysql.createConnection(config.dbOptions);

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
