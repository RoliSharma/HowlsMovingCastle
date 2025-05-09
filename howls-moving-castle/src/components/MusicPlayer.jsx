
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const MusicPlayer = ({ audioSrc, onPlayStateChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Initialize audio element
    const audio = audioRef.current;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    // Event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnd);
    
    // Set initial volume
    audio.volume = volume;
    
    // Cleanup
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnd);
    };
  }, []);
  
  const handlePlayPause = () => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
    if (onPlayStateChange) {
      onPlayStateChange(!isPlaying);
    }
  };
  
  const handleEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (onPlayStateChange) {
      onPlayStateChange(false);
    }
  };
  
  const handleTimeChange = (value) => {
    const audio = audioRef.current;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };
  
  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    const audio = audioRef.current;
    
    audio.volume = isMuted ? 0 : newVolume;
    setVolume(newVolume);
    
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    const audio = audioRef.current;
    
    if (isMuted) {
      audio.volume = volume;
    } else {
      audio.volume = 0;
    }
    
    setIsMuted(!isMuted);
  };
  
  // Format time in MM:SS
  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 w-full max-w-md">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-white">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </Button>
          
          <Slider
            defaultValue={[volume]}
            max={1}
            step={0.01}
            value={[volume]}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>
      
      <Slider
        defaultValue={[0]}
        max={duration || 100}
        step={0.1}
        value={[currentTime]}
        onValueChange={handleTimeChange}
        className="mb-4"
      />
      
      <div className="flex items-center justify-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20"
        >
          <SkipBack size={20} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20 h-12 w-12 rounded-full bg-white/10"
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20"
        >
          <SkipForward size={20} />
        </Button>
      </div>
    </div>
  );
};

export default MusicPlayer;
