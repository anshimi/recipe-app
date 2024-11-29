import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function Home({ selectedCategory }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Track errors if any

  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"]; // Only allowed categories
  const cache = useRef({}); // Cache recipes to avoid re-fetching unnecessarily

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      if (selectedCategory && selectedCategory !== "") {
        // Check cache before fetching
        if (cache.current[selectedCategory]) {
          setRecipes(cache.current[selectedCategory]);
          setLoading(false);
          return;
        }

        // Fetch recipes for the selected category
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );
        const shuffledRecipes = shuffleArray(response.data.meals); // Shuffle recipes
        const limitedRecipes = shuffledRecipes.slice(0, 6); // Limit to 6 random recipes
        cache.current[selectedCategory] = limitedRecipes; // Cache the result
        setRecipes(limitedRecipes);
      } else {
        // Fetch random recipes from allowed categories
        const randomRecipes = [];
        for (let i = 0; i < 6; i++) {
          const randomCategory =
            categories[Math.floor(Math.random() * categories.length)]; // Pick a random category

          // Check cache for category
          if (cache.current[randomCategory]) {
            const randomRecipe =
              cache.current[randomCategory][
                Math.floor(Math.random() * cache.current[randomCategory].length)
              ];
            randomRecipes.push(randomRecipe);
          } else {
            const response = await axios.get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${randomCategory}`
            );
            const recipesFromCategory = response.data.meals;
            cache.current[randomCategory] = recipesFromCategory; // Cache the category
            const randomRecipe =
              recipesFromCategory[
                Math.floor(Math.random() * recipesFromCategory.length)
              ];
            randomRecipes.push(randomRecipe);
          }
        }
        setRecipes(randomRecipes);
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
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.idMeal || index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Home;
