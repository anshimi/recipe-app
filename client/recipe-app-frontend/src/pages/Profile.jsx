import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import Favicon from "../assets/food-favicon_io/favicon.ico";

function Profile() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [submittedRecipes, setSubmittedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch favorites
        const favoritesResponse = await axios.get(
          `${import.meta.env.VITE_BE_URL}/api/profile/${user.id}`
        );
        setFavorites(favoritesResponse.data.user.favorites || []);
  
        // Fetch submitted recipes
        const submittedResponse = await axios.get(
          `${import.meta.env.VITE_BE_URL}/api/submittedrecipes`,
          { params: { userId: user.id } } // Pass userId as a query parameter
        );
        setSubmittedRecipes(submittedResponse.data.recipes);
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };
  
    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const removeFromFavorites = async (recipeId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BE_URL}/api/favorites/${user.id}/${recipeId}`
      );
      setFavorites((prevFavorites) =>
        prevFavorites.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const removeSubmittedRecipe = async (recipeId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BE_URL}/api/submittedrecipes/${recipeId}`
      );
      setSubmittedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (error) {
      console.error("Error removing submitted recipe:", error);
    }
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  if (loading) {
    return <p>Loading your profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2>Welcome, {user.email}</h2>

      {/* Favorites Section */}
      <section className="favorites-section">
        <h3>Your Favorite Recipes</h3>
        {favorites.length > 0 ? (
          <ul className="favorites-list">
            {favorites.map((recipe) => (
              <li key={recipe.id} className="favorite-item">
                <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                <button
                  className="remove-button"
                  onClick={() => removeFromFavorites(recipe.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no favorite recipes yet.</p>
        )}
      </section>

      {/* Submitted Recipes Section */}
<<<<<<< HEAD
      <h3>Your Submitted Recipes</h3>
      {submittedRecipes.length > 0 ? (
        <div className="recipe-grid">
          {submittedRecipes.map((recipe, index) => (
            <div className="recipe-card" key={index}>
              <img
                src={
                  recipe.image
                    ? `${import.meta.env.VITE_BE_URL}/uploads/${recipe.image}`
                    : "/default-image.jpg"
                }
                alt={recipe.title}
                className="recipe-image"
              />
              <h3>{recipe.title}</h3>
              <p><strong>Category:</strong> {recipe.category}</p>
              <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
              <p><strong>Serving:</strong> {recipe.serving}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have not submitted any recipes yet.</p>
      )}
=======
      <section className="submitted-section">
        <h3>Your Submitted Recipes</h3>
        {submittedRecipes.length > 0 ? (
          <div className="recipe-grid">
            {submittedRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe._id}>
                <img
                  src={
                    recipe.image
                      ? `${import.meta.env.VITE_BE_URL}${recipe.image}`
                      :  Favicon
                  }
                  alt={recipe.title}
                  className="profile-recipe-image"
                />
                <div className="recipe-details">
                  <h4>{recipe.title}</h4>
                  <p>
                    <strong>Category:</strong> {recipe.category}
                  </p>
                  <p>
                    <strong>Prep Time:</strong> {recipe.prepTime}
                  </p>
                  <p>
                    <strong>Serving:</strong> {recipe.serving}
                  </p>
                  <button
                    className="remove-button"
                    onClick={() => removeSubmittedRecipe(recipe._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have not submitted any recipes yet.</p>
        )}
      </section>
>>>>>>> c3ec92f706aa9093ca20798fdc57abfc3536f0ab
    </div>
  );
}

export default Profile;
