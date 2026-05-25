import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/AdminLogin.css';

const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');

const AdminLogin = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/login`,
        {
          email: credentials.email.trim().toLowerCase(),
          password: credentials.password
        }
      );

      console.log('Admin login response:', response.data);

      localStorage.setItem(
        'adminToken',
        response.data.token
      );

      localStorage.setItem(
        'adminInfo',
        JSON.stringify(response.data.admin)
      );

      navigate('/admin/dashboard');

    } catch (err) {
      console.error('Admin login error:', err);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">

        <div className="admin-login-header">
          <h1>Admin Login</h1>
          <p>Royal Horizon – Admin Dashboard</p>
        </div>

        {error && (
          <div className="error-alert">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="admin-login-form"
        >

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? 'Logging in...'
              : 'Login'}
          </button>

        </form>

        <div className="admin-login-footer">
          <p>
            Protected area — Authorized personnel only
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;