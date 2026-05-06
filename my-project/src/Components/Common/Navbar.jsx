import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext.jsx';
import '../../Styles/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm" role="navigation" aria-label="Main Navigation">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/" aria-label="Home">
      <h1 className="mb-0 brand-title">Royal Horizon</h1>
          </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/" aria-label="Home">HOME</Link>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href={isHome ? undefined : "/#packages"} aria-label="Packages"
                onClick={e => { if (isHome) { e.preventDefault(); scrollToSection('packages'); } }}
              >PACKAGES</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href={isHome ? undefined : "/#destinations"} aria-label="Destinations"
                onClick={e => { if (isHome) { e.preventDefault(); scrollToSection('destinations'); } }}
              >DESTINATIONS</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href={isHome ? undefined : "/#reviews"} aria-label="Reviews"
                onClick={e => { if (isHome) { e.preventDefault(); scrollToSection('reviews'); } }}
              >REVIEWS</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href={isHome ? undefined : "/#enquiry"} aria-label="Contact"
                onClick={e => { if (isHome) { e.preventDefault(); scrollToSection('enquiry'); } }}
              >CONTACT</a>
            </li>
          </ul>

          <div className="d-flex align-items-center px-4">
            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn d-flex align-items-center gap-2 dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: 'none', background: 'transparent' }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor: '#0d6efd',
                      fontSize: 14,
                      textTransform: 'uppercase'
                    }}
                  >
                    {(user?.name?.[0] || user?.email?.[0] || 'G')}
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => { logout(); navigate('/'); }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <button onClick={() => navigate('/register')} className="btn btn-outline-primary ms-2">Register</button>
                <button onClick={() => navigate('/login')} className="btn btn-outline-success ms-2">Login</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
