"use client";
import { ReactNode, useEffect, useState } from "react";
import { useAISidebar } from "@/context/AISidebarContext";
import { MobileAISearch } from "../ai/search";
import Sidebar from "../ui/Sidebar";


export function WrapperLayout({ isHomeLayout, children }: { isHomeLayout: boolean, children: ReactNode }) {

  const { isAISidebarOpen, setIsAISidebarOpen } = useAISidebar();
  const [ isMobile, setIsMobile ] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const usedHeight = isHomeLayout ? "56px" : "0px"

  return (
    <div className="flex w-full" style={{ minHeight: `calc(100vh - ${usedHeight})` }}>
      <div
        className="flex-1 min-w-0"
      >
        <div className="flex flex-col h-full max-w-[1280px] px-4 mx-auto mb-16">
          {children}
        </div>
      </div>

      {isAISidebarOpen && (
        <>
        { isMobile && (
          <div className="md:hidden">
            <MobileAISearch open={isAISidebarOpen} onOpenChange={setIsAISidebarOpen} />
          </div>
        )}

        { !isMobile && (
          <div className="hidden md:flex flex-col sticky shrink-0" style={{
              top: usedHeight,
              height: `calc(100vh - ${usedHeight})`,
            }}>
            <Sidebar usedHeight={usedHeight} isAISidebarOpen={isAISidebarOpen} setIsAISidebarOpen={setIsAISidebarOpen} />
          </div>
        )}
        </>
      )}
    </div>
  );
}