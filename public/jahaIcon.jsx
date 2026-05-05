

const JahaIntegratedShield = ({ size = 120, className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 350 120" 
      width={size} 
      height={size / 2.9} 
      className={className}
    >
      <title>Jaha Professional Integrated Shield</title>
      
      {/* Geometric Shield Shape */}
      <path 
        d="M 50 20 
           L 80 40 
           L 80 80 
           L 50 100 
           L 20 80 
           L 20 40 Z" 
        fill="#111" 
        stroke="#ffffff" 
        strokeWidth="2" 
      />
      
      {/* Stylized, bold 'J' */}
      <path 
        d="M 50 40 
           L 50 85 
           Q 50 90, 42 90" 
        stroke="#ffffff" 
        strokeWidth="8" 
        fill="none" 
        strokeLinecap="square"
      />
      
      {/* Wordmark with strong presence */}
      <text 
        x="100" 
        y="80" 
        fontFamily="'Montserrat', 'Oswald', sans-serif" 
        fontWeight="700" 
        fontSize="48" 
        fill="#ffffff"
        style={{ letterSpacing: '2px' }}
      >
        JAHA
      </text>
    </svg>
  );
};

export default JahaIntegratedShield;