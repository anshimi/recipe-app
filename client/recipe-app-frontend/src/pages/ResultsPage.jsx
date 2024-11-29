import React, { useEffect, useState } from "react";
import { fetchRecipesBySearch } from "../utils/fetchRecipes"; // Centralized fetch logic
import RecipeCard from "../components/RecipeCard";

function ResultsPage({ searchQuery }) {
  const [recipes, setRecipes] = useState([]); // Store all fetched recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Filtered recipes based on search
  const [paginatedRecipes, setPaginatedRecipes] = useState([]); // Recipes for current page
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track any errors
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items per page

  // Fetch recipes based on the search query
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        if (searchQuery) {
          const fetchedRecipes = await fetchRecipesBySearch(searchQuery);
          setRecipes(fetchedRecipes); // Update state with fetched recipes
        }
      } catch (err) {
        setError("Failed to load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  // Filter recipes locally based on the search query
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

  // Handle pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedRecipes(filteredRecipes.slice(startIndex, endIndex));
  }, [currentPage, filteredRecipes]);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="results-page">
      {loading ? (
        <p>Loading results...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredRecipes.length > 0 ? (
        <div>
          <div className="recipe-grid">
            {paginatedRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>

          {/* Pagination Controls */}
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
