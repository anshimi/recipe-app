import React, { useState } from "react";
import "../App.css";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for yummy recipes!"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
