import React from 'react';

interface HouseLogoProps {
  size?: number;
  className?: string;
  variant?: 'white' | 'blue';
}

export const HouseLogo: React.FC<HouseLogoProps> = ({
  size = 64,
  className = '',
  variant = 'blue',
}) => {
  const isWhite = variant === 'white';
  const strokeColor = isWhite ? '#FFFFFF' : '#1D4ED8';
  const fillColor = isWhite ? '#FFFFFF' : '#2563EB';

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* House Roof & Outline */}
        <path
          d="M50 14L15 42V84C15 86.2091 16.7909 88 19 88H81C83.2091 88 85 86.2091 85 84V42L50 14Z"
          stroke={strokeColor}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={isWhite ? 'none' : '#EFF6FF'}
        />

        {/* Chimney */}
        <path
          d="M72 26V38"
          stroke={strokeColor}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Three Roommates Silhouette in the Center */}
        {/* Center Person (taller) */}
        <circle cx="50" cy="51" r="7" fill={fillColor} />
        <path
          d="M39 74C39 67.9249 43.9249 63 50 63C56.0751 63 61 67.9249 61 74"
          stroke={fillColor}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Left Person */}
        <circle cx="34" cy="54" r="5.5" fill={fillColor} />
        <path
          d="M24 74C24 68.5 28.5 64 34 64"
          stroke={fillColor}
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Right Person */}
        <circle cx="66" cy="54" r="5.5" fill={fillColor} />
        <path
          d="M66 64C71.5 64 76 68.5 76 74"
          stroke={fillColor}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
