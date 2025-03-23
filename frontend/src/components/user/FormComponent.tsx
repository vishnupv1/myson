import React, { useState, useEffect } from 'react';
import './FormComponent.css'; // Assuming you put the styles here
import CloseIcon from '@mui/icons-material/Close';

const ConsultationForm: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    setShowForm(true);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <>
      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <h5
              style={{
                fontWeight: 'bolder',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Get a Free Consultation
            </h5>
            <button className="close-button" onClick={handleClose} title="Close">
              <CloseIcon />
            </button>
            <form style={{ marginTop: '25px' }} onSubmit={handleSubmit}>
              <div className="form-group">
                <label style={{ textAlign: 'left', fontWeight: 'bold' }} htmlFor="name">
                  Full Name<span style={{ color: 'red' }}> *</span>
                </label>
                <input type="text" id="name" name="name" placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label style={{ textAlign: 'left', fontWeight: 'bold' }} htmlFor="mobile">
                  Mobile Number<span style={{ color: 'red' }}> *</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Your mobile number"
                  required
                />
              </div>

              <button className="animated-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultationForm;
