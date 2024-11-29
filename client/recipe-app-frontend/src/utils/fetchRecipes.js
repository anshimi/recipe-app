import axios from "axios";

const categories = ["Chicken", "Beef", "Pork", "Vegetarian"]; // Allowed categories

// Fetch recipes for a specific category
export const fetchRecipesByCategory = async (category) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    return response.data.meals || [];
  } catch (error) {
    console.error(`Error fetching recipes for category: ${category}`, error);
    return [];
  }
};

// Fetch detailed information for a specific meal
export const fetchRecipeDetails = async (mealId) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error(`Error fetching recipe details for meal ID: ${mealId}`, error);
    return null;
  }
};

// Fetch recipes for all allowed categories
export const fetchAllRecipes = async () => {
  try {
    const allRecipes = [];
    for (const category of categories) {
      const categoryRecipes = await fetchRecipesByCategory(category);
      allRecipes.push(...categoryRecipes);
    }
    return allRecipes;
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return [];
  }
};

export const fetchRecipesBySearch = async (query) => {
    try {
      // Fetch all recipes matching the name query
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=`
      );
      const allRecipes = response.data.meals || [];
  
      // Filter recipes locally to match the query across all fields
      const filteredRecipes = allRecipes.filter((recipe) => {
        const meal = recipe.strMeal?.toLowerCase() || "";
        const category = recipe.strCategory?.toLowerCase() || "";
        const area = recipe.strArea?.toLowerCase() || "";
        const instructions = recipe.strInstructions?.toLowerCase() || "";
  
        return (
          meal.includes(query.toLowerCase()) ||
          category.includes(query.toLowerCase()) ||
          area.includes(query.toLowerCase()) ||
          instructions.includes(query.toLowerCase())
        );
      });
  
      return filteredRecipes;
    } catch (error) {
      console.error(`Error fetching recipes for query: ${query}`, error);
      return []; // Return an empty array to prevent breaking the app
    }
  };