const auth = require('../util/auth');
const models = require('../models');

const post = () => (req,res,next) => {
  let { username, password} = req.body;
  if (!username || !password) {
    res.status(400);
    res.send({
      err: 'Bad login'
    });
    return;
  }
  password = auth.hashPassword(password);

  models.User.findOne({
      where: { username, password },
      attributes: [ 'id', 'username']
  }).then(user => {
      if (!user) throw new Error('bad login');
      return {
        token: auth.refreshToken(username),
        username: username,
        id: user.id
      };
  }).then(userObj => {
      console.log('ovo je userObj');
      console.log(userObj);

      if (!userObj || !userObj.token || !userObj.username || !userObj.id){
         res.status(400).send({ err: 'Bad login'});
      } else {
         console.log('token is');
         res.header("Authorization", userObj.token.toString());
         res.send({token: userObj.token.toString()});
      }
  }).catch(err => {
      res.send({ err: 'Bad login'})
  });
};

module.exports = {
  post: post
};