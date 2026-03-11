import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setUser } from "../slices/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    console.log("1")
    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/api/users/signup`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify(formData),
});

      const data = await response.json();
      setLoading(false);
      console.log("2")
      if (response.ok) {
        dispatch(setUser(data));
        navigate("/form");
        console.log("3")
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred during signup.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md glass-panel p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold heading-gradient">Create Account</h1>
          <p className="text-[var(--text-secondary)] mt-2">Join TreeBay today</p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary mt-4 w-full py-3">
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-[var(--text-secondary)]">
          Already have an account? <Link to="/" className="text-[var(--accent-color)] hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
