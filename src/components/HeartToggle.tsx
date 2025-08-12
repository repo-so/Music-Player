import { useState, useEffect } from "react";
interface ToggleLikedProps {
  liked: boolean;
  onToggle: () => void;
}

export const HeartToggle = ({ liked, onToggle }: ToggleLikedProps) => {
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [internalLiked, setInternalLiked] = useState(liked);

  // Update internal state when prop changes, but don't animate
  useEffect(() => {
    setInternalLiked(liked);
  }, [liked]);

  const handleToggle = () => {
    setIsAnimating(true);
    setInternalLiked(!internalLiked);
    onToggle();
    
    // Reset animation flag after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onMouseDown={handleToggle}
        className="focus:outline-none cursor-pointer"
        aria-label={internalLiked ? 'Unlike' : 'Like'}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {/* Heart outline (always visible) */}
          <svg
            className={`absolute w-4.5 h-4.5 ${internalLiked ? 'text-transparent' : 'text-red-500'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>

          {/* Filled heart (animated only on click) */}
          <svg
            className={`absolute w-4.5 h-4.5 ${
              internalLiked ? 'text-red-500 scale-100 opacity-100' : 'scale-50 opacity-0'
            } ${
              isAnimating ? 'transition-all duration-300 ease-in-out' : ''
            }`}
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

}