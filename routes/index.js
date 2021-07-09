var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../libs/config.js');

var connection = mysql.createConnection(config.dbOptions);

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedin){
    connection.query('SELECT * FROM games', function(error, results, field){
      if(results != null && results.length > 0){
        res.render('', {results});
      }
      else{
        res.send('Keine Spiele vorhanden!');
      }
      res.end();
    });
  }
  else
    res.redirect('login');
});

router.post('/', function(req, res){
  req.session.destroy(null); 
  res.redirect('login');
});

module.exports = router;
