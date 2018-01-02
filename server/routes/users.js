var express = require('express');
var router = express.Router();
var models  = require('../models');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', function(req,res,next){
  const { username, email, password } = req.body;
  models.User.create({ username, email, password })
      .then((user) => {
        console.log('user created with id: ', user.get('id'));
        res.send({ status: 'OK'});
      })
      .catch(err => res.send({ status: 'ERROR'}));
});
module.exports = router;
