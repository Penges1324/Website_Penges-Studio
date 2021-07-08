var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
  port     : '3306',
	user     : 'pengesst',
	password : 'Pesa!739',
	database : 'pengesst_'
});

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
        res.redirect('/users');
      }
      else{
        res.send('error:' + error + ' res: ' + results + ' field: ' + field);
      }
      res.end();
    });
  }
});

module.exports = router;
