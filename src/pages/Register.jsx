import React, { useState } from "react";
import { registerApi } from "../Apis/apis";
import Logo from "../assets/logo/gharghaderi.png";
import { toast } from "react-toastify";
import PasswordStrengthBar from 'react-password-strength-bar';  // Import the password strength bar

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (/\d/.test(name)) {
      newErrors.name = "Name should not contain numbers";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
      valid = false;
    }

    if (!/[a-z]/.test(password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
      valid = false;
    }

    if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number";
      valid = false;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Password must contain at least one special character";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await registerApi({
        name,
        email,
        password,
        role,
      });

      if (response.status) {
        setMessage("Registration Successful!");
        toast.success(response.data.message);

        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setRole("buyer");
        setMessage("");
        setErrors({}); // Clear any validation errors
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong!");
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img className="h-16 w-auto" src={Logo} alt="Your Company" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
          Sign up for an account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              {/* Add PasswordStrengthBar component */}
              <PasswordStrengthBar password={password} />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value="buyer">Buyer</option>
                <option value="owner">Owner</option>
                <option value="agent">Agent</option>
                {/* <option value="admin">Admin</option> */}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Sign up
          </button>
          {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
