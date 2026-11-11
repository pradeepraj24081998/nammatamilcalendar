import React from 'react';
import Link from 'next/link';
import { Calendar, Compass, Sparkles, Home, PhoneCall } from 'lucide-react';
import { TempleBellIcon } from '@/components/ui/CalendarIcons';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full text-center space-y-6 bg-white border-2 border-[#EBDCCF] p-8 sm:p-12 rounded-3xl shadow-lg">
        {/* Decorative Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-[#8B1515]/10 flex items-center justify-center text-[#8B1515]">
          <TempleBellIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#8B1515]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#C93B2B] bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-block">
            404 — பிழை (Error)
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#8B1515]">
            பக்கம் கிடைக்கவில்லை
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#5C5256]">
            Page Not Found
          </p>
          <p className="text-xs sm:text-sm text-[#5C5256] max-w-md mx-auto leading-relaxed pt-2">
            நீங்கள் தேடிய பக்கம் இடம் மாற்றப்பட்டிருக்கலாம் அல்லது முகவரி தவறாக இருக்கலாம். கீழே உள்ள முக்கிய இணைப்புகள் வழியாக தொடரவும்.
          </p>
          <p className="text-xs text-[#5C5256]/80 italic">
            The requested page may have been moved or the URL is incorrect. Use the quick links below to navigate.
          </p>
        </div>

        {/* Helpful Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          <Link
            href="/ta"
            className="p-3.5 rounded-2xl bg-[#8B1515] hover:bg-[#700C0C] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>இன்றைய காலண்டர் (Home)</span>
          </Link>

          <Link
            href="/ta/calendar/month/2026/10"
            className="p-3.5 rounded-2xl bg-[#FFF9F0] hover:bg-[#8B1515] text-[#8B1515] hover:text-white border border-[#EBDCCF] font-black text-xs sm:text-sm transition-all flex items-center justify-center space-x-2"
          >
            <Compass className="w-4 h-4" />
            <span>மாத காலண்டர் (Monthly)</span>
          </Link>

          <Link
            href="/ta/festivals"
            className="p-3.5 rounded-2xl bg-[#FFF9F0] hover:bg-[#8B1515] text-[#8B1515] hover:text-white border border-[#EBDCCF] font-black text-xs sm:text-sm transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>பண்டிகைகள் (Festivals)</span>
          </Link>

          <Link
            href="/ta/contact"
            className="p-3.5 rounded-2xl bg-[#FFF9F0] hover:bg-[#8B1515] text-[#8B1515] hover:text-white border border-[#EBDCCF] font-black text-xs sm:text-sm transition-all flex items-center justify-center space-x-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>தொடர்புக்கு (Contact Us)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

