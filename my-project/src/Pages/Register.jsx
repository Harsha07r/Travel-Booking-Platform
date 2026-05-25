import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth/register`;
    console.log(" Making request to:", apiUrl);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(" Response status:", res.status);
      console.log(" Response data:", data);

      if (!res.ok) {
        alert(data.message || 'Registration failed');
      } else {
        alert('Registered successfully!');
        setForm({ name: '', email: '', password: '' });
        navigate('/login'); //  Redirect to login after success
      }
    } catch (err) {
      console.error(" Error during registration:", err);
      alert('Something went wrong. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6">
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-4">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                name="name"
                id="name"
                type="text"
                className="form-control form-control-lg"
                placeholder="Your Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                name="email"
                id="email"
                type="email"
                className="form-control form-control-lg"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                name="password"
                id="password"
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter a strong password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 btn-lg"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
