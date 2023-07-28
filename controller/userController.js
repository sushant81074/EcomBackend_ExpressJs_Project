const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { createToken } = require("../services/auth");

const getUser = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) res.status(400).send({ message: "user doesn't exist" });
  else res.status(200).send(user);
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user)
    res.status(400).send({ message: "user already exist with provided email" });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.status(400).send({ message: "user doesn't exist " });
  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = createToken(user);
      res.cookie("token", token);
      return res.status(200).send({ message: "user successfully logged in " });
    } else {
      return res.status(400).send({ message: "wrong password" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateUser = async (req, res) => {
  const { email } = req.params;
  const { password } = req.params;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "User doesn't exist" });
  }
  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword, ...req.body },
        { new: true }
      );
      res.status(201).send(updatedUser);
    } else {
      const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
        new: true,
      });
      res.status(201).send(updatedUser);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUserByEmail = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  try {
    if (!email) res.status(400).send({ message: "email is required" });
    await User.findOneAndDelete({ email });
    res.status(201).send({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (!id) res.status(400).send({ message: "id is required" });
    await User.findByIdAndDelete(id);
    res.status(201).send({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getUser,
  deleteUserByEmail,
  deleteUserById,
};
