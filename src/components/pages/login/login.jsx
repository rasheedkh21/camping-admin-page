import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
const BASEURL = "https://api-camping.isabek.uz/api/v1/"



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to manage error messages

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASEURL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/sideBar");
      } else {
        setError("Invalid email or password"); // Set error message on failure
      }
    } catch (error) {
      setError("Your data is not found");
    }
  };

  return (
    <body>
      <div className="container">
        <h1>Sign In</h1>
        <div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // Clear error message when input changes
              }}
            />
            <span className="error">{error}</span> {/* Display error message */}
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Clear error message when input changes
              }}
            />
            <span className="error">{error}</span> {/* Display error message */}
          </div>
          <div className="checkbox">
            <div className="check">
              <input type="checkbox" />
              <label>Keep me logged in</label>
            </div>
            <div>
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <div>
            <button className="signin" type="submit" onClick={handleSubmit}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
