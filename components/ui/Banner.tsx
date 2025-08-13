'use client'

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Link from "fumadocs-core/link";

export default function Banner() {
  const [visible, setVisible] = useState(false)
  const storageKey = 'meshjs-llms-banner-dismissed'

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey)
    if (dismissed !== 'true') {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem(storageKey, 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="w-full px-4 sm:px-6 py-3 border-t border-border bg-fd-card text-muted-foreground relative">
      <div className="flex justify-center pr-12 sm:pr-16">
        <div className="text-sm sm:text-base text-center max-w-none">
          <span className="text-lg mr-2">🎉</span>
          Mesh now provides LLMs.txt to give you better AI coding assistance for Cardano development. You can find it at{" "}
          <Link
            href="/llms.txt"
            className="underline underline-offset-4 decoration-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            /llms.txt
          </Link>
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4">
        <button
          onClick={dismiss}
          aria-label="Dismiss banner"
          className="rounded-md p-2 flex items-center justify-center cursor-pointer text-red-600 hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  )
}