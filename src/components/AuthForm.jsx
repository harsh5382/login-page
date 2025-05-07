import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", userCredential.user.uid), {
          userId: userCredential.user.uid,
          name: name || "Anonymous",
          email,
          phone: null,
          role: "customer",
          bookingHistory: [],
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          authProvider: "email",
        });
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          userId: user.uid,
          name: user.displayName || "Anonymous",
          email: user.email,
          phone: null,
          role: "customer",
          bookingHistory: [],
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          authProvider: "google",
        },
        { merge: true }
      );

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transform transition-all duration-500 animate-fade-in max-w-sm w-full mx-auto px-6 py-8 bg-white rounded-xl shadow-xl">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      {error && (
        <div className="text-red-500 mb-4 bg-red-100 p-3 rounded-lg">
          {error}
        </div>
      )}
      <div className="mb-6">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Login"}
        </button>
      </div>
      <form onSubmit={handleEmailAuth}>
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
          />
          <label className="text-gray-700">Remember Me</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-all duration-300"
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <div className="mt-6">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex items-center justify-center transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.24 10.4V14h-1.2v-3.6H9.6V9.2h1.44V7.6h1.2v1.6h1.44v1.2h-1.44zm-2.4 5.6V14h1.2v1.6H9.84zM12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-18.4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
