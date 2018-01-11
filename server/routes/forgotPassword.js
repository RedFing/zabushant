var express = require('express');
var router = express.Router();
var models  = require('../models');
var auth = require('../util/auth');
var crypto = require('crypto');
var mailService = require('../util/mailService');

router.get('/reset-password/:token', function (req,res,next) {
    const token = req.params.token;
    models.Token.findOne({
        where: { tokenValue: token, active: true}
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
        return models.User.update({ password: auth.hashPassword(password) }, { where: { id }})
    }).then(updatedUser => {
        // TODO delete record and catch on token update
        models.Token.update({ active: false},{ where: { tokenValue: token}});
        res.send({ status: 'OK'});
    }).catch(err => {
        res.status(400).send({ err: 'Bad request'});
    });
});

router.post('/', function (req,res,next) {
    var email = req.body.email;
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
        //mailService.sendForgotPasswordEmail(tokenValue, email);
        res.send({ status: 'OK'});
    }).catch(err => {
        res.status(400).send({ err: 'Bad request'});
    });

});

module.exports = router;