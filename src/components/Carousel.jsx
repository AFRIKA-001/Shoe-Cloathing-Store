import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 

const Carousel = ({ slides, autoSlide = true, autoSlideInterval = 4000 }) => {
  const [currentState, setCurrentState] = useState(0);

  const prev = () => setCurrentState((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = useCallback(() => {
    setCurrentState((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  }, [slides.length]);

  // Set up auto-sliding mechanism
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="relative max-w-6xl  mx-auto overflow-hidden rounded-2xl object-cover shadow-xl  cursor-pointer  my-10">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentState * 100}%)` }}
      >
        {slides.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt={`Slide ${index + 1}`} 
            className="object-cover w-full h-64 md:h-115 shrink-0"
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={prev}
          className="p-2 text-gray-800 bg-white/80 rounded-full shadow-md hover:bg-white transition-all transform active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={next}
          className="p-2 text-gray-800 bg-white/80 rounded-full shadow-md hover:bg-white transition-all transform active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentState(i)}
              className={`
                transition-all w-3 h-3 rounded-full bg-white
                ${currentState === i ? "p-1 px-4" : "bg-opacity-50"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;