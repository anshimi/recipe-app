import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/${user.id}`);
        setFavorites(response.data.user.favorites || []); // Load favorites into state
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h2>Welcome, {user.email}</h2>
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
    </div>
  );
}

export default Profile;
