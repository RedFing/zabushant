const models = require('../models');
const userQueries = require('../queries/userQueries');
const post = () => (req,res,next) => {
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
            console.log('GRESSSKA: ', user.id);
            userQueries.createDirectMessageChannelForMyself(user.id, user.username).then();
            res.send({ status: 'OK'});
        })
        .catch(err =>{
            res.status(400);
            res.send({ err: 'Bad register'})
        });

};

module.exports={
    post: post
};
