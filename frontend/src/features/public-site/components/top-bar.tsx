import React from 'react';
import type { TopBarConfig } from '../types/landing.types';

interface TopBarProps {
  config: TopBarConfig;
}

export const TopBar: React.FC<TopBarProps> = ({ config }) => {
  if (!config.isActive) return null;

  return (
    <div className="bg-slate-900 text-white py-2 px-4 text-center overflow-hidden border-b border-white/5">
      <div className="container mx-auto">
        <p className="text-xs md:text-sm font-medium tracking-wide animate-in slide-in-from-top duration-700">
          {config.message || 'Bienvenidos a nuestra experiencia gastronómica'}
        </p>
      </div>
    </div>
  );
};
