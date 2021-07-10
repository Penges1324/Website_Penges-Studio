var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const { setConstantValue } = require('typescript');
var config = require('../libs/config.js');

var connection = mysql.createConnection(config.dbOptions);

var userData = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  userData = [];
  if(req.session.loggedin){
    //#region Get Userdata
    connection.query('SELECT * FROM userdata WHERE username = ?', [req.session.username], function(error, results, field){
      if(results != null && results.length > 0){
        StoreUserData(JSON.parse(JSON.stringify(results[0])));
      }
    });
    //#endregion
    //#region Get Games
    connection.query('SELECT * FROM games', function(error, results, field){
      if(results != null && results.length > 0){
        res.render('', {results, userData});
      }
      else{
        res.send('Keine Spiele vorhanden!');
      }
      res.end();
    });
    //#endregion
  }
  else
    res.redirect('login');
});

router.get('/coolesSpiel', function(req, res){
  res.redirect('/');
});

router.get('/nochGeiler', function(req, res){
  res.redirect('/');
});

router.post('/', function(req, res){
  req.session.destroy(null); 
  res.redirect('login');
});

function StoreUserData(value){
  userData = value;
  //console.log(userData);
}

module.exports = router;
