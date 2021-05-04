const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  console.log('Hellooooo')
  try {
    let token = req.header("x-auth-token");
    console.log('Token: ', token);
    token = token.substr(7).trim();
    console.log('Token: <' + token + '>');
    console.log('Secret: ', process.env.JWT_SECRET);
    if (!token)
      return res.status(401).json({msg: "No authentication token, authorization denied."});
    
    const verified = jwt.verify(token, "54a40PP3321789exw88");


 console.log('Verified: ', verified)
    if (!verified)
      return res.status(401).json({msg: "Token verification failed, authorization denied."});
    req.admin = verified.id;
    next();

  } catch (err) {
res.status(500).json({error: err.message});
  }

};

module.exports = auth;