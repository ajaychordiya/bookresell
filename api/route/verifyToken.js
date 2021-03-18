const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "gjrfhkjgrlkdvksnkgfufeyhjg";

//for verifying Autherized user

function verify(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized");
  }
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token == null) {
    return res.status(401).send("Unauthorized");
  }
  let payload = jwt.verify(token, TOKEN_SECRET);
  console.log(payload);
  if (!payload) {
    return res.status(401).send("Unauthorized");
  }
  req.user = payload.subject;

  next();
}
module.exports = verify;
