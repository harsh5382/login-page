import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: { background: "#333", color: "#fff" },
        }}
      />
      <Routes>
        <Route path="/auth" element={<Auth toast={toast} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home toast={toast} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
