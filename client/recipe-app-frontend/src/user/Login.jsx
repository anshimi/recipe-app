import React, { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import axios from "axios";

function Login() {
  const { login } = useContext(AuthContext); // Access the login function from AuthContext
  const [email, setEmail] = useState(""); // State for storing user email input
  const [password, setPassword] = useState(""); // State for storing user password input
  const [message, setMessage] = useState(""); // State for displaying success or error messages

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BE_URL}/api/login`, {
        email,
        password,
      });
      login(response.data.user); // Update AuthContext
      setMessage("Login successful!");
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {message && <p className={`notification ${message.includes("failed") ? "error" : "success"}`}>{message}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
