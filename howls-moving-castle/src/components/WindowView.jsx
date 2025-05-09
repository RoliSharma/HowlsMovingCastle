
import React from 'react';
import { motion } from 'framer-motion';

const WindowView = () => {
  return (
    <div className="window-view w-full h-full relative">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#B0E2FF] to-[#E0F7FA]"></div>
      
      {/* Distant mountains */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%]">
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-full"
          style={{
            background: 'linear-gradient(180deg, rgba(137, 170, 187, 0) 0%, rgba(137, 170, 187, 0.8) 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full">
            <motion.path 
              d="M0,300 L0,180 Q300,100 600,200 T1200,150 L1200,300 Z" 
              fill="#6a8caf"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 2 }}
            />
            <motion.path 
              d="M0,300 L0,200 Q200,150 400,220 T800,180 T1200,220 L1200,300 Z" 
              fill="#4a6c8f"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 2.5 }}
            />
          </svg>
        </motion.div>
      </div>
      
      {/* Rolling hills */}
      <div className="absolute bottom-0 left-0 right-0 h-[25%]">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full">
          <motion.path 
            d="M0,300 L0,200 Q300,100 600,180 T1200,150 L1200,300 Z" 
            fill="#7ab55c"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 3 }}
          />
          <motion.path 
            d="M0,300 L0,250 Q200,200 400,240 T800,220 T1200,250 L1200,300 Z" 
            fill="#5d9848"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 3.5 }}
          />
        </svg>
      </div>
      
      {/* Window frame inner shadow */}
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none"></div>
      
      {/* Distant castle silhouette */}
      <motion.div 
        className="absolute left-1/2 bottom-[25%] transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 3, delay: 1 }}
      >
        <svg width="300" height="200" viewBox="0 0 300 200">
          <path d="M150,10 L160,30 L170,10 L180,30 L190,10 L200,30 L210,10 L220,30 L230,10 L240,30 L240,100 L270,100 L270,150 L240,150 L240,180 L60,180 L60,150 L30,150 L30,100 L60,100 L60,30 L70,10 L80,30 L90,10 L100,30 L110,10 L120,30 L130,10 L140,30 L150,10 Z" 
            fill="#2c3e50" 
            fillOpacity="0.7"
          />
          <rect x="120" y="120" width="60" height="60" fill="#2c3e50" fillOpacity="0.7" />
          <rect x="140" y="140" width="20" height="40" fill="#87CEEB" fillOpacity="0.5" />
          <rect x="80" y="60" width="20" height="30" fill="#87CEEB" fillOpacity="0.5" />
          <rect x="200" y="60" width="20" height="30" fill="#87CEEB" fillOpacity="0.5" />
        </svg>
      </motion.div>
      
      {/* Birds */}
      <motion.div
        className="absolute"
        initial={{ x: -100, y: 100 }}
        animate={{ 
          x: [null, 800],
          y: [null, 50, 150, 100]
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      >
        <svg width="60" height="20" viewBox="0 0 60 20">
          <path d="M0,10 Q5,5 10,10 Q15,15 20,10" stroke="#333" strokeWidth="1" fill="transparent" />
          <path d="M30,10 Q35,5 40,10 Q45,15 50,10" stroke="#333" strokeWidth="1" fill="transparent" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute"
        initial={{ x: 900, y: 80 }}
        animate={{ 
          x: [null, 100],
          y: [null, 120, 60, 80]
        }}
        transition={{ 
          duration: 40,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      >
        <svg width="80" height="30" viewBox="0 0 80 30">
          <path d="M0,15 Q10,5 20,15 Q30,25 40,15" stroke="#333" strokeWidth="1" fill="transparent" />
          <path d="M50,15 Q60,5 70,15 Q80,25 90,15" stroke="#333" strokeWidth="1" fill="transparent" />
          <path d="M20,15 Q30,5 40,15 Q50,25 60,15" stroke="#333" strokeWidth="1" fill="transparent" />
        </svg>
      </motion.div>
      
      {/* Sun/light effect */}
      <motion.div 
        className="absolute top-[15%] right-[20%] w-32 h-32 rounded-full bg-yellow-200"
        style={{
          boxShadow: '0 0 60px 30px rgba(255, 236, 173, 0.7), 0 0 100px 60px rgba(255, 236, 173, 0.5), 0 0 140px 90px rgba(255, 236, 173, 0.3)',
          opacity: 0.8
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 3 }}
      />
    </div>
  );
};

export default WindowView;
