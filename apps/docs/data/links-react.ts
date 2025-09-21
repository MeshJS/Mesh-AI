import {
  BoltIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";

export const metaReactGettingstarted = {
  title: "Getting Started with React",
  desc: "Frontend components for wallet connections, and useful React hooks to getting wallet states",
  link: "/react/getting-started",
  icon: RocketLaunchIcon,
};
export const metaReactUicomponents = {
  title: "UI Components",
  desc: "UI components to speed up your app development.",
  link: "/react/ui-components",
  icon: PaintBrushIcon,
};
export const metaReactWallethooks = {
  title: "Wallet Hooks",
  desc: "React hooks for interacting with connected wallets.",
  link: "/react/wallet-hooks",
  icon: BoltIcon,
};

export const linksReact = [
  metaReactGettingstarted,
  metaReactUicomponents,
  metaReactWallethooks,
];

export const metaReact = {
  title: "React Components",
  desc: "Frontend React UI components and React hooks",
  link: "/react",
  icon: ComputerDesktopIcon,
  items: linksReact,
};
