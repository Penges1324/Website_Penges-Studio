var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../libs/config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedin){
    connection.query('SELECT * FROM game', function(error, results, field){
      if(results != null && results.length > 0){
        res.send(results);
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

module.exports = router;
