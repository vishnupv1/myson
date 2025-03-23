import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import companyLogo from '../../assets/images/CompanyLogo.png';

const FooterComponent: React.FC = () => {
  return (
    <footer style={{ padding: '0px 0px' }}>
      <div id="last">
        {/* Logo and description on the left */}
        <section id="footer-logo">
          import companyLogo from '../../assets/images/CompanyLogo.png';
          <img src={companyLogo} alt="Company Logo" className="image-fluid" />
          <p
            style={{
              width: '100%',
              whiteSpace: 'nowrap',
              fontWeight: 'normal',
              color: 'grey',
            }}
          >
            Since our establishment in 2018, MYSON has swiftly risen as India's leading hub for pet
            parents. With a wide array of furniture and kitchenwares, we fulfill all your kitchen
            requirements with unparalleled quality and attention. With a presence in 2 physical
            retail outlets spanning Kerala, we're continually expanding our reach to serve you
            better.
          </p>
        </section>

        {/* Links */}
        <section id="links">
          <h5 className="footer-links">Links</h5>
          <ul>
            <li>Kitchen</li>
            <li>Furniture</li>
            <li>Shops</li>
          </ul>
        </section>

        {/* Contact Us */}
        <section id="contact-us">
          <h5 className="footer-contact">Contact Us</h5>
          <ul>
            <li style={{ marginBottom: '8px' }}>Call Us at 8606387883</li>
            <li style={{ marginBottom: '8px' }}>www.myson.in</li>
            <li style={{ marginBottom: '8px' }}>
              <div
                style={{
                  listStyle: 'none',
                  gap: '10px',
                  display: 'flex',
                  marginTop: '25px',
                  justifyContent: 'center',
                }}
              >
                <FontAwesomeIcon icon={faFacebook} style={{ color: 'black' }} />
                <FontAwesomeIcon icon={faTwitter} style={{ color: 'black' }} />
                <FontAwesomeIcon icon={faYoutube} style={{ color: 'black' }} />
                <FontAwesomeIcon icon={faLinkedin} style={{ color: 'black' }} />
                <FontAwesomeIcon icon={faInstagram} style={{ color: 'black' }} />
              </div>
            </li>
          </ul>
        </section>
      </div>
      <h6>© 2024 MYSON Private Limited</h6>
    </footer>
  );
};

export default FooterComponent;
