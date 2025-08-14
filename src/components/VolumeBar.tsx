import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';

interface VolumeBarProps {
  volume: number; // 0-100
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
}

export default function VolumeBar({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
}: VolumeBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  // Global volume control - apply to all audio elements on the page
  useEffect(() => {
    const volumeValue = isMuted ? 0 : volume / 100;
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach((audio) => {
      audio.volume = volumeValue;
    });
  }, [volume, isMuted]);

  const getSpeakerIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX size={20} className="text-gray-400" />;
    } else if (volume < 50) {
      return <Volume1 size={20} className="text-white" />;
    } else {
      return <Volume2 size={20} className="text-white" />;
    }
  };

  const handleVolumeBarClick = (e: React.MouseEvent) => {
    if (!volumeBarRef.current) return;
    
    const rect = volumeBarRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const barHeight = rect.height;
    
    // Calculate volume (inverted because bar goes from top to bottom)
    const newVolume = Math.max(0, Math.min(100, ((barHeight - clickY) / barHeight) * 100));
    onVolumeChange(Math.round(newVolume));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    handleVolumeBarClick(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !volumeBarRef.current) return;
    
    const rect = volumeBarRef.current.getBoundingClientRect();
    const moveY = e.clientY - rect.top;
    const barHeight = rect.height;
    
    // Clamp the position even if mouse goes outside the bar area
    const clampedY = Math.max(0, Math.min(barHeight, moveY));
    const newVolume = Math.max(0, Math.min(100, ((barHeight - clampedY) / barHeight) * 100));
    onVolumeChange(Math.round(newVolume));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      // Add globar event listeners to the document to capture mouse events in the container.tsx
      const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      // Also listen for mouse leave to handle edge cases
      document.addEventListener('mouseleave', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
        document.removeEventListener('mouseleave', handleGlobalMouseUp);
      };
    }
  }, [isDragging]);

  const displayVolume = isMuted ? 0 : volume;
  const fillHeight = `${displayVolume}%`;

  return (
    <div className="flex flex-col items-center space-y-3  ">
      {/* Volume Bar */}
      <div className="relative flex flex-col items-center">
        {/* Volume percentage display */}
        <div className="mb-5 mt-2">
          <span className="text-xs text-gray-300 font-mono">
            {Math.round(displayVolume)}%
          </span>
        </div>
        
        {/* Volume Bar Container */}
        <div ref={volumeBarRef}
          onMouseDown={handleMouseDown}
          className={`px-3.5 ${
            isDragging ? 'cursor-grabbing' : 'cursor-pointer'
          }`}>
        <div
          className={`relative w-5  h-57 bg-gray-700 rounded-full transition-colors select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-pointer hover:bg-gray-600'
          }`}
        >
          {/* Volume Filled Part Thingy */}
          
          <div
            className="absolute bottom-0 w-full bg-gradient-to-t from-red-600 to-red-400 rounded-full transition-all duration-150 ease-out pointer-events-none"
            style={{ height: fillHeight }}
          />
          
          {/* Volume Knob or Ball */}
          <div          
            className={`absolute w-9 h-9 bg-white rounded-full border-3 border-red-600 transform -translate-x-1/2 left-1/2 transition-all duration-150 pointer-events-none ${
              isDragging ? 'scale-125 shadow-lg' : 'hover:scale-110'
            }`}
            style={{ 
              bottom: `calc(${fillHeight} - 12px)`,
            }}
          />
          
        </div>
        </div>
      </div>

      {/* Speaker Icon (Mute/Unmute Toggle) */}
      <button
        onClick={onMuteToggle}
        className="cursor-pointer p-2 rounded-full hover:bg-white/7 transition-colors focus:outline-none ring-2 ring-red-500 mt-1.5"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {getSpeakerIcon()}
      </button>
    </div>
  );
}
//the knob takes too much time to keep up with the actual red value bar, is there a way