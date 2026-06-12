import React from 'react';
import Link from "next/link";
import { Calendar, Globe, Grid3X3, Download, ChevronRight, FileText, BarChart3 } from 'lucide-react';
import { ReportDetail } from '@/data/reportDetails';
import { cn } from '@/lib/utils';

interface ReportHeroProps {
  report: ReportDetail;
  onDownloadSample: () => void;
  onBuyNow: () => void;
  onCustomize: () => void;
}

const InfoBadge = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur border border-gray-200 rounded-full text-xs sm:text-sm text-gray-600">
    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
    {text}
  </span>
);

// Date parsing of non-ISO strings ("Jan 2024") differs between server and
// browser engines, causing hydration mismatches — format without Date.
const formatLastUpdated = (value: string) => {
  const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return iso ? `${Number(iso[2])}/${Number(iso[3])}/${iso[1]}` : value;
};

export const ReportHero: React.FC<ReportHeroProps> = ({
  report,
  onDownloadSample,
  onBuyNow,
  onCustomize,
}) => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Industries', href: '/industry' },
    { label: report.industry.charAt(0).toUpperCase() + report.industry.slice(1).replace(/-/g, ' '), href: `/industry/${report.industry}` },
    { label: report.sub_industry.charAt(0).toUpperCase() + report.sub_industry.slice(1).replace(/-/g, ' '), href: `/industry/${report.industry}` },
    { label: report.title, href: '#' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#0f2744] via-[#1e3a5f] to-[#2a4a6f] pt-12 sm:pt-14 lg:pt-8 pb-8 sm:pb-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#f97316]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-sky-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumbs */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={`${crumb.href}-${index}`} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1.5 text-white/40" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-white/60 truncate max-w-[200px]">{crumb.label}</span>
                ) : (
                  <Link 
                    href={crumb.href} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left: Title & Meta */}
          <div className="flex-1 max-w-3xl">
            {/* SEO-optimized H1 */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {report.seo_title || `${report.title} | Market Size, Share & Growth Report ${report.base_year}-${report.forecast_year}`}
            </h1>
            
            {/* Report Summary */}
            <p className="text-base sm:text-lg text-white/80 mb-6 leading-relaxed">
              {report.summary}
            </p>

            {/* Meta Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <InfoBadge icon={Calendar} text={`Base Year: ${report.base_year}`} />
              <InfoBadge icon={Globe} text={report.regions_covered.length + ' Regions'} />
              <InfoBadge icon={Grid3X3} text={`Forecast ${report.base_year}–${report.forecast_year}`} />
              <InfoBadge icon={FileText} text={`${report.pages} Pages`} />
            </div>

            {/* Market Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 border border-white/10">
                <div className="text-xs text-white/60 mb-1">Market Size ({report.base_year})</div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  ${report.base_year_value}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 border border-white/10">
                <div className="text-xs text-white/60 mb-1">CAGR</div>
                <div className="text-xl sm:text-2xl font-bold text-[#f97316]">
                  {report.cagr}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 border border-white/10">
                <div className="text-xs text-white/60 mb-1">Forecast Value ({report.forecast_year})</div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  ${report.forecast_year_value}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={onBuyNow}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97316] text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-[#ea580c] transition-colors shadow-lg shadow-orange-500/25"
              >
                Buy Now
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">From {report.price_single_user}</span>
              </button>
              <button 
                onClick={onDownloadSample}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#1e3a5f] rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Free PDF
              </button>
              <button 
                onClick={onCustomize}
                className="inline-flex items-center gap-2 px-5 py-3 text-white border border-white/30 rounded-lg text-sm sm:text-base font-medium hover:bg-white/10 transition-colors"
              >
                Customize Report
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Report Preview Card */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
              <div className="bg-gradient-to-br from-sky-50 via-sky-100/50 to-white rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px] border border-sky-100">
                <div className="w-16 h-16 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-[#1e3a5f] mb-1 line-clamp-2">
                    {report.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    Market Research Report
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {report.base_year} Edition
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last Updated</span>
                  <span className="font-medium text-gray-700">{formatLastUpdated(report.last_updated)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportHero;
