import Head from "next/head";
import { motion } from "framer-motion";
import {
  BookOpen,
  Rocket,
  Code,
  Zap,
  MessageCircle,
  Twitter,
  Github,
  Star,
  CheckCircle,
  ArrowRight,
  Layout,
  Clock,
} from "lucide-react";
import ContentLayout from "../../components/ContentLayout";
import ContentSection from "../../components/ContentSection";

const featureCards = [
  {
    title: "Hero Layout",
    description: "Prominent hero section with large card and call-to-action",
    icon: <Star className="w-6 h-6" />,
    href: "#hero",
    primary: true,
  },
  {
    title: "Cards Layout",
    description: "Grid of interactive cards for features or navigation",
    icon: <Rocket className="w-6 h-6" />,
    href: "#cards",
  },
  {
    title: "Text Layout",
    description: "Simple text content with optional title and subtitle",
    icon: <BookOpen className="w-6 h-6" />,
    href: "#text",
  },
  {
    title: "Grid Layout",
    description: "Two-column grid for comparing content side by side",
    icon: <Code className="w-6 h-6" />,
    href: "#grid",
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

const steps = [
  {
    title: "Choose Your Layout",
    description: "Select the appropriate layout type for your content",
    icon: <Layout className="w-6 h-6" />,
    time: "2 min",
  },
  {
    title: "Add Your Content",
    description: "Fill in your content using the provided structure",
    icon: <Code className="w-6 h-6" />,
    time: "5 min",
  },
  {
    title: "Customize Styling",
    description: "Adjust colors, spacing, and animations as needed",
    icon: <Zap className="w-6 h-6" />,
    time: "3 min",
  },
];

export default function TemplatePage() {
  return (
    <ContentLayout
      title="Content Template"
      subtitle="A comprehensive template demonstrating all available layout options and components"
    >
      <Head>
        <title>Content Template | Mimir</title>
        <meta
          name="description"
          content="Template page demonstrating all available layout options for Mimir content pages."
        />
      </Head>

      {/* Hero Section */}
      <ContentSection
        layout="hero"
        cards={[
          {
            title: "Content Template",
            description:
              "This page demonstrates all available layout options and components for creating consistent content pages.",
            icon: <Star className="w-12 h-12" />,
            href: "#features",
          },
        ]}
        className="mb-16"
      />

      {/* Features Overview */}
      <ContentSection
        title="Available Layouts"
        subtitle="Choose the layout type that best fits your content"
        cards={featureCards}
        layout="cards"
        className="mb-16"
      />

      {/* Text Layout Example */}
      <ContentSection
        title="Text Layout Example"
        subtitle="Perfect for articles, documentation, or detailed content"
        layout="text"
        className="mb-16"
      >
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            This is an example of the text layout. It's perfect for longer
            content like articles, documentation, or detailed explanations. You
            can include paragraphs, lists, and other text content here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gradient-to-br from-surface/60 to-background/60 border border-primary/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Feature 1
              </h3>
              <p className="text-text-secondary">
                This demonstrates how you can include additional content blocks
                within the text layout.
              </p>
            </div>

            <div className="bg-gradient-to-br from-surface/60 to-background/60 border border-primary/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Feature 2
              </h3>
              <p className="text-text-secondary">
                You can add multiple content blocks to organize your information
                effectively.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Grid Layout Example */}
      <ContentSection
        title="Grid Layout Example"
        subtitle="Two-column grid for comparing content or organizing related information"
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
            better visual hierarchy. Perfect for comparing concepts or
            organizing related information side by side.
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
            related information side by side. Each item can have its own styling
            and hover effects.
          </p>
        </motion.div>
      </ContentSection>

      {/* Step-by-Step Example */}
      <ContentSection
        title="Step-by-Step Guide Example"
        subtitle="How to use this template to create your own content"
        layout="text"
        className="mb-16"
      >
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-surface/60 to-background/60 border border-primary/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-primary">
                  {step.title}
                </h3>
                <div className="flex items-center gap-2 ml-auto">
                  <Clock className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {step.time}
                  </span>
                </div>
              </div>
              <div className="space-y-4 text-text-secondary">
                <p>{step.description}</p>
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      Tip
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    You can add tips, warnings, or additional information in
                    highlighted boxes like this.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* Community Section */}
      <ContentSection
        title="Community Links"
        subtitle="Connect with the community and get support"
        cards={communityCards}
        layout="cards"
        className="mb-16"
      />

      {/* Call to Action */}
      <ContentSection
        title="Ready to Create Your Own?"
        subtitle="Start building your content using this template"
        layout="text"
        className="mb-16"
      >
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Create Your First Content Page
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Use this template as a starting point for your own content pages.
            Copy the structure and customize it for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/docs/example-content"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Example
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="/guides/getting-started"
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface/60 border border-primary/20 text-primary rounded-xl font-semibold hover:bg-surface/80 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Guide Template
              <BookOpen className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </ContentSection>

      {/* Layout Options Reference */}
      <ContentSection
        title="Layout Options Reference"
        subtitle="Quick reference for all available layout types"
        layout="text"
        className="mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Layout Types</h3>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span>
                  <strong>hero</strong> - Prominent hero section
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span>
                  <strong>cards</strong> - Grid of interactive cards
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span>
                  <strong>text</strong> - Simple text content
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span>
                  <strong>grid</strong> - Two-column grid layout
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Common Props</h3>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span>
                  <strong>title</strong> - Section title
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span>
                  <strong>subtitle</strong> - Section description
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span>
                  <strong>cards</strong> - Array of card objects
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span>
                  <strong>className</strong> - Additional CSS classes
                </span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>
    </ContentLayout>
  );
}
