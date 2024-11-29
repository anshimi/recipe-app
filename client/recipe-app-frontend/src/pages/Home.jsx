import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function Home({ selectedCategory }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // Keep track of loading internally
  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"]; // Only allowed categories

  const shuffleArray = (array) => {
    // Function to shuffle an array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Set loading to true only internally

      try {
        if (selectedCategory && selectedCategory !== "") {
          // Fetch recipes for a specific category
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
          );
          const shuffledRecipes = shuffleArray(response.data.meals); // Shuffle the recipes
          setRecipes(shuffledRecipes.slice(0, 6)); // Limit to 6 random recipes
        } else {
          // Fetch random recipes only from the four allowed categories
          const randomRecipes = [];
          for (let i = 0; i < 6; i++) {
            const randomCategory =
              categories[Math.floor(Math.random() * categories.length)]; // Pick a random category
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

  return (
    <div className="container">
      <h1>Welcome to Recipe Haven</h1>
      <div className="recipe-grid">
        {/* Show existing recipes while new ones are loading */}
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.idMeal || index} recipe={recipe} />
        ))}
        {loading && <h2>Loading new recipes...</h2>}
      </div>
    </div>
  );
}

export default Home;