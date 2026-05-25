import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingModal.css';

const API_BASE = import.meta.env.VITE_API_URL || "";
const API = API_BASE.replace(/\/$/, '');

export default function BookingModal({
  isOpen,
  onClose,
  tourId,
  tourName,
  onBooked,
  capacity = 3
}) {
  const [date, setDate] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [persons, setPersons] = useState(1);
  const [accommodationType, setAccommodationType] = useState('');
  const [otherRequirements, setOtherRequirements] = useState('');
  const [bookedCount, setBookedCount] = useState(0);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const availableSpots = capacity - bookedCount;

  useEffect(() => {
    if (!isOpen) {
      setDate(null);
      setName('');
      setEmail('');
      setPhone('');
      setPersons(1);
      setAccommodationType('');
      setOtherRequirements('');
      setBookedCount(0);
      setError(null);
    }
  }, [isOpen]);
 useEffect(() => {
    if (!tourId || !date) return;

    const fetchAvailability = async () => {
      setChecking(true);
      setError(null);

      try {
        const day = date.toISOString().slice(0, 10);
        const res = await fetch(
          `${API}/api/bookings/availability/${encodeURIComponent(tourId)}?date=${day}`
        );
        const json = await res.json();

        if (!json.success) throw new Error(json.message);

        setBookedCount(json.bookedCount || 0);

        // Auto adjust persons if exceeding availability
        if (persons > capacity - json.bookedCount) {
          setPersons(capacity - json.bookedCount);
        }

      } catch (e) {
        setError("Availability check failed");
      } finally {
        setChecking(false);
      }
    };

    fetchAvailability();
  }, [date, tourId]);

  /* Submit Booking */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Extra validation safety
    if (!tourId) return fail("Tour ID missing. Refresh page.");
    if (!date) return fail("Please select a travel date.");
    if (!/^[0-9]{7,15}$/.test(phone)) return fail("Enter valid phone number.");

    function fail(msg) {
      setError(msg);
      setSubmitting(false);
      return;
    }

    const payload = {
      tourId,
      tourName,
      fullName: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      travelDate: date.toISOString().slice(0, 10),
      numberOfPeople: persons,
      accommodationType,
      otherRequirements: otherRequirements.trim()
    };

    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (!json.success) return fail(json.message);

      alert("Booking Successful!");
      onBooked?.(json.booking);
      onClose();
    } catch {
      setError("Booking failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Book Your Trip</h2>
        <p className="tour-name">{tourName}</p>

        <form onSubmit={handleSubmit}>
          <label>Travel Date</label>
          <DatePicker
            selected={date}
            onChange={setDate}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
            required
          />

          {date && !checking && (
            <p style={{ textAlign: "center", fontWeight: "600" }}>
              Available Spots: {availableSpots > 0 ? availableSpots : "Full"}
            </p>
          )}

          <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />

          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />

          <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />

          <input
            type="number"
            min="1"
            max={availableSpots}
            value={persons}
            onChange={e => setPersons(Number(e.target.value))}
            required
          />

          <select value={accommodationType} onChange={e => setAccommodationType(e.target.value)} required>
            <option value="">Select Accommodation</option>
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Premium</option>
          </select>

          <textarea
            placeholder="Other Requirements (Optional)"
            value={otherRequirements}
            onChange={e => setOtherRequirements(e.target.value)}
          />

          {checking && <p style={{ textAlign: "center" }}>Checking availability...</p>}
          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            disabled={submitting || checking || availableSpots <= 0}
          >
            {submitting ? 'Booking...' : availableSpots <= 0 ? 'Fully Booked' : 'Book Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
