import React from 'react';
import type { TopBarConfig } from '../types/landing.types';

interface TopBarProps {
  config: TopBarConfig;
}

export const TopBar: React.FC<TopBarProps> = ({ config }) => {
  if (!config.isActive) return null;

  return (
    <div className="bg-slate-900 text-white py-2.5 px-4 text-center overflow-hidden border-b border-white/5">
      <div className="container mx-auto">
        <p className="text-[11px] md:text-xs font-medium uppercase tracking-[0.12em] animate-in slide-in-from-top duration-700">
          {config.message || 'Bienvenidos a nuestra experiencia gastronómica'}
        </p>
      </div>
    </div>
  );
};
