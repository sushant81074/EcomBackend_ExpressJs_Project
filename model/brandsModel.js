const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Brand", brandsSchema);
