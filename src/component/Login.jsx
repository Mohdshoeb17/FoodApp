
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../component/utill";
import { dataContext } from "../contennt/UserContext";

const Login = () => {
  const { setUser } = useContext(dataContext);

  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setloginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email.trim() || !password) {
      return handleError("Email and password are required");
    }

    try {
      setLoading(true);

      const url = "http://localhost:8000/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();

      const {
        success,
        message,
        jwtToken,
        name,
        error,
      } = result;

      if (success) {
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);

        // Update global user context
        setUser(result);

        handleSuccess(message || "Login successful!");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || message || "Login failed");
      } else {
        handleError(message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login request failed:", error);
      handleError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-green-50 flex items-center justify-center px-4 py-8 sm:px-6">

      {/* Login Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8 md:p-10">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Welcome Back!
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Login to order your favorite food
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

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
              value={loginInfo.email}
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
              autoComplete="current-password"
              placeholder="Enter your password..."
              value={loginInfo.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-base"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 text-base font-semibold text-white shadow-md transition duration-300 hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 sm:text-base">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-green-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Login;
