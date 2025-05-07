import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

function Home() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to the App!</h1>
        <p className="mb-6 text-lg text-gray-600">
          You are successfully logged in.
        </p>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-all duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Home;
