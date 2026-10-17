
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../component/utill";

const Signup = () => {
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setsignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;

    if (!name.trim() || !email.trim() || !password) {
      return handleError("Name, email and password are required");
    }

    try {
      setLoading(true);

      const url = "http://localhost:8000/auth/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message || "Signup successful!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || message || "Signup failed");
      } else {
        handleError(message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup request failed:", error);
      handleError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-green-50 flex items-center justify-center px-4 py-8 sm:px-6">

      {/* Signup Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8 md:p-10">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Sign up to order your favorite food
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-5">

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Full Name
            </label>

            <input
              type="text"
              name="name"
              id="name"
              autoFocus
              autoComplete="name"
              placeholder="Enter your name..."
              value={signupInfo.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-base"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>

            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-base"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              placeholder="Enter your password..."
              value={signupInfo.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-base"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 text-base font-semibold text-white shadow-md transition duration-300 hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 sm:text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-600 hover:underline"
            >
              Login
            </Link>
          </p>

        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Signup;
