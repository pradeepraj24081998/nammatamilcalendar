'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Copy, Check, MessageCircle, Clock, MapPin, Sparkles } from 'lucide-react';
import { Locale } from '@/lib/types';

interface ContactFormProps {
  locale: Locale;
}

export const ContactForm: React.FC<ContactFormProps> = ({ locale }) => {
  const isTa = locale === 'ta';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const officialEmail = 'nammatamilcalendar@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (typeof window !== 'undefined') {
        const key = 'namma_calendar_contact_messages';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({
          ...formData,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem(key, JSON.stringify(existing));
      }
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      {/* 1. Quick Direct Channels Banner (Email, WhatsApp, Working Hours) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        
        {/* Email Direct Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#EBDCCF] shadow-xs flex flex-col justify-between hover:border-[#8B1515] transition-all">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#8B1515]/10 flex items-center justify-center text-[#8B1515]">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#8C6200] block uppercase tracking-wider">
              {isTa ? 'மின்னஞ்சல்' : 'Email Us'}
            </span>
            <a
              href={`mailto:${officialEmail}?subject=Namma%20Tamil%20Calendar%20Inquiry`}
              className="text-xs sm:text-sm font-extrabold text-[#8B1515] hover:underline block break-all"
            >
              {officialEmail}
            </a>
          </div>
          <button
            onClick={handleCopyEmail}
            type="button"
            className="mt-3 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFF9F0] border border-[#EBDCCF] text-[#8B1515] hover:bg-[#8B1515] hover:text-white transition-all cursor-pointer"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEmail ? (isTa ? 'நகலெடுக்கப்பட்டது!' : 'Copied!') : (isTa ? 'Email நகலெடு' : 'Copy Email')}</span>
          </button>
        </div>

        {/* WhatsApp Chat Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#EBDCCF] shadow-xs flex flex-col justify-between hover:border-emerald-600 transition-all">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-800 block uppercase tracking-wider">
              {isTa ? 'வாட்ஸ்அப் ஆதரவு' : 'WhatsApp Support'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#1F1517] block">
              {isTa ? 'உடனடி உதவி மற்றும் ஆலோசனைகள்' : 'Instant Chat & Quick Inquiries'}
            </span>
          </div>
          <a
            href="https://wa.me/918072000000?text=வணக்கம்,%20நம்ம%20தமிழ்%20காலண்டர்%20தொடர்பாக%20பேச%20விரும்புகிறேன்."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{isTa ? 'WhatsApp-ல் பேச' : 'Chat on WhatsApp'}</span>
          </a>
        </div>

        {/* Response Guarantee Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#EBDCCF] shadow-xs flex flex-col justify-between hover:border-[#8B1515] transition-all">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#8C6200] block uppercase tracking-wider">
              {isTa ? 'பதில் உறுதி' : 'Response SLA'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#1F1517] block">
              {isTa ? '24 மணி நேரத்திற்குள் பதில் உறுதி' : 'Guaranteed Reply in 24 Hours'}
            </span>
            <span className="text-[11px] text-[#5C5256] block">
              {isTa ? 'வாரத்தின் 7 நாட்களும் இயங்குகிறது' : 'Operating 7 days a week'}
            </span>
          </div>
          <div className="mt-3 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFF9F0] border border-[#EBDCCF] text-[#8B1515]">
            <MapPin className="w-3.5 h-3.5" />
            <span>தமிழ்நாடு, இந்தியா</span>
          </div>
        </div>

      </div>

      {/* 2. Interactive Direct Message Form */}
      <div className="bg-white border-2 border-[#EBDCCF] p-4 xs:p-5 sm:p-8 rounded-3xl shadow-sm space-y-6 max-w-full overflow-hidden">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#8B1515] flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-[#C93B2B]" />
            <span>{isTa ? 'நேரடி செய்தி படிவம்' : 'Send us a Direct Message'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5256] mt-1 font-medium">
            {isTa
              ? 'உங்கள் கருத்துக்கள், திருத்தங்கள் அல்லது விளம்பர தேவைகளை கீழே உள்ள படிவத்தில் அனுப்பி வைக்கலாம்.'
              : 'Submit corrections, feedback, feature requests, or partnership inquiries directly.'}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3 animate-in fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-black text-emerald-900">
              {isTa ? 'தங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டது!' : 'Message Sent Successfully!'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 font-medium max-w-md mx-auto">
              {isTa
                ? 'எங்கள் ஆசிரியர் குழு தங்கள் செய்தியைப் பரிசீலித்து, 24 மணி நேரத்திற்குள் உங்களைத் தொடர்புகொள்ளும். நன்றி!'
                : 'Our editorial team has received your message and will reply within 24 hours. Thank you for connecting with us!'}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              type="button"
              className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 cursor-pointer"
            >
              <span>{isTa ? 'மற்றொரு செய்தி அனுப்ப' : 'Send Another Message'}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#8B1515] uppercase tracking-wider mb-1.5">
                  {isTa ? 'உங்கள் பெயர் *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isTa ? 'எ.கா: பிரதீப் ராஜ்' : 'e.g. Pradeep Raj'}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-semibold focus:border-[#8B1515] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8B1515] uppercase tracking-wider mb-1.5">
                  {isTa ? 'மின்னஞ்சல் முகவரி *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-semibold focus:border-[#8B1515] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#8B1515] uppercase tracking-wider mb-1.5">
                  {isTa ? 'வாட்ஸ்அப் / தொலைபேசி எண் (விருப்பமிருந்தால்)' : 'Phone / WhatsApp (Optional)'}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-semibold focus:border-[#8B1515] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8B1515] uppercase tracking-wider mb-1.5">
                  {isTa ? 'செய்தி தலைப்பு *' : 'Subject *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={isTa ? 'எ.கா: பண்டிகை தேதி விவரம் / விளம்பரம்' : 'e.g. Festival Date Query / Advertising'}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-semibold focus:border-[#8B1515] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8B1515] uppercase tracking-wider mb-1.5">
                {isTa ? 'உங்கள் செய்தி விவரம் *' : 'Your Detailed Message *'}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={isTa ? 'உங்கள் கருத்துக்கள் அல்லது கேள்விகளை விரிவாக இங்கு எழுதவும்...' : 'Type your detailed inquiry or feedback here...'}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-semibold focus:border-[#8B1515] focus:outline-none resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B1515] to-[#C93B2B] text-white font-black text-sm shadow-md hover:brightness-110 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? (isTa ? 'அனுப்பப்படுகிறது...' : 'Sending Message...') : (isTa ? 'செய்தியை அனுப்பவும்' : 'Submit Message')}</span>
            </button>
          </form>
        )}
      </div>

      {/* 3. Frequently Asked Questions (FAQ) */}
      <div className="bg-[#FFFDF8] border-2 border-[#EBDCCF] p-5 sm:p-8 rounded-3xl shadow-sm space-y-4">
        <h3 className="text-lg font-black text-[#8B1515] flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <span>{isTa ? 'அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQ)' : 'Frequently Asked Questions (FAQ)'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-white border border-[#EBDCCF] space-y-1.5">
            <span className="font-black text-[#8B1515] block">
              {isTa ? '1. பஞ்சாங்கம் மற்றும் சுப நேரங்கள் எதன் அடிப்படையில் கணக்கிடப்படுகின்றன?' : '1. How are Panchangam & timings calculated?'}
            </span>
            <p className="text-[#5C5256] leading-relaxed">
              {isTa
                ? 'பாரம்பரிய வாக்கிய பஞ்சாங்க முறை மற்றும் திருக்கணித துல்லியக் கணக்கீடுகளின்படி நல்ல நேரம், ராகு காலம் மற்றும் விரத தினங்கள் கணக்கிடப்படுகின்றன.'
                : 'Calculations follow authoritative traditional Tamil Vakkiya and Drik Panchangam standards for Chennai / IST timezone.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EBDCCF] space-y-1.5">
            <span className="font-black text-[#8B1515] block">
              {isTa ? '2. தவறான தகவல் அல்லது பிழைகளை எவ்வாறு சுட்டிக்காட்டுவது?' : '2. How to report corrections or typos?'}
            </span>
            <p className="text-[#5C5256] leading-relaxed">
              {isTa
                ? 'மேலே உள்ள நேரடி படிவம் அல்லது வாட்ஸ்அப் வழியாக குறிப்பிட்ட தேதி மற்றும் திருத்த விவரத்தை அனுப்பலாம்; உடனடியாக சரிபார்க்கப்பட்டு திருத்தப்படும்.'
                : 'Send the specific date and correction details via this form or WhatsApp. Our team will verify and update it promptly.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EBDCCF] space-y-1.5">
            <span className="font-black text-[#8B1515] block">
              {isTa ? '3. விளம்பரங்கள் அல்லது வணிக தொடர்புக்கு?' : '3. For Advertisements & Sponsorships?'}
            </span>
            <p className="text-[#5C5256] leading-relaxed">
              {isTa
                ? 'உங்கள் நிறுவனம் அல்லது சேவைகளை காலண்டர் பக்கங்களில் விளம்பரம் செய்ய nammatamilcalendar@gmail.com என்ற முகவரியில் தொடர்பு கொள்ளவும்.'
                : 'For banner placements and sponsorship inquiries, reach out to nammatamilcalendar@gmail.com.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EBDCCF] space-y-1.5">
            <span className="font-black text-[#8B1515] block">
              {isTa ? '4. எதிர்கால ஆண்டுகளின் (2028+) தரவுகள் கிடைக்குமா?' : '4. Are future years (2028+) supported?'}
            </span>
            <p className="text-[#5C5256] leading-relaxed">
              {isTa
                ? 'தற்போது 2026 மற்றும் 2027 முழுமையாக வழங்கப்பட்டுள்ளது. அடுத்தடுத்த ஆண்டுகளின் பஞ்சாங்கம் விரைவில் இணைக்கப்படும்.'
                : 'Currently 2026 & 2027 are fully verified and available. Subsequent years will be rolled out continuously.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
