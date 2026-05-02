import React from 'react';
import type { HeroConfig } from '../types/landing.types';

interface HeroSectionProps {
  config: HeroConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-slate-50 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/50 -skew-x-12 transform translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-200/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 animate-in fade-in slide-in-from-left duration-1000">
            Experiencia Gastronómica
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6 animate-in fade-in slide-in-from-left duration-1000 delay-150">
            {config.title || 'Bienvenidos'}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-10 animate-in fade-in slide-in-from-left duration-1000 delay-300">
            {config.subtitle || 'Donde la tradición se encuentra con la innovación en cada plato.'}
          </p>
          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-600/20">
              Ver Menú
            </button>
            <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-full border border-slate-200 transition-all hover:scale-105 shadow-sm">
              Reservar Mesa
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Mockup/Element */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[600px] pointer-events-none">
        <div className="w-full h-full bg-slate-200 rounded-l-[100px] shadow-2xl overflow-hidden relative animate-in zoom-in duration-1000">
           <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent" />
           <div className="flex items-center justify-center h-full text-slate-400 font-bold italic">
             [Imagen Destacada Platos]
           </div>
        </div>
      </div>
    </section>
  );
};
