import React from 'react';
import '../../Styles/Footer.css';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaBuilding, FaBriefcase,FaShieldAlt,FaPhoneAlt,FaMapMarkerAlt,FaHeart,
 FaMountain, FaWater, FaPrayingHands
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="custom-footer">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="footer-heading">
              <FaBuilding className="heading-icon" />
              Company
            </h5>
            <ul className="footer-list">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="footer-heading">
              <FaMapMarkerAlt className="heading-icon" />
              Popular Tours
            </h5>
            <ul className="footer-list">
              <li>
                <a href="/houseboat-tour">Kashmir HouseBoat Tour</a>
              </li>
              <li>
                <a href="/honeymoon-tour">Kashmir Honeymoon Tour</a>
              </li>
              <li>
                <a href="/ladakh-tour">Rendezvous Ladakh</a>
              </li>
              <li>
                <a href="/heavenly-tour">Heavenly Kashmir Tours</a>
              </li>
              <li>
                <a href="/katra-tour">Katra-Shivkhori-Kashmir</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="footer-heading">
              <FaPhoneAlt className="heading-icon" />
              Contact Us
            </h5>
            <ul className="footer-list">
              <li>
                <a href="tel:+919070019992">+91 9070019992</a>
              </li>
              <li>
                <a href="tel:+917006927991">+91 7006927991</a>
              </li>
            </ul>
          </div>
        </div>
<div className="footer-bottom">
  &copy; 2024 Royal Horizon. All rights reserved.
</div>
        </div>
    </footer>
  );
}

export default Footer;