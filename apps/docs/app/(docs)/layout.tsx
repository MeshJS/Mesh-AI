import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import {
  LargeSearchToggle,
  SearchToggle,
} from '@/components/search/search-toggle';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/searchAI';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';

export default function Layout({ children }: { children: ReactNode }) {
  return (
      <DocsLayout
        {...baseOptions}
        tree={source.pageTree}
        links={baseOptions.links?.filter(item => item.type === "icon")}
        searchToggle={{
          components: {
            lg: (
              <div key="lg-search" className="flex gap-1.5 max-md:hidden">
                <LargeSearchToggle className="flex-1" />
              </div>
            ),
            sm: (
              <div key="sm-search" className="flex justify-end items-center gap-1 md:hidden">
                <SearchToggle />
              </div>
            )
          },
        }}
        sidebar={{
          collapsible: true,
        }}
      >
        {children}
        <AISearch>
          <AISearchPanel />
          <AISearchTrigger />
        </AISearch>
      </DocsLayout>
  );
}
