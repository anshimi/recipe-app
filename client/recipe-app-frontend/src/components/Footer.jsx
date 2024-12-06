import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "./Footer.css";

function Footer({ setSelectedCategory, setSearchQuery }) {
  const navigate = useNavigate();

  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"];

  const handleLogoClick = () => {
    setSelectedCategory("");
    setSearchQuery("");
    navigate("/");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    navigate(`/category/${category.toLowerCase()}`); 
  };

  return (
    <div>
      <footer className="footer-component">
        <div className="footer-section">
          <Link to="/" onClick={handleLogoClick}>
            <h3>Recipe Haven</h3>
          </Link>
          <p className="footer-blurb"><strong>Recipe Haven</strong> delicious recipes tailored to your taste. From savory dishes to healthy options, Recipe Haven is your one-stop platform for culinary inspiration.</p>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <div className="footer-categories">
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/category/${category.toLowerCase()}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Link>
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
