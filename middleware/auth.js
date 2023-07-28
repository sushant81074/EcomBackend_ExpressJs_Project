const { validateToken } = require("../services/auth");

const authenticateUser = (req, res, next) => {
  const token = req.cookie?.token;
  if (!token) return res.status(400).redirect("/login");
  try {
    const user = validateToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).redirect("/login");
  }
};

module.exports = { authenticateUser };
