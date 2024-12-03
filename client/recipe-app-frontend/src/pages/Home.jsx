import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

function Home({ selectedCategory }) {
  const [recipes, setRecipes] = useState([]); // Store recipes
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors if any
  const navigate = useNavigate();

  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"]; // Only allowed categories
  const cache = useRef({}); // Cache recipes to avoid unnecessary re-fetching

  const shuffleAndLimit = (array, limit = 12) => {
    // Shuffle and limit the array
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, limit); // Return exactly 6 recipes
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      if (selectedCategory) {
        // Fetch recipes for the selected category
        if (cache.current[selectedCategory]) {
          // Use cached recipes
          setRecipes(shuffleAndLimit(cache.current[selectedCategory]));
        } else {
          // Fetch recipes from API
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
          );
          const fetchedRecipes = response.data.meals || [];
          cache.current[selectedCategory] = fetchedRecipes; // Cache the result
          setRecipes(shuffleAndLimit(fetchedRecipes)); // Shuffle and limit to 6
        }
      } else {
        // Fetch random recipes from allowed categories
        const allRandomRecipes = [];

        for (const category of categories) {
          if (cache.current[category]) {
            // Use cached recipes
            allRandomRecipes.push(...cache.current[category]);
          } else {
            // Fetch recipes from API
            const response = await axios.get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );
            const fetchedRecipes = response.data.meals || [];
            cache.current[category] = fetchedRecipes; // Cache the result
            allRandomRecipes.push(...fetchedRecipes);
          }
        }

        // Shuffle and pick 6 random recipes from all allowed categories
        setRecipes(shuffleAndLimit(allRandomRecipes, 12));
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory]);
  return (
    <div className="container">
      <h1>Welcome to Recipe Haven</h1>
      {loading && <h2>Loading recipes...</h2>}
      {error && <p className="error">{error}</p>}
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
      <button submitbutton
        onClick={() => navigate("/Submit-Recipe")}
      >
        Submit a Recipe
      </button>
    </div>
  );
}

export default Home;
