const router = require("express").Router();
const {
  getCategories,
  createCategory,
  deleteAllCategories,
  deleteCategoryById,
  deleteCategoryByLabel,
} = require("../controller/categoriesController");

router.get("/", getCategories);
router.post("/", createCategory);
router.delete("/", deleteAllCategories);
router.delete("/:id", deleteCategoryById);
router.delete("/byLabel/:label", deleteCategoryByLabel);

module.exports = { router };
