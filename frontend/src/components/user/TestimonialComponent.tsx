import React from 'react';
import './Testimonial.css'; // Import the CSS file

interface TestimonialProps {
  text: string;
  author: string;
}

const testimonials: TestimonialProps[] = [
  {
    text: 'This service has been fantastic! The team was professional, and the results exceeded our expectations.',
    author: 'Toms',
  },
  {
    text: 'This service has been fantastic! The team was professional, and the results exceeded our expectations.',
    author: 'Jane Smith',
  },
  {
    text: 'This service has been fantastic! The team was professional, and the results exceeded our expectations.',
    author: 'Alice Johnson',
  },
];

const Testimonial: React.FC = () => {
  return (
    <div className="testimonial">
      <h4 style={{ fontWeight: 'bold', textAlign: 'center' }} className="title">
        Our Customers Love Us!
      </h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-container" key={index}>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">- {testimonial.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
