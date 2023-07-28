const Category = require("../model/categoriesModel");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createCategory = async (req, res) => {
  const { label, value } = req.body;
  try {
    if (!label || !value)
      res.status(400).send({ message: "label and value are required" });
    const newCategory = await Category.create({ label, value });
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAllCategories = async (req, res) => {
  try {
    await Category.deleteMany({});
    res.status(201).send({ message: "All categories Deleted" });
  } catch (error) {
    req.status(500).send(error.message);
  }
};

const deleteCategoryByLabel = async (req, res) => {
  const label = req.params.label;
  console.log(label);
  try {
    if (!label) res.status(400).send({ message: "label is required" });
    await Category.findOneAndDelete({ label });
    res.status(200).send({ message: "Deletion successful" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) res.status(400).send({ message: `id : ${id} is required` });
    await Category.findByIdAndDelete(id);
    res.status(201).send({ message: "category deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteAllCategories,
  deleteCategoryById,
  deleteCategoryByLabel,
};
