import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function Home({ selectedCategory, searchQuery }) {
  const [allRecipes, setAllRecipes] = useState([]); // Store all recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Store filtered recipes
  const [loading, setLoading] = useState(false); // Track loading internally
  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"]; // Only allowed categories

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedRecipes = [];

        if (selectedCategory && selectedCategory !== "") {
          // Fetch recipes for the specific category
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
          );
          fetchedRecipes.push(...response.data.meals); // Push recipes to array
        } else {
          // Fetch recipes from all allowed categories
          for (const category of categories) {
            const response = await axios.get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );
            fetchedRecipes.push(...response.data.meals);
          }
        }

        setAllRecipes(fetchedRecipes); // Save all fetched recipes
        setFilteredRecipes(fetchedRecipes); // Initially, filtered = all recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

  // Update filtered recipes whenever `searchQuery` changes
  useEffect(() => {
    const results = allRecipes.filter((recipe) => {
      const matchesSearch = searchQuery
        ? recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchesSearch;
    });
    setFilteredRecipes(results);
  }, [searchQuery, allRecipes]);

  return (
    <div className="container">
      <h1>Welcome to Recipe Haven</h1>
      <div className="recipe-grid">
        {loading && <h2>Loading recipes...</h2>}
        {filteredRecipes.length > 0 ? (
          filteredRecipes.slice(0, 6).map((recipe) => ( // Show only the first 6 recipes
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          !loading && <p>No recipes found. Try adjusting your filters.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
