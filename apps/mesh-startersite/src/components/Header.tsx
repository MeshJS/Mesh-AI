import Link from "next/link";
import { MessageCircle, Twitter, Github } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 min-h-[64px] w-full bg-surface/95 backdrop-blur-sm border-b border-border flex items-center px-6 select-none z-50">
      {/* Far left: logo */}
      <div className="flex items-center gap-4 min-w-[200px]">
        <Link
          href="/"
          className="flex items-center font-display font-bold text-xl text-primary"
        >
          <span className="font-mono text-sm mr-2">[</span>
          MIMIR
          <span className="font-mono text-sm ml-2">]</span>
        </Link>
      </div>

      {/* Center: search bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full px-4 py-2 rounded-lg bg-surface-elevated border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 font-mono text-sm"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted text-xs font-mono">
            ⌘K
          </div>
        </div>
      </div>

      {/* Far right: community icons */}
      <div className="flex items-center gap-3 min-w-[160px] justify-end">
        <Link
          href="https://discord.gg/dH48jH3BKa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          className="p-2 rounded-lg hover:bg-surface-elevated transition-colors duration-200"
        >
          <MessageCircle size={20} className="text-primary transition-colors" />
        </Link>
        <Link
          href="https://twitter.com/mesh_js"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="p-2 rounded-lg hover:bg-surface-elevated transition-colors duration-200"
        >
          <Twitter size={20} className="text-primary transition-colors" />
        </Link>
        <Link
          href="https://github.com/MeshJS/mesh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-2 rounded-lg hover:bg-surface-elevated transition-colors duration-200"
        >
          <Github size={20} className="text-primary transition-colors" />
        </Link>
      </div>
    </header>
  );
}
