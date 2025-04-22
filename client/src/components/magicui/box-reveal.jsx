// src/registry/magicui/box-reveal.js
import React from 'react';

export const BoxReveal = ({ children, boxColor = "#000", duration = 0.5 }) => {
  // Style the box with the provided color and duration for animation
  const style = {
    backgroundColor: boxColor,
    padding: '20px',
    borderRadius: '8px',
    transition: `transform ${duration}s ease-in-out`,
    opacity: 0,
    transform: 'translateY(20px)',
    animation: `revealAnimation ${duration}s forwards`,
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
};



const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes revealAnimation {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`, styleSheet.cssRules.length);
