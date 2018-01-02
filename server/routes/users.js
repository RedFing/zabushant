var express = require('express');
var router = express.Router();
var models  = require('../models');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/:id', function (req,res,next) {
    console.log(req.params);
    const  {id}  = req.params;
    models.User.findById(id)
        .then(user => {
            const rUser = user.get({ plain: true });
            res.send(rUser);
        })
        .catch(err => {
            res.status(404);
            res.send("User not found");
        });
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
