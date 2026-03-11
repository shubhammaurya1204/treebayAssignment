import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export const serverUrl = "https://treebayassignment.onrender.com";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Form from "./pages/Form";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import { Navigate } from "react-router-dom";

function App() {
  const userData = useSelector((state) => state.user.user);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col text-[var(--text-primary)]">
        <Navbar />
        <main className="flex-1 flex flex-col p-4 w-full max-w-7xl mx-auto mb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/form" element={userData ? <Form /> : <Navigate to="/" />} />
            <Route path="/admin" element={userData && userData.isAdmin ? <Admin /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
