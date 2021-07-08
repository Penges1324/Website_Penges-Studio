var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  if(req.session.loggedin){
    res.send('Willkommen: ' + req.session.username)
  }
  else
    res.redirect('login');
});

module.exports = router;
