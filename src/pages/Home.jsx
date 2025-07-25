import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-center p-6">
    <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
      Welcome to Wellness Studio
    </h1>
    <p className="text-lg mb-8 text-gray-600">
      Schedule your wellness appointments easily
    </p>
    <div className="space-x-4">
      <Link
        to="/client"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
      >
        Client
      </Link>
      <Link
        to="/login"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
      >
        Admin
      </Link>
    </div>
  </div>
);

export default Home;
