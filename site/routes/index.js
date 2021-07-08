var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const t = {
  id: 0,
  pw: '',
  name: ''
}


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  if(req.session.loggedin){
    t.name = req.session.username;
  }
  res.render('index', {t});  
});

module.exports = router;
