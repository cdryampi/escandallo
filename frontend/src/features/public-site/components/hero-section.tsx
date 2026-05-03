import React from 'react';
import type { HeroConfig } from '../types/landing.types';

interface HeroSectionProps {
  config: HeroConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-background overflow-hidden">
      {/* Refined Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-muted/50 -skew-x-6 transform translate-x-1/4" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <span className="ui-kicker mb-4 inline-block animate-in fade-in slide-in-from-left duration-1000 tracking-[0.14em]">
            Escandallo Pro Dashboard
          </span>
          <h1 className="type-display-lg text-foreground mb-6 animate-in fade-in slide-in-from-left duration-1000 delay-150">
            {config.title || 'Precisión en cada ingrediente'}
          </h1>
          <p className="type-body-lg text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-left duration-1000 delay-300 leading-relaxed">
            {config.subtitle || 'La herramienta definitiva para el control de costes y rentabilidad de tu cocina profesional.'}
          </p>
          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <button className="px-8 py-3.5 bg-brand hover:bg-brand-strong text-brand-foreground font-semibold rounded-[var(--ds-radius-md)] transition-all active:scale-[0.98] shadow-sm hover:shadow-md tracking-wide">
              Comenzar ahora
            </button>
            <button className="px-8 py-3.5 bg-surface-raised hover:bg-surface-muted text-foreground font-semibold rounded-[var(--ds-radius-md)] border border-border transition-all active:scale-[0.98] shadow-xs tracking-wide">
              Saber más
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Mockup/Element */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[560px] pointer-events-none">
        <div className="w-full h-full bg-surface-dim border-l border-y border-border rounded-l-[40px] shadow-overlay overflow-hidden relative animate-in zoom-in duration-1000">
           <div className="absolute inset-0 bg-gradient-to-tr from-brand/10 to-transparent" />
           <div className="flex items-center justify-center h-full text-muted-foreground type-headline-sm italic opacity-40">
             [Aspirational Culinary Interface]
           </div>
        </div>
      </div>
    </section>
  );
};
