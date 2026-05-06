# Royal Horizon — Travel Booking Platform

A full-stack travel booking web application built with React (Vite) and Node.js (Express + MongoDB). Users can explore curated tour packages across destinations like Kashmir, Ladakh, Kerala, and Manali, book trips, and track their reservations. Admins can manage all bookings through a protected dashboard.

---

## What It Does

- Browse destination-focused tour packages with detailed itineraries
- Real-time booking with date-picker and availability checks
- Secure user authentication (register / login) with JWT
- Admin dashboard to view, filter, and approve/reject booking requests
- Email notifications on booking creation and status updates
- Contact form for general inquiries
- Responsive design using Bootstrap and custom CSS

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router, Bootstrap 5, AOS (scroll animations) |
| Backend | Node.js, Express, MongoDB (Mongoose), JWT |
| Email | Nodemailer (Gmail SMTP) |
| Other | Axios, React-Toastify, React-Datepicker, React-Icons |

---

## Project Structure

```
Travel final/
├── backend/                 # Express API
│   ├── controllers/         # Route handlers
│   ├── models/              # Mongoose schemas (User, Booking, Admin, Contact)
│   ├── routes/              # API routes
│   ├── middleware/          # Auth & admin guards
│   ├── services/            # Email service
│   └── server.js            # Entry point
│
├── my-project/              # React frontend (Vite)
│   ├── src/
│   │   ├── Components/      # Reusable components & sections
│   │   ├── Pages/           # Route-level pages
│   │   ├── Contexts/        # AuthContext for global login state
│   │   ├── Styles/          # CSS files
│   │   └── App.jsx          # Router setup
│   └── .env                 # VITE_API_BASE_URL, VITE_API_URL
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- Gmail account (for email notifications)

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/Travel-Booking-Platform.git
cd Travel-Booking-Platform

# Backend
cd backend
npm install

# Frontend
cd ../my-project
npm install
```

### 2. Environment Variables

**Backend** — create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/mydb?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here

# Email (Gmail SMTP)
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password

DEFAULT_TOUR_CAPACITY=10
```

> Use an [App Password](https://support.google.com/accounts/answer/185833) for Gmail, not your regular password.

**Frontend** — create `my-project/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_API_URL=https://your-deployed-backend.onrender.com
```

Use `VITE_API_BASE_URL` for local dev, `VITE_API_URL` for production.

### 3. Run Locally

```bash
# Terminal 1 — Backend
cd backend
npm start

# Terminal 2 — Frontend
cd my-project
npm run dev
```

The app will be at `http://localhost:5173` and the API at `http://localhost:5000`.

---

## API Overview

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | No | Create user account |
| `/api/auth/login` | POST | No | Login, returns JWT |
| `/api/admin/register` | POST | No | Create admin account |
| `/api/admin/login` | POST | No | Admin login |
| `/api/bookings` | POST | No | Submit a booking |
| `/api/bookings/availability/:tourId` | GET | No | Check spots left |
| `/api/bookings` | GET | Admin | List all bookings + stats |
| `/api/bookings/:id/status` | PUT | Admin | Update booking status |
| `/api/contact` | POST | No | Submit contact form |

Admin routes require a Bearer token from `/api/admin/login`.

---

## Admin Setup

1. Register an admin via POST `/api/admin/register`:
```json
{
  "username": "admin1",
  "email": "admin@royalhorizon.in",
  "password": "StrongPass123!",
  "role": "admin"
}
```

2. Visit `/admin/login` on the frontend, sign in, and you'll be redirected to the dashboard.

3. The dashboard shows total/pending/confirmed/rejected stats, a filterable booking table, and one-click Confirm / Reject actions.

---

## Deployment Notes

- The backend is ES Modules (`"type": "module"` in `package.json`) — always use `.js` extensions in imports.
- CORS is configured for both localhost and the production domain.
- JWT tokens expire in 1 hour for users, 1 day for admins.
- Profile photos are stored as URLs (default empty string, ready for future uploads).

---

## Known Limitations & Future Ideas

- **Payments**: No payment gateway integration yet — bookings are request-based.
- **Photo Upload**: Profile photos currently use a generated initial avatar. Cloudinary or similar could be added for real uploads.
- **Real-time**: WebSocket updates for admin dashboard would be nice for high-traffic scenarios.
- **Search/Filter**: Tour package filtering by price, duration, or region is planned.

---

## License

MIT — feel free to fork and build on top of it.

---

Built with patience, coffee, and a lot of debugging. If something breaks, check the console first.
