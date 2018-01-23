var express = require('express');
var router = express.Router();
var models  = require('../models');
var auth = require('../util/auth');
const userQueries = require('../queries/userQueries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// FIXME: this should be a protected route
router.get('/:id', function (req,res,next) {
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
  if (!username || !email || !password) {
      res.status(400).send({ err: 'Bad register'});
      return;
  }
  const encryptedPassword = auth.hashPassword(password);
  models.User.create({ username, email, password: encryptedPassword })
      .then((user) => {
          userQueries.createDirectMessageChannelForMyself(user.id, user.username).then();
        res.send({ status: 'OK'});
      })
      .catch(err => res.status(400).send({ err: 'Bad register.'}));
});
module.exports = router;
