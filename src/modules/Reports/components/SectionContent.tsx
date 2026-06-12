import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Globe,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  Lightbulb,
  Users,
  Building,
  FileText,
  Shield,
  Target,
  MapPin,
} from 'lucide-react';
import { ReportDetail } from '@/data/reportDetails';
import { ReportSection } from '@/data/reportSections';
import { cn } from '@/lib/utils';

interface SectionContentProps {
  report: ReportDetail;
  section: ReportSection;
}

// Card wrapper component
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('bg-white rounded-xl shadow-sm border border-gray-100', className)}>
    {children}
  </div>
);

// Section Header
const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{title}</h2>
    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
  </div>
);

// Market Size & Share Section
const MarketSizeSection: React.FC<{ report: ReportDetail }> = ({ report }) => (
  <Card>
    <div className="p-6">
      <SectionHeader 
        title="Market Size & Share" 
        subtitle={`${report.base_year} to ${report.forecast_year} forecast analysis`}
      />
      
      {/* Market Snapshot */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 bg-gradient-to-br from-sky-50 to-white rounded-xl border border-sky-100">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-[#1e3a5f]" />
            <span className="text-xs text-gray-500">Market Size ({report.base_year})</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">
            <span className="text-[#1e3a5f]">${report.base_year_value}</span>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#f97316]" />
            <span className="text-xs text-gray-500">CAGR</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#f97316]">{report.cagr}</div>
          <div className="text-xs text-gray-500">({report.base_year}–{report.forecast_year})</div>
        </div>
        <div className="p-5 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-600" />
            <span className="text-xs text-gray-500">Forecast ({report.forecast_year})</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">
            <span className="text-green-600">${report.forecast_year_value}</span>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div className="bg-[#1e3a5f]/5 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#1e3a5f] mb-4 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Key Findings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {report.key_findings.map((finding, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-[#f97316] rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">{finding}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Card>
);

// Market Analysis Section
const MarketAnalysisSection: React.FC<{ report: ReportDetail }> = ({ report }) => (
  <Card>
    <div className="p-6">
      <SectionHeader 
        title="Market Analysis" 
        subtitle="Drivers, challenges, and opportunities shaping the market"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drivers */}
        <div className="bg-green-50 rounded-xl p-5 border border-green-100">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Market Drivers</h3>
          </div>
          <ul className="space-y-3">
            {report.market_drivers.map((driver, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-green-700">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{driver}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges */}
        <div className="bg-red-50 rounded-xl p-5 border border-red-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">Market Challenges</h3>
          </div>
          <ul className="space-y-3">
            {report.market_challenges.map((challenge, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-red-700">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Opportunities</h3>
          </div>
          <ul className="space-y-3">
            {report.market_opportunities.map((opportunity, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-blue-700">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <span>{opportunity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </Card>
);

// Market Analysis Section
const MarketDynamicsSection: React.FC<{ report: ReportDetail }> = ({ report }) => (
  <Card>
    <div className="p-6">
      <SectionHeader 
        title="Market Dynamics" 
        subtitle="Key market dynamics and their impact on the industry landscape"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drivers */}
        <div className="bg-green-50 rounded-xl p-5 border border-green-100">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Market Drivers</h3>
          </div>
          <ul className="space-y-3">
            {report.market_drivers.map((driver, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-green-700">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{driver}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges */}
        <div className="bg-red-50 rounded-xl p-5 border border-red-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">Market Challenges</h3>
          </div>
          <ul className="space-y-3">
            {report.market_challenges.map((challenge, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-red-700">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Opportunities</h3>
          </div>
          <ul className="space-y-3">
            {report.market_opportunities.map((opportunity, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-blue-700">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <span>{opportunity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </Card>
);

// Trends and Insights Section
const TrendsSection: React.FC<{ report: ReportDetail }> = ({ report }) => (
  <Card>
    <div className="p-6">
      <SectionHeader 
        title="Trends and Insights" 
        subtitle="Key market trends shaping the industry landscape"
      />
      
      <div className="space-y-4">
        {report.key_findings.map((finding, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">{idx + 1}</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Trend {idx + 1}</h4>
              <p className="text-sm text-gray-600">{finding}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

// Segment Analysis Section
const SegmentSection: React.FC<{ report: ReportDetail }> = ({ report }) => {
  const [expandedSegment, setExpandedSegment] = React.useState<string>('by_type');
  
  return (
    <Card>
      <div className="p-6">
        <SectionHeader 
          title="Segment Analysis" 
          subtitle="Market segmentation by type, application, end-user, and region"
        />
        
        <div className="space-y-4">
          {Object.entries(report.segmentation).map(([key, values]) => {
            if (!values || values.length === 0) return null;
            const isExpanded = expandedSegment === key;
            const label = key.replace('by_', 'By ').replace('_', ' ');
            
            return (
              <div key={key} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedSegment(isExpanded ? '' : key)}
                  className={cn(
                    'w-full flex items-center justify-between px-5 py-4 transition-colors',
                    isExpanded ? 'bg-[#1e3a5f] text-white' : 'bg-gray-50 hover:bg-gray-100'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className={cn('text-sm', isExpanded ? '' : 'text-gray-600')}>
                      {isExpanded ? '−' : '+'}
                    </span>
                    <span className="font-medium capitalize">{label}</span>
                  </div>
                  <ChevronDown className={cn(
                    'w-4 h-4 transition-transform',
                    isExpanded ? 'rotate-180' : ''
                  )} />
                </button>
                
                {isExpanded && (
                  <div className="p-5 space-y-3">
                    {values.map((value, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-gray-900">{value}</span>
                          <p className="text-sm text-gray-500 mt-1">
                            Detailed analysis of {value.toLowerCase()} segment with market share and growth projections.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

// Geography Analysis Section
const GeographySection: React.FC<{ report: ReportDetail }> = ({ report }) => {
  const regionData = [
    { name: 'North America', share: 35, color: '#1e3a5f' },
    { name: 'Europe', share: 28, color: '#2563eb' },
    { name: 'Asia Pacific', share: 22, color: '#7c3aed' },
    { name: 'Latin America', share: 10, color: '#f97316' },
    { name: 'Middle East & Africa', share: 5, color: '#10b981' },
  ];

  return (
    <Card>
      <div className="p-6">
        <SectionHeader 
          title="Geography Analysis" 
          subtitle="Regional market distribution and growth analysis"
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Region List */}
          <div className="flex-1 space-y-4">
            {regionData.map((region, idx) => (
              <div key={region.name} className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-4">{idx + 1}</span>
                <div className="flex items-center gap-2 w-36">
                  <MapPin className="w-4 h-4" style={{ color: region.color }} />
                  <span className="text-sm text-gray-700">{region.name}</span>
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${region.share}%`, backgroundColor: region.color }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-12 text-right">{region.share}%</span>
              </div>
            ))}
          </div>

          {/* Visual Map Placeholder */}
          <div className="w-full lg:w-64 h-48 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl flex items-center justify-center border border-sky-200">
            <Globe className="w-20 h-20 text-sky-300" />
          </div>
        </div>

        <div className="mt-6 p-4 bg-sky-50 rounded-xl border border-sky-100">
          <p className="text-sm text-gray-600">
            <strong className="text-[#1e3a5f]">Regional Insights:</strong> {report.regions_covered.join(', ')} are covered in this analysis with detailed market forecasts.
          </p>
        </div>
      </div>
    </Card>
  );
};

// Competitive Landscape Section
const CompetitiveSection: React.FC<{ report: ReportDetail }> = ({ report }) => (
  <Card>
    <div className="p-6">
      <SectionHeader 
        title="Competitive Landscape" 
        subtitle="Key players and market positioning analysis"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {report.competitive_landscape.map((company, idx) => (
          <div key={idx} className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{company.company}</h4>
                  <p className="text-xs text-gray-500">{company.headquarters}</p>
                </div>
              </div>
              {company.market_share && (
                <span className="px-3 py-1 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg">
                  {company.market_share}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {company.key_strategies.map((strategy, sIdx) => (
                <span key={sIdx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {strategy}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500 flex items-center gap-2">
        <Users className="w-4 h-4" />
        {report.companies_mentioned.length}+ companies profiled in this report
      </div>
    </div>
  </Card>
);

// Major Players Section
const MajorPlayersSection: React.FC<{ report: ReportDetail }> = ({ report }) => (
  <Card>
    <div className="p-6">
      <SectionHeader 
        title="Major Players" 
        subtitle="Leading companies in the market"
      />
      
      <div className="flex flex-wrap gap-3">
        {report.companies_mentioned.map((company, idx) => (
          <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
            <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{company.charAt(0)}</span>
            </div>
            <span className="text-sm font-medium text-gray-700">{company}</span>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

// Industry Developments Section
const DevelopmentsSection: React.FC<{ report: ReportDetail }> = ({ report }) => {
  const developments = [
    { date: 'Q4 2024', event: `Major acquisition in the ${report.industry} sector by leading player` },
    { date: 'Q3 2024', event: 'New product launch targeting emerging markets' },
    { date: 'Q2 2024', event: 'Strategic partnership announced for technology advancement' },
    { date: 'Q1 2024', event: 'Regulatory approval received in key markets' },
  ];

  return (
    <Card>
      <div className="p-6">
        <SectionHeader 
          title="Industry Developments" 
          subtitle="Recent strategic developments and market events"
        />
        
        <div className="space-y-4">
          {developments.map((dev, idx) => (
            <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="px-3 py-1 bg-[#1e3a5f] text-white text-sm font-medium rounded h-fit">
                {dev.date}
              </div>
              <p className="text-sm text-gray-700">{dev.event}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// Table of Contents Section
const TOCSection: React.FC<{ report: ReportDetail }> = ({ report }) => (
  <Card>
    <div className="p-6">
      <SectionHeader 
        title="Table of Contents" 
        subtitle={`${report.toc_chapters.length} comprehensive chapters`}
      />
      
      <div className="space-y-3">
        {report.toc_chapters.map((chapter) => (
          <div key={chapter.number} className="border border-gray-100 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
              <span className="font-semibold text-gray-900">
                {chapter.number}. {chapter.title}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="px-4 py-3 space-y-1">
              {chapter.sections.map((section, idx) => (
                <p key={idx} className="text-sm text-gray-600 pl-4">{section}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

// Report Scope Section
const ScopeSection: React.FC<{ report: ReportDetail }> = ({ report }) => (
  <Card>
    <div className="p-6">
      <SectionHeader 
        title="Scope of the Report" 
        subtitle="Report coverage and methodology"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#1e3a5f]" />
            Study Period
          </h4>
          <p className="text-sm text-gray-600">
            Base Year: {report.base_year}<br />
            Forecast Period: {report.base_year} - {report.forecast_year}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#1e3a5f]" />
            Geographic Scope
          </h4>
          <p className="text-sm text-gray-600">{report.regions_covered.join(', ')}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#1e3a5f]" />
            Companies Covered
          </h4>
          <p className="text-sm text-gray-600">{report.companies_mentioned.slice(0, 4).join(', ')} + more</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#1e3a5f]" />
            Data Sources
          </h4>
          <p className="text-sm text-gray-600">Primary research, industry interviews, regulatory filings, company reports</p>
        </div>
      </div>
    </div>
  </Card>
);

// FAQ Section
const FAQSection: React.FC<{ report: ReportDetail }> = ({ report }) => {
  const [expandedFaq, setExpandedFaq] = React.useState<number>(0);
  
  return (
    <Card>
      <div className="p-6">
        <SectionHeader 
          title="Frequently Asked Questions" 
          subtitle="Common questions about this report"
        />
        
        <div className="space-y-3">
          {report.faq.map((item, idx) => (
            <div key={idx} className="border border-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">{item.question}</span>
                <ChevronDown className={cn(
                  'w-5 h-5 text-gray-400 flex-shrink-0 transition-transform',
                  expandedFaq === idx ? 'rotate-180' : ''
                )} />
              </button>
              {expandedFaq === idx && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// Main Section Content Component
export const SectionContent: React.FC<SectionContentProps> = ({ report, section }) => {
  const sectionComponents: Record<string, React.ReactNode> = {
    market_size_share: <MarketSizeSection report={report} />,
    market_analysis: <MarketAnalysisSection report={report} />,
    market_dynamics: <MarketDynamicsSection report={report} />,
    trends_insights: <TrendsSection report={report} />,
    segment_analysis: <SegmentSection report={report} />,
    geography_analysis: <GeographySection report={report} />,
    competitive_landscape: <CompetitiveSection report={report} />,
    major_players: <MajorPlayersSection report={report} />,
    industry_developments: <DevelopmentsSection report={report} />,
    table_of_contents: <TOCSection report={report} />,
    report_scope: <ScopeSection report={report} />,
    faq: <FAQSection report={report} />,
  };

  return (
    <section id={section.section_key} className="scroll-mt-36">
      {sectionComponents[section.section_key] || null}
    </section>
  );
};

export default SectionContent;
