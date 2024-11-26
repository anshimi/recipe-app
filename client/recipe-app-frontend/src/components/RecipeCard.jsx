import React from "react";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <button
        onClick={() => {
          window.location.href = `/recipe/${recipe.idMeal}`;
        }}
      >
        View Details
      </button>
    </div>
  );
}

export default RecipeCard;
