const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  prepTime: { type: String },
  serving: { type: Number },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  image: { type: String }, // URL to the uploaded image
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recipe", recipeSchema);