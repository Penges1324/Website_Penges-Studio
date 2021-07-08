var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost:3306',
	user     : 'pengesst_',
	password : 'Pesa!739',
	database : 'login'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res){
  var username = req.body.username;
	var password = req.body.password;

  if(username && password){
    connection.query('SELECT * FROM userlogin WHERE username = ? AND password = ?', [username, password], function(error, results, field){
      if(results.length > 0){
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/users');
      }
      else{
        res.send('Falsche Daten!');
      }
      res.end();
    });
  }
});

module.exports = router;
