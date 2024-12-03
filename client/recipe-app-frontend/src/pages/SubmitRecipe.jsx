import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const SubmitRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    prepTime: "",
    serving: "",
    ingredients: "",
    instructions: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("category", formData.category);
    dataToSend.append("prepTime", formData.prepTime);
    dataToSend.append("serving", formData.serving);
    dataToSend.append("ingredients", formData.ingredients);
    dataToSend.append("instructions", formData.instructions);
  
    if (formData.image) {
      dataToSend.append("image", formData.image); // Include the image file
    }
  
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}", {
        method: "POST",
        body: dataToSend,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Recipe submitted successfully:", result);
        alert("Recipe submitted successfully!");
      } else {
        console.error("Error submitting recipe:", response.statusText);
        alert("Failed to submit the recipe. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the recipe.");
    }
  };
  

  return (
    <div className="submit-recipe-container">
      <h1 className="submit-recipe-title">Recipe Submission</h1>
      <form className="submit-recipe-form" onSubmit={handleSubmit}>
        <label>
          Recipe Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="submit-recipe-input"
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="submit-recipe-input"
          />
        </label>
        <label>
          Prep Time:
          <input
            type="text"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            className="submit-recipe-input"
          />
        </label>
        <label>
          Serving:
          <input
            type="number"
            name="serving"
            value={formData.serving}
            onChange={handleChange}
            className="submit-recipe-input"
          />
        </label>
        <label>
          Ingredients:
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows="4"
            className="submit-recipe-textarea"
          />
        </label>
        <label>
          Instructions:
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="4"
            className="submit-recipe-textarea"
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="submit-recipe-file-input"
          />
        </label>
        <button type="submit" className="submit-recipe-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitRecipe;
