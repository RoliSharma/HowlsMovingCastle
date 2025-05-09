
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Calculate rotation angles for clock hands
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;
  
  const secondsAngle = seconds * 6; // 6 degrees per second
  const minutesAngle = minutes * 6 + seconds * 0.1; // 6 degrees per minute + slight movement from seconds
  const hoursAngle = hours * 30 + minutes * 0.5; // 30 degrees per hour + slight movement from minutes
  
  return (
    <div className="clock-face w-32 h-32 rounded-full flex items-center justify-center relative">
      {/* Clock numbers */}
      {[...Array(12)].map((_, i) => {
        const angle = (i + 1) * 30;
        const radian = (angle - 90) * (Math.PI / 180);
        const x = 50 + 40 * Math.cos(radian);
        const y = 50 + 40 * Math.sin(radian);
        
        return (
          <div 
            key={i} 
            className="absolute text-xs font-semibold text-gray-800"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {i + 1}
          </div>
        );
      })}
      
      {/* Clock ticks */}
      {[...Array(60)].map((_, i) => {
        const angle = i * 6;
        const radian = (angle - 90) * (Math.PI / 180);
        const outerRadius = i % 5 === 0 ? 46 : 48;
        const innerRadius = i % 5 === 0 ? 42 : 45;
        const x1 = 50 + outerRadius * Math.cos(radian);
        const y1 = 50 + outerRadius * Math.sin(radian);
        const x2 = 50 + innerRadius * Math.cos(radian);
        const y2 = 50 + innerRadius * Math.sin(radian);
        
        return (
          <div 
            key={i}
            className="absolute bg-gray-800"
            style={{
              width: i % 5 === 0 ? '2px' : '1px',
              height: i % 5 === 0 ? '4px' : '3px',
              left: `${x1}%`,
              top: `${y1}%`,
              transformOrigin: `${(x2 - x1) / 2}px ${(y2 - y1) / 2}px`,
              transform: `translate(-50%, -50%) rotate(${angle}deg)`
            }}
          />
        );
      })}
      
      {/* Digital time display */}
      <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
        {format(time, 'h:mm:ss a')}
      </div>
      
      {/* Hour hand */}
      <motion.div 
        className="clock-hand absolute w-1.5 h-16 bg-gray-800 rounded-full"
        style={{ 
          left: '50%',
          bottom: '50%',
          transformOrigin: 'bottom center',
          rotate: hoursAngle
        }}
        animate={{ rotate: hoursAngle }}
        transition={{ type: "tween" }}
      />
      
      {/* Minute hand */}
      <motion.div 
        className="clock-hand absolute w-1 h-20 bg-gray-700 rounded-full"
        style={{ 
          left: '50%',
          bottom: '50%',
          transformOrigin: 'bottom center',
          rotate: minutesAngle
        }}
        animate={{ rotate: minutesAngle }}
        transition={{ type: "tween" }}
      />
      
      {/* Second hand */}
      <motion.div 
        className="clock-hand absolute w-0.5 h-22 bg-red-500 rounded-full"
        style={{ 
          left: '50%',
          bottom: '50%',
          transformOrigin: 'bottom center',
          rotate: secondsAngle
        }}
        animate={{ rotate: secondsAngle }}
        transition={{ type: "tween" }}
      />
      
      {/* Center dot */}
      <div className="absolute w-3 h-3 bg-gray-800 rounded-full" />
    </div>
  );
};

export default ClockWidget;
