var express = require('express');
var router = express.Router();
var models = require('../models');
// TODO: generate token
const TOKEN = '12345';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function (req,res,next) {
   const { username, password} = req.body;
   if (!username || !password) {
     res.status(400);
     res.send({
       err: 'Bad login'
     });
     return;
   }
   // TODO: encrypt pw
   models.User.findOne({
       where: { username, password },
       attributes: ['id', 'username']
   }).then(user => {
       console.log(user);
       res.send({ token: TOKEN });
   }).catch(err => res.send('err'));
});
router.post('/register', function (req,res,next) {
   const { username, email, password, confirmpassword } = req.body;
   // TODO better validation
   ifwa ( !username || !password || ! email || !confirmpassword || password!==confirmpassword ){
     res.status(400);
     res.send({
       err: 'Bad register'
     });
     return;
   }

   //TODO add encryption
   //TODO better error handling
   models.User.create({ username, email, password })
      .then((user) => {
          console.log('user created with id: ', user.get('id'));
          res.send({ status: 'OK'});
      })
      .catch(err =>{
          res.status(400);
          res.send({ err: 'Bad register'})
      });

});


module.exports = router;
