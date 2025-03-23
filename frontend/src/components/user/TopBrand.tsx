import React, { useEffect, useRef } from 'react';
import './CardComponent.css'; // Import the external CSS file

const images: string[] = [
  'https://vtlogo.com/wp-content/uploads/2021/01/astoria-vector-logo-small.png',
  'https://getlogo.net/wp-content/uploads/2021/08/hamilton-beach-logo-vector.png',
  'https://mfk.co.id/wp-content/uploads/2020/12/winterhalter-logo.png',
  'https://www.pi-india.com/uploaded_files/cf66d20b8daffd.jpg',
  'https://media.licdn.com/dms/image/v2/D4D0BAQGByKydIdtFMw/company-logo_200_200/company-logo_200_200/0/1694007804218?e=1744243200&v=beta&t=3tkU5CbfvkTowK6YTDJCpvIzQt9fYT7QW6c2iEy-81A',
  'https://media.licdn.com/dms/image/v2/C560BAQH8UuwERcv21Q/company-logo_200_200/company-logo_200_200/0/1630567287582/hoshizaki_america_logo?e=1744243200&v=beta&t=knzCSJXLZ5wAALXTruWxZucgrMPLC5mWF_HuDvCGHME',
  'https://scontent.fhyd7-1.fna.fbcdn.net/v/t39.30808-6/329119842_743516480334935_7746442451502530939_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Xj4GUPbixdEQ7kNvgHktlZB&_nc_zt=23&_nc_ht=scontent.fhyd7-1.fna&_nc_gid=AD9tCh3aPYxGPcDT9y7XHax&oh=00_AYBFbmrBUKXUSHNrfn9MVXhc7f9T4S_WPiwEMmPuVlZdrA&oe=677DD956',
  'https://www.convotherm.com/images/shared/logos/Convotherm_Color.svg',
  'https://www.lincolnfp.com/images/shared/logos/Lincoln_Black.svg',
  'https://www.merrychef.com/images/shared/logos/Merrychef_PMS186C.svg',
];

const names: string[] = [
  'Astoria',
  'Hamilton Beach',
  'Winter halter',
  'Stella',
  'Western',
  'Hoshizaki',
  'CREM',
  'Convotherm',
  'Lincoln',
  'Merrychef',
];

const TopBrands: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const totalWidth = content.offsetWidth;
    let currentPosition = 0;
    let animationFrameId: number;

    const scroll = () => {
      currentPosition += 1;
      if (currentPosition >= totalWidth / 2) {
        currentPosition = 0;
      }
      container.scrollLeft = currentPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="main-container">
      <h5
        style={{
          fontWeight: 600,
          textAlign: 'left',
          fontFamily: 'sans-serif',
        }}
      >
        Shop from Top Brands
      </h5>

      <div
        ref={containerRef}
        className="card-container top-container"
        style={{ overflowX: 'hidden', whiteSpace: 'nowrap', padding: '2px' }}
      >
        <div ref={contentRef} style={{ display: 'inline-block' }}>
          {images.concat(images).map((imageSrc, index) => (
            <div
              className="top-brand-card"
              key={index}
              style={{
                textAlign: 'center',
                margin: '0 10px',
                display: 'inline-block',
                verticalAlign: 'top',
                borderRadius: '10px',
                boxShadow: '0px 0.2px 2px 0px rgba(0, 0, 0, 0.2)',
                padding: '10px',
                backgroundColor: 'white',
              }}
            >
              <img
                src={imageSrc}
                className="top-brand-image"
                alt={`brand-${index % images.length}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                  marginBottom: '10px',
                }}
              />
              <div
                className="top-brand-name"
                style={{ fontWeight: 500, fontSize: '14px', color: '#333' }}
              >
                {names[index % names.length]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBrands;
