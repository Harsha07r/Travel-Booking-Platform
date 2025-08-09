import React from 'react';
import '../../Styles/Footer.css'; // Optional: For custom styling

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5>Company</h5>
            <ul className="list-unstyled mb-0">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5>Popular Tours</h5>
            <ul className="list-unstyled mb-0">
              <li>Kashmir HouseBoat Tour</li>
              <li>Kashmir Honeymoon Tour</li>
              <li>Rendezvous Ladakh</li>
              <li>Heavenly Kashmir Tours</li>
              <li>Katra-Shivkhori-Kashmir</li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5>Contact Us</h5>
            <ul className="list-unstyled mb-0">
              <li>+91 9070019992</li>
              <li>+91 7006927991</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
