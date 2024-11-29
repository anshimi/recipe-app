import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function Home({ selectedCategory, searchQuery }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading internally
  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"]; // Only allowed categories

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Start loading
      try {
        if (selectedCategory && selectedCategory !== "") {
          // Fetch recipes for a specific category
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
          );
          const shuffledRecipes = shuffleArray(response.data.meals); // Shuffle the recipes
          setRecipes(shuffledRecipes.slice(0, 6)); // Limit to 6 random recipes
        } else {
          // Fetch random recipes from allowed categories
          const randomRecipes = [];
          for (let i = 0; i < 6; i++) {
            const randomCategory =
              categories[Math.floor(Math.random() * categories.length)];
            const response = await axios.get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${randomCategory}`
            );
            const recipesFromCategory = response.data.meals;
            const randomRecipe =
              recipesFromCategory[
                Math.floor(Math.random() * recipesFromCategory.length)
              ];
            randomRecipes.push(randomRecipe); // Add random recipe to the list
          }
          setRecipes(randomRecipes); // Update state with random recipes
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

  // Filter recipes based on category and search query
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = searchQuery
      ? recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesSearch;
  });

  return (
    <div className="container">
      <h1>Welcome to Recipe Haven</h1>
      <div className="recipe-grid">
        {loading && <h2>Loading recipes...</h2>}
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          !loading && <p>No recipes found. Try adjusting your filters.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
