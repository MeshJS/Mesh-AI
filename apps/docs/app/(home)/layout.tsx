import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';
import {
  SiDiscord,
  SiX
} from "@icons-pack/react-simple-icons";
import { LargeSearchToggle, SearchToggle } from '@/components/search/search-toggle';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/searchAI';
import Footer from '@/components/ui/Footer';
import { navbarLinks } from '@/components/ui/NavLinks';
import { Sparkles, Wand2Icon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';

export default function Layout({ children }: { children: ReactNode }) {
  return (
      <div className="flex flex-col">
        <HomeLayout
          {...baseOptions}
          nav={{ transparentMode: "always", ...baseOptions.nav }}
          searchToggle={{
            components: {
              lg: (
                <div key="lg-search" className="flex justify-end gap-1.5 max-md:hidden">
                  <LargeSearchToggle className="flex-1 w-72" />
                </div>
              ),
              sm: (
                <div key="sm-search" className="flex justify-end items-center gap-1 md:hidden">
                  <SearchToggle />
                </div>
              )
            },
          }}
          links={[
            ...navbarLinks,
            {
              text: "X",
              type: "icon",
              icon: <SiX className="w-4 h-4 text-foreground" />,
              url: "https://x.com/meshsdk/"
            },
            {
              text: "Discord",
              type: "icon",
              icon: <SiDiscord className="w-4 h-4 text-foreground" />,
              url: "https://discord.gg/dH48jH3BKa"
            }
          ]}
        >
          <div className="flex flex-row">
            <main className="flex-1 min-w-0">
              <div className="flex flex-col h-full max-w-[1400px] px-4 mx-auto mb-16">
                {children}
              </div>
            </main>
            <AISearch>
              <AISearchPanel className="lg:h-[calc(100dvh-56px)] lg:sticky lg:top-[56px] lg:border-s lg:bg-fd-popover/40 lg:backdrop-blur-2xl lg:shadow-none lg:z-10" />
              <AISearchTrigger />
            </AISearch>
          </div>
          <Footer />
        </HomeLayout>
      </div>
  )
}

