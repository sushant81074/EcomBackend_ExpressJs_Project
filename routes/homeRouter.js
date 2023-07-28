const router = require("express").Router();
const { authenticateUser } = require("../middleware/auth");
router.get("/", authenticateUser, (req, res) => {
  res.status(200).send({ message: "this is the home page" });
});
router.get("/login", (req, res) => {
  res.status(200).send({ message: "login page" });
});
router.get("/signup", (req, res) => {
  res.status(200).send({ message: "signup page" });
});

module.exports = { router };
