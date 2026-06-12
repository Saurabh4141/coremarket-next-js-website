import React, { useCallback } from 'react';
import { Download, ChevronRight, PanelLeftClose } from 'lucide-react';
import { ReportSection, SectionGroup, sectionGroups } from '@/data/reportSections';
import { scrollToSection } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/utils';

interface ReportSidebarProps {
  sections: ReportSection[];
  activeSection: string;
  onDownloadPDF: () => void;
  onSectionClick?: (sectionKey: string) => void;
  onToggle?: () => void;
}

export const ReportSidebar: React.FC<ReportSidebarProps> = ({
  sections,
  activeSection,
  onDownloadPDF,
  onSectionClick,
  onToggle,
}) => {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Group sections by section_group
  const groupedSections = React.useMemo(() => {
    const grouped: Record<SectionGroup, ReportSection[]> = {
      market_overview: [],
      deep_dive: [],
      reference: [],
    };

    sections
      .filter(s => s.is_visible && s.content)
      .sort((a, b) => a.display_order - b.display_order)
      .forEach(section => {
        grouped[section.section_group].push(section);
      });

    return grouped;
  }, [sections]);

  const handleSectionClick = useCallback((sectionKey: string) => {
    // Immediately set active state via callback
    onSectionClick?.(sectionKey);
    // Then scroll to section
    scrollToSection(sectionKey, 140, prefersReducedMotion);
  }, [onSectionClick, prefersReducedMotion]);

  return (
    <aside className="w-full">
      {/* Section Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Report Contents</h3>
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Hide sidebar"
            >
              <PanelLeftClose className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
        
        <nav className="p-3">
          {(Object.keys(sectionGroups) as SectionGroup[]).map((groupKey) => {
            const group = sectionGroups[groupKey];
            const groupSections = groupedSections[groupKey];
            
            if (groupSections.length === 0) return null;

            return (
              <div key={groupKey} className="mb-4 last:mb-0">
                {/* Group Label */}
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                  {group.label}
                </div>
                
                {/* Section Items with connector line */}
                <div className="relative">
                  {/* Vertical connector line */}
                  <div 
                    className="absolute left-[11px] top-2 bottom-2 w-px bg-gray-200"
                    aria-hidden="true"
                  />
                  
                  <div className="space-y-0.5">
                    {groupSections.map((section) => {
                      const isActive = activeSection === section.section_key;
                      const isReference = section.section_type === 'utility';
                      
                      return (
                        <button
                          key={section.section_key}
                          onClick={() => handleSectionClick(section.section_key)}
                          aria-current={isActive ? 'location' : undefined}
                          className={cn(
                            'w-full flex items-center gap-2 px-3 py-2 text-left text-sm rounded-lg transition-all duration-150 relative group',
                            isActive
                              ? 'bg-[#1e3a5f] text-white font-medium shadow-sm'
                              : isReference
                                ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                : 'text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          {/* Active indicator bar */}
                          {isActive && (
                            <div 
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#f97316] rounded-r-full"
                              aria-hidden="true"
                            />
                          )}
                          
                          {/* Dot indicator */}
                          <div className={cn(
                            'w-2 h-2 rounded-full flex-shrink-0 z-10 transition-all duration-150',
                            isActive 
                              ? 'bg-[#f97316] ring-2 ring-[#f97316]/30' 
                              : isReference 
                                ? 'bg-gray-300 group-hover:bg-gray-400' 
                                : 'bg-gray-400 group-hover:bg-gray-500'
                          )} />
                          
                          <span className="truncate">{section.section_title}</span>
                          
                          {isActive && (
                            <ChevronRight className="w-3 h-3 ml-auto flex-shrink-0 opacity-80" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Download CTA */}
      <div className="mt-6 bg-gradient-to-br from-[#1e3a5f] to-[#2a4a6f] rounded-xl p-5 text-white">
        <div className="text-sm font-semibold mb-2">Get the Full Report</div>
        <p className="text-xs text-white/70 mb-4">
          Download a sample PDF to preview the complete analysis and insights.
        </p>
        <button
          onClick={onDownloadPDF}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#1e3a5f] rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Sample PDF
        </button>
      </div>
    </aside>
  );
};

export default ReportSidebar;
