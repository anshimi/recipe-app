import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BE_URL}/api/register`, {
        email,
        password,
      });
      setMessage("Registration successful! You can now log in.");
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
