const router = require("express").Router();

const {
  getOrder,
  getOrdersByUserId,
  getAllOrders,
  createOrder,
  deleteAllOrdersByUserId,
  deleteOrderByOrderId,
  updateOrder,
} = require("../controller/ordersController");
router.get("/:id", getOrder);
router.get("/byUserId/:userId", getOrdersByUserId);
router.get("/", getAllOrders);
router.post("/", createOrder);
router.delete("/byUserId/:userId", deleteAllOrdersByUserId);
router.delete("/:id", deleteOrderByOrderId);
router.patch("/:id", updateOrder);

module.exports = { router };
