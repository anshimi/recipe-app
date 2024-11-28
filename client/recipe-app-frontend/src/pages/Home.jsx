import React from "react";
import RecipeCard from "../components/RecipeCard";

function Home({ recipes, selectedCategory, searchQuery }) {
  // Filter recipes based on category and search query
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory
      ? recipe.strCategory === selectedCategory
      : true;
    const matchesSearch = searchQuery
      ? recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.strCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.strInstructions.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="recipe-grid">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))
      ) : (
        <p>No recipes found. Try adjusting your filters.</p>
      )}
    </div>
  );
}

export default Home;
