const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/user"); // Import the User model
const Recipe = require("./models/recipe");
const fileUpload = require('express-fileupload') // ** INSTALL THIS PACKAGE
const bodyParser = require('body-parser') // ** INSTALL THIS PACKAGE

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors()) // Allow requests from other origins (React)
app.use(express.json()) // Parse incoming JSON data
app.use(fileUpload()) // ** ADD THIS
app.use(bodyParser.urlencoded({ extended: true })) // ** ADD THIS

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Basic route
app.get("/", (req, res) => res.send("API is running..."));

// Register API
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/add-favorite", async (req, res) => {
  const { userId, recipe } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the recipe is already in favorites
    const isAlreadyFavorite = user.favorites.some((fav) => fav.id === recipe.id);
    if (isAlreadyFavorite) {
      return res.status(400).json({ message: "Recipe is already in favorites" });
    }

    // Add recipe to favorites
    user.favorites.push(recipe);
    await user.save();

    res.status(200).json({ message: "Recipe added to favorites", favorites: user.favorites });
  } catch (error) {
    console.error("Error adding favorite recipe:", error);
    res.status(500).json({ message: "Server error" });
  }
});



app.get("/api/favorites/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Include user details in the response (excluding the password)
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/submittedrecipes", async (req, res) => {
  const { userId, title, category, prepTime, serving, ingredients, instructions } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the submitted recipe to the user's submittedRecipes
    const newRecipe = {
      title,
      category,
      prepTime,
      serving,
      ingredients,
      instructions,
      image,
    };

    user.submittedRecipes.push(newRecipe);
    await user.save();

    res.status(201).json({ message: "Recipe submitted successfully", submittedRecipes: user.submittedRecipes });
  } catch (error) {
    console.error("Error submitting recipe:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/api/submittedrecipes", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json({ recipes });
  } catch (error) {
    console.error("Error fetching submitted recipes:", error);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});
// Fetch all recipes
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = [
      // Example static data (replace with database logic if needed)
      { id: "1", strMeal: "Spaghetti", strMealThumb: "link-to-image" },
      { id: "2", strMeal: "Tacos", strMealThumb: "link-to-image" },
    ];
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        email: user.email,
        favorites: user.favorites,
        submittedRecipes: user.submittedRecipes,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

