import type { LucideIcon } from "lucide-react";
import {
  Database,
  GitCompareArrows,
  Heart,
  MapPin,
  Moon,
  Search,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export interface HeroConfig {
  title: string;
  tagline: string;
  description: string;
}

export interface FeatureConfig {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: string;
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface AboutPageConfig {
  hero: HeroConfig;
  features: FeatureConfig[];
  footerLinks: FooterLink[];
  attribution: {
    dataSource: {
      label: string;
      href: string;
    };
    disclaimer: string;
  };
}

export const aboutConfig: AboutPageConfig = {
  hero: {
    title: "nationaldex",
    tagline: "Your Modern Pokedex Companion",
    description:
      "A fast, beautiful, and feature-rich Pokedex built for trainers who want instant access to everything Pokemon.",
  },

  features: [
    {
      icon: Search,
      title: "Instant Search",
      description:
        "Find any Pokemon, move, ability, or item in milliseconds with smart search.",
      accent: "#6366f1",
    },
    {
      icon: Heart,
      title: "Favorites",
      description:
        "Save your favorite Pokemon for quick access anytime, anywhere.",
      accent: "#ec4899",
    },
    {
      icon: Users,
      title: "Team Builder",
      description:
        "Build and manage your dream teams with type coverage analysis.",
      accent: "#14b8a6",
    },
    {
      icon: GitCompareArrows,
      title: "Compare Pokemon",
      description:
        "Side-by-side stat comparisons to find the perfect fit for your team.",
      accent: "#f97316",
    },
    {
      icon: MapPin,
      title: "Locations",
      description:
        "Discover where to find Pokemon across all regions and games.",
      accent: "#22c55e",
    },
    {
      icon: Moon,
      title: "Dark Mode",
      description: "Easy on the eyes with automatic light and dark themes.",
      accent: "#8b5cf6",
    },
    {
      icon: Smartphone,
      title: "Install as App",
      description:
        "Add to your home screen for a native app experience on any device.",
      accent: "#06b6d4",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized for speed with instant navigation and offline support.",
      accent: "#eab308",
    },
    {
      icon: Sparkles,
      title: "Animated Sprites",
      description:
        "Toggle between static and animated sprites for every Pokemon.",
      accent: "#f43f5e",
    },
    {
      icon: Database,
      title: "Complete Data",
      description:
        "Full Pokedex with stats, moves, abilities, evolutions, and more.",
      accent: "#64748b",
    },
  ],

  footerLinks: [
    { label: "Feedback", href: "/feedback" },
    { label: "Settings", href: "/settings" },
    {
      label: "GitHub",
      href: "https://github.com/TimMikeladze/nationaldex",
      external: true,
    },
  ],

  attribution: {
    dataSource: {
      label: "pokeapi.co",
      href: "https://pokeapi.co",
    },
    disclaimer: "Pokemon is a trademark of Nintendo",
  },
};
