import React from 'react';

const ContactForm = () => {
  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <h2 className="mb-3 text-center">Contact Form</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Sender Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Sender Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Sender Phone Number</label>
              <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows="4" placeholder="Your message" required></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="attachments" className="form-label">File Attachments (photos only)</label>
              <input
                type="file"
                className="form-control"
                id="attachments"
                accept="image/png, image/jpeg, image/jpg"
                multiple
              />
            </div>

            <div className="text-center mb-2">
              <button type="submit" className="btn btn-primary">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
