//parent componentttttttttttzz
import  { useState } from 'react';

import type { TrackData } from '../assets/data/songsData.ts';
import { trackList } from '../assets/data/songsData.ts';
import BigSquare from "./BigSquare.tsx"
import TrackPlayer from './TrackPlayer.tsx';


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

  return (
    <div className="rounded-2xl bg-[#111111] border-1 border-[#8b8b8b]">
  <div className="p-3  rounded-lg grid grid-cols-3 grid-rows-5 auto-cols-auto auto-rows-auto gap-4">

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
            <div className="border-1 row-span-4 col-start-2 row-start-2">3</div>
            <div className="border-1 col-start-3 row-start-1">4</div>
            <div className="border-1 row-span-4 col-start-3">5</div>
        </div>
    </div>
  )
}
