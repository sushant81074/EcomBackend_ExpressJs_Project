const Brand = require("../model/brandsModel");

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).send(brands);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createBrand = async (req, res) => {
  const { label, value } = req.body;
  try {
    if (!label || !value)
      res.status(400).send({ message: "label and value are required" });
    const newBrand = await Brand.create({ label, value });
    res.status(201).send(newBrand);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAllBrand = async (req, res) => {
  try {
    await Brand.deleteMany({});
    res.status(201).send({ message: "All brands Deleted" });
  } catch (error) {
    req.status(500).send(error.message);
  }
};
const deleteBrandByLabel = async (req, res) => {
  const label = req.params.label;
  console.log(label);
  try {
    if (!label) res.status(400).send({ message: "label is required" });
    await Brand.findOneAndDelete({ label });
    res.status(200).send({ message: "Deletion successful" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteBrandById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) res.status(400).send({ message: `id : ${id} is required` });
    await Brand.findByIdAndDelete(id);
    res.status(201).send({ message: "brand deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getBrands,
  createBrand,
  deleteAllBrand,
  deleteBrandById,
  deleteBrandByLabel,
};
