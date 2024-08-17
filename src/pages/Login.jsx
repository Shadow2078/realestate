import React, { useState } from 'react';
import Logo from '../assets/logo/gharghaderi.png';
import { loginApi } from '../Apis/apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;
    let errorMessages = {};

    if (!email) {
      errorMessages.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      errorMessages.email = 'Invalid email address';
      valid = false;
    }

    if (!password) {
      errorMessages.password = 'Password is required';
      valid = false;
    } else if (!validatePassword(password)) {
      errorMessages.password = 'Password must be at least 8 characters long';
      valid = false;
    }

    if (!valid) {
      setErrors(errorMessages);
      return;
    }

    try {
      const response = await loginApi({ email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success('Login successful');

        switch (response.data.user.role) {
          case 'admin':
            navigate('/admindashboard');
            break;
          case 'owner':
            navigate('/ownerdashboard');
            break;
          case 'agent':
            navigate('/agentdashboard');
            break;
          case 'buyer':
            navigate('/buyerdashboard');
            break;
          default:
            navigate('/');
            break;
        }
      } else if (response.data.passwordExpired) {
        toast.error('Your password has expired. Please update it.');
        navigate('/update-password');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 429) {
        toast.error('Too many login attempts. Please try again later.');
      } else if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img className="h-16 w-auto" src={Logo} alt="Gharghaderi Logo" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Sign in to your account</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
