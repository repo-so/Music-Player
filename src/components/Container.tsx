//parent componentttttttttttzz
import  { useState } from 'react';

import type { TrackData } from '../assets/data/songsData.ts';
import { trackList } from '../assets/data/songsData.ts';
import BigSquare from "./BigSquare.tsx"
import TrackPlayer from './TrackPlayer.tsx';
import VolumeBar from './VolumeBar.tsx';
import ProfileIcon from './ProfileIcon.tsx'
import TrackList from './TrackList.tsx'

export default function Container() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffle, setShuffle] = useState(false);
    const [loop, setLoop] = useState(false);

      const [isPlaying, setIsPlaying] = useState(false);
    
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
const [previousVolume, setPreviousVolume] = useState(75); //so when its muted & umuted it comes back to the previous, elementare watson

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

// state in profile icon below
const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        setIsClicked(!isClicked)
    }

const handleTrackSelect = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true)
  };

  return (
    <div className="rounded-2xl bg-[#111111] border-1 border-[#8b8b8b]">
  <div className="p-4 pb-0.5  rounded-lg grid grid-cols-[auto_auto_auto] grid-rows-[auto_auto_auto] auto-cols-auto auto-rows-auto gap-4 ">

<div className="row-span-5">
        <div className='border-1 border-[#8b8b8b] rounded-xl overflow-hidden bg-gradient-to-b from-[#434343] from-0% via-[#303030] via-50% to-[#191919] to-100%'>
  <BigSquare track={tracks[currentIndex]} 
              toggleLiked={toggleLiked}/>
  <TrackPlayer
        trackList={tracks}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        shuffle={shuffle}
          loop={loop}
          onShuffleToggle={() => setShuffle(!shuffle)}
          onLoopToggle={() => setLoop(!loop)}
          isPlaying={isPlaying} setIsPlaying={setIsPlaying}
      />
      </div>
</div>   

            
            <div className="border row-span-4  col-start-2  row-start-1 rounded-xl border-[#8b8b8b]">
              <TrackList
          tracks={tracks}
          currentIndex={currentIndex}
          isPlaying={isPlaying} 
          onTrackSelect={handleTrackSelect}
          onToggleLike={toggleLiked}
        />
            </div>
            <div className=" col-start-3 row-start-1 border-[#8b8b8b]">
              <ProfileIcon toggle={handleClick}/>
            </div>

            <div className="border border-[#8b8b8b]  row-span-3 row-start-2 col-start-3 rounded-xl px-1">
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
 