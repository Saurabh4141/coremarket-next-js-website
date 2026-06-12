import React from 'react';
import { Download, ShoppingCart, Settings } from 'lucide-react';
import { ReportDetail } from '@/data/reportDetails';
import { cn } from '@/lib/utils';

interface StickyMiniHeaderProps {
  report: ReportDetail;
  isVisible: boolean;
  onDownloadSample: () => void;
  onBuyNow: () => void;
  onCustomize: () => void;
}

export const StickyMiniHeader: React.FC<StickyMiniHeaderProps> = ({
  report,
  isVisible,
  onDownloadSample,
  onBuyNow,
  onCustomize,
}) => {
  return (
    <div
      className={cn(
        'fixed top-[80px] left-0 right-0 z-40 transition-all duration-300 ease-in-out',
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      )}
    >
      <div className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Left: Shortened Title */}
            <div className="flex-1 min-w-0">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                {report.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{report.cagr} CAGR</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">${report.base_year_value}</span>
              </div>
            </div>

            {/* Right: CTA Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onDownloadSample}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Download PDF</span>
              </button>
              <button
                onClick={onCustomize}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                Customize
              </button>
              <button
                onClick={onBuyNow}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#f97316] hover:bg-[#ea580c] rounded-lg transition-colors shadow-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyMiniHeader;
