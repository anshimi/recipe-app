import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../App.css";

function Navbar({ setSelectedCategory }) {
  const [selectedCategory, setLocalSelectedCategory] = useState(""); // State for selected category
  const navigate = useNavigate(); // React Router navigation

  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"]; // Array of categories

  const handleCategoryClick = (category) => {
    setLocalSelectedCategory(category); // Update local state for styling
    setSelectedCategory(category); // Update the selected category in the parent component
    navigate("/"); // Navigate to the home page
  };

  const handleLogoClick = () => {
    setSelectedCategory(""); // Reset to random recipes on logo click
    navigate("/"); // Navigate to home page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Logo click handler */}
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
