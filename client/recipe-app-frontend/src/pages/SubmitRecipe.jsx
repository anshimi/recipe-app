import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";

const SubmitRecipe = () => {
  const { user } = useContext(AuthContext);
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

    if (!user) {
      alert("Please log in to submit a recipe.");
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("userId", user.id); // Attach the user ID
    dataToSend.append("title", formData.title);
    dataToSend.append("category", formData.category);
    dataToSend.append("prepTime", formData.prepTime);
    dataToSend.append("serving", formData.serving);
    dataToSend.append("ingredients", formData.ingredients);
    dataToSend.append("instructions", formData.instructions);

    if (formData.image) {
      dataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE_URL}/api/submittedrecipes`,
        dataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        alert("Recipe submitted successfully!");
        setFormData({
          title: "",
          category: "",
          prepTime: "",
          serving: "",
          ingredients: "",
          instructions: "",
          image: null,
        });
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("An error occurred while submitting the recipe.");
    }
  };

  return (
    <div className="submit-recipe-container">
      <h1 className="submit-recipe-title">Submit Your Recipe</h1>
      <form className="submit-recipe-form" onSubmit={handleSubmit}>
        {/* Input fields */}
        <label>
          Recipe Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="submit-recipe-input" />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="submit-recipe-input" />
        </label>
        <label>
          Prep Time:
          <input type="text" name="prepTime" value={formData.prepTime} onChange={handleChange} className="submit-recipe-input" />
        </label>
        <label>
          Serving:
          <input type="number" name="serving" value={formData.serving} onChange={handleChange} className="submit-recipe-input" />
        </label>
        <label>
          Ingredients:
          <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} rows="4" className="submit-recipe-textarea" />
        </label>
        <label>
          Instructions:
          <textarea name="instructions" value={formData.instructions} onChange={handleChange} rows="4" className="submit-recipe-textarea" />
        </label>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleFileChange} className="submit-recipe-file-input" />
        </label>
        <button type="submit" className="submit-recipe-btn">Submit Recipe</button>
      </form>
    </div>
  );
};

export default SubmitRecipe;
