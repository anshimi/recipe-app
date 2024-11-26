import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken") // Example API
      .then((response) => {
        setRecipes(response.data.meals.slice(0, 6)); // Limit to 6 recipes
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading recipes...</h2>;
  }

  return (
    <div className="container">
      <h1>Welcome to Recipe Haven</h1>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Home;
