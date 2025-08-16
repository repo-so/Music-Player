import { CircleUserRound } from 'lucide-react'

interface IconProps {
  toggle: () => void;
}

export default function ProfileIcon({toggle}:IconProps ) {

    

  return (<>
    <div className='p-1.5 border-1 rounded-full -mb-2'>
        <a href="https://github.com/repo-so" target="_blank" rel="noopener noreferrer">
        <button className='rounded-full w-14.5 h-14.5 border-1 border-[#8b8b8b] flex justify-center items-center overflow-hidden cursor-pointer
                        active:scale-97 hover:bg-white/3 hover:border-red-400 transition-all'
            onClick={toggle}>
            <CircleUserRound size={28} className="text-white" />
        </button>
        </a>
    </div>
  </>);
}
