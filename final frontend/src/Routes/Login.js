import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Profile from "./Profile";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (email === "admin@gmail.com" && password === "Adminpass11") {
        // Navigate to the Admin page 
        navigate("/admin");
      } else {
        const response = await axios.get("http://localhost:8080/api/v1/get-profiles", {
          email,
          password,
        });

        // Assuming login is unsuccessful by default
        let loginSuccessful = false;
        let arr = Object.values(response.data);
        console.log(arr);

        // Iterate over the response array and check for a match
        arr[1].forEach((profile) => {
          console.log("Here");
          if (profile.email === email && profile.password === password) {
            loginSuccessful = true;
            console.log("Login successful");
            console.log("User data:", profile);
            setLoggedInUser(profile);
          }
        });

        if (loginSuccessful) {
          // Redirect to "/dashboard" without reloading the page
          navigate("/dashboard");
        } else {
          console.log("Login failed");
          setError("Invalid email or password. Please try again.");
        }
      }
    } catch (error) {
      // Handle error
      console.log("Login failed");
      console.error("ERROR IN LOGIN");
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div>
      {loggedInUser ? (
        <Profile user={loggedInUser} />
      ) : (
        <div className="login-container">
          <div className="login-box">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2 className="login-title">Login</h2>
              <br />
              <br />
              <input
                className="login-input"
                type="email" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-button" type="submit">
                Login
              </button>
              {error && <p className="login-error">{error}</p>}
              <p className="login-signup">
                Don't have an account? <Link to="/s">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
