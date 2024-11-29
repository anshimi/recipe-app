import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function ResultsPage({ searchQuery }) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"]; // Expand as needed

  useEffect(() => {
    const fetchAllRecipes = async () => {
      setLoading(true);
      try {
        const allRecipes = [];

        // Fetch recipes for all allowed categories
        for (const category of categories) {
          const categoryResponse = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
          );
          if (categoryResponse.data.meals) {
            console.log(`Fetched recipes for category: ${category}`, categoryResponse.data.meals); // Debugging
            allRecipes.push(...categoryResponse.data.meals);
          }
        }

        // Fetch full details for each recipe
        const detailedRecipes = await Promise.all(
          allRecipes.map(async (meal) => {
            try {
              const detailsResponse = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
              );
              return detailsResponse.data.meals[0]; // Return full recipe details
            } catch (error) {
              console.error(`Error fetching details for meal ID: ${meal.idMeal}`, error);
              return null; // Skip recipes with issues
            }
          })
        );

        // Filter out any null responses
        const validRecipes = detailedRecipes.filter((recipe) => recipe !== null);
        setRecipes(validRecipes); // Save the complete recipe list
        console.log("Fetched and detailed recipes:", validRecipes); // Debugging
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  // Filter recipes locally based on searchQuery
  useEffect(() => {
    if (!searchQuery) {
      setFilteredRecipes(recipes);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = recipes.filter((recipe) => {
      const meal = recipe.strMeal?.toLowerCase() || "";
      const category = recipe.strCategory?.toLowerCase() || "";
      const area = recipe.strArea?.toLowerCase() || "";
      const instructions = recipe.strInstructions?.toLowerCase() || "";

      return (
        meal.includes(query) ||
        category.includes(query) ||
        area.includes(query) ||
        instructions.includes(query)
      );
    });

    setFilteredRecipes(results);
    console.log("Filtered recipes:", results); // Debugging
  }, [searchQuery, recipes]);

  return (
    <div>
      {loading ? (
        <p>Loading results...</p>
      ) : filteredRecipes.length > 0 ? (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p>
          No results found for <strong>"{searchQuery}"</strong>.
        </p>
      )}
    </div>
  );
}

export default ResultsPage;
