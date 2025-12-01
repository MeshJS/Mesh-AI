import { LearnerPersona, PERSONAS } from "../types/personas";

interface SidebarItem {
  label: string;
  href: string;
  persona?: LearnerPersona; // Optional persona filter
  difficulty?: "beginner" | "intermediate" | "advanced";
}

interface SidebarSection {
  title: string;
  icon: string;
  items: SidebarItem[];
  persona?: LearnerPersona; // Optional persona filter
}

// Persona-specific content filtering
function filterItemsByPersona(
  items: SidebarItem[],
  persona: LearnerPersona | null
): SidebarItem[] {
  if (!persona) return items;

  const personaConfig = PERSONAS[persona];
  return items.filter(item => {
    // If no persona specified, show to all
    if (!item.persona) return true;

    // If difficulty is specified, filter based on persona's technical depth
    if (item.difficulty && personaConfig) {
      const difficultyMap = {
        beginner: ["basic", "intermediate", "advanced"],
        intermediate: ["intermediate", "advanced"],
        advanced: ["advanced"],
      };
      return difficultyMap[item.difficulty].includes(
        personaConfig.technicalDepth
      );
    }

    return item.persona === persona;
  });
}

export function getSidebarSections(
  persona: LearnerPersona | null = null
): SidebarSection[] {
  // Define different sections based on persona
  const getPersonaSpecificSections = (
    persona: LearnerPersona | null
  ): SidebarSection[] => {
    switch (persona) {
      case "brand-new-to-ai":
        return [
          {
            title: "Home",
            icon: "Home",
            items: [],
          },
          {
            title: "Getting Started",
            icon: "BookOpen",
            items: [
              {
                label: "What is AI?",
                href: "/docs/ai-basics",
                difficulty: "beginner",
              },
              {
                label: "Try ChatGPT",
                href: "/docs/chatgpt-guide",
                difficulty: "beginner",
              },
              {
                label: "What is Blockchain?",
                href: "/docs/blockchain-basics",
                difficulty: "beginner",
              },
              {
                label: "Cardano Explained",
                href: "/docs/cardano-explained",
                difficulty: "beginner",
              },
            ],
          },
          {
            title: "First Steps",
            icon: "Rocket",
            items: [
              {
                label: "Your First Project",
                href: "/guides/first-project",
                difficulty: "beginner",
              },
              {
                label: "Safe Practices",
                href: "/docs/safety-guide",
                difficulty: "beginner",
              },
              {
                label: "Simple Examples",
                href: "/docs/example-content",
                difficulty: "beginner",
              },
            ],
          },
          {
            title: "Community",
            icon: "Layout",
            items: [
              {
                label: "Join Discord",
                href: "https://discord.gg/dH48jH3BKa",
                difficulty: "beginner",
              },
              {
                label: "Ask Questions",
                href: "/docs/help",
                difficulty: "beginner",
              },
            ],
          },
        ];

      case "ai-user":
        return [
          {
            title: "Home",
            icon: "Home",
            items: [],
          },
          {
            title: "AI Tools",
            icon: "BookOpen",
            items: [
              {
                label: "Cursor Setup",
                href: "/docs/ai-tools/cursor-setup",
                difficulty: "intermediate",
              },
              {
                label: "Windsurf Integration",
                href: "/docs/ai-tools/windsurf-setup",
                difficulty: "intermediate",
              },
              {
                label: "Advanced Prompts",
                href: "/docs/advanced-prompts",
                difficulty: "intermediate",
              },
              {
                label: "AI Best Practices",
                href: "/docs/ai-best-practices",
                difficulty: "intermediate",
              },
            ],
          },
          {
            title: "Build Projects",
            icon: "Rocket",
            items: [
              {
                label: "First Transaction",
                href: "/guides/first_transaction",
                difficulty: "intermediate",
              },
              {
                label: "NFT Collection",
                href: "/guides/nft-collection",
                difficulty: "intermediate",
              },
              {
                label: "Cardano APIs",
                href: "/docs/apis",
                difficulty: "intermediate",
              },
              {
                label: "Live Coding",
                href: "/docs/live-coding",
                difficulty: "intermediate",
              },
            ],
          },
          {
            title: "Ship & Deploy",
            icon: "Code",
            items: [
              {
                label: "GitHub Workflow",
                href: "/docs/github-workflow",
                difficulty: "intermediate",
              },
              {
                label: "Practice Workflow",
                href: "/docs/practice",
                difficulty: "intermediate",
              },
              {
                label: "Deploy to Production",
                href: "/docs/deployment",
                difficulty: "intermediate",
              },
            ],
          },
          {
            title: "Resources",
            icon: "Layout",
            items: [
              {
                label: "Blockfrost API",
                href: "https://blockfrost.io/",
                difficulty: "intermediate",
              },
              {
                label: "DexHunter",
                href: "https://dexhunter.io/",
                difficulty: "intermediate",
              },
              {
                label: "Taptools",
                href: "https://taptools.io/",
                difficulty: "intermediate",
              },
            ],
          },
        ];

      case "ai-power-user":
        return [
          {
            title: "Home",
            icon: "Home",
            items: [],
          },
          {
            title: "Advanced AI",
            icon: "BookOpen",
            items: [
              {
                label: "MCP Integration",
                href: "/docs/mcp-integration",
                difficulty: "advanced",
              },
              {
                label: "Custom AI Models",
                href: "/docs/custom-models",
                difficulty: "advanced",
              },
              {
                label: "AI Automation",
                href: "/docs/ai-automation",
                difficulty: "advanced",
              },
              {
                label: "Advanced Prompts",
                href: "/docs/advanced-prompts",
                difficulty: "advanced",
              },
            ],
          },
          {
            title: "Advanced Development",
            icon: "Rocket",
            items: [
              {
                label: "Smart Contracts",
                href: "/guides/smart-contracts",
                difficulty: "advanced",
              },
              {
                label: "DeFi Protocols",
                href: "/guides/defi-protocols",
                difficulty: "advanced",
              },
              {
                label: "Advanced APIs",
                href: "/docs/advanced-apis",
                difficulty: "advanced",
              },
              {
                label: "Token Swapper",
                href: "/guides/token-swap",
                difficulty: "advanced",
              },
            ],
          },
          {
            title: "Production & Scale",
            icon: "Code",
            items: [
              {
                label: "Deploy to Production",
                href: "/docs/deployment",
                difficulty: "advanced",
              },
              {
                label: "Performance Optimization",
                href: "/docs/performance",
                difficulty: "advanced",
              },
              {
                label: "Security Best Practices",
                href: "/docs/security",
                difficulty: "advanced",
              },
              {
                label: "Monitoring & Analytics",
                href: "/docs/monitoring",
                difficulty: "advanced",
              },
            ],
          },
          {
            title: "Advanced Resources",
            icon: "Layout",
            items: [
              {
                label: "Cardano Developer Portal",
                href: "https://developers.cardano.org/",
                difficulty: "advanced",
              },
              {
                label: "Plutus Documentation",
                href: "https://docs.cardano.org/plutus/",
                difficulty: "advanced",
              },
              {
                label: "Advanced APIs",
                href: "/docs/advanced-apis",
                difficulty: "advanced",
              },
              {
                label: "Community Projects",
                href: "/docs/community-projects",
                difficulty: "advanced",
              },
            ],
          },
        ];

      default:
        // Default sections for when no persona is selected
        return [
          {
            title: "Home",
            icon: "Home",
            items: [],
          },
          {
            title: "Discover",
            icon: "BookOpen",
            items: [
              {
                label: "What are AI Tools?",
                href: "/docs/ai-tools",
                difficulty: "beginner",
              },
              {
                label: "Choose Your AI Tool",
                href: "/docs/ai-tools/selection",
                difficulty: "beginner",
              },
              {
                label: "Cardano Basics",
                href: "/docs/cardano-basics",
                difficulty: "beginner",
              },
              {
                label: "Blockchain Fundamentals",
                href: "/docs/blockchain-basics",
                difficulty: "intermediate",
              },
            ],
          },
          {
            title: "Try",
            icon: "Rocket",
            items: [
              {
                label: "Cursor Setup Quest",
                href: "/docs/ai-tools/cursor-setup",
                difficulty: "beginner",
              },
              {
                label: "Windsurf Setup",
                href: "/docs/ai-tools/windsurf-setup",
                difficulty: "beginner",
              },
              {
                label: "Your First Transaction",
                href: "/guides/first_transaction",
                difficulty: "beginner",
              },
              {
                label: "Live Coding Sessions",
                href: "/docs/live-coding",
                difficulty: "intermediate",
              },
            ],
          },
          {
            title: "Build",
            icon: "Code",
            items: [
              {
                label: "NFT Collection",
                href: "/guides/nft-collection",
                difficulty: "intermediate",
              },
              {
                label: "Token Swapper",
                href: "/guides/token-swap",
                difficulty: "advanced",
              },
              {
                label: "DeFi Dashboard",
                href: "/guides/defi-dashboard",
                difficulty: "advanced",
              },
              {
                label: "Practice Workflow",
                href: "/docs/practice",
                difficulty: "intermediate",
              },
            ],
          },
          {
            title: "Ship",
            icon: "Layout",
            items: [
              {
                label: "GitHub Workflow",
                href: "/docs/github-workflow",
                difficulty: "intermediate",
              },
              {
                label: "Deploy to Production",
                href: "/docs/deployment",
                difficulty: "advanced",
              },
              {
                label: "Marketing Your Project",
                href: "/docs/marketing",
                difficulty: "intermediate",
              },
              {
                label: "Community Building",
                href: "/docs/community",
                difficulty: "beginner",
              },
            ],
          },
          {
            title: "Resources",
            icon: "Code",
            items: [
              {
                label: "Cardano APIs",
                href: "/docs/apis",
                difficulty: "intermediate",
              },
              {
                label: "Example Projects",
                href: "/docs/example-content",
                difficulty: "beginner",
              },
            ],
          },
        ];
    }
  };

  const sections = getPersonaSpecificSections(persona);

  // Filter sections and items based on persona
  return sections
    .map(section => ({
      ...section,
      items: filterItemsByPersona(section.items, persona),
    }))
    .filter(section => section.items.length > 0); // Remove empty sections
}

// Utility functions for sidebar state management
export const SIDEBAR_KEYS = {
  MAIN_SIDEBAR: "sidebar-main-sidebar",
  AI_CHAT_SIDEBAR: "sidebar-ai-chat-sidebar",
} as const;

export function resetAllSidebarStates() {
  try {
    localStorage.removeItem(SIDEBAR_KEYS.MAIN_SIDEBAR);
    localStorage.removeItem(SIDEBAR_KEYS.AI_CHAT_SIDEBAR);
    console.log("All sidebar states reset");
  } catch (error) {
    console.error("Failed to reset sidebar states:", error);
  }
}

export function getSidebarStates() {
  try {
    const mainSidebar = localStorage.getItem(SIDEBAR_KEYS.MAIN_SIDEBAR);
    const aiChatSidebar = localStorage.getItem(SIDEBAR_KEYS.AI_CHAT_SIDEBAR);

    return {
      mainSidebar: mainSidebar ? JSON.parse(mainSidebar) : null,
      aiChatSidebar: aiChatSidebar ? JSON.parse(aiChatSidebar) : null,
    };
  } catch (error) {
    console.error("Failed to get sidebar states:", error);
    return { mainSidebar: null, aiChatSidebar: null };
  }
}

export function setSidebarState(sidebarId: string, state: unknown) {
  try {
    localStorage.setItem(`sidebar-${sidebarId}`, JSON.stringify(state));
  } catch (error) {
    console.error(`Failed to set sidebar state for ${sidebarId}:`, error);
  }
}
