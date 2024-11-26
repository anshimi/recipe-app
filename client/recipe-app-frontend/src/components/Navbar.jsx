import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../App.css";

function Navbar() {
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"]; // Array of categories

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Recipe Haven</Link>
      </div>
      <div className="navbar-categories">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category.toLowerCase()}`}
            className={`category-link ${
              selectedCategory === category ? "selected-category" : ""
            }`}
            onClick={() => setSelectedCategory(category)} // Update selected category
          >
            {category}
          </Link>
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
