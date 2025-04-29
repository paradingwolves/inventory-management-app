import React from 'react';
import ContactForm from './ContactForm';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';

const Contact = () => {
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center text-center mt-1">
        <h2 className="mb-3">Contact Support</h2>
        <p className="mb-4">If you need help or have any questions, please reach out to us:</p>
        <ul className="list-unstyled">
          <li className="mb-2">
            <strong>📞 Phone:</strong>{' '}
            <a href="tel:5199961094" className="text-decoration-none"> (519) 996-1094</a>
          </li>
          <li>
            <strong>📧 Email:</strong>{' '}
            <a href="mailto:justinbrierley3@outlook.com" className="text-decoration-none">justinbrierley3@outlook.com</a>
          </li>
        </ul>
        <ContactForm />
      </div>
      <Footer />
    </>
    
  );
};

export default Contact;
