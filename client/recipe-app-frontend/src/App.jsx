import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ResultsPage from "./pages/ResultsPage";
import RecipeDetails from "./pages/RecipeDetails";
import Registration from "./user/Register";
import Login from "./user/Login";
import Profile from "./pages/Profile";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]); // Recipes state
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  // Fetch recipes when the app loads
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        setRecipes(response.data.meals || []); // Store recipes in state
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []); // Run once on mount

  return (
    <div>
      <Navbar
        setSelectedCategory={setSelectedCategory}
        setSearchQuery={setSearchQuery}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              recipes={recipes}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/results"
          element={<ResultsPage recipes={recipes} searchQuery={searchQuery} />}
        />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/SubmitRecipe" element={<SubmitRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
