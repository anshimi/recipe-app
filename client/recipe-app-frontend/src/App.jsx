import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ResultsPage from "./pages/ResultsPage";
import RecipeDetails from "./pages/RecipeDetails";
import Registration from "./user/Register";
import Login from "./user/Login";
import Profile from "./pages/Profile";
import SubmitRecipe from "./pages/SubmitRecipe";
import Footer from "./components/Footer";
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
      <div className="navbar-app">
        <Navbar
          setSelectedCategory={setSelectedCategory}
          setSearchQuery={setSearchQuery}
        />
      </div>
      
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
        <Route path="/Submit-Recipe" element={<SubmitRecipe />} />
      </Routes>
      
      <div className="footer-app">
        <Footer 
          setSelectedCategory={setSelectedCategory}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          fetchRecipesByCategory={async (category) => {
            try {
              const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
              );
              setRecipes(response.data.meals || []);
            } catch (error) {
              console.error("Error fetching recipes by category:", error);
            }
          }}
          fetchAllRecipes={async () => {
            try {
              const response = await axios.get(
                "https://www.themealdb.com/api/json/v1/1/search.php?s="
              );
              setRecipes(response.data.meals || []);
            } catch (error) {
              console.error("Error fetching all recipes:", error);
            }
          }}
        />
      </div>
    </div>
    
  );
}

export default App;
