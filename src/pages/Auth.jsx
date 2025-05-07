import React from "react";
import AuthForm from "../components/AuthForm";

function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 animate-fade-in">
        <AuthForm />
      </div>
    </div>
  );
}

export default Auth;
