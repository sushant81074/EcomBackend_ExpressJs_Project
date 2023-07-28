const Products = require("../model/productsModel");

const getAllProducts = async (req, res) => {
  const allProducts = await Products.find({});
  res.status(200).send(allProducts);
};
const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  res.status(200).send(product);
};
const createProduct = async (req, res) => {
  const { title, brand } = req.body;
  const product = await Products.findOne({ title, brand });
  if (product) res.status(400).send({ message: "product already exist " });
  try {
    const newProduct = await Products.create(req.body);
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  if (!product) res.status(400).send({ message: "product doesn't exist " });
  try {
    const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).send(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProductByTitle = async (req, res) => {
  const { title } = req.params;
  const product = await Products.findOne({ title });
  if (!product) return res.status(400).send({ message: "product not found" });
  try {
    if (!title) return res.status(400).send({ message: "title is required" });
    await Products.findOneAndDelete({ title });
    return res.status(201).send({ message: "product deleted successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  if (!product) return res.status(400).send({ message: "product not found" });
  try {
    if (!id) res.status(400).send({ message: "id is required" });
    await Products.findByIdAndDelete(id);
    res.status(201).send({ message: "product deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
  deleteProductByTitle,
};
