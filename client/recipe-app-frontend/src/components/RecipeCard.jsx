import React, { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RecipeCard({ recipe }) {
  const { user, addFavorite } = useContext(AuthContext); // Access user data and addFavorite function from AuthContext
  const navigate = useNavigate(); // Navigate function for redirection
  const [notification, setNotification] = useState(""); // State for in-page notifications

  // Function to handle adding a recipe to the user's favorites
  const handleAddFavorite = async () => {
    if (!user) {
      setNotification("Please log in to add to favorites!");
      return;
    }
  // Send a POST request to add the recipe to the user's favorites
    try {
      const response = await axios.post(`${import.meta.env.VITE_BE_URL}/api/add-favorite`, {
        userId: user.id,
        recipe: {
          id: recipe.idMeal,
          name: recipe.strMeal,
        },
      });
      
  // Update the user's favorites
      addFavorite({ id: recipe.idMeal, name: recipe.strMeal });
      setNotification("Recipe added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      if (error.response && error.response.data.message) {
        setNotification(error.response.data.message); // Graceful error message from backend
      } else {
        setNotification("Failed to add recipe to favorites.");
      }
    }
  };

  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <div className="recipe-actions">
        <button
          onClick={() => {
            navigate(`/recipe/${recipe.idMeal}`);
          }}
        >
          View Details
        </button>
        <button onClick={handleAddFavorite}>Add to Favorites</button>
      </div>
      {notification && <p className="notification">{notification}</p>} {/* Show notification */}
    </div>
  );
}

export default RecipeCard;
