import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "./Footer.css";

function Footer({ setSelectedCategory, setSearchQuery, selectedCategory }) {
  const navigate = useNavigate();

  // Categories to include in the application
  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"];

  // Handle logo click
  const handleLogoClick = () => {
    setSelectedCategory("");
    setSearchQuery("");
    navigate("/");
  };

  // Handle category selection
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
            <strong>Recipe Haven</strong> is your ultimate platform for culinary
            inspiration. Explore recipes tailored to your taste, from savory
            dishes to healthy options.
          </p>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <div className="footer-categories">
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className="footer-category-link"
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
          <h3>Contact Us</h3>
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
        <p>&copy; {new Date().getFullYear()} Recipe Haven</p>
      </div>
    </div>
  );
}

export default Footer;
