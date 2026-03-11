import React, { useState } from "react";
import { serverUrl } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setFormData } from "../slices/formSlice";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const formData = useSelector((state) => state.form.formData);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to submit a form.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${serverUrl}/api/forms/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      setLoading(false);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSuccess(true);
      dispatch(
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: ""
        })
      );

      setTimeout(() => {
        setSuccess(false);
        navigate("/admin");
      }, 2000);

    } catch (error) {
      setLoading(false);
      console.error("Form submission error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-8">
      <div className="w-full max-w-2xl glass-panel p-8 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold heading-gradient">Registration Form</h1>
          <p className="text-[var(--text-secondary)] mt-2">Please fill in the details below to register your query.</p>
        </div>

        {error && (
          <div className="p-4 mb-6 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 mb-6 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            Form submitted successfully! Redirecting to dashboard...
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name || ""}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email || ""}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Your Phone Number"
              required
              value={formData.phone || ""}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              required
              value={formData.address || ""}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Message</label>
            <textarea
              name="message"
              placeholder="How can we help you?"
              required
              value={formData.message || ""}
              onChange={handleChange}
              className="input-field min-h-[120px] resize-y"
            />
          </div>

          <div className="md:col-span-2 mt-4 flex justify-end">
            <button type="submit" disabled={loading || success} className="btn-primary py-3 px-8 w-full md:w-auto">
              {loading ? "Submitting..." : "Submit Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;