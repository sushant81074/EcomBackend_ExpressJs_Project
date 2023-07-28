const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const cartSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const virtual = cartSchema.virtual("id");
virtual.get(() => {
  this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Cart", cartSchema);
