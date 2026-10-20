'use client';

import React, { useEffect } from 'react';

import { Sparkles } from 'lucide-react';

interface AdContainerProps {
  slotName?: string;
  format?: 'banner' | 'in-feed' | 'rectangle';
  adSlotId?: string;
}

export const AdContainer: React.FC<AdContainerProps> = ({
  slotName = 'Sponsored Advertisement',
  adSlotId,
}) => {
  const rawId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-8437641228559704';
  const adsenseClientId = rawId.startsWith('ca-') ? rawId : `ca-${rawId}`;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch {
      // AdSense initialization safety catch
    }
  }, []);

  return (
    <aside
      aria-label={slotName}
      className="w-full my-6 rounded-2xl bg-[#FFFDF8] border-2 border-dashed border-[#D4AF37]/50 p-3 sm:p-4 shadow-xs flex flex-col items-center justify-center text-center overflow-hidden max-w-full"
    >
      {/* Top Auspicious Sponsor Badge */}
      <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs font-bold text-[#8C6200] uppercase tracking-wider mb-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
        <span>விளம்பரம் • Sponsored Advertisement</span>
      </div>

      {/* Live Google AdSense Ins Element */}
      <div className="w-full flex items-center justify-center min-h-[90px] sm:min-h-[100px] overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px', textAlign: 'center' }}
          data-ad-client={adsenseClientId}
          data-ad-slot={adSlotId || '1234567890'}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      <span className="text-[10px] text-[#A89FA4] font-medium mt-1.5">
        Google AdSense Verified Partner ({adsenseClientId})
      </span>
    </aside>
  );
};
