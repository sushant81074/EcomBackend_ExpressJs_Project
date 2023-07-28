const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    title: { type: String, required: [false], unique: true },
    discription: { type: String, required: [false] },
    price: {
      type: Number,
      min: [0, "wrong min price"],
      max: [100000, "wrong max price"],
    },
    brand: { type: String, required: [false] },
    category: { type: String, required: [false] },
    discountPercentage: {
      type: Number,
      min: [1, "wrong min discount"],
      max: [99, "wrong max discount"],
    },
    rating: {
      type: Number,
      min: [0, "wrong min rating"],
      max: [5, "wrong max rating"],
      default: 0,
    },
    stock: {
      type: Number,
      min: [0, "wrong min stock"],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productsSchema);
