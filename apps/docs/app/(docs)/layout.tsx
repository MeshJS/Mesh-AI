import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { LargeSearchToggle, SearchToggle } from 'fumadocs-ui/components/layout/search-toggle';
import { Sparkles } from 'lucide-react';
import { AISearchTrigger } from '@/components/ai';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';
import { WrapperLayout } from '@/components/layout/WrapperLayout';
import { AISidebarProvider } from '../../context/AISidebarContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
  <AISidebarProvider>
    <DocsLayout
      {...baseOptions}
      tree={source.pageTree}
      links={baseOptions.links?.filter(item => item.type === "icon")}
      searchToggle={{
        components: {
          lg: (
            <div className="flex gap-1.5 max-md:hidden">
              <LargeSearchToggle className="flex-1" />
              <AISearchTrigger
                aria-label="Ask AI"
                className={cn(
                  buttonVariants({
                    color: 'outline',
                    size: 'icon',
                    className: 'text-fd-muted-foreground',
                  }),
                )}
              >
                <Sparkles className="size-4 mr-2" />
                Mesh AI
              </AISearchTrigger>
            </div>
          ),
          sm: (
            <div className="flex justify-end items-center gap-1 md:hidden">
              <SearchToggle />
              <AISearchTrigger
                className={cn(
                  buttonVariants({
                    color: 'secondary',
                    size: 'sm',
                    className: 'text-fd-muted-foreground rounded-lg',
                  }),
                )}
              >
                <Sparkles className="size-4.5 fill-current" />
              </AISearchTrigger>
            </div>
          )
        },
      }}
    sidebar={{
        collapsible: true,
      }}
    >
        <WrapperLayout isHomeLayout={false}>
          {children}
        </WrapperLayout>
    </DocsLayout>
  </AISidebarProvider>
  );
}
