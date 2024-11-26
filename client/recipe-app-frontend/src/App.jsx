import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Chicken"); // Default category

  return (
    <div>
      {/* Pass setSelectedCategory to Navbar to handle category selection */}
      <Navbar setSelectedCategory={setSelectedCategory} />

      {/* Define routes */}
      <Routes>
        {/* Pass the selected category to the Home component */}
        <Route path="/" element={<Home selectedCategory={selectedCategory} />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
