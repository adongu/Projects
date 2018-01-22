import "../../styles/stylesheets/footer.css";
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // const disclaimer = "Disclaimer: CERTAIN CONTENT THAT APPEARS ON THIS SITE, COMES FROM AMAZON SERVICES LLC. THIS CONTENT IS PROVIDED ‘AS IS’ AND IS SUBJECT TO CHANGE OR REMOVAL AT ANY TIME.";

  return (
    <div className="footer__container">

      <div className="flexcolumn footer__box">
        {/* <span className="footer__disclaimer">
          {disclaimer.toLowerCase()}
        </span> */}

        <div className="footer__copyright">
          <span className="footer__item">
            © Alphathesis LLC. 2017
          </span>
          <Link to="/contact" className="footer__item">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}


export default Footer;
