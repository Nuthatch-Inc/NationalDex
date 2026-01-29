"use client";

import { Circle, ExternalLink, Hexagon, Square, Triangle } from "lucide-react";
import Link from "next/link";
import type {
  AboutPageConfig,
  FeatureConfig,
  FooterLink,
  HeroConfig,
} from "./config";
import { aboutConfig } from "./config";

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.02]">
      <Circle className="absolute top-12 left-[10%] size-24 stroke-1" />
      <Square className="absolute top-32 right-[15%] size-16 stroke-1 rotate-12" />
      <Triangle className="absolute top-48 left-[25%] size-12 stroke-1 -rotate-6" />
      <Hexagon className="absolute top-20 right-[30%] size-20 stroke-1 rotate-45" />
      <Circle className="absolute bottom-40 right-[10%] size-32 stroke-1" />
      <Square className="absolute bottom-24 left-[20%] size-14 stroke-1 rotate-45" />
      <Triangle className="absolute bottom-60 right-[25%] size-18 stroke-1 rotate-12" />
      <Hexagon className="absolute bottom-32 left-[8%] size-10 stroke-1" />
    </div>
  );
}

function HeroSection({ hero }: { hero: HeroConfig }) {
  return (
    <section className="relative space-y-6 text-center py-12 md:py-16">
      <div className="space-y-3">
        <p className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em]">
          welcome to
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {hero.title}
        </h1>
      </div>
      <div className="w-12 h-px bg-foreground/10 mx-auto" />
      <p className="text-sm md:text-base text-foreground/80 font-medium">
        {hero.tagline}
      </p>
      <p className="text-xs md:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
        {hero.description}
      </p>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureConfig;
  index: number;
}) {
  const Icon = feature.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      className="group relative p-4 md:p-5 transition-all duration-300 hover:bg-foreground/[0.02]"
      style={{
        borderLeft: isEven ? `1px solid ${feature.accent}15` : undefined,
        borderRight: !isEven ? `1px solid ${feature.accent}15` : undefined,
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="relative shrink-0 p-2 rounded-sm transition-colors duration-300"
          style={{ backgroundColor: `${feature.accent}08` }}
        >
          <Icon
            className="size-4 transition-colors duration-300"
            style={{ color: `${feature.accent}90` }}
          />
          <div
            className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: `${feature.accent}12` }}
          />
        </div>
        <div className="space-y-1.5 min-w-0">
          <p className="text-sm font-medium tracking-tight">{feature.title}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection({ features }: { features: FeatureConfig[] }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-foreground/5" />
        <p className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em]">
          Features
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-foreground/5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}

function FooterLinksSection({ links }: { links: FooterLink[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {links.map((link) =>
        link.external ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors duration-200 inline-flex items-center gap-1.5"
          >
            {link.label}
            <ExternalLink className="size-3" />
          </a>
        ) : (
          <Link
            key={link.label}
            href={link.href}
            className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors duration-200"
          >
            {link.label}
          </Link>
        ),
      )}
    </div>
  );
}

function AttributionSection({
  attribution,
}: {
  attribution: AboutPageConfig["attribution"];
}) {
  return (
    <div className="text-center space-y-2">
      <p className="text-[10px] text-muted-foreground/40">
        data via{" "}
        <a
          href={attribution.dataSource.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
        >
          {attribution.dataSource.label}
        </a>
      </p>
      <p className="text-[10px] text-muted-foreground/30">
        {attribution.disclaimer}
      </p>
    </div>
  );
}

function FooterSection({
  links,
  attribution,
}: {
  links: FooterLink[];
  attribution: AboutPageConfig["attribution"];
}) {
  return (
    <section className="pt-10 space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-foreground/5" />
        <div className="size-1 rounded-full bg-foreground/10" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-foreground/5" />
      </div>
      <FooterLinksSection links={links} />
      <AttributionSection attribution={attribution} />
    </section>
  );
}

export default function AboutPage() {
  const { hero, features, footerLinks, attribution } = aboutConfig;

  return (
    <div className="relative p-4 md:p-6">
      <FloatingShapes />
      <div className="relative max-w-2xl mx-auto space-y-6">
        <HeroSection hero={hero} />
        <FeaturesSection features={features} />
        <FooterSection links={footerLinks} attribution={attribution} />
      </div>
    </div>
  );
}
