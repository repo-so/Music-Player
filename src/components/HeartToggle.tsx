
interface ToggleLikedProps {
  liked: boolean;
  onToggle: () => void;
}

export const HeartToggle = ({ liked, onToggle }: ToggleLikedProps) => {

  const handleToggle = () => {
    onToggle(); 
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleToggle}
        className="focus:outline-none cursor-pointer"
        aria-label={liked ? 'Unlike' : 'Like'}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <svg
            className={`absolute w-4.5 h-4.5 ${liked ? 'text-transparent' : 'text-[#ec2828]'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>

          <svg
            className={`absolute w-4.5 h-4.5 transition-all duration-300 ease-in-out ${
              liked ? 'text-[#ec2828] scale-100 opacity-100' : 'scale-50 opacity-0'
            } `}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
      </button>
    </div>
  );
};