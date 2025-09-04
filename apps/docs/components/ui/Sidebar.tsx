"use client";
import { useState, useEffect, useRef } from "react";
import { AISearch as SearchAI } from "../ai/search";

const [minWidth, maxWidth, defaultWidth] = [350, 550, 450];

export default function Sidebar({ usedHeight, isAISidebarOpen, setIsAISidebarOpen }: { usedHeight: string, isAISidebarOpen: boolean, setIsAISidebarOpen(open: boolean): void }) {
  const [width, setWidth] = useState(defaultWidth);
  const isResized = useRef(false);

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {
      if(!isResized.current) return;

      setWidth((previousWidth) => {
        const newWidth = previousWidth - e.movementX / 2;

        const isWidthInRange = newWidth <= maxWidth && newWidth >= minWidth;

        return isWidthInRange ? newWidth : previousWidth;
      })
    }

    const handleMouseUp = () => {
      isResized.current = false;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
  })

  return (
    <div className="flex">
      <div
        className="w-2 cursor-col-resize select-none"
        onMouseDown={() => {
          isResized.current = true;
        }}
      >
      </div>

      <div className="hidden md:flex flex-col sticky" style={{
          top: usedHeight,
          height: `calc(100vh - ${usedHeight})`,
          width: `${width}px`
        }}>
        <SearchAI open={isAISidebarOpen} onOpenChange={setIsAISidebarOpen} />
      </div>
    </div>
  )
}