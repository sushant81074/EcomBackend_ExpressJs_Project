const Order = require("../model/ordersModel");

const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(400).send({ message: "order not found" });
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const order = await Order.find({ user: userId });
    console.log(order);
    if (!order) return res.status(400).send({ message: "order not found" });
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders)
      return res.status(400).send({ message: "no orders in database" });
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    console.log(newOrder);
    if (!newOrder)
      return res
        .status(400)
        .send({ message: "new order creation unsuccessful" });
    return res.status(201).send(newOrder);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteAllOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const order = await Order.find({ user: userId });
    if (!order)
      return res.send({ message: "order not found with specified user id " });
    console.log(order);
    if (await Order.findOneAndDelete({ user: userId }))
      return res
        .status(201)
        .send({ message: "deletion of all orders successfull" });
    else return res.status(400).send({ message: "deletion unsuccessful" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteOrderByOrderId = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const order = await Order.find({ id });
    console.log(order);
    if (!order)
      return res
        .status(400)
        .send({ message: "order not found with specified order id " });
    if (await Order.findByIdAndDelete(id))
      return res.status(201).send({ message: "deletion of order successfull" });
    else return res.status(400).send({ message: "deletion unsuccessful" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.find({ id });
    if (!order)
      return res.send({ message: "order not found with specified order id " });
    console.log(order);
    if (await Order.findByIdAndUpdate(id, req.body, { new: true }))
      return res.status(201).send({ message: "updation of order successfull" });
    else return res.status(400).send({ message: "updation unsuccessful" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getOrder,
  getOrdersByUserId,
  getAllOrders,
  createOrder,
  deleteAllOrdersByUserId,
  deleteOrderByOrderId,
  updateOrder,
};
