import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../Styles/AdminDashboard.css';

import {
  FiLogOut,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiFilter,
  FiPhone,
  FiMail,
  FiCheck,
  FiX
} from 'react-icons/fi';

const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
    fetchBookings();
  }, [filter]);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchBookings = async () => {
    try {

      setLoading(true);

      const token = localStorage.getItem('adminToken');

      const params =
        filter !== 'all'
          ? { status: filter }
          : {};

      const res = await axios.get(
        `${BASE_URL}/api/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params
        }
      );

      console.log('Bookings response:', res.data);

      setBookings(res.data.bookings || []);
      setStats(res.data.stats || {});
      setError('');

    } catch (err) {

      console.error('Fetch bookings error:', err);

      setError(
        err.response?.data?.message ||
        'Failed to load bookings'
      );

    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id,
    status,
    adminNotes = ''
  ) => {

    try {

      const token = localStorage.getItem('adminToken');

      await axios.put(
        `${BASE_URL}/api/bookings/${id}/status`,
        {
          status,
          adminNotes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchBookings();

    } catch (err) {

      console.error('Status update error:', err);

      alert(
        err.response?.data?.message ||
        'Status update failed'
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');

    navigate('/admin/login');
  };

  const getStatusBadgeClass = (status) => {

    if (status === 'Confirmed') {
      return 'badge-success';
    }

    if (status === 'Pending') {
      return 'badge-warning';
    }

    if (status === 'Rejected') {
      return 'badge-danger';
    }

    return 'badge-secondary';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      {/* HEADER */}

      <header className="dashboard-header">
        <div className="container header-content">

          <h1>Admin Dashboard</h1>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FiLogOut />
            Logout
          </button>

        </div>
      </header>

      <div className="container">

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">
            <FiUsers className="stat-icon total" />

            <div>
              <h3>{stats.total || 0}</h3>
              <p>Total Bookings</p>
            </div>
          </div>

          <div className="stat-card">
            <FiClock className="stat-icon pending" />

            <div>
              <h3>{stats.pending || 0}</h3>
              <p>Pending</p>
            </div>
          </div>

          <div className="stat-card">
            <FiCheckCircle className="stat-icon confirmed" />

            <div>
              <h3>{stats.confirmed || 0}</h3>
              <p>Confirmed</p>
            </div>
          </div>

          <div className="stat-card">
            <FiXCircle className="stat-icon rejected" />

            <div>
              <h3>{stats.rejected || 0}</h3>
              <p>Rejected</p>
            </div>
          </div>

        </div>

        {/* FILTERS */}

        <div className="filter-section">

          <FiFilter />

          {['all', 'Pending', 'Confirmed', 'Rejected']
            .map((status) => (

            <button
              key={status}
              className={`filter-btn ${
                filter === status
                  ? 'active'
                  : ''
              }`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>

          ))}
        </div>

        {/* BOOKINGS TABLE */}

        <div className="bookings-section">

          <h2>Booking Management</h2>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <div className="table-responsive">

            <table className="bookings-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Tour</th>
                  <th>Date</th>
                  <th>People</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {bookings.map((b) => (

                  <tr key={b._id}>

                    <td>
                      #{b._id.slice(-6)}
                    </td>

                    <td>
                      <strong>{b.fullName}</strong>
                      <br />
                      <small>{b.email}</small>
                    </td>

                    <td>{b.tourName}</td>

                    <td>
                      {new Date(
                        b.travelDate
                      ).toLocaleDateString()}
                    </td>

                    <td>{b.numberOfPeople}</td>

                    <td className="contact-cell">

                      <a href={`tel:${b.phone}`}>
                        <FiPhone />
                      </a>

                      <a href={`mailto:${b.email}`}>
                        <FiMail />
                      </a>

                    </td>

                    <td>

                      <span
                        className={`status-badge ${getStatusBadgeClass(b.status)}`}
                      >
                        {b.status}
                      </span>

                    </td>

                    <td className="actions-cell">

                      {b.status === 'Pending' ? (
                        <>

                          <button
                            className="action-btn confirm-btn"
                            onClick={() =>
                              handleStatusUpdate(
                                b._id,
                                'Confirmed'
                              )
                            }
                          >
                            <FiCheck />
                          </button>

                          <button
                            className="action-btn reject-btn"
                            onClick={() =>
                              handleStatusUpdate(
                                b._id,
                                'Rejected'
                              )
                            }
                          >
                            <FiX />
                          </button>

                        </>
                      ) : (
                        '—'
                      )}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;