const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [
    {
      id: String,
      name: String,
    },
  ],
  submittedRecipes: [
    {
      title: String,
      category: String,
      prepTime: String,
      serving: Number,
      ingredients: String,
      instructions: String,
      image: String, // URL of the image if applicable
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
