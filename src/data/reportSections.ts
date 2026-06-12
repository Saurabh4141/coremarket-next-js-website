/* =====================================================
   REPORT SECTIONS DATA (API-FRIENDLY STRUCTURE)
   Maps to: report_sections table
===================================================== */

export type SectionGroup = 'market_overview' | 'deep_dive' | 'reference';
export type SectionType = 'content' | 'meta' | 'utility';

export interface ReportSection {
  id: number;
  report_id: number;
  section_key: string;
  section_title: string;
  section_group: SectionGroup;
  section_type: SectionType;
  content: string | null;
  display_order: number;
  is_visible: boolean;
  is_collapsible: boolean;
  created_at: string;
  created_by: number;
  updated_at: string | null;
  updated_by: number | null;
}

// Section group metadata for sidebar grouping
export const sectionGroups: Record<SectionGroup, { label: string; priority: number }> = {
  market_overview: { label: 'MARKET OVERVIEW', priority: 1 },
  deep_dive: { label: 'DEEP DIVE', priority: 2 },
  reference: { label: 'REFERENCE', priority: 3 },
};

// Default sections template for reports
export const defaultReportSections: Omit<ReportSection, 'id' | 'report_id' | 'created_at' | 'created_by' | 'updated_at' | 'updated_by'>[] = [
  // About Group
 
  // Market Overview Group
  {
    section_key: 'market_size_share',
    section_title: 'Market Size & Share',
    section_group: 'market_overview',
    section_type: 'content',
    content: 'available',
    display_order: 1,
    is_visible: true,
    is_collapsible: false,
  },
  {
    section_key: 'market_analysis',
    section_title: 'Market Analysis',
    section_group: 'market_overview',
    section_type: 'content',
    content: 'available',
    display_order: 2,
    is_visible: true,
    is_collapsible: false,
  },
  {
    section_key: 'market_dynamics',
    section_title: 'Market Dynamics',
    section_group: 'market_overview',
    section_type: 'content',
    content: 'available',
    display_order: 3,
    is_visible: true,
    is_collapsible: false,
  },
  {
    section_key: 'trends_insights',
    section_title: 'Trends and Insights',
    section_group: 'market_overview',
    section_type: 'content',
    content: 'available',
    display_order: 4,
    is_visible: true,
    is_collapsible: false,
  },
  {
    section_key: 'segment_analysis',
    section_title: 'Segment Analysis',
    section_group: 'market_overview',
    section_type: 'content',
    content: 'available',
    display_order: 5,
    is_visible: true,
    is_collapsible: false,
  },
  {
    section_key: 'geography_analysis',
    section_title: 'Geography Analysis',
    section_group: 'market_overview',
    section_type: 'content',
    content: 'available',
    display_order: 6,
    is_visible: true,
    is_collapsible: false,
  },
  {
    section_key: 'competitive_landscape',
    section_title: 'Competitive Landscape',
    section_group: 'market_overview',
    section_type: 'content',
    content: 'available',
    display_order: 7,
    is_visible: true,
    is_collapsible: false,
  },
  // Deep Dive Group
  {
    section_key: 'major_players',
    section_title: 'Major Players',
    section_group: 'deep_dive',
    section_type: 'content',
    content: 'available',
    display_order: 8,
    is_visible: true,
    is_collapsible: false,
  },
  {
    section_key: 'industry_developments',
    section_title: 'Industry Developments',
    section_group: 'deep_dive',
    section_type: 'content',
    content: 'available',
    display_order: 9,
    is_visible: true,
    is_collapsible: false,
  },
  // Reference Group
  {
    section_key: 'table_of_contents',
    section_title: 'Table of Contents',
    section_group: 'reference',
    section_type: 'utility',
    content: 'available',
    display_order: 10,
    is_visible: true,
    is_collapsible: false,
  },
  {
    section_key: 'report_scope',
    section_title: 'Scope of the Report',
    section_group: 'reference',
    section_type: 'utility',
    content: 'available',
    display_order: 11,
    is_visible: true,
    is_collapsible: false,
  },
  {
    section_key: 'faq',
    section_title: 'Frequently Asked Questions',
    section_group: 'reference',
    section_type: 'utility',
    content: 'available',
    display_order: 12,
    is_visible: true,
    is_collapsible: false,
  },
];

// Generate sections for a specific report
export const generateReportSections = (reportId: number): ReportSection[] => {
  return defaultReportSections.map((section, index) => ({
    ...section,
    id: reportId * 100 + index + 1,
    report_id: reportId,
    created_at: new Date().toISOString(),
    created_by: 1,
    updated_at: null,
    updated_by: null,
  }));
};

// Get sections grouped by section_group
export const getSectionsGrouped = (sections: ReportSection[]): Record<SectionGroup, ReportSection[]> => {
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
};

// Get visible sections only
export const getVisibleSections = (sections: ReportSection[]): ReportSection[] => {
  return sections
    .filter(s => s.is_visible && s.content)
    .sort((a, b) => a.display_order - b.display_order);
};
