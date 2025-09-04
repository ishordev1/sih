import React, { useEffect } from 'react';
import { gsap } from 'gsap'; // Assuming GSAP is imported correctly

const Footer = () => {
  useEffect(() => {
    // GSAP animation for footer entrance
    gsap.from(".footer-column", { duration: 1, y: 30, opacity: 0, stagger: 0.2, ease: "power3.out", delay: 0.5 });
    gsap.from(".copyright-text", { duration: 0.8, opacity: 0, ease: "power3.out", delay: 1.2 });
  }, []);

  return (
    <footer className="py-5" style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: '#fff' }}>
      <div className="container">
        <div className="row">
          {/* Column 1: About */}
          <div className="col-md-4 footer-column mb-4">
            <h5 className="mb-3"><i className="fas fa-info-circle me-2"></i>About Us</h5>
            <p>
              🚗 We are a modern company dedicated to providing innovative solutions. Join us on our journey to excellence.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="col-md-4 footer-column ">
            <h5 className="mb-3"><i className="fas fa-link me-2"></i>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/services" className="text-white">Services</a></li>
              <li><a href="/blog" className="text-white">Blog</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>
          
          {/* Column 3: Contact & Social */}
          <div className="col-md-4 footer-column mb-4">
            <h5 className="mb-3"><i className="fas fa-envelope me-2"></i>Contact Us</h5>
            <p>Email: info@yourcompany.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <div className="social-icons mt-3">
              <a href="https://facebook.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
              <a href="https://twitter.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://instagram.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="https://linkedin.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
        <div className="text-center copyright-text">
          <p className="mb-0">&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
