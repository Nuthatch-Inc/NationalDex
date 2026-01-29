"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type {
  AboutPageConfig,
  FeatureConfig,
  FooterLink,
  HeroConfig,
} from "./config";
import { aboutConfig } from "./config";

function HeroOrb() {
  return (
    <div className="relative size-32 md:size-40 mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500/20 via-transparent to-indigo-500/20 blur-2xl" />
      {/* Main orb */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-foreground/[0.03] to-foreground/[0.08] border border-foreground/[0.06]" />
      {/* Inner accent */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-tl from-rose-500/10 to-indigo-500/10" />
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-2 rounded-full bg-foreground/20" />
      </div>
      {/* Orbiting dot */}
      <div className="absolute top-4 right-6 size-1.5 rounded-full bg-rose-400/40" />
      <div className="absolute bottom-8 left-4 size-1 rounded-full bg-indigo-400/40" />
    </div>
  );
}

function HeroSection({ hero }: { hero: HeroConfig }) {
  return (
    <section className="relative text-center py-12 md:py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="relative space-y-8">
        <HeroOrb />

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {hero.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-medium">
            {hero.tagline}
          </p>
        </div>

        <p className="text-sm text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
          {hero.description}
        </p>

        {hero.cta && (
          <div className="pt-2">
            <Link
              href={hero.cta.href}
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              {hero.cta.label}
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>
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
    <div className="relative p-4 md:p-6 overflow-hidden">
      <div className="relative max-w-2xl mx-auto space-y-8">
        <HeroSection hero={hero} />
        <FeaturesSection features={features} />
        <FooterSection links={footerLinks} attribution={attribution} />
      </div>
    </div>
  );
}
