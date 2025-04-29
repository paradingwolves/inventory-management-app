import React from 'react';
import './Footer.css'; 


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} Timberline Inventory</span>
        <nav className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
