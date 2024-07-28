import React, { useState } from 'react';
import Logo from '../assets/logo/gharghaderi.png';
import { loginApi } from '../Apis/apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Initialize useNavigate

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handelEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(emailValue) ? '' : 'Invalid email address',
    }));
  };

  const handelPassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(passwordValue) ? '' : 'Password must be at least 6 characters',
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrors({
        email: !email ? 'Email is required' : '',
        password: !password ? 'Password is required' : '',
      });
      return;
    }

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email address',
      }));
      return;
    }

    if (!validatePassword(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 6 characters',
      }));
      return;
    }

    const data = { email, password };

    loginApi(data)
      .then((res) => {
        console.log(res.data); // Log the response data
        if (res.data.token && res.data.user) {
          toast.success('Login successful');
          localStorage.setItem("token", res.data.token);
          const convertedJson = JSON.stringify(res.data.user);
          localStorage.setItem("user", convertedJson);
          
          switch (res.data.user.role) {
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
        } else {
          toast.error('Login failed');
        }
      })
      .catch((err) => {
        console.error(err); // Log the error response for debugging
        if (err.response) {
          toast.error(err.response.data.message); // Display the error message from the server
        } else {
          toast.error('An error occurred. Please try again.');
        }
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img className="h-16 w-auto" src={Logo} alt="Your Company" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Sign in to your account</h2>
        <form className="space-y-4" onSubmit={handelSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={handelEmail}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={handelPassword}
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
