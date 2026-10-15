'use client';

import React from 'react';

interface AdContainerProps {
  slotName?: string;
  format?: 'banner' | 'in-feed' | 'rectangle';
}

export const AdContainer: React.FC<AdContainerProps> = ({
  slotName = 'General Ad Slot',
  format = 'banner',
}) => {
  const heightClasses = {
    banner: 'min-h-[90px] md:min-h-[100px]',
    'in-feed': 'min-h-[160px] md:min-h-[180px]',
    rectangle: 'min-h-[250px]',
  };

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center bg-[#F9F5F0] dark:bg-[#1C171A] border border-dashed border-[#E9E1D8] dark:border-[#382F35] rounded-xl p-3 ${heightClasses[format]} transition-colors`}
      aria-label="Sponsor Advertisement Area"
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-[#A89FA4] mb-1">
        Advertisement / விளம்பரம்
      </span>
      <div className="flex items-center justify-center text-xs text-[#6B6268] dark:text-[#A89FA4]">
        <span>{slotName} (Google AdSense Ready)</span>
      </div>
    </div>
  );
};
