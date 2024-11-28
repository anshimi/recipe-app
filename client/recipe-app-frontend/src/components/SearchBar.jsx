import React, { useState } from "react";
import "../App.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Update the parent component with the query
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
