//parent componentttttttttttzz
import  { useState } from 'react';

import type { TrackData } from '../assets/data/songsData.ts';
import { trackList } from '../assets/data/songsData.ts';
import BigSquare from "./BigSquare.tsx"
import TrackPlayer from './TrackPlayer.tsx';
import VolumeBar from './VolumeBar.tsx';

export default function Container() {

    const [currentIndex, setCurrentIndex] = useState(0);
    
  const [tracks, setTracks] = useState<TrackData[]>(trackList);

  const toggleLiked = (id: number) => {
    setTracks(prevTracks =>
      prevTracks.map(track =>
        track.id === id
          ? { ...track, liked: !track.liked }
          : track
      )
    );
  };
  //volume bar below
  const [volume, setVolume] = useState(75);
const [isMuted, setIsMuted] = useState(false);
const [previousVolume, setPreviousVolume] = useState(75); //so when its muted & umuted it comes back to the previous

const handleVolumeChange = (newVolume: number) => {
  setVolume(newVolume);
  if (newVolume > 0 && isMuted) {
    setIsMuted(false);
  }
};

const handleMuteToggle = () => {
  if (isMuted) {
    setIsMuted(false);
    setVolume(previousVolume > 0 ? previousVolume : 50);
  } else {
    setPreviousVolume(volume);
    setIsMuted(true);
  }
};

  return (
    <div className="rounded-2xl bg-[#111111] border-1 border-[#8b8b8b]">
  <div className="p-3  rounded-lg grid grid-cols-[auto_auto_auto] grid-rows-[auto_auto_auto] auto-cols-auto auto-rows-auto gap-4 ">

<div className="row-span-5">
        <div className='border-1 border-[#8b8b8b] rounded-xl overflow-hidden bg-gradient-to-b from-[#191919] from-0% via-[#222222] via-50% to-[#323232] to-100%'>
  <BigSquare track={tracks[currentIndex]} 
              toggleLiked={toggleLiked}/>
  <TrackPlayer
        trackList={trackList}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      </div>
</div>   

            <div className="border-1 col-start-2 row-start-1">2</div>
            <div className="border-1 row-span-4 col-start-2 row-start-2 w-50">3</div>
            <div className="border-1 col-start-3 row-start-1 h-17 rounded-full">4</div>

            <div className="border-1 row-span-4 col-start-3 rounded-xl px-3">
              <VolumeBar
  volume={volume}
  isMuted={isMuted}
  onVolumeChange={handleVolumeChange}
  onMuteToggle={handleMuteToggle}
/>
            </div>
        </div>
    </div>
  )
}
