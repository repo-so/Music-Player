
import type { TrackData } from '../assets/data/songsData.ts';
interface Props {
  track: TrackData;
}


export default function TrackCard({ track }: Props) {

  return (<>
        <div className="bg-[#222222] flex flex-col w-65 ">

            <div className="w-full justify-center ">
            <div className=" my-3 mx-3 w-auto">
                <img src={track.image} alt={track.title} className='rounded-lg object-cover shadow-[0px_0px_15px_1px_#111111]'/>
            </div>
            </div>

            <div className="flex justify-between px-7 items-center">
                <div className="flex-col">
                    <p>{track.title}</p>
                    <p>{track.artist}</p>
                </div>
                <div className="size-4 bg-red-500"></div>
            </div>

            <div>
                
            </div>

        </div>
  </>);
}