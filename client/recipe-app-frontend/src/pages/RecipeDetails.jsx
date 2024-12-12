import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import "../App.css";

function RecipeDetails() {
  const { id } = useParams(); // Retrieves the recipe ID from the URL parameters
  const [recipe, setRecipe] = useState(null); // Stores the details of the selected recipe
  const [loading, setLoading] = useState(true); // Tracks the loading state for fetching the recipe details
  const [notification, setNotification] = useState(""); // Manages notifications or messages for the user
  const { user, addFavorite } = useContext(AuthContext); // Accesses the current user and function to add recipes to favorites

  // Fetch recipes from API
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

  // Add to favorites 
  const handleAddFavorite = async () => {
    if (!user) {
      setNotification("Please log in to add to favorites!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE_URL}/api/add-favorite`,
        {
          userId: user.id,
          recipe: {
            id: recipe.idMeal,
            name: recipe.strMeal,
          },
        }
      );

      addFavorite({ id: recipe.idMeal, name: recipe.strMeal });
      setNotification("Recipe added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      if (error.response && error.response.data.message) {
        setNotification(error.response.data.message); // Graceful error message
      } else {
        setNotification("Failed to add recipe to favorites.");
      }
    }
  };

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
          <button className="favorite-button" onClick={handleAddFavorite}>
            Add to Favorites
          </button>
          {notification && <p className="notification">{notification}</p>}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
