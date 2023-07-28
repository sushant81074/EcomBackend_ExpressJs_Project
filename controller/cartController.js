const Cart = require("../model/cartModel");

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});
    if (!carts)
      return res.status(200).send({ message: "carts database is empty" });
    return res.status(200).send(carts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCartByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.find({ user: userId })
      .populate("user")
      .populate("product");
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createCart = async (req, res) => {
  const { quantity, product, user } = req.body;
  try {
    const newCart = await Cart.create({
      quantity,
      product,
      user,
    });
    return res.status(201).send(newCart);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findById(id);
    if (!cart) return res.status(400).send({ message: "cart not found" });
    const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(201).send(updatedCart);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteCart = async (req, res) => {
  const { user } = req.params;
  try {
    const cart = await Cart.find({ user: user });
    if (!cart) return res.status(400).send({ message: "cart not found" });
    if (await Cart.deleteMany({ user }))
      return res.status(201).send({ message: "cart deleted successfully" });
    else return res.status(400).send({ message: "cart deletion unsuccessful" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findById(id);
    if (!cart) return res.status(400).send({ message: "cart not found" });
    if (await Cart.findByIdAndDelete(id))
      return res.status(201).send({ message: "cart deleted successfully" });
    else return res.status(400).send({ message: "cart deletion unsuccessful" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllCarts,
  getCartByUser,
  createCart,
  updateCart,
  deleteCart,
  deleteFromCart,
};
