import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return user ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;
