import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Toggle visibility
      setIsVisible(scrollTop > 300);

      // Calculate progress
      const scrollProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 md:bottom-24 end-8 z-50 flex items-center justify-center w-12 h-12 transition-all duration-500 rounded-full group ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      {/* Background/Glassmorphism Base */}
      <div className="absolute inset-0 rounded-full bg-surface-container shadow-xl backdrop-blur-md transition-transform group-hover:scale-110" />
      
      {/* SVG Progress Circle */}
      <svg className="absolute inset-0 -rotate-90 w-full h-full p-1" viewBox="0 0 40 40">
        {/* Track Circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-on-surface/10"
        />
        {/* Progress Circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset }}
          className="text-secondary transition-all duration-200"
        />
      </svg>

      {/* Arrow Icon */}
      <span className="material-symbols-outlined text-2xl relative z-10 text-on-surface-variant font-bold transition-transform group-hover:-translate-y-1">
        arrow_upward
      </span>
    </button>
  );
};

export default ScrollToTop;
