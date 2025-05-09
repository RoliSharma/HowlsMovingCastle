
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedClouds = () => {
  // SVG filter for fluffy cloud effect
  const svgFilter = (
    <svg width="0" height="0" className="absolute">
      <filter id="filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" />
        <feDisplacementMap in="SourceGraphic" scale="10" />
      </filter>
    </svg>
  );
  
  // Cloud component with custom animation
  const Cloud = ({ initialX, initialY, duration, scale, opacity }) => {
    return (
      <motion.div
        className="cloud absolute"
        style={{ 
          scale,
          opacity
        }}
        initial={{ x: initialX, y: initialY }}
        animate={{ 
          x: [initialX, initialX + 100, initialX - 50, initialX],
          y: [initialY, initialY - 20, initialY + 10, initialY]
        }}
        transition={{ 
          duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      >
        <svg width="200" height="120" viewBox="0 0 200 120">
          <path
            d="M30,90 Q40,70 60,80 Q70,50 100,60 Q130,40 150,70 Q170,60 170,90 Q190,90 180,110 L40,110 Q20,100 30,90 Z"
            fill="white"
          />
        </svg>
      </motion.div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {svgFilter}
      
      <Cloud initialX={-100} initialY={100} duration={120} scale={1.2} opacity={0.9} />
      <Cloud initialX={200} initialY={50} duration={150} scale={1} opacity={0.8} />
      <Cloud initialX={500} initialY={150} duration={180} scale={1.5} opacity={0.7} />
      <Cloud initialX={800} initialY={80} duration={200} scale={0.8} opacity={0.9} />
      <Cloud initialX={1000} initialY={200} duration={160} scale={1.3} opacity={0.8} />
      
      {/* 3D cloud effect with parallax */}
      <motion.div
        className="absolute w-full h-full"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 5 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1200 800">
          <motion.path
            d="M100,300 Q200,200 300,250 Q400,150 500,200 Q600,100 700,150 Q800,50 900,100 Q1000,50 1100,100 L1100,400 L100,400 Z"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 3 }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default AnimatedClouds;
