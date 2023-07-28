const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
  deleteProductByTitle,
} = require("../controller/productsController");

const router = require("express").Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/byTitle/:title", deleteProductByTitle);
router.delete("/:id", deleteProductById);
module.exports = { router };
