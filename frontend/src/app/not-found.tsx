import React from 'react';
import Link from 'next/link';
import { Home, Compass, Sparkles } from 'lucide-react';

export default function RootNotFound() {
  return (
    <html lang="ta">
      <body className="bg-[#FFFBF5] text-[#1F1517] min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white border-2 border-[#EBDCCF] p-8 rounded-3xl shadow-lg">
          <span className="text-xs font-black uppercase tracking-widest text-[#C93B2B] bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-block">
            404 Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#8B1515]">
            பக்கம் கிடைக்கவில்லை
          </h1>
          <p className="text-sm text-[#5C5256]">
            Page Not Found. Return to Namma Tamil Calendar.
          </p>
          <div className="pt-2">
            <Link
              href="/ta"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#8B1515] hover:bg-[#700C0C] text-white font-bold text-sm shadow-md transition-all"
            >
              <Home className="w-4 h-4" />
              <span>முகப்புக்குச் செல்க (Go to Home)</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

