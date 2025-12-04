import { AcademicCapIcon } from "@heroicons/react/24/solid";

export const courseCardanoCourse = {
  title: "Cardano Course",
  desc: "A comprehensive 10-lesson course covering wallet integration, Aiken smart contracts, and advanced Cardano development patterns.",
  link: "/resources/cardano-course",
  thumbnail: "/guides/aiken.png",
  image: "/guides/arches-1866598_1280.jpg",
};

export const courseTutorials = {
  title: "Tutorials",
  desc: "Step-by-step guides for specific use cases and common patterns in Cardano development.",
  link: "/resources/tutorials",
  thumbnail: "/guides/develop-first-web-app.png",
  image: "/guides/laptop-g44c60b4ed_1280.jpg",
};

export const courseUseCases = {
  title: "Use Cases",
  desc: "Real-world examples and implementations showcasing what you can build with Mesh SDK.",
  link: "/resources/use-cases",
  thumbnail: "/guides/minting-application.png",
  image: "/guides/art-g68512aa8d_1280.jpg",
};

export const courseDeveloperResources = {
  title: "Developer Resources",
  desc: "Essential tools, communities, and resources for Cardano developers using Mesh SDK.",
  link: "/resources/developer-resources",
  thumbnail: "/guides/multi-signatures-transaction.png",
  image: "/guides/keys-g25a80b203_1280.jpg",
};

export const courseFAQ = {
  title: "FAQ",
  desc: "Frequently asked questions about Mesh SDK and Cardano development.",
  link: "/resources/faq",
  thumbnail: "/guides/cryptographically-prove-wallet-ownership.png",
  image: "/guides/door-gf0710cc4d_640.jpg",
};

export const linksLearn = [
  courseCardanoCourse,
  courseTutorials,
  courseUseCases,
  courseDeveloperResources,
  courseFAQ,
];

// Keep linksCourse for backwards compatibility
export const linksCourse = linksLearn;

export const metaCourse = {
  link: `/resources`,
  title: "Learn",
  desc: "Comprehensive courses, tutorials, and resources for Cardano developers.",
  icon: AcademicCapIcon,
  items: linksLearn,
};
