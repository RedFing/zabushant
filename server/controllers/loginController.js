const auth = require('../util/auth');
const post = () => (req,res,next) => {
  const { username, password} = req.body;
  if (!username || !password) {
    res.status(400);
    res.send({
      err: 'Bad login'
    });
    return;
  }

  auth.executeLogin(username, password)
    .then(userObj => {
      if (!userObj || !userObj.token || !userObj.username || !userObj.id){
         res.status(400).send({ err: 'Bad login'});
       } else {
         res.header("Authorization", userObj.token.toString());
         res.send({status: 'OK'});
       }
    }).catch(err => {
      res.send({ err: 'Bad login'})
  });
};

module.exports = {
  post: post
};