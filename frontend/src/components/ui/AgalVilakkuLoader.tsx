'use client';

import React from 'react';

interface AgalVilakkuLoaderProps {
  labelTa?: string;
  labelEn?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AgalVilakkuLoader: React.FC<AgalVilakkuLoaderProps> = ({
  labelTa = 'காலண்டர் விவரங்கள் பெறப்படுகின்றன...',
  labelEn = 'Loading calendar details...',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { width: 48, height: 48, text: 'text-xs' },
    md: { width: 72, height: 72, text: 'text-sm' },
    lg: { width: 96, height: 96, text: 'text-base' },
  };

  const { width, height, text } = sizeMap[size];

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center p-6 space-y-3"
    >
      <div className="relative flex items-center justify-center" style={{ width, height }}>
        {/* Soft Golden Halo */}
        <div
          className="agal-halo absolute rounded-full pointer-events-none"
          style={{
            width: width * 0.9,
            height: height * 0.9,
            background: 'radial-gradient(circle, rgba(235, 175, 45, 0.45) 0%, rgba(235, 150, 20, 0) 70%)',
          }}
        />

        {/* SVG Agal Vilakku (Clay Oil Lamp) */}
        <svg
          viewBox="0 0 100 100"
          width={width}
          height={height}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Lamp Base / Stand */}
          <ellipse cx="50" cy="85" rx="20" ry="4" fill="#8B4513" opacity="0.3" />

          {/* Earthen Clay Body (Agal) */}
          <path
            d="M20 62 C20 78, 80 78, 80 62 C80 58, 20 58, 20 62 Z"
            fill="url(#clayGradient)"
          />

          {/* Lamp Spout / Lip */}
          <path
            d="M50 56 C44 56, 32 60, 22 62 C34 66, 66 66, 78 62 C68 60, 56 56, 50 56 Z"
            fill="#B85D19"
          />

          {/* Oil Reservoir Surface */}
          <ellipse cx="50" cy="61" rx="22" ry="3.5" fill="#C67D30" />

          {/* Wick */}
          <path
            d="M50 58 Q50 50 50 46"
            stroke="#4A2511"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Gently Flickering Golden Flame */}
          <g className="agal-flame">
            {/* Outer Warm Flame */}
            <path
              d="M50 20 C56 30, 58 40, 50 48 C42 40, 44 30, 50 20 Z"
              fill="url(#outerFlameGradient)"
            />
            {/* Inner Bright Core */}
            <path
              d="M50 28 C53 35, 54 42, 50 47 C46 42, 47 35, 50 28 Z"
              fill="url(#innerFlameGradient)"
            />
          </g>

          {/* SVG Gradients */}
          <defs>
            <linearGradient id="clayGradient" x1="20" y1="62" x2="80" y2="78" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A84C1C" />
              <stop offset="0.5" stopColor="#C86A2E" />
              <stop offset="1" stopColor="#87350F" />
            </linearGradient>
            <radialGradient id="outerFlameGradient" cx="50" cy="38" r="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF275" />
              <stop offset="0.6" stopColor="#FF9F1C" />
              <stop offset="1" stopColor="#E71D36" stopOpacity="0.85" />
            </radialGradient>
            <radialGradient id="innerFlameGradient" cx="50" cy="38" r="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.5" stopColor="#FFF59D" />
              <stop offset="1" stopColor="#FFB300" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Accessible Loading Indicators */}
      <div className={`text-center space-y-0.5 ${text} font-medium tracking-wide`}>
        <p className="text-[#70263B] dark:text-[#DFBA73]">{labelTa}</p>
        <p className="text-xs text-[#6B6268] dark:text-[#A89FA4] opacity-80">{labelEn}</p>
      </div>
    </div>
  );
};
