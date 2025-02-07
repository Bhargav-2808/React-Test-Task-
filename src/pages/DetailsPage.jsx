import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';

const DetailsPage = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      const foundUser = parsedUsers.find(u => u.email === email);
      setUser(foundUser);
    }
  }, [email]);

  if (!user) {
    return (
      <div className="details-container">
        <h2>User Not Found</h2>
        <button className="back-btn" onClick={() => navigate('/')}>Back</button>
      </div>
    );
  }

  return (
    <div className="details-container">
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <button className="back-btn" onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default DetailsPage;
