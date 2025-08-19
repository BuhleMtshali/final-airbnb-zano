import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true; // 🔐 allow cookies/tokens with requests

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', // ✅ matches backend
    email: '',
    password: '',
    role: 'user', // optional, default role
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/users/register',
        formData,
        { withCredentials: true }
      );

      console.log('✅ Registered:', res.data);

      // Option A: Redirect to login page
      navigate('/login');

      // Option B: Auto-login after register (uncomment if you want that)
      // localStorage.setItem("userInfo", JSON.stringify(res.data));
      // navigate('/dashboard');

    } catch (err) {
      console.error('❌ Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#FF5A5F] text-white py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
