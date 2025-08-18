import type { TrackData } from '../assets/data/songsData.ts';
import { Play, Heart, Music } from 'lucide-react';

interface TrackListProps {
  tracks: TrackData[];
  currentIndex: number;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
  onToggleLike: (id: number) => void;
}

export default function TrackList({
  tracks,
  currentIndex,
  isPlaying,
  onTrackSelect,
  onToggleLike,
}: TrackListProps) {
    
return (

    
    <div className="bg-[#202020] rounded-xl py-3 px-1.5 w-full max-w-md">
      <h3 className="text-white font-poppins text-center mb-4 px-2">Playlist</h3>
      
      <div className="max-h-85 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <div className="space-y-1.5">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              onClick={() => onTrackSelect(index)}
              className={`flex items-center p-1.5  mx-1 rounded-lg cursor-pointer transition-all duration-200 group ${
                currentIndex === index
                  ? 'bg-[#626262]/20'
                  : 'hover:bg-white/5'
              }`}
            >
              {/* Play Status Icon */}
              <div className="flex-shrink-0 w-11 h-11 mr-1.5 bg-[#3d3d3d] rounded-md flex items-center justify-center">
                {currentIndex === index ? (
                  isPlaying ? (
                    <div className="flex items-center space-x-0.5">
                      <div className="w-1 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-1 h-5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-3.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  ) : (
                    <img src={track.image} className='object-cover w-9.5 h-9.5 rounded-sm' alt={track.title} />
                  )
                ) : (
                    <img src={track.image} className='object-cover w-9.5 h-9.5 rounded-sm' alt={track.title} />
                )}
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className={`font-poppins truncate text-sm/tight ${
                  currentIndex === index ? 'text-red-400' : 'text-white group-hover:text-red-400'
                } transition-colors`}>
                  {track.title}
                </p>
                <p className="text-gray-400 text-xs/tight truncate group-hover:text-gray-300 transition-colors">
                  {track.artist}
                </p>
              </div>

              {/* Like Icon */}
              <div className="flex-shrink-0 ml-2 mr-1" >
                {onToggleLike ? (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleLike(track.id);
      }}
      className="p-1 rounded-full cursor-pointer transition-colors"
    >
      <Heart
        size={18}
        className={`transition-colors ${
          track.liked
            ? 'text-[#ec2828] fill-current'
            : 'text-gray-500 hover:text-red-400'
        }`}
      />
    </button>
  ) : (
    <Heart
      size={18}
      className={track.liked ? 'text-red-600 fill-current' : 'text-gray-500'}
    />
    
  )}

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Track Count */}
      <div className="mt-3 h-4 px-2 text-center ">
        <p className="text-gray-400 text-xs font-poppins mt-2 ">
          {tracks.length} track{tracks.length !== 1 ? 's' : ''} • Track {currentIndex + 1} playing
        </p>
      </div>
    </div>
  );
}