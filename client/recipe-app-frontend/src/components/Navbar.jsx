import React, { useState, useEffect, useContext } from "react"; // Added useContext
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../components/AuthContext"; // AuthContext for user authentication
import "../App.css";

function Navbar({ setSelectedCategory, setSearchQuery }) {
  const [query, setQuery] = useState("");
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext
  console.log("User in Navbar:", user); // Debugging log
  const navigate = useNavigate();
  const location = useLocation(); // Detect current route

  const handleSearch = () => {
    setSearchQuery(query); // Pass the search query to the parent
    navigate("/results"); // Redirect to the results page
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Trigger search on "Enter" key
    }
  };

  const handleLogoClick = () => {
    setSelectedCategory(""); // Reset category filter
    setSearchQuery(""); // Reset search query
    navigate("/"); // Navigate back to the homepage
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Set the selected category
    setSearchQuery(""); // Clear any existing search query
    navigate("/"); // Navigate back to the homepage
  };

  // Clear search box when navigating away from Results Page
  useEffect(() => {
    if (location.pathname !== "/results") {
      setQuery(""); // Clear search input box
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
