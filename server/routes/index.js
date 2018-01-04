var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController');
var registerContoller = require('../controllers/registerController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', loginController.post());

router.post('/register', registerContoller.post());

router.get('/message', function (req,res,next) {
 res.send({ status: 'OK'});
});
// TODO extract randomBytes fn to util/auth

module.exports = router;
