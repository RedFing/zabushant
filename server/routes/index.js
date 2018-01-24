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
    res.send({id: req.user.id, username: req.user.username, token: req.user.token });
});
var userQueries = require('../queries/userQueries');
router.get('/get-all-channels', function (req,res,next) {
    console.log(req.user);
    let  userId  = req.user.id;
    console.log(userId);
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

router.post('/create-channel', async function(req,res,next){
    console.log(req.user.id);
    try{
        const { users, channelName } = req.body;
        if (users instanceof Array){
            const checkIfExists = await models.Channel.findOne({ where: {name: channelName}});
            if (checkIfExists){
                res.status(400).send({ err: 'Channel name already exists! Change channel name.'});
                return;
            }
            userQueries.createGroupChannel(channelName, [...users, req.user.id])
                .then( _ => {
                    res.send({ status: 'OK'});
                }).catch(err => res.status(400).send({ err: 'Bad request' }));
        } else {
            const otherUser = await models.User.findOne({ where: {id: users}, attributes: ['id','username']});
            const channelName = otherUser.username + ' - ' + req.user.username;
            const channelName2 = req.user.username + ' - ' + otherUser.username;
            const checkIfExists = await models.Channel.findOne({
                where: {
                    [models.Sequelize.Op.or]: [{name: channelName}, { name: channelName2}]
                }});

            if (checkIfExists){
                res.status(400).send({ err: 'DM channel already exists!'});
                return;
            }

            await userQueries.createGroupChannel(channelName,[req.user.id, otherUser.id], true);
            res.send({status: 'OK' });
        }
    } catch (e){
        res.status(400).send({ err: 'Bad request'});
    }

});
module.exports = router;
