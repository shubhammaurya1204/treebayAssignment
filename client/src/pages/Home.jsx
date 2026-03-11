import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { serverUrl } from "../App";
import { setUser } from "../slices/userSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        dispatch(setUser(data));
        navigate("/form");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred during login.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] gap-12 mt-8">
      <div className="md:w-1/2 flex flex-col gap-6 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight heading-gradient leading-tight">
          Welcome to <br />TreeBay
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-md mx-auto md:mx-0">
          The most professional forms application experience. Login or create an account to start submitting your queries.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <Link to="/signup" className="btn-secondary">Create Account</Link>
        </div>
      </div>

      <div className="md:w-[450px] w-full mt-8 md:mt-0 glass-panel p-8">
        <h2 className="text-2xl font-semibold mb-6 text-white">Sign In</h2>
        
        {error && (
          <div className="p-3 mb-4 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={credentials.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary mt-2 w-full py-3">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-[var(--text-secondary)]">
          Don't have an account? <Link to="/signup" className="text-[var(--accent-color)] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;