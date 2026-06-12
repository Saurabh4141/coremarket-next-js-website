import React from 'react';
import Link from "next/link";
import { ShoppingCart, Download, Phone, Mail, ArrowRight } from 'lucide-react';
import { ReportDetail } from '@/data/reportDetails';

interface ReportCTABlockProps {
  report: ReportDetail;
  onBuyNow: () => void;
  onDownloadSample: () => void;
}

export const ReportCTABlock: React.FC<ReportCTABlockProps> = ({
  report,
  onBuyNow,
  onDownloadSample,
}) => {
  return (
    <section className="mt-12 mb-8">
      <div className="bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#1e3a5f] rounded-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left: Content */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Get the Full Report?
              </h2>
              <p className="text-white/80 text-lg mb-6 max-w-2xl">
                Access comprehensive market insights, detailed analysis, and strategic recommendations
                to make informed business decisions.
              </p>
              
              {/* Pricing Preview */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3 border border-white/10">
                  <div className="text-xs text-white/60">Single User</div>
                  <div className="text-xl font-bold text-white">{report.price_single_user}</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3 border border-white/10">
                  <div className="text-xs text-white/60">Multi User</div>
                  <div className="text-xl font-bold text-white">{report.price_multi_user}</div>
                </div>
                <div className="bg-[#f97316]/20 backdrop-blur rounded-xl px-5 py-3 border border-[#f97316]/30">
                  <div className="text-xs text-[#f97316]">Enterprise</div>
                  <div className="text-xl font-bold text-[#f97316]">{report.price_enterprise}</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button
                  onClick={onBuyNow}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#f97316] text-white rounded-xl text-base font-semibold hover:bg-[#ea580c] transition-colors shadow-lg shadow-orange-500/25"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onDownloadSample}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1e3a5f] rounded-xl text-base font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Free Sample
                </button>
              </div>
            </div>

            {/* Right: Contact Info */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10 w-full lg:w-auto lg:min-w-[280px]">
              <h3 className="text-white font-semibold mb-4">Need Help?</h3>
              <div className="space-y-4">
                <a 
                  href="tel:+1234567890" 
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+1 (234) 567-890</span>
                </a>
                <a 
                  href="mailto:sales@example.com" 
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>sales@example.com</span>
                </a>
              </div>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 mt-4 text-sm text-[#f97316] hover:underline"
              >
                Request Customization
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportCTABlock;
