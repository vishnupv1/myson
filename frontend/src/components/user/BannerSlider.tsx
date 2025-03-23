import React, { useRef, useEffect } from 'react';
import video from '../../assets/videos/video.mp4';

const BannerVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const stopVideoAtEnd = () => {
      if (videoElement.currentTime >= 185) {
        videoElement.pause();
      }
    };

    videoElement.addEventListener('timeupdate', stopVideoAtEnd);

    return () => {
      videoElement.removeEventListener('timeupdate', stopVideoAtEnd);
    };
  }, []);

  return (
    <div className="banner-container">
      <video ref={videoRef} width="100%" height={500} autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BannerVideo;
