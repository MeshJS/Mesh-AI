import Head from "next/head";
import { motion } from "framer-motion";
import {
  BookOpen,
  Rocket,
  Code,
  Globe,
  GitBranch,
  Target,
  Video,
  MessageCircle,
  Twitter,
  Github,
} from "lucide-react";
import ContentLayout from "../../components/ContentLayout";
import ContentSection from "../../components/ContentSection";

export default function ExampleContentPage() {
  const learningCards = [
    {
      title: "AI Tools Setup",
      description:
        "Get started with Cursor, Windsurf, and ChatGPT for Cardano development",
      icon: <Rocket className="w-6 h-6" />,
      href: "/docs/ai-tools",
      primary: true,
    },
    {
      title: "Live Coding Sessions",
      description:
        "Watch recorded sessions and interactive classes on Mesh YouTube",
      icon: <Video className="w-6 h-6" />,
      href: "/docs/live-coding",
    },
    {
      title: "Practice Workflow",
      description:
        "Goal-oriented, provable practice with incentives for completion",
      icon: <Target className="w-6 h-6" />,
      href: "/docs/practice",
    },
  ];

  const buildingCards = [
    {
      title: "First Project",
      description:
        "Build your first 'hello-world' Cardano transaction with AI assistance",
      icon: <Code className="w-6 h-6" />,
      href: "/docs/first-project",
      primary: true,
    },
    {
      title: "Cardano APIs",
      description:
        "Blockfrost • Taptools • Charlie3 • DexHunter • On-chain data",
      icon: <Globe className="w-6 h-6" />,
      href: "/docs/apis",
    },
    {
      title: "GitHub Workflow",
      description:
        "Learn branches, PRs, CI checks, and collaborative development practices",
      icon: <GitBranch className="w-6 h-6" />,
      href: "/docs/github-workflow",
    },
  ];

  const communityCards = [
    {
      title: "Discord Community",
      description: "Join our Discord server for real-time help and discussions",
      icon: <MessageCircle className="w-6 h-6" />,
      href: "https://discord.gg/dH48jH3BKa",
    },
    {
      title: "Twitter Updates",
      description: "Follow us for the latest updates and announcements",
      icon: <Twitter className="w-6 h-6" />,
      href: "https://twitter.com/mesh_js",
    },
    {
      title: "GitHub Repository",
      description: "Contribute to the MeshJS ecosystem and view source code",
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/MeshJS/mesh",
    },
  ];

  return (
    <ContentLayout
      title="Example Content Page"
      subtitle="This page demonstrates how to create consistent content layouts with the same sidebar structure and background as the main page."
    >
      <Head>
        <title>Example Content | Mimir</title>
        <meta
          name="description"
          content="Example content page demonstrating the consistent layout structure for Mimir documentation."
        />
      </Head>

      {/* Hero Section */}
      <ContentSection
        layout="hero"
        cards={[
          {
            title: "Start Your Cardano Journey",
            description:
              "Transform from beginner to Cardano developer with AI-powered tools. No programming experience required.",
            icon: <BookOpen className="w-12 h-12" />,
            href: "/docs/ai-tools",
          },
        ]}
        className="mb-16"
      />

      {/* Learning Section */}
      <ContentSection
        title="Learn with AI"
        subtitle="Master Cardano development using modern AI tools and curated learning materials"
        cards={learningCards}
        layout="cards"
        className="mb-16"
      />

      {/* Building Section */}
      <ContentSection
        title="Build Real Projects"
        subtitle="Learn by building actual Cardano applications with hands-on experience"
        cards={buildingCards}
        layout="cards"
        className="mb-16"
      />

      {/* Text Content Section */}
      <ContentSection
        title="Why Choose Mimir?"
        subtitle="Our approach combines the best of AI assistance with proven learning methodologies"
        layout="text"
        className="mb-16"
      >
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Mimir is designed to make Cardano development accessible to
            everyone, regardless of their programming background. We leverage
            cutting-edge AI tools to provide personalized learning experiences
            that adapt to your skill level and goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gradient-to-br from-surface/60 to-background/60 border border-primary/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                AI-Powered Learning
              </h3>
              <p className="text-text-secondary">
                Our AI assistants provide real-time guidance, code suggestions,
                and explanations tailored to your learning pace.
              </p>
            </div>

            <div className="bg-gradient-to-br from-surface/60 to-background/60 border border-primary/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Hands-On Projects
              </h3>
              <p className="text-text-secondary">
                Learn by building real Cardano applications, from simple
                transactions to complex DeFi protocols.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Community Section */}
      <ContentSection
        title="Join Our Community"
        subtitle="Connect with fellow developers and get support when you need it"
        cards={communityCards}
        layout="cards"
        className="mb-16"
      />

      {/* Grid Layout Example */}
      <ContentSection
        title="Grid Layout Example"
        subtitle="Demonstrating the grid layout option for content sections"
        layout="grid"
        className="mb-16"
      >
        <motion.div
          className="bg-gradient-to-br from-surface/60 to-background/60 border border-primary/20 rounded-2xl p-6"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-primary mb-3">
            Grid Item 1
          </h3>
          <p className="text-text-secondary">
            This demonstrates how content can be organized in a grid layout for
            better visual hierarchy.
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-surface/60 to-background/60 border border-primary/20 rounded-2xl p-6"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-primary mb-3">
            Grid Item 2
          </h3>
          <p className="text-text-secondary">
            Grid layouts are perfect for comparing concepts or organizing
            related information side by side.
          </p>
        </motion.div>
      </ContentSection>
    </ContentLayout>
  );
}
