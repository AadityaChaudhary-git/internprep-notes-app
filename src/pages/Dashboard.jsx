// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Welcome to the Dashboard</h2>
      {user && <p>Logged in as: <strong>{user.email}</strong></p>}
      <button onClick={handleLogout}>Logout</button>
      <br /><br />
      <button onClick={() => navigate("/notes")}>Go to Notes</button>
    </div>
  );
}

export default Dashboard;
