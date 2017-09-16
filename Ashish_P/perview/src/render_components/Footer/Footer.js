import "../../styles/stylesheets/footer.css";
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer__container">
      <div className="flexrow footer__box">
        <span className="footer__item">© Alphathesis, LLC. 2017</span>

        <Link to="/contact" className="footer__item">Contact Us</Link>
      </div>
    </div>
  )
}


export default Footer;
