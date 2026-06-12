import { memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
 import { getIndustryDetailBySlug, getSubIndustryBySlug } from "@/data/industries";

const IndustryBreadcrumb = memo(() => {
  const { slug } = useParams<{ slug: string }>();
  const detail = slug ? getIndustryDetailBySlug(slug) : null;
   const subIndustryResult = slug ? getSubIndustryBySlug(slug) : null;
 
   const displayTitle = detail?.title || subIndustryResult?.name;
   const parentIndustry = subIndustryResult?.parentIndustry;

  return (
    <nav aria-label="Breadcrumb" className="bg-secondary/30 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li><ChevronRight className="w-4 h-4" aria-hidden="true" /></li>
           {slug && displayTitle ? (
            <>
              <li>
                <Link href="/industry" className="hover:text-primary transition-colors">
                  Industries
                </Link>
              </li>
              <li><ChevronRight className="w-4 h-4" aria-hidden="true" /></li>
               {parentIndustry && (
                 <>
                   <li>
                     <Link href={`/industry/${parentIndustry.path}`} className="hover:text-primary transition-colors">
                       {parentIndustry.name}
                     </Link>
                   </li>
                   <li><ChevronRight className="w-4 h-4" aria-hidden="true" /></li>
                 </>
               )}
              <li>
                 <span className="text-foreground font-medium">{displayTitle}</span>
              </li>
            </>
          ) : (
            <li>
              <span className="text-foreground font-medium">All Reports</span>
            </li>
          )}
        </ol>
      </div>
    </nav>
  );
});

IndustryBreadcrumb.displayName = "IndustryBreadcrumb";

export default IndustryBreadcrumb;
