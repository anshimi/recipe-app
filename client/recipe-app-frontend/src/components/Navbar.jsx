import React, { useState, useEffect, useContext } from "react"; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../components/AuthContext"; 
import "../App.css";

function Navbar({ setSelectedCategory, setSearchQuery }) {
  const [query, setQuery] = useState("");
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext
  console.log("User in Navbar:", user); 
  const navigate = useNavigate();
  const location = useLocation(); // Detect current route

  // Handle recipe search
  const handleSearch = () => {
    setSearchQuery(query); 
    navigate("/results"); 
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(); 
    }
  };

  // Handle logo click - when click on the title
  const handleLogoClick = () => {
    setSelectedCategory(""); 
    setSearchQuery(""); 
    navigate("/"); 
  };

  // Handle category click - when click on the category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); 
    setSearchQuery(""); 
    navigate("/"); 
  };

  // Clear search box when navigating away from Results Page
  useEffect(() => {
    if (location.pathname !== "/results") {
      setQuery(""); 
    }
  }, [location.pathname]);

  const categories = ["Chicken", "Beef", "Pork", "Vegetarian"];

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
            className="category-link"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update the query state
          onKeyPress={handleKeyPress} // Handle "Enter" key press
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="navbar-auth">
        {!user ? (
          <>
            <Link to="/login">Login</Link> / <Link to="/register">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
