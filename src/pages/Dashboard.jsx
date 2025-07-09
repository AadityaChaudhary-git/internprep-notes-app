// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'; // ✅ Import CSS file

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    alert("Logged out ✅");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome to the Dashboard</h2>
        {user && <p className="user-email">Logged in as: <strong>{user.email}</strong></p>}
        <div className="dashboard-buttons">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => navigate("/notes")}>Go to Notes</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
