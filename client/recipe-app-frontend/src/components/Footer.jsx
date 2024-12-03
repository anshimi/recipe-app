import React from "react"; 
import { Link } from "react-router-dom"; // Import Link for navigation
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Recipe Haven</h3>
      </div>
      <div className="footer-section">
        <h3>Categories</h3>
        <ul>
          <li><Link to="/category/Chicken">Chicken</Link></li>
          <li><Link to="/category/Beef">Beef</Link></li>
          <li><Link to="/category/Pork">Pork</Link></li>
          <li><Link to="/category/Vegetables">Vegetables</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Contact us</h3>
        <p>email@recipehaven.ca</p>
        <p>201 James St N<br/>Hamilton, ON, L8R 2L2</p>
        <p>(905) 528-5548</p>
      </div>
      <div className="footer-copyright">
        <p>&copy; Food for Thought</p>
      </div>
    </footer>
  );
}

export default Footer;
