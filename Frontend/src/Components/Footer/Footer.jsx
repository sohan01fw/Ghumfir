import { Link } from 'react-router-dom';

import './Footer.css';


const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Ghumfir</h3>
          <p>Your Ultimate Travel Companion</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/Blog">Blog</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@ghumfir.com</p>

        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Ghumfir. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
