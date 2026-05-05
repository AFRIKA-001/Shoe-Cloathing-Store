
const JahaFavicon = ({ size = 32, className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={className}
    >
      <title>Jaha Minimalist Monogram</title>
      
      {/* Sharp, precise, angular 'J' */}
      <path 
        d="M 55 25 
           L 55 70 
           L 35 85" 
        stroke="#ffffff" 
        strokeWidth="10" 
        fill="none" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="48" stroke="#ffffff" strokeWidth="2" fill="none"/>
    </svg>
  );
};

export default JahaFavicon;