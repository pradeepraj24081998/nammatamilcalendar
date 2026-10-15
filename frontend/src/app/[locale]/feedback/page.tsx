'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { submitFeedback } from '@/lib/api';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { AgalVilakkuLoader } from '@/components/ui/AgalVilakkuLoader';

export default function FeedbackPage() {
  const params = useParams();
  const locale: Locale = (params.locale as string) === 'en' ? 'en' : 'ta';
  const dict = getDictionary(locale);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const categories = [
    { value: 'incorrect_data', label: locale === 'ta' ? 'தவறான காலண்டர் தகவல்' : 'Incorrect Calendar Information' },
    { value: 'website_issue', label: locale === 'ta' ? 'இணையதள பிரச்சனை' : 'Website Issue / Bug' },
    { value: 'language_issue', label: locale === 'ta' ? 'மொழிபெயர்ப்பு குறைபாடு' : 'Language or Translation Issue' },
    { value: 'feature_suggestion', label: locale === 'ta' ? 'புதிய வசதி பரிந்துரை' : 'Feature Suggestion' },
    { value: 'general', label: locale === 'ta' ? 'பொதுவான கருத்து' : 'General Feedback' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMsg(locale === 'ta' ? 'கருத்து செய்தி குறைந்தபட்சம் 5 எழுத்துக்கள் இருக்க வேண்டும்.' : 'Message must be at least 5 characters long.');
      return;
    }

    setLoading(true);
    const res = await submitFeedback(formData);
    setLoading(false);

    if (res.success) {
      setSuccessMsg(res.message);
      setFormData({ name: '', email: '', category: 'general', subject: '', message: '' });
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Header Card */}
      <div className="bg-gradient-to-r from-[#70263B] to-[#C94F36] text-white p-6 sm:p-8 rounded-3xl shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <MessageSquare className="w-6 h-6 text-[#FFE082]" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {dict.feedback}
          </h1>
        </div>
        <p className="text-sm text-[#FFF9F0]/85 leading-relaxed">
          {locale === 'ta'
            ? 'நம்ம தமிழ் காலண்டர் பற்றிய தங்களின் மேலான கருத்துக்கள், பரிந்துரைகள் மற்றும் திருத்தங்களை எங்களுக்கு தெரிவிக்கவும்.'
            : 'We welcome your valuable feedback, corrections, and feature requests to enhance Namma Tamil Calendar.'}
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-[#201B1E] border border-[#E9E1D8] dark:border-[#382F35] p-6 sm:p-8 rounded-3xl shadow-xs">
        
        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-[#E8F5E9] dark:bg-[#1B2E1D] border border-[#A5D6A7] dark:border-[#2E7D32] flex items-start space-x-3 text-[#1B5E20] dark:text-[#C8E6C9] animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#2E7D32]" />
            <div className="text-sm font-semibold">{successMsg}</div>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FFEBEE] dark:bg-[#2E1819] border border-[#FFCDD2] dark:border-[#C94F36] flex items-start space-x-3 text-[#C94F36] dark:text-[#FFCDD2] animate-in fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#C94F36]" />
            <div className="text-sm font-semibold">{errorMsg}</div>
          </div>
        )}

        {loading ? (
          <div className="py-12">
            <AgalVilakkuLoader
              labelTa="தங்கள் கருத்து பதிவு செய்யப்படுகிறது..."
              labelEn="Submitting your feedback securely..."
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-[#6B6268] dark:text-[#A89FA4] mb-1.5">
                {locale === 'ta' ? 'கருத்து பிரிவு *' : 'Feedback Category *'}
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E9E1D8] dark:border-[#382F35] bg-[#FFF9F0] dark:bg-[#1A1618] text-[#29262A] dark:text-[#F5EFEB] text-sm font-medium focus:ring-2 focus:ring-[#C8A45D] focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Name & Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#6B6268] dark:text-[#A89FA4] mb-1.5">
                  {locale === 'ta' ? 'பெயர் (விருப்பமிருந்தால்)' : 'Name (Optional)'}
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={locale === 'ta' ? 'உங்கள் பெயர்' : 'Your name'}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E9E1D8] dark:border-[#382F35] bg-[#FFF9F0] dark:bg-[#1A1618] text-[#29262A] dark:text-[#F5EFEB] text-sm focus:ring-2 focus:ring-[#C8A45D] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#6B6268] dark:text-[#A89FA4] mb-1.5">
                  {locale === 'ta' ? 'மின்னஞ்சல் (விருப்பமிருந்தால்)' : 'Email (Optional)'}
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E9E1D8] dark:border-[#382F35] bg-[#FFF9F0] dark:bg-[#1A1618] text-[#29262A] dark:text-[#F5EFEB] text-sm focus:ring-2 focus:ring-[#C8A45D] focus:outline-none"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-[#6B6268] dark:text-[#A89FA4] mb-1.5">
                {locale === 'ta' ? 'தலைப்பு (விருப்பமிருந்தால்)' : 'Subject (Optional)'}
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder={locale === 'ta' ? 'கருத்தின் தலைப்பு' : 'Feedback subject'}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E9E1D8] dark:border-[#382F35] bg-[#FFF9F0] dark:bg-[#1A1618] text-[#29262A] dark:text-[#F5EFEB] text-sm focus:ring-2 focus:ring-[#C8A45D] focus:outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#6B6268] dark:text-[#A89FA4] mb-1.5">
                {locale === 'ta' ? 'உங்கள் கருத்து செய்தி *' : 'Feedback Message *'}
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={locale === 'ta' ? 'உங்கள் கருத்துக்களை இங்கு தட்டச்சு செய்யவும்...' : 'Type your detailed message or suggestion here...'}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E9E1D8] dark:border-[#382F35] bg-[#FFF9F0] dark:bg-[#1A1618] text-[#29262A] dark:text-[#F5EFEB] text-sm focus:ring-2 focus:ring-[#C8A45D] focus:outline-none resize-y"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#70263B] to-[#C94F36] text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center space-x-2 focus:ring-2 focus:ring-[#C8A45D] focus:outline-none cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{locale === 'ta' ? 'கருத்தை அனுப்பவும்' : 'Submit Feedback'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
