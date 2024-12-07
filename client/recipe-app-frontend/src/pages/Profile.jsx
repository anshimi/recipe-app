import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";

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
          { params: { userId: user.id } }
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
      <h3>Your Favorite Recipes</h3>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no favorite recipes yet.</p>
      )}

      {/* Submitted Recipes Section */}
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
    </div>
  );
}

export default Profile;
