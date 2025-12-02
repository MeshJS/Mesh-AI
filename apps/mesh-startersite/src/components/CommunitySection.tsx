"use client";

import { motion } from "framer-motion";
import { Twitter, MessageCircle, Github } from "lucide-react";

export default function CommunitySection() {
  return (
    <motion.div
      className="mt-12 flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex flex-col items-center w-full max-w-2xl">
        <div className="flex flex-row gap-8 w-full justify-center border border-primary/20 rounded-xl px-8 py-5 bg-primary/5 shadow-sm">
          <span className=" px-4 py-1 border-primary/30 rounded-full text-primary font-mono text-base font-semibold tracking-wide bg-primary/5">
            And make new friends:
          </span>
          <motion.a
            href="https://twitter.com/mesh_js"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Twitter className="w-5 h-5" />
            <span className="text-sm font-medium">Twitter</span>
          </motion.a>
          <motion.a
            href="https://discord.gg/dH48jH3BKa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Discord</span>
          </motion.a>
          <motion.a
            href="https://github.com/MeshJS/mesh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium">GitHub</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
