import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function SearchBar({ searchQuery }) {
  const [allRecipes, setAllRecipes] = useState([]); // Store all recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Store filtered recipes
  const [loading, setLoading] = useState(false); // Track loading

  // Fetch recipes based on search query when it changes
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // If there's a search query, use it to search for a specific recipe
        const query = searchQuery ? `&s=${searchQuery}` : '';
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?${query}`
        );
        
        if (response.data && response.data.meals) {
          setAllRecipes(response.data.meals); // Save the fetched recipes
          setFilteredRecipes(response.data.meals); // Initially, show all recipes that match the query
        } else {
          setFilteredRecipes([]); // If no recipes are found, set the filtered list to empty
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchQuery]);

  return (
    <div className="search-bar-container">
      <h1>Search Recipes</h1>
      <div className="recipe-grid">
        {loading ? (
          <h2>Loading recipes...</h2>
        ) : filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found. Try refining your search.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
