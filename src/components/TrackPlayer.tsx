import { useRef, useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import type { TrackData } from '../assets/data/songsData.ts';

import play from '../assets/svgs/play.svg'
import pause from '../assets/svgs/pause.svg'
import previous from '../assets/svgs/previous.svg'

interface Props {
  trackList: TrackData[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

export default function TrackPlayer({
  trackList,
  currentIndex,
  setCurrentIndex,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = trackList[currentIndex];

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % trackList.length);
    setProgress(0);
    //setIsPlaying(false);
  };

  const handlePrev = () => {
    if (!audioRef.current) return;

  const currentTime = audioRef.current.currentTime;

  if (currentTime > 2) {
    //  Restart current track if more that 2 senkondzz
    audioRef.current.currentTime = 0;
    setProgress(0);
  } else {
    // Go to previous track
    setCurrentIndex((prev) => (prev - 1 + trackList.length) % trackList.length);
    setProgress(0);
    //setIsPlaying(false);
  }
  };

  const updateProgress = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => { //ngl ai helped a lot for this function
    if (!audioRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * (audioRef.current.duration || 0);
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % trackList.length);
    setIsPlaying(true);
    setProgress(0);
  };


    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const updateTime = () => {
  if (!audioRef.current) return;

  const current = audioRef.current.currentTime;
  const total = audioRef.current.duration || 0;

  setCurrentTime(current);
  setDuration(total);

  setProgress((current / total) * 100);
};

const formatTime = (time: number) => { //per minuti e secondi
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};


  return (
    <div className="bg-transparent flex flex-col items-center gap-4 p-4 w-65 shadow-sm">

    <div className='w-full pb-1.5 cursor-pointer' onClick={handleSeek}>
    <div
        className="w-full h-1 bg-gray-300/30 rounded-sm cursor-pointer "
        onClick={handleSeek}
      >
        <div
          className="relative h-1 bg-red-600 rounded-xs transition-all duration-200 ease-linear "
          style={{ width: `${progress}%` }}
        >
            <div
        className="absolute right-[-0.26rem] top-[-0.19rem]  w-2.5 h-2.5 bg-red-600  rounded-full transition-all duration-200 ease-linear"
        
      onClick={handleSeek}/>
        </div>
      </div>
    </div>

        <div className="w-full flex justify-between text-xs text-gray-500 -mt-4">
  <span>{formatTime(currentTime)}</span>
  <span>{formatTime(duration)}</span>
</div>

      <div className="flex items-center  justify-between mb-1.5  -mt-2">
        <button onClick={handlePrev} className="rounded-full  p-3  outline outline-white/35 cursor-pointer group hover:bg-white/5 active:scale-98 transition-all"><img src={previous} alt="prev" className='invert w-5 pr-0.5'/></button>
        <button
          onClick={handlePlayPause}
          className=" bg-gray-200 p-5 rounded-full flex items-center justify-center shadow cursor-pointer mx-6"
        >
          {isPlaying ? <img src={pause} alt="play" className='opacity-90 w-6'/> : <img src={play} alt="pause" className='opacity-90 translate-x-0.5 w-6'/>}
        </button>
        <button onClick={handleNext} className="rounded-full p-3 outline outline-white/35 cursor-pointer group hover:bg-white/5 active:scale-98 transition-all "><img src={previous} alt="next" className='rotate-180 invert w-5 pr-0.5' /></button>
      </div>

      
      <audio
            ref={audioRef}
            src={currentTrack.audio}
        onTimeUpdate={() => {
        updateProgress();
        updateTime();
        }}        onEnded={handleEnded}
        onLoadedMetadata={updateProgress}
                preload="metadata"
                hidden
        />

      
    </div>
  );
}
