import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const Admin = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/get-profiles');
      setProfiles(response.data.data); // Update to response.data.data
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };
  
  const handleBlockClick = (profileId) => {
    axios
      .put(`http://localhost:8080/api/v1/block-profile/${profileId}`) // Updated endpoint
      .then((response) => {
        console.log('Profile blocked successfully:', response.data);
        // Update the profiles state to reflect the updated block status
        setProfiles((prevProfiles) =>
          prevProfiles.map((profile) => {
            if (profile._id === profileId) {
              return {
                ...profile,
                isBlocked: true,
              };
            }
            return profile;
          })
        );
      })
      .catch((error) => {
        console.error('Error blocking profile:', error);
      });
  };
  
  const handleUnblockClick = (profileId) => {
    axios
      .put(`http://localhost:8080/api/v1/unblock-profile/${profileId}`) // Updated endpoint
      .then((response) => {
        console.log('Profile unblocked successfully:', response.data);
        // Update the profiles state to reflect the updated block status
        setProfiles((prevProfiles) =>
          prevProfiles.map((profile) => {
            if (profile._id === profileId) {
              return {
                ...profile,
                isBlocked: false,
              };
            }
            return profile;
          })
        );
      })
      .catch((error) => {
        console.error('Error unblocking profile:', error);
      });
  };
  
  const handleDeleteClick = (profileId) => {
    axios
      .delete(`http://localhost:8080/api/v1/delete-profile/${profileId}`) // Updated endpoint
      .then((response) => {
        console.log('Profile deleted successfully:', response.data);
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile._id !== profileId) // Update profile.id to profile._id
        );
      })
      .catch((error) => {
        console.error('Error deleting profile:', error);
      });
  };
  

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            profiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>{profile.name}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>
                  {profile.isBlocked ? (
                    <Button variant="contained" color="primary" onClick={() => handleUnblockClick(profile._id)}>
                      Unblock
                    </Button>
                  ) : (
                    <Button variant="contained" color="secondary" onClick={() => handleBlockClick(profile._id)}>
                      Block
                    </Button>
                  )}
                  <Button variant="contained" color="error" onClick={() => handleDeleteClick(profile._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Admin;
