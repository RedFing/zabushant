var express = require('express');
var router = express.Router();
var models = require('../models');
var loginController = require('../controllers/loginController');
var auth = require('../util/auth');
var crypto = require('crypto');
var mailService = require('../util/mailService');
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


router.post('/checkresetpassword/', function (req,res,next) {
    console.log('uso u reset');
    const token = req.body.token;
    console.log('TOKENNN', token);
    models.Token.findOne({
        where: { tokenValue: token}
    }).then(tokenObj => {
        if (!tokenObj){
            res.status(400).send({ err: 'Bad request'});
        }else{
            res.send({ status: 'OK'});
        }
    }).catch(err => {
        res.status(400).send({ err: 'Bad request'});
    })
});



router.get('/message', function (req,res,next) {
 res.send({ status: 'OK'});
});
// TODO extract randomBytes fn to util/auth
router.post('/forgot-password', function (req,res,next) {
    console.log('TESST');
    console.log(req.body);
   let { email } = req.body;
   if (!email) {
       res.status(400).send({err: 'Bad request'});
       return;
    }
    console.log('EMAIL', email);

    models.User.findOne({
        where: {email}
    }).then(user =>{
        const tokenValue= crypto.randomBytes(32).toString('hex');
        return models.Token.create({ tokenValue, email})}
    ).then(token => {
        const tokenValue = token.get('tokenValue');
        const email = token.get('email');
        mailService.sendForgotPasswordEmail(tokenValue, email);
        res.send({ status: 'OK'});
    }).catch(err => {
        res.status(400).send({ err: 'Bad request'});
    });

});
// TODO: check in "where" if expired
router.post('/reset-password', function (req,res,next) {
   const { password, confirmPassword, token} = req.body;
   if (!password || !confirmPassword || !token || password!==confirmPassword){
       res.status(400).send({ err: 'Bad request'});
       return;
   }
   models.Token.findOne({
       where: { tokenValue: token, type: 'forgot-password', active: true }
   }).then(tokenObj => {
       const email = tokenObj.get('email');
       return models.User.findOne({
           where: { email }
       })
   }).then(userObj => {
       const id = userObj.get('id');
       return models.User.update({ password }, { where: { id }})
   }).then(updatedUser => {
       // TODO delete record and catch on token update
       models.Token.update({ active: false},{ where: { tokenValue: token}});
       res.send({ status: 'OK'});
   }).catch(err => {
       res.status(400).send({ err: 'Bad request'});
   });
});

module.exports = router;
