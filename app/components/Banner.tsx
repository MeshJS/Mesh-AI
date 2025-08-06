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
    <div className="w-full px-6 py-2 border-t border-border bg-fd-card text-muted-foreground flex items-center gap-4 relative">
      <div className="flex-1 flex justify-center">
        <div className="text-sm sm:text-base flex items-center gap-2">
          <span className="text-lg">🎉</span>
          Mesh now provides an LLMs.txt file that helps AI models understand your blockchain integrations. You can find it at{' '}
          <Link
            href="/llms.txt"
            className="underline underline-offset-4 decoration-2 font-bold text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            /llms.txt
          </Link>
        </div>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss banner"
        className="rounded-md p-2 flex items-center justify-center cursor-pointer text-red-600 hover:bg-white"
      >
        <X className="w-5 h-5 stroke-4" />
      </button>
    </div>
  )
}