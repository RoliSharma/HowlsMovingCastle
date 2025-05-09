
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SpotifyIntegration = ({ showLyrics, toggleLyrics }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="spotify-player p-4 w-64">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Music size={18} className="text-[#1DB954] mr-2" />
          <h3 className="font-medium text-gray-800">Spotify</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={toggleExpand}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden mr-3">
                <img  alt="Album cover" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1632990855966-c75b4b4ed429" />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-800">Merry Go Round of Life</p>
                <p className="text-xs text-gray-600">Joe Hisaishi</p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs justify-between"
                onClick={toggleLyrics}
              >
                <span>Show Lyrics</span>
                {showLyrics ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs justify-between"
              >
                <span>Open in Spotify</span>
                <ExternalLink size={14} />
              </Button>
            </div>
            
            <div className="mt-3 text-xs text-gray-500">
              <p>Connect your Spotify account to play your favorite music.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isExpanded && (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded overflow-hidden mr-2">
            <img  alt="Small album cover" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1632990855966-c75b4b4ed429" />
          </div>
          <div className="truncate">
            <p className="text-xs font-medium text-gray-800 truncate">Merry Go Round of Life</p>
            <p className="text-xs text-gray-600 truncate">Joe Hisaishi</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyIntegration;
