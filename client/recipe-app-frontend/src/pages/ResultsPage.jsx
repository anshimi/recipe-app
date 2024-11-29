import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function ResultsPage({ searchQuery }) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"]; // Add more categories as needed

  // Cache to store fetched recipes
  const recipeCache = React.useRef({});

  useEffect(() => {
    const fetchAllRecipes = async () => {
      setLoading(true);

      // Check if recipes are already cached
      if (recipeCache.current.allRecipes) {
        console.log("Loading recipes from cache...");
        setRecipes(recipeCache.current.allRecipes);
        setLoading(false);
        return;
      }

      try {
        const allRecipes = [];

        for (const category of categories) {
          const categoryResponse = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
          );
          if (categoryResponse.data.meals) {
            allRecipes.push(...categoryResponse.data.meals);
          }
        }

        // Fetch details in batches
        const detailedRecipes = [];
        for (let i = 0; i < allRecipes.length; i += 10) {
          const batch = allRecipes.slice(i, i + 10);
          const batchDetails = await Promise.all(
            batch.map(async (meal) => {
              try {
                const detailsResponse = await axios.get(
                  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
                );
                return detailsResponse.data.meals[0];
              } catch (error) {
                console.error(`Error fetching details for meal ID: ${meal.idMeal}`, error);
                return null;
              }
            })
          );
          detailedRecipes.push(...batchDetails.filter((recipe) => recipe !== null));
        }

        recipeCache.current.allRecipes = detailedRecipes; // Cache the recipes
        setRecipes(detailedRecipes); // Update state with recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

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
