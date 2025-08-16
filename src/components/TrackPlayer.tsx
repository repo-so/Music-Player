import { useRef, useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import type { TrackData } from '../assets/data/songsData.ts';

import play from '../assets/svgs/play.svg'
import pause from '../assets/svgs/pause.svg'
import previous from '../assets/svgs/previous.svg'
import { Shuffle, Repeat, Repeat1 } from 'lucide-react';


interface Props {
  trackList: TrackData[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;

  shuffle: boolean;
  loop: boolean;
  onShuffleToggle: () => void;
  onLoopToggle: () => void;
}

const generateShuffleOrder = (length: number, currentIndex: number) => {
  const indices = Array.from({ length }, (_, i) => i).filter(i => i !== currentIndex);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return [currentIndex, ...indices]; // Current track first, then shuffled
};

export default function TrackPlayer({
  trackList,
  currentIndex,
  setCurrentIndex,

  shuffle,
  loop,
  onShuffleToggle,
  onLoopToggle,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const [shuffleOrder, setShuffleOrder] = useState<number[]>([]);
  const [shuffleIndex, setShuffleIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = trackList[currentIndex];

  useEffect(() => {
    if (shuffle) {
      const newOrder = generateShuffleOrder(trackList.length, currentIndex);
      setShuffleOrder(newOrder);
      setShuffleIndex(0);
    }
  }, [shuffle, trackList.length, currentIndex]);


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
    if (shuffle && shuffleOrder.length > 0) {
      const nextIndex = shuffleIndex + 1;
      if (nextIndex < shuffleOrder.length) {
        setShuffleIndex(nextIndex);
        setCurrentIndex(shuffleOrder[nextIndex]);
      } else {
        //generate new order
        const newOrder = generateShuffleOrder(trackList.length, currentIndex);
        setShuffleOrder(newOrder);
        setShuffleIndex(1);
        if (newOrder.length > 1) {
          setCurrentIndex(newOrder[1]);
        }
      }
    } else {
      setCurrentIndex((prev) => (prev + 1) % trackList.length);
    }
    setProgress(0);
  };

  const handlePrev = () => {
    if (!audioRef.current) return;
    const currentTime = audioRef.current.currentTime;

    if (currentTime > 3) {
      audioRef.current.currentTime = 0;
      setProgress(0);
    } else { //shuffle prev
      if (shuffle && shuffleOrder.length > 0) {
        const prevIndex = shuffleIndex - 1;
        if (prevIndex >= 0 && shuffleOrder[prevIndex] !== undefined) {
          setShuffleIndex(prevIndex);
          setCurrentIndex(shuffleOrder[prevIndex]);
        }
      } else {//normal prev
        setCurrentIndex((prev) => (prev - 1 + trackList.length) % trackList.length);
      }
      setProgress(0);
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
    if (loop) {
      //loop current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      //normal next no loop
      handleNext();
      setIsPlaying(true);
    }
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
        <button
          onClick={onShuffleToggle}
          className={`rounded-full p-2 transition-all ${
            shuffle 
              ? 'text-blue-400 bg-blue-400/10' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Shuffle size={16} />
        </button>
        <button onClick={handlePrev} className=" rounded-full  p-3  outline outline-white/35 cursor-pointer group hover:bg-white/5 active:scale-98 transition-all"><img src={previous} alt="prev" className='invert w-4 -translate-x-[0.06rem]'/></button>
        <button
          onClick={handlePlayPause}
          className=" bg-gray-200 p-5.5 rounded-full flex items-center justify-center shadow cursor-pointer mx-6"
        >
          {isPlaying ? <img src={pause} alt="play" className='opacity-90 w-5'/> : <img src={play} alt="pause" className='opacity-90 translate-x-0.5 w-5'/>}
        </button>
        <button onClick={handleNext} className=" rounded-full p-3 outline outline-white/35 cursor-pointer group hover:bg-white/5 active:scale-98 transition-all "><img src={previous} alt="next" className='rotate-180 invert w-4 translate-x-[0.06rem]' /></button>
      <button
          onClick={onLoopToggle}
          className={`rounded-full p-2 transition-all ${
            loop 
              ? 'text-green-400 bg-green-400/10' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {loop ? <Repeat1 size={16} /> : <Repeat size={16} />}
        </button>
      </div>

      
      <audio
            ref={audioRef}
            src={currentTrack.audio}
        onTimeUpdate={() => {
                      updateProgress();
                      updateTime();
                      }}   
        onEnded={handleEnded}
        onLoadedMetadata={updateProgress}
                preload="metadata"
                hidden
        />

      
    </div>
  );
}
