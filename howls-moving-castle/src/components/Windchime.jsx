
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Windchime = () => {
  const topBarControls = useAnimation();
  const chime1Controls = useAnimation();
  const chime2Controls = useAnimation();
  const chime3Controls = useAnimation();
  const chime4Controls = useAnimation();
  const chime5Controls = useAnimation();
  
  // Simulate random wind movements
  useEffect(() => {
    const animateWindchime = async () => {
      // Gentle swaying of the top bar
      topBarControls.start({
        rotate: [0, 1, -1, 0],
        transition: { 
          duration: 4, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut"
        }
      });
      
      // Random animations for each chime
      const animateChime = async (control, delay) => {
        while (true) {
          const randomDuration = 2 + Math.random() * 3;
          const randomRotation = Math.random() * 3 - 1.5;
          
          await control.start({
            rotate: randomRotation,
            transition: { 
              duration: randomDuration,
              ease: "easeInOut"
            }
          });
          
          // Small pause between animations
          await new Promise(resolve => setTimeout(resolve, delay * 500));
        }
      };
      
      animateChime(chime1Controls, 0.2);
      animateChime(chime2Controls, 0.3);
      animateChime(chime3Controls, 0.1);
      animateChime(chime4Controls, 0.4);
      animateChime(chime5Controls, 0.25);
    };
    
    animateWindchime();
  }, []);
  
  return (
    <div className="absolute top-6 left-6 z-20">
      <svg width="120" height="200" viewBox="0 0 120 200">
        {/* Top hook */}
        <path d="M60,0 C65,0 70,5 70,10 C70,15 65,20 60,20 C55,20 50,15 50,10 C50,5 55,0 60,0 Z" fill="#8a6642" />
        
        {/* String to top bar */}
        <line x1="60" y1="20" x2="60" y2="40" stroke="#8a6642" strokeWidth="2" />
        
        {/* Top bar */}
        <motion.g animate={topBarControls} style={{ originX: "60px", originY: "40px" }}>
          <rect x="20" y="40" width="80" height="5" rx="2" fill="#8a6642" />
          
          {/* Chime 1 */}
          <line x1="30" y1="45" x2="30" y2="90" stroke="#8a6642" strokeWidth="1" />
          <motion.g animate={chime1Controls} style={{ originX: "30px", originY: "45px" }}>
            <rect x="25" y="90" width="10" height="60" rx="2" fill="#c0a080" />
          </motion.g>
          
          {/* Chime 2 */}
          <line x1="45" y1="45" x2="45" y2="100" stroke="#8a6642" strokeWidth="1" />
          <motion.g animate={chime2Controls} style={{ originX: "45px", originY: "45px" }}>
            <rect x="40" y="100" width="10" height="50" rx="2" fill="#d4b292" />
          </motion.g>
          
          {/* Chime 3 */}
          <line x1="60" y1="45" x2="60" y2="110" stroke="#8a6642" strokeWidth="1" />
          <motion.g animate={chime3Controls} style={{ originX: "60px", originY: "45px" }}>
            <rect x="55" y="110" width="10" height="70" rx="2" fill="#c0a080" />
          </motion.g>
          
          {/* Chime 4 */}
          <line x1="75" y1="45" x2="75" y2="95" stroke="#8a6642" strokeWidth="1" />
          <motion.g animate={chime4Controls} style={{ originX: "75px", originY: "45px" }}>
            <rect x="70" y="95" width="10" height="55" rx="2" fill="#d4b292" />
          </motion.g>
          
          {/* Chime 5 */}
          <line x1="90" y1="45" x2="90" y2="85" stroke="#8a6642" strokeWidth="1" />
          <motion.g animate={chime5Controls} style={{ originX: "90px", originY: "45px" }}>
            <rect x="85" y="85" width="10" height="65" rx="2" fill="#c0a080" />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
};

export default Windchime;
