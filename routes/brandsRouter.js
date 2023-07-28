const {
  getBrands,
  createBrand,
  deleteAllBrand,
  deleteBrandById,
  deleteBrandByLabel,
} = require("../controller/brandsController");

const router = require("express").Router();

router.get("/", getBrands);
router.post("/", createBrand);
router.delete("/", deleteAllBrand);
router.delete("/:id", deleteBrandById);
router.delete("/byLabel/:label", deleteBrandByLabel);

module.exports = { router };
