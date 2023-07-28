const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [false],
      unique: true,
    },
    value: {
      type: String,
      required: [false],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categoriesSchema);
