import { useState, useEffect } from 'react';
import Link from "next/link";
import { X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-4 duration-300"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-sm text-gray-700 leading-relaxed">
              We use cookies to improve your experience.{' '}
              <Link
                href="/privacy-policy"
                className="text-[#1e3a5f] hover:underline font-medium"
              >
                Learn more
              </Link>
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#2a4a6f] transition-colors"
          >
            Accept
          </button>
          <Link
            href="/cookie-policy"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
