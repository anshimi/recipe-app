import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../App.css";

function Navbar({ setSelectedCategory }) {
  const [selectedCategory, setLocalSelectedCategory] = useState(""); // State for selected category
  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"]; // Array of categories

  const handleCategoryClick = (category) => {
    setLocalSelectedCategory(category); // Update local selected state for styling
    setSelectedCategory(category); // Update the selected category in the parent component
  };

  const handleLogoClick = () => {
    setLocalSelectedCategory(""); // Reset local selected category
    setSelectedCategory(""); // Pass an empty string to fetch random recipes
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={handleLogoClick}>
          Recipe Haven
        </Link>
      </div>
      <div className="navbar-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-link ${
              selectedCategory === category ? "selected-category" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <SearchBar />
      <div className="navbar-auth">
        <Link to="/login">Login</Link> / <Link to="/register">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
