import {
  AcademicCapIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/24/solid";

import { metaGuides } from "./links-guides";
import { Wand2Icon } from "lucide-react";

export const linksResources = [
  metaGuides,
  {
    title: "AI Features",
    desc: "We've built AI tools to help you work with Mesh faster",
    link: "/ai",
    icon: Wand2Icon
  },
  {
    title: "Documentation",
    desc: "Full documentation for MeshJS",
    link: "https://docs.meshjs.dev/",
    icon: DocumentTextIcon,
  },
  {
    link: `https://github.com/MeshJS/examples`,
    title: "Examples",
    desc: "Explore our examples to get started",
    icon: Squares2X2Icon,
  },
  {
    link: `https://pbl.meshjs.dev/`,
    title: "Project Based Learning",
    desc: "Start your building journey",
    icon: AcademicCapIcon,
  },
];

export const metaResources = {
  title: "Resources",
  desc: "Whether you are new to web development or a seasoned blockchain full-stack developer, Mesh is the SDK for you.",
  link: "/resources",
  icon: StarIcon,
  items: linksResources,
};
