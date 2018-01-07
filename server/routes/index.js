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

router.get('/get-current-user', function (req, res, next) {
    console.log('bezveze');
    console.log(req.user.username);
    res.send({id: req.user.id, username: req.user.username });
});
var userQueries = require('../queries/userQueries');
router.get('/get-all-channels/:userId', function (req,res,next) {
    let { userId } = req.params;

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



module.exports = router;
