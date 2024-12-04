import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import "./Footer.css";

function Footer() {
  const handleLogoClick = () => {
    setSelectedCategory(""); 
    setSearchQuery("");
    navigate("/"); 
  };

  const categoeries = ["Chicken", "Beef", "Pork", "Vegetarian"];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate("/");
  }
  return (
    <div>
      <footer className="footer-component">
        <div className="footer-section">
          <Link to="/" onClick={handleLogoClick}>
            <h3>Recipe Haven</h3>
          </Link>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          {/* <ul>
            <li><Link to="/category/Chicken">Chicken</Link></li>
            <li><Link to="/category/Beef">Beef</Link></li>
            <li><Link to="/category/Pork">Pork</Link></li>
            <li><Link to="/category/Vegetables">Vegetables</Link></li>
          </ul> */}

          
        </div>
        <div className="footer-section">
          <h3>Contact us</h3>
          <p>email@recipehaven.ca</p>
          <p>201 James St N<br/>Hamilton, ON, L8R 2L2</p>
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
