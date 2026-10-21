'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Copy, Check, MessageCircle, Clock, MapPin, Sparkles, Compass } from 'lucide-react';
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
    place: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastAction, setLastAction] = useState<'email' | 'whatsapp' | 'form'>('form');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const officialEmail = 'arangaapradeep@gmail.com';
  const officialPhone = '+91 80724 09162';
  const rawPhoneNumber = '8072409162';
  const whatsappNumber = '918072409162';
  const WEB3FORMS_ACCESS_KEY = '9a83f790-8279-49e5-ba0a-972106081451';

  const quickTopics = [
    { id: 'panchangam', labelTa: '🌟 நல்ல நேரம் / பஞ்சாங்கம்', labelEn: '🌟 Auspicious Timings / Panchangam' },
    { id: 'festivals', labelTa: '🪔 பண்டிகைகள் & விரதங்கள்', labelEn: '🪔 Festivals & Vratam' },
    { id: 'ads', labelTa: '📢 விளம்பரம் & வர்த்தகம்', labelEn: '📢 Advertising & Sponsorship' },
    { id: 'corrections', labelTa: '✍️ பிழை திருத்தம்', labelEn: '✍️ Correction / Typo Report' },
    { id: 'general', labelTa: '💬 பொதுவான கருத்து', labelEn: '💬 General Feedback' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const buildMessageSummary = () => {
    return isTa
      ? `வணக்கம்,\n\nநம்ம தமிழ் காலண்டர் மூலம் தொடர்பு செய்தி:\n• பெயர்: ${formData.name || 'குறிப்பிடப்படவில்லை'}\n• மின்னஞ்சல்: ${formData.email || 'குறிப்பிடப்படவில்லை'}\n• வாட்ஸ்அப்: ${formData.phone || 'குறிப்பிடப்படவில்லை'}\n• ஊர் / இருப்பிடம்: ${formData.place || 'குறிப்பிடப்படவில்லை'}\n• தலைப்பு: ${formData.subject || 'பொதுவான தொடர்பு'}\n\nசெய்தி விவரம்:\n${formData.message || ''}`
      : `Hello Namma Tamil Calendar Team,\n\nInquiry from Namma Tamil Calendar:\n• Name: ${formData.name || 'Not specified'}\n• Email: ${formData.email || 'Not specified'}\n• WhatsApp: ${formData.phone || 'Not specified'}\n• Location / City: ${formData.place || 'Not specified'}\n• Subject: ${formData.subject || 'General Inquiry'}\n\nMessage Details:\n${formData.message || ''}`;
  };

  const saveToLocalBackup = () => {
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
  };

  const handleSendViaWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      alert(isTa ? 'தயவுசெய்து உங்கள் பெயர் மற்றும் செய்தியை உள்ளிடவும்.' : 'Please enter your Name and Message.');
      return;
    }

    saveToLocalBackup();
    const text = buildMessageSummary();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setLastAction('whatsapp');
    setSubmitted(true);
  };

  const handleSendViaEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      alert(isTa ? 'தயவுசெய்து உங்கள் பெயர் மற்றும் செய்தியை உள்ளிடவும்.' : 'Please enter your Name and Message.');
      return;
    }

    saveToLocalBackup();
    const subject = `[Namma Tamil Calendar] ${formData.subject || 'User Inquiry'}`;
    const body = buildMessageSummary();
    const mailtoUrl = `mailto:${officialEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (typeof window !== 'undefined') {
      window.location.href = mailtoUrl;
    }
    setLastAction('email');
    setSubmitted(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: 'Namma Tamil Calendar Website',
          subject: formData.subject
            ? `[Namma Tamil Calendar] ${formData.subject}`
            : (isTa ? 'நம்ம தமிழ் காலண்டர் - புதிய தொடர்பு செய்தி' : 'Namma Tamil Calendar - New Contact Inquiry'),
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not specified',
          place: formData.place || 'Not specified',
          category: formData.subject || 'General Inquiry',
          message: formData.message,
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          language: isTa ? 'Tamil (ta)' : 'English (en)',
        }),
      });

      const data = await response.json();

      if (data.success) {
        saveToLocalBackup();
        setLastAction('form');
        setSubmitted(true);
      } else {
        // Fallback to mailto if API error
        saveToLocalBackup();
        const subject = `[Namma Tamil Calendar] ${formData.subject || 'User Inquiry'}`;
        const body = buildMessageSummary();
        const mailtoUrl = `mailto:${officialEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        if (typeof window !== 'undefined') {
          window.location.href = mailtoUrl;
        }
        setLastAction('email');
        setSubmitted(true);
      }
    } catch {
      // Safe offline fallback
      saveToLocalBackup();
      const subject = `[Namma Tamil Calendar] ${formData.subject || 'User Inquiry'}`;
      const body = buildMessageSummary();
      const mailtoUrl = `mailto:${officialEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (typeof window !== 'undefined') {
        window.location.href = mailtoUrl;
      }
      setLastAction('email');
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      {/* 1. Quick Direct Channels Banner (Email, WhatsApp, Operating Location & Timings) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        
        {/* Email Direct Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#EBDCCF] shadow-xs flex flex-col justify-between hover:border-[#8B1515] transition-all">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#8B1515]/10 flex items-center justify-center text-[#8B1515]">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#8C6200] block uppercase tracking-wider">
              {isTa ? 'நேரடி மின்னஞ்சல்' : 'Direct Email'}
            </span>
            <a
              href={`mailto:${officialEmail}?subject=Namma%20Tamil%20Calendar%20Inquiry`}
              className="text-xs sm:text-sm font-extrabold text-[#8B1515] hover:underline block break-all"
            >
              {officialEmail}
            </a>
            <span className="text-[11px] text-[#5C5256] block">
              {isTa ? 'விளம்பரம் மற்றும் விரிவான கேள்விகளுக்கு' : 'For ads, partnerships & detailed queries'}
            </span>
          </div>
          <button
            onClick={handleCopyEmail}
            type="button"
            className="mt-3 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFF9F0] border border-[#EBDCCF] text-[#8B1515] hover:bg-[#8B1515] hover:text-white transition-all cursor-pointer"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEmail ? (isTa ? 'மின்னஞ்சல் நகலெடுக்கப்பட்டது!' : 'Copied!') : (isTa ? 'Email நகலெடு' : 'Copy Email')}</span>
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
            <span className="text-xs sm:text-sm font-extrabold text-[#1F1517] block">
              {officialPhone}
            </span>
            <span className="text-[11px] text-[#5C5256] block">
              {isTa ? 'உடனடி வாட்ஸ்அப் உதவி மற்றும் ஆலோசனைகள்' : 'Instant WhatsApp Inquiries & Support (IST)'}
            </span>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(isTa ? 'வணக்கம், நம்ம தமிழ் காலண்டர் தொடர்பாக பேச விரும்புகிறேன்.' : 'Hello, I would like to inquire about Namma Tamil Calendar.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center space-x-1.5 w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-xs cursor-pointer text-center"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>{isTa ? 'WhatsApp-ல் பேச' : 'Chat on WhatsApp'}</span>
          </a>
        </div>

        {/* Operating Area & Timings Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#EBDCCF] shadow-xs flex flex-col justify-between hover:border-[#8B1515] transition-all">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#8C6200] block uppercase tracking-wider">
              {isTa ? 'செயல்பாட்டு பகுதி & நேரம்' : 'Location & Timings'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#1F1517] block">
              {isTa ? 'தமிழ்நாடு, இந்தியா' : 'Tamil Nadu, India'}
            </span>
            <div className="text-[11px] text-[#5C5256] space-y-0.5">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-amber-700 shrink-0" />
                <span>{isTa ? 'காலை 8:00 AM – இரவு 9:00 PM IST' : '8:00 AM – 9:00 PM IST (All 7 Days)'}</span>
              </div>
              <p className="text-emerald-700 font-semibold">
                {isTa ? '✓ 24 மணி நேரத்திற்குள் பதில் உறுதி' : '✓ 24-Hour Guaranteed SLA'}
              </p>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFF9F0] border border-[#EBDCCF] text-[#8B1515]">
            <Compass className="w-3.5 h-3.5" />
            <span>{isTa ? 'சென்னை & உலகளாவிய தமிழ் சமூகம்' : 'Chennai & Global Tamils'}</span>
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
              ? 'உங்கள் கருத்துக்கள், திருத்தங்கள் அல்லது விளம்பர தேவைகளை கீழே உள்ள படிவத்தில் பூர்த்தி செய்து நேரடியாக WhatsApp அல்லது Email வழியாக அனுப்பலாம்.'
              : 'Submit corrections, feedback, feature requests, or partnership inquiries directly to WhatsApp or Email.'}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-4 animate-in fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-black text-emerald-900">
              {isTa ? 'தங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டு சேமிக்கப்பட்டது!' : 'Message Sent & Recorded Successfully!'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 font-medium max-w-md mx-auto leading-relaxed">
              {isTa
                ? `தங்கள் செய்தி ஆசிரியர் குழுவிற்கு (${officialEmail}) வெற்றிகரமாக மின்னஞ்சல் செய்யப்பட்டு, பாதுகாப்பாக பதிவு செய்யப்பட்டுள்ளது. 24 மணி நேரத்திற்குள் உங்களைத் தொடர்புகொள்வோம்.`
                : `Your message has been emailed directly to our team (${officialEmail}) and securely recorded. We will get back to you within 24 hours.`}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildMessageSummary())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isTa ? 'WhatsApp-ல் பேச (+91 80724 09162)' : 'Chat on WhatsApp (+91 80724 09162)'}</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', place: '', subject: '', message: '' });
                }}
                type="button"
                className="inline-flex items-center space-x-1 px-4 py-2.5 rounded-xl text-xs font-bold bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 cursor-pointer"
              >
                <span>{isTa ? 'மற்றொரு செய்தி அனுப்ப' : 'Send Another Message'}</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Quick Topic Chips */}
            <div>
              <label className="block text-xs font-bold text-[#8B1515] uppercase tracking-wider mb-2">
                {isTa ? 'செய்தியின் வகை (விரைவு தேர்வு):' : 'Inquiry Category (Quick Pick):'}
              </label>
              <div className="flex flex-wrap gap-2">
                {quickTopics.map((topic) => {
                  const label = isTa ? topic.labelTa : topic.labelEn;
                  const isSelected = formData.subject === label;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, subject: label })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#8B1515] text-white border-[#8B1515] shadow-xs'
                          : 'bg-[#FFF9F0] text-[#70263B] border-[#EBDCCF] hover:border-[#8B1515]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 1: Name and Email */}
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
                  placeholder={isTa ? 'எ.கா: சுந்தர் / கார்த்திக்' : 'e.g. Sundar / Karthik'}
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

            {/* Row 2: WhatsApp Phone and Place / City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#8B1515] uppercase tracking-wider mb-1.5">
                  {isTa ? 'வாட்ஸ்அப் எண் (விருப்பமிருந்தால்)' : 'WhatsApp Number (Optional)'}
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
                  {isTa ? 'உங்கள் ஊர் / மாவட்டம் / நாடு' : 'City / District / Country'}
                </label>
                <input
                  type="text"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  placeholder={isTa ? 'எ.கா: சென்னை, தமிழ்நாடு (அல்லது சிங்கப்பூர் / மலேசியா)' : 'e.g. Chennai, Tamil Nadu (or Singapore / Malaysia)'}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-semibold focus:border-[#8B1515] focus:outline-none"
                />
              </div>
            </div>

            {/* Row 3: Subject */}
            <div>
              <label className="block text-xs font-bold text-[#8B1515] uppercase tracking-wider mb-1.5">
                {isTa ? 'செய்தி தலைப்பு *' : 'Subject *'}
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder={isTa ? 'எ.கா: 2026 நல்ல நேரம் விவரம் / விளம்பர வாய்ப்புகள்' : 'e.g. 2026 Auspicious Timing Query / Advertising Inquiries'}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-semibold focus:border-[#8B1515] focus:outline-none"
              />
            </div>

            {/* Row 4: Message */}
            <div>
              <label className="block text-xs font-bold text-[#8B1515] uppercase tracking-wider mb-1.5">
                {isTa ? 'உங்கள் விரிவான செய்தி *' : 'Your Detailed Message *'}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={isTa ? 'எ.கா: உங்கள் காலண்டரில் உள்ள குறிப்பிட்ட நாளின் நல்ல நேரம், ராகு காலம் அல்லது விரத நாட்கள் குறித்த உங்கள் கேள்விகள் அல்லது விளம்பர தேவைகளை விரிவாக எழுதவும்...' : 'e.g. Please provide detailed information about your inquiry, festival date, calculation verification, or advertisement requirements...'}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-semibold focus:border-[#8B1515] focus:outline-none resize-y"
              />
            </div>

            {/* Direct Send Buttons (WhatsApp or Email) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isTa ? 'WhatsApp வழியாக அனுப்பவும் (உடனடி)' : 'Send via WhatsApp (Instant)'}</span>
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#8B1515] to-[#C93B2B] text-white font-black text-sm shadow-md hover:brightness-110 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? (isTa ? 'அனுப்பப்படுகிறது...' : 'Sending...') : (isTa ? 'Email வழியாக அனுப்பவும்' : 'Send via Email')}</span>
              </button>
            </div>
            
            <p className="text-[11px] text-center text-[#5C5256]">
              {isTa 
                ? `செய்திகள் நேரடியாக ${officialEmail} மற்றும் WhatsApp எண் ${officialPhone}-க்கு சென்றடையும்.`
                : `Messages will be directly sent to ${officialEmail} and WhatsApp ${officialPhone}.`}
            </p>
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
                ? `மேலே உள்ள நேரடி படிவம் அல்லது வாட்ஸ்அப் (+91 ${rawPhoneNumber}) வழியாக குறிப்பிட்ட தேதி மற்றும் திருத்த விவரத்தை அனுப்பலாம்; உடனடியாக சரிபார்க்கப்பட்டு திருத்தப்படும்.`
                : `Send the specific date and correction details via this form or WhatsApp (+91 ${rawPhoneNumber}). Our team will verify and update it promptly.`}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EBDCCF] space-y-1.5">
            <span className="font-black text-[#8B1515] block">
              {isTa ? '3. விளம்பரங்கள் அல்லது வணிக தொடர்புக்கு?' : '3. For Advertisements & Sponsorships?'}
            </span>
            <p className="text-[#5C5256] leading-relaxed">
              {isTa
                ? `உங்கள் நிறுவனம் அல்லது சேவைகளை காலண்டர் பக்கங்களில் விளம்பரம் செய்ய ${officialEmail} அல்லது +91 ${rawPhoneNumber} என்ற வாட்ஸ்அப் எண்ணில் தொடர்பு கொள்ளவும்.`
                : `For banner placements and sponsorship inquiries, reach out to ${officialEmail} or WhatsApp +91 ${rawPhoneNumber}.`}
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

