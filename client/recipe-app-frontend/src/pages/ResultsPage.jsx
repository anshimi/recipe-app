import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function ResultsPage({ searchQuery }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        const filteredRecipes = response.data.meals.filter((recipe) => {
          const query = searchQuery.toLowerCase();
          return (
            recipe.strMeal.toLowerCase().includes(query) ||
            recipe.strCategory.toLowerCase().includes(query) ||
            recipe.strArea.toLowerCase().includes(query) ||
            recipe.strInstructions.toLowerCase().includes(query)
          );
        });
        setRecipes(filteredRecipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchRecipes();
    }
  }, [searchQuery]);

  return (
    <div>
      {loading ? (
        <p>Loading results...</p>
      ) : recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
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
