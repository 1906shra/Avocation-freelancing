// src/components/VideoBackground.jsx
import React from "react";
import bg from "../assets/bg1.mp4";  


// src/components/VideoBackground.jsx
const VideoBackground = () => {
    return (
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={bg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default VideoBackground;
  