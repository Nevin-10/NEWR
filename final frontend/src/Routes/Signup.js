import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsChecked) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match.");
      return;
    }

    // Prepare the profile data
    const profileData = {
      name,
      place,
      age,
      email,
      education,
      phoneNumber,
      password,
    };

    // Make the createProfile API call here
    createProfile(profileData);
  };

  const createProfile = (profileData) => {
    // Replace this with the actual createProfile API call
    // Example asynchronous API call using fetch:
    fetch("http://localhost:8080/api/v1/createProfile", {
      method: "POST",
      body: JSON.stringify(profileData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Sign-up successful");
          navigate("/login");
        } else {
          alert("Sign-up failed");
        }
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Sign Up Here</h2>
          <input
            className="login-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="login-input"
            type="text"
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <input
            className="login-input"
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            className="login-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="text"
            placeholder="Education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
          <input
            className="login-input"
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="signup-checkbox-container">
            <input
              className="signup-checkbox"
              type="checkbox"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />
            <label className="signup-checkbox-label">
              <span>Make sure you read the instructions</span>
              <span className="signup-asterisk">*</span>
            </label>
          </div>
          <button className="login-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
