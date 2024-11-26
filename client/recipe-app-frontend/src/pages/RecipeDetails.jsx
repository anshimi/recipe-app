import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Assuming styles are in App.css or another CSS file

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

  // Extract ingredients and measures from recipe
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      });
    }
  }

  return (
    <div className="recipe-details-container">
      <div className="recipe-details-content">
        {/* Left Section */}
        <div className="recipe-image-section">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="recipe-image"
          />
          <div className="recipe-tags">
            <span className="tag">{recipe.strCategory}</span>
            <span className="tag">{recipe.strArea}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="recipe-info-section">
          <h1 className="recipe-title">{recipe.strMeal}</h1>
          <h2 className="section-heading">Ingredients</h2>
          <ul className="ingredient-list">
            {ingredients.map((item, index) => (
              <li key={index}>
                {item.ingredient} - {item.measure}
              </li>
            ))}
          </ul>
          <h2 className="section-heading">Recipe</h2>
          <p className="recipe-instructions">{recipe.strInstructions}</p>
          <button className="favorite-button">Add to Favorites</button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
