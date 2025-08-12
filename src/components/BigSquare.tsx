import type { TrackData } from '../assets/data/songsData.ts';
import { HeartToggle } from './HeartToggle.tsx';
interface Props {
  track: TrackData;
    toggleLiked: (id: number) => void;
}


export default function TrackCard({ track, toggleLiked }: Props) {

  

  return (<>
        <div className="bg-transparent flex flex-col w-65 ">

            <div className="w-full justify-center ">
            <div className=" mt-3 mx-3 w-auto size-58 overflow-hidden shadow-[0px_0px_15px_1px_#111111]">
                <img src={track.image} alt={track.title} className='rounded-lg object-cover w-full h-full'/>
            </div>
            </div>

            <div className="flex justify-between px-4.5 items-center pt-4.5">
                <div className="flex-col">
                    <p className='font-poppins text-white'>{track.title}</p>
                    <p className='font-poppins text-gray-400 text-xs'>{track.artist}</p>
                </div>
                <HeartToggle 
                liked={track.liked}
          onToggle={() => toggleLiked(track.id)}/>
            </div>

            <div>
                
            </div>

        </div>
  </>);
}