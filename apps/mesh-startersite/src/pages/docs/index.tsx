import Head from "next/head";
import { motion } from "framer-motion";
import {
  BookOpen,
  Rocket,
  Bot,
  Zap,
  Video,
  Target,
  MessageCircle,
  Github,
  Globe,
} from "lucide-react";
import ContentLayout from "../../components/ContentLayout";
import ContentSection from "../../components/ContentSection";

const learningTopics = [
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

const buildingTopics = [
  {
    title: "First Project",
    description:
      "Build your first 'hello-world' Cardano transaction with AI assistance",
    icon: <BookOpen className="w-6 h-6" />,
    href: "/guides/first_transaction",
    primary: true,
  },
  {
    title: "Cardano APIs",
    description: "Blockfrost • Taptools • Charlie3 • DexHunter • On-chain data",
    icon: <Globe className="w-6 h-6" />,
    href: "/docs/apis",
  },
  {
    title: "GitHub Workflow",
    description:
      "Learn branches, PRs, CI checks, and collaborative development practices",
    icon: <Github className="w-6 h-6" />,
    href: "/docs/github-workflow",
  },
];

const communityTopics = [
  {
    title: "Discord Community",
    description: "Join our Discord server for real-time help and discussions",
    icon: <MessageCircle className="w-6 h-6" />,
    href: "https://discord.gg/dH48jH3BKa",
  },
  {
    title: "AI Chat Assistant",
    description: "Get help from our AI assistant in the sidebar",
    icon: <Bot className="w-6 h-6" />,
    href: "#", // This opens the AI chat sidebar
  },
];

export default function LearnIndex() {
  return (
    <ContentLayout
      title="Learn Cardano Development"
      subtitle="Master Cardano development using modern AI tools and curated learning materials. No programming experience required."
    >
      <Head>
        <title>Learn | Mimir</title>
        <meta
          name="description"
          content="Learn Cardano development with AI-powered tools and step-by-step guides."
        />
      </Head>

      {/* Hero Section */}
      <ContentSection
        layout="hero"
        cards={[
          {
            title: "Start Your Learning Journey",
            description:
              "Transform from beginner to Cardano developer with AI-powered tools and carefully curated learning materials.",
            icon: <Zap className="w-12 h-12" />,
            href: "/docs/ai-tools",
          },
        ]}
        className="mb-16"
      />

      {/* Learning Topics */}
      <ContentSection
        title="Learn with AI"
        subtitle="Master Cardano development using modern AI tools and curated learning materials"
        cards={learningTopics}
        layout="cards"
        className="mb-16"
      />

      {/* Building Topics */}
      <ContentSection
        title="Build Real Projects"
        subtitle="Learn by building actual Cardano applications with hands-on experience"
        cards={buildingTopics}
        layout="cards"
        className="mb-16"
      />

      {/* Community Section */}
      <ContentSection
        title="Get Support"
        subtitle="Connect with the community and get help when you need it"
        cards={communityTopics}
        layout="cards"
        className="mb-16"
      />

      {/* Learning Path */}
      <ContentSection
        title="Your Learning Path"
        subtitle="Follow this structured approach to become a Cardano developer"
        layout="text"
        className="mb-16"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-xl font-semibold text-primary">
                Setup Your AI Tools
              </h3>
            </div>
            <p className="text-text-secondary">
              Start by setting up your AI development environment. We'll guide
              you through installing and configuring Cursor, Windsurf, and other
              AI tools that will accelerate your learning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-surface/60 to-background/60 border border-primary/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-xl font-semibold text-primary">
                Build Your First Project
              </h3>
            </div>
            <p className="text-text-secondary">
              Apply what you've learned by building real Cardano applications.
              Start with simple transactions and gradually work your way up to
              complex DeFi protocols.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-surface/60 to-background/60 border border-primary/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-xl font-semibold text-primary">
                Join the Community
              </h3>
            </div>
            <p className="text-text-secondary">
              Connect with fellow developers, share your projects, and get help
              when you need it. Our community is here to support your learning
              journey.
            </p>
          </motion.div>
        </div>
      </ContentSection>

      {/* Next Steps */}
      <ContentSection
        title="Ready to Begin?"
        subtitle="Start your Cardano development journey today"
        layout="text"
        className="mb-16"
      >
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Begin with AI Tools Setup
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            The AI Tools section will walk you through setting up your
            development environment with the latest AI-powered tools. This is
            the perfect starting point for your Cardano development journey.
          </p>
          <motion.a
            href="/docs/ai-tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Learning
            <Rocket className="w-4 h-4" />
          </motion.a>
        </div>
      </ContentSection>
    </ContentLayout>
  );
}
