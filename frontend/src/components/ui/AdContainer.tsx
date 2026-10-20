'use client';

import React, { useEffect } from 'react';

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
      className="w-full my-4 flex flex-col items-center justify-center overflow-hidden max-w-full"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', textAlign: 'center' }}
        data-ad-client={adsenseClientId}
        data-ad-slot={adSlotId || '1234567890'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
};
