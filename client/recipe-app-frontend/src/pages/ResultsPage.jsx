import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function ResultsPage({ searchQuery }) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 10; // Number of items to show per page

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
  }, [searchQuery, recipes]);

  // Calculate paginated recipes
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  return (
    <div>
      {loading ? (
        <p>Loading results...</p>
      ) : filteredRecipes.length > 0 ? (
        <div>
          <div className="recipe-grid">
            {paginatedRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>

          {/* Pagination controls */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
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