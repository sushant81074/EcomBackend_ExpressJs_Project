const jwt = require("jsonwebtoken");
const secretKey = "asdfghjkl;{}";

const createToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
};

const validateToken = (token) => {
  const payload = jwt.verify(token, secretKey);
  return payload;
};

module.exports = { createToken, validateToken };
