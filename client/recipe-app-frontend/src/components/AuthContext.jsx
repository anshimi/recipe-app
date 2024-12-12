import React, { createContext, useState, useEffect } from "react";

// Create AuthContext for managing user authentication and favorite recipes
export const AuthContext = createContext();
// AuthProvider component to provide authentication-related state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function to set user data
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function to clear user data
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

   // Function to add a recipe to the user's favorites
  const addFavorite = (recipe) => {
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        favorites: [...(prevUser.favorites || []), recipe],
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};
