const {
  createUser,
  updateUser,
  loginUser,
  getUser,
  deleteUserById,
  deleteUserByEmail,
} = require("../controller/userController");
const { authenticateUser } = require("../middleware/auth");

const router = require("express").Router();

router.get("/:email", authenticateUser, getUser);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.patch("/:email", authenticateUser, updateUser);
router.delete("/:email", authenticateUser, deleteUserByEmail);
router.delete("/:id", authenticateUser, deleteUserById);

module.exports = { router };
