'use client';

import React, { useEffect, useState } from 'react';
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
  
  // Real slot ID from props or env (never use dummy '1234567890' which causes Google 400 Bad Request)
  const effectiveSlotId = adSlotId || process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT;
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLocal =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.endsWith('.local');
      setIsLocalhost(isLocal);

      // Only push to Google AdSense if we are on a live site AND have a real, valid slot ID
      // Google returns HTTP 400 if called on localhost or with dummy slot IDs like '1234567890'
      if (!isLocal && effectiveSlotId && effectiveSlotId !== '1234567890') {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch {
          // AdSense safety catch
        }
      }
    }
  }, [effectiveSlotId]);

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

      {/* Ad Area */}
      <div className="w-full flex items-center justify-center min-h-[90px] sm:min-h-[100px] overflow-hidden">
        {effectiveSlotId && !isLocalhost ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px', textAlign: 'center' }}
            data-ad-client={adsenseClientId}
            data-ad-slot={effectiveSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-3 px-4 text-[#8C6200]/70 text-xs font-semibold">
            <span>Google AdSense Slot</span>
            <span className="text-[10px] text-[#A89FA4] mt-0.5">
              {isLocalhost
                ? 'Development Mode (Ads only serve on live nammatamilcalendar.in)'
                : 'Auto Ads active • Managed automatically by Google AdSense'}
            </span>
          </div>
        )}
      </div>

      <span className="text-[10px] text-[#A89FA4] font-medium mt-1.5">
        Google AdSense Verified Partner ({adsenseClientId})
      </span>
    </aside>
  );
};
