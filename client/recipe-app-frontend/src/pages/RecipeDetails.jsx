import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipe(response.data.meals[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <h2>Loading Recipe Details...</h2>;
  }

  if (!recipe) {
    return <h2>Recipe not found!</h2>;
  }

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>{recipe.strInstructions}</p>
      <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
        Watch on YouTube
      </a>
    </div>
  );
}

export default RecipeDetails;
