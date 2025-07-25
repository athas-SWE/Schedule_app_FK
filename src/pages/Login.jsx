import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await API.post("/auth/login", { username, password });
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin");
      }
    } catch {
      setErrorMsg("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
          required
        />

        {errorMsg && (
          <p className="text-red-600 mb-4 text-center font-semibold">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
