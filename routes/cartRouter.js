const router = require("express").Router();

const {
  getCartByUser,
  createCart,
  updateCart,
  deleteCart,
  deleteFromCart,
  getAllCarts,
} = require("../controller/cartController");

router.get("/", getAllCarts);
router.get("/:userId", getCartByUser);
router.post("/", createCart);
router.patch("/:id", updateCart);
router.delete("/byUserId/:user", deleteCart);
router.delete("/:id", deleteFromCart);

module.exports = { router };
