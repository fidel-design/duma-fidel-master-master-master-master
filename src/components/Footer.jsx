import React from "react";

const Footer = () => {
  return (
    <footer className="bg-success text-light mt-5 pt-4 pb-3">
      <div className="container">

        <div className="row">

          {/* Brand */}
          <div className="col-md-4 mb-3">
            <h4>Cova Kicks 👟</h4>
            <p>Your go-to store for trendy and affordable sneakers.</p>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>📞 Phone: +254 799 961 188</p>
            <p>📍 Location: Nairobi, Kenya</p>
            <p>📧 Email: covakicks@gmail.com</p>
          </div>

          {/* Social Links */}
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>

            <a
              href="https://wa.me/254799961188"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light d-block mb-2"
            >
              💬 WhatsApp
            </a>

            <a
              href="https://instagram.com/vin0verlytrim_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light d-block mb-2"
            >
              📸 Instagram
            </a>

            <a
              href="tel:+254799961188"
              className="text-light d-block"
            >
              📱 Call Us
            </a>

          </div>

        </div>

        <hr className="bg-light" />

        <p className="text-center mb-0">
          © {new Date().getFullYear()} Cova Kicks. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;