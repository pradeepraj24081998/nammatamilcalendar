import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Auspicious Oil Lamp (அகல் விளக்கு)
export const AgalVilakkuIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 32C10 38.6 16.3 44 24 44C31.7 44 38 38.6 38 32C38 30 10 30 10 32Z" fill="#C86A2E" />
    <ellipse cx="24" cy="31" rx="14" ry="2.5" fill="#E28743" />
    <path d="M24 30Q24 24 24 20" stroke="#5C2C16" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 6C27 12 28.5 17 24 22C19.5 17 21 12 24 6Z" fill="url(#flame_grad)" />
    <ellipse cx="24" cy="18" rx="2" ry="3.5" fill="#FFF59D" />
    <defs>
      <linearGradient id="flame_grad" x1="24" y1="6" x2="24" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF176" />
        <stop offset="0.6" stopColor="#FF9800" />
        <stop offset="1" stopColor="#E65100" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. Temple Bell (கோவில் மணி)
export const TempleBellIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2v2M8 4h8M12 4c-3.5 0-6 2.5-6 7v4l-2 3h16l-2-3v-4c0-4.5-2.5-7-6-7z" fill="#FFC107" fillOpacity="0.25" stroke="#D97706" />
    <circle cx="12" cy="19" r="1.5" fill="#D97706" />
  </svg>
);

// 3. Moon Phase (பிறை)
export const MoonPhaseIcon: React.FC<IconProps & { phase?: 'valarpirai' | 'theipirai' | 'pournami' | 'amavasai' }> = ({
  className = 'w-5 h-5',
  size,
  phase = 'valarpirai'
}) => {
  if (phase === 'pournami') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
        <circle cx="12" cy="12" r="9" fill="#FFF176" stroke="#FBC02D" strokeWidth="1.5" />
      </svg>
    );
  }
  if (phase === 'amavasai') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
        <circle cx="12" cy="12" r="9" fill="#374151" stroke="#4B5563" strokeWidth="1.5" />
      </svg>
    );
  }
  // Waxing or waning crescent
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
      <path
        d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
        fill="#FFD54F"
        stroke="#FFA000"
        strokeWidth="1.2"
      />
    </svg>
  );
};

// 4. Sun with Aura (சூரியன்)
export const AuspiciousSunIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
    <circle cx="12" cy="12" r="5" fill="#FFA000" stroke="#FF6F00" strokeWidth="1.5" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" stroke="#FF8F00" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 5. 12 Zodiac Rasi Badges with Authentic Illustrative Artwork Images
export const RasiIcon: React.FC<{ rasiKey: string; className?: string }> = ({
  rasiKey,
  className = 'w-10 h-10 sm:w-12 sm:h-12',
}) => {
  const normKey = rasiKey.toLowerCase().trim();
  const imageSrc = `/images/rasi/${normKey}.png`;

  return (
    <div
      className={`relative ${className} rounded-full overflow-hidden shrink-0 border-2 border-[#D4AF37] bg-gradient-to-tr from-amber-100 to-amber-50 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-200`}
    >
      <img
        src={imageSrc}
        alt={rasiKey}
        width={48}
        height={48}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};
