import React, { useContext, useState } from "react"; // Added useState
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RecipeCard({ recipe }) {
  const { user, addFavorite } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(""); // State for in-page notifications

  const handleAddFavorite = async () => {
    if (!user) {
      setNotification("Please log in to add to favorites!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/add-favorite", {
        userId: user.id,
        recipe: {
          id: recipe.idMeal,
          name: recipe.strMeal,
        },
      });

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
