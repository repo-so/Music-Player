//parent componentttttttttttzz
import  { useState } from 'react';

import { trackList } from '../assets/data/songsData.ts';
import BigSquare from "./BigSquare.tsx"
import TrackPlayer from './TrackPlayer.tsx';


export default function Container() {

    const [currentIndex, setCurrentIndex] = useState(0);
    
  return (
    <div className="rounded-2xl bg-[#111111] border-1 border-[#8b8b8b]">
  <div className="p-3  rounded-lg grid grid-cols-3 grid-rows-5 auto-cols-auto auto-rows-auto gap-4">

<div className="row-span-5">
        <div className='border-1 border-[#8b8b8b] rounded-xl overflow-hidden'>
  <BigSquare track={trackList[currentIndex]} />
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
