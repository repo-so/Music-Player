import { CircleUserRound } from 'lucide-react'

interface IconProps {
  toggle: () => void;
}

export default function ProfileIcon({toggle}:IconProps ) {

    

  return (<>
    <div className='p-2 -mb-2.5 border-1 rounded-full border-[#8b8b8b]'>
        <a href="https://github.com/repo-so" target="_blank" rel="noopener noreferrer">
        <button className='rounded-full w-12 h-12 border-1 border-[#8b8b8ba2] flex justify-center items-center overflow-hidden cursor-pointer
                        active:scale-97 hover:bg-white/3 hover:border-red-400 transition-all'
            onClick={toggle}>
            <CircleUserRound size={28} className="text-white" />
        </button>
        </a>
    </div>
  </>);
}
