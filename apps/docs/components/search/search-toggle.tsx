'use client';

import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { SearchIcon } from 'lucide-react';
import { type ComponentProps } from 'react';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';

export function SearchToggle({
  className,
  ...props
}: ComponentProps<'button'>) {
  const { setOpenSearch } = useSearchContext();

  return (
    <button
      type="button"
      aria-label="Open Search"
      className={cn(
        buttonVariants({
          color: 'ghost',
          size: 'icon-sm',
        }),
        className
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
      {...props}
    >
      <SearchIcon className="h-4 w-4" />
    </button>
  );
}

export function LargeSearchToggle({
  className,
  ...props
}: ComponentProps<'button'>) {
  const { setOpenSearch } = useSearchContext();

  return (
    <button
      type="button"
      className={cn(
        'flex h-9 items-center gap-2 rounded-lg border bg-fd-secondary/50 px-3 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground',
        className
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
      {...props}
    >
      <SearchIcon className="h-4 w-4" />
      <span>Search...</span>
      <kbd className="ml-auto hidden rounded border bg-fd-background px-1.5 text-xs md:inline-block">
        ⌘K
      </kbd>
    </button>
  );
}
