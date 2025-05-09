
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { 
  Cloud, 
  Clock, 
  Music, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ChevronUp, 
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import WindowView from '@/components/WindowView';
import AnimatedClouds from '@/components/AnimatedClouds';
import Windchime from '@/components/Windchime';
// import ClockWidget from '@/components/ClockWidget';
import MusicPlayer from '@/components/MusicPlayer';
import SpotifyIntegration from '@/components/SpotifyIntegration';

function App() {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/sounds/howls-bgm.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          toast({
            title: "Playback Error",
            description: "Background music couldn't be played. Please try again.",
            variant: "destructive",
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };
  
  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#8dc9a5] to-[#345e49] p-6 flex items-center justify-center">
      <div className="window-frame w-full max-w-5xl h-[85vh] rounded-lg overflow-hidden relative">
        <WindowView />
        <AnimatedClouds />
        <Windchime />
        
        {/* Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 music-controls px-6 py-3 z-30">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/20 hover:bg-white/30 text-white rounded-full"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/20 hover:bg-white/30 text-white rounded-full"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </Button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider w-24 h-2 bg-white/30 rounded-full appearance-none"
          />
        </div>
        
        {/* Clock Widget */}
        {/* <div className="absolute top-6 right-6 z-30">
          <ClockWidget />
        </div> */}
        
        {/* Spotify Integration */}
        <div className="absolute bottom-24 right-6 z-30">
          <SpotifyIntegration 
            showLyrics={showLyrics} 
            toggleLyrics={toggleLyrics} 
          />
        </div>
        
        {/* Lyrics Panel */}
        <AnimatePresence>
          {showLyrics && (
            <motion.div 
              className="lyrics-panel absolute left-6 bottom-24 w-80 p-4 z-30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">Lyrics</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={toggleLyrics}
                >
                  <ChevronDown size={16} />
                </Button>
              </div>
              <div className="text-sm text-gray-700 space-y-2">
                <p>When the night has come</p>
                <p>And the land is dark</p>
                <p>And the moon is the only light we'll see</p>
                <p>No, I won't be afraid</p>
                <p>Oh, I won't be afraid</p>
                <p>Just as long as you stand, stand by me</p>
                <p>So darling, darling, stand by me</p>
                <p>Oh, stand by me</p>
                <p>Oh, stand, stand by me, stand by me</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
