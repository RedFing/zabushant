var express = require('express');
var router = express.Router();
var models = require('../models');
var loginController = require('../controllers/loginController');

// TODO: generate token
const TOKEN = '12345';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', loginController.post());
router.post('/login2', function (req,res,next) {
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
       res.send({ token: TOKEN });
   }).catch(err => res.send('err'));
});
router.post('/register', function (req,res,next) {
   const { username, email, password, confirmpassword } = req.body;
   // TODO better validation
   if ( !username || !password || ! email || !confirmpassword || password!==confirmpassword ){
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
          res.send({ status: 'OK'});
      })
      .catch(err =>{
          res.status(400);
          res.send({ err: 'Bad register'})
      });

});

router.get('/message', function (req,res,next) {
 res.send({ status: 'OK'});
});
module.exports = router;
