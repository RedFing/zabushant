var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController');
var registerContoller = require('../controllers/registerController');
var models = require('../models');

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

router.get('/get-current-user', function (req, res, next) {
    console.log('bezveze');
    console.log(req.user.username);
    res.send({id: req.user.id, username: req.user.username });
});
var userQueries = require('../queries/userQueries');
router.get('/get-all-channels/', function (req,res,next) {
    let  userId  = req.user.id;

    userQueries.getAllChannels(userId)
        .then(channels => {
            res.send(channels);
        }).catch(err => {
            console.log(err);
            res.status(400).send('err');
    });
});
router.get('/get-all-messages/:channelId', function (req,res,next) {
    let { channelId } = req.params;

    userQueries.getAllMessages(channelId)
        .then(messages => {
            res.send(messages);
        }).catch(err => {
        console.log(err);
        res.status(400).send('err');
    });
});

router.get('/get-all-users', function (req, res, next) {
    models.User.findAll({ attributes: ['id', 'username']})
        .then( users => {
            res.send(users);
        }).catch(err => res.status(400).send({err: 'Bad request!'}));
});

router.post('/create-channel', function(req,res,next){
    const { users, channelName } = req.body;

    userQueries.createGroupChannel(channelName,users)
        .then( _ => {
            res.send({ status: 'OK'});
        }).catch(err => res.status(400).send({ err: 'Bad request' }));
});
module.exports = router;
