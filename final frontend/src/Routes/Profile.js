import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Navbar from "../components/Navbar";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    age: '',
    email: '',
    education: '',
    phoneNumber: '',
    isBlocked: false,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const encodedEmail = searchParams.get('email');
        console.log(encodedEmail)
        
        const response = await axios.get('http://localhost:8080/api/v1/get-profiles');
        const profiles = response.data.data;

        console.log(profiles)
        
        const matchingProfile = profiles.find(profile => profile.email === encodedEmail);
        
        if (matchingProfile) {
          console.log("FOUND")
          setProfileData(matchingProfile);
          setFormData({ ...matchingProfile });
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchProfileData();
  }, []);

  const getEmail = (encodedEmail) => {
    // Decode the email here and return it
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/update-profile/${profileData._id}`, formData);
      const updatedProfile = response.data.data;
      setProfileData(updatedProfile);
      setFormData({ ...updatedProfile });
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        {editMode ? (
          <div className="profile-content">
            <div className="profile-field">
              <label className="profile-label">Name:</label>
              <input className="profile-input" type="text" name="name" value={formData.name || ''} onChange={handleChange} />
            </div>
            <div className="profile-field">
              <label className="profile-label">Place:</label>
              <input className="profile-input" type="text" name="place" value={formData.place} onChange={handleChange} />
            </div>
            <div className="profile-field">
              <label className="profile-label">Age:</label>
              <input className="profile-input" type="text" name="age" value={formData.age} onChange={handleChange} />
            </div>
            <div className="profile-field">
              <label className="profile-label">Email:</label>
              <span className="profile-value">{profileData.email}</span>
            </div>
            <div className="profile-field">
              <label className="profile-label">Education:</label>
              <input className="profile-input" type="text" name="education" value={formData.education} onChange={handleChange} />
            </div>
            <div className="profile-field">
              <label className="profile-label">Phone Number:</label>
              <input className="profile-input" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
          </div>
        ) : (
          <div className="profile-content">
            <h2 className="profile-title">Profile</h2>
            <div className="profile-field">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{profileData.name}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Place:</span>
              <span className="profile-value">{profileData.place}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Age:</span>
              <span className="profile-value">{profileData.age}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{profileData.email}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Education:</span>
              <span className="profile-value">{profileData.education}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Phone No:</span>
              <span className="profile-value">{profileData.phoneNumber}</span>
            </div>
          </div>
        )}

        <div className="profile-actions">
          {editMode ? (
            <button className="profile-button profile-save" onClick={handleSave}>Save</button>
          ) : (
            <button className="profile-button profile-edit" onClick={handleEdit}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
