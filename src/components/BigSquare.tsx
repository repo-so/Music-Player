import type { TrackData } from '../assets/data/songsData.ts';
import { HeartToggle } from './HeartToggle.tsx';
interface Props {
  track: TrackData;
    toggleLiked: (id: number) => void;
}


export default function TrackCard({ track, toggleLiked }: Props) {

  

  return (<>
        <div className="bg-transparent flex flex-col w-68 ">

            <div className="w-full justify-center ">
            <div className=" mt-3.5 mx-3.5 w-auto size-58 rounded-lg overflow-hidden shadow-[0px_0px_14px_1px_#000000]">
                <img src={track.image} alt={track.title} className='rounded-lg object-cover w-full h-full'/>
            </div>
            </div>

            <div className="flex justify-between px-4.5 items-center pt-4.5 pr-5">
                <div className="flex-col ">
                    <p className='h-6 font-poppins w-49 text-[1.09rem] text-white truncate tracking-tight'>{track.title}</p>
                    <p className='font-poppins w-49 text-gray-400 text-xs truncate '>{track.artist}</p>
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