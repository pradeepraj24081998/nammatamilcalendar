'use client';

import React from 'react';

interface AdContainerProps {
  slotName?: string;
  format?: 'banner' | 'in-feed' | 'rectangle';
  adSlotId?: string;
}

export const AdContainer: React.FC<AdContainerProps> = ({
  adSlotId,
}) => {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  // If no AdSense ID is configured yet, do not render unwanted empty/dashed boxes
  if (!adsenseClientId) {
    return null;
  }

  return (
    <div className="w-full my-4 flex flex-col items-center justify-center overflow-hidden" aria-label="Sponsor Area">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={adsenseClientId}
        data-ad-slot={adSlotId || '1234567890'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
