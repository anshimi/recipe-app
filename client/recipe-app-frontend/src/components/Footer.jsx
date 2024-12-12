import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "./Footer.css";

function Footer({ setSelectedCategory, setSearchQuery, selectedCategory, fetchRecipesByCategory, fetchAllRecipes }) {
  const navigate = useNavigate();
  
  // Allowed Categories to include in Application
  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"];

  // Handles logo click
  const handleLogoClick = () => {
    setSelectedCategory("");
    setSearchQuery("");
    navigate("/");
  };

  // Handles category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); 
    setSearchQuery(""); 
    navigate("/"); 
  };

  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <footer className="footer-component">
        <div className="footer-section">
          <Link to="/" onClick={handleLogoClick}>
            <h3>Recipe Haven</h3>
          </Link>
          <p className="footer-blurb">
            <strong>Recipe Haven</strong> delicious recipes tailored to your taste. From savory dishes to healthy options, Recipe Haven is your one-stop platform for culinary inspiration.
          </p>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <div className="footer-categories">
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className="footer-link"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact us</h3>
          <p>
            <a href="mailto:email@recipehaven.ca">email@recipehaven.ca</a>
          </p>
          <p>
            201 James St N
            <br />
            Hamilton, ON, L8R 2L2
          </p>
          <p>(905) 528-5548</p>
        </div>
      </footer>
      <div className="footer-copyright">
        <p>&copy; Recipe Haven</p>
      </div>
    </div>
  );
}

export default Footer;
