import React, { useState } from 'react';

function ContactForm() {
  const [result, setResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending...');

    const formData = new FormData(event.target);
    formData.append('access_key', '7c822d82-1bb1-4eb1-a392-aecf9d0d10d4');
    formData.append('subject', 'New Submission from Contact Form');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult('Form submitted successfully!');
        event.target.reset();
      } else {
        console.error('Web3Forms Error:', data);
        setResult(data.message);
      }
    } catch (error) {
      console.error('Submission Failed:', error);
      setResult('Something went wrong! Please try again.');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Contact Us</h2>
            <p className="text-center text-muted mb-4">
              Fill out the form below to send us a message.
            </p>
            <form onSubmit={handleSubmit} noValidate>
              {/* Hidden Web3Forms fields */}
              <input type="hidden" name="access_key" value="7c822d82-1bb1-4eb1-a392-aecf9d0d10d4" />
              <input type="hidden" name="subject" value="New Submission from Web3Forms" />
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              {/* First & Last Name */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="first_name" className="form-label">First Name</label>
                  <input
                    type="text"
                    name="name"
                    id="first_name"
                    className="form-control"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="last_name" className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="form-control"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  className="form-control"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>

              {/* Result Message */}
              <p className="text-center text-muted mt-3">{result}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
