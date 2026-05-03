import React from 'react';
import { useLandingData } from '@/api/cms';
import { TopBar } from './top-bar';
import { HeroSection } from './hero-section';
import { AlertCircle, Loader2 } from 'lucide-react';

// Stubs for other modules
const MenuHighlights = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6 text-center">
      <h2 className="type-display-md text-brand-strong mb-4">Nuestra Selección</h2>
      <p className="type-body-md text-slate-500">Módulo de platos destacados en desarrollo.</p>
    </div>
  </section>
);

const Agenda = () => (
  <section className="py-20 bg-slate-50">
    <div className="container mx-auto px-6 text-center">
      <h2 className="type-display-md text-brand-strong mb-4">Próximos Eventos</h2>
      <p className="type-body-md text-slate-500">Módulo de agenda en desarrollo.</p>
    </div>
  </section>
);

const LocationMap = () => (
  <section className="h-[400px] bg-slate-200 flex items-center justify-center">
    <p className="type-headline-sm text-slate-500 italic">Mapa de Ubicación</p>
  </section>
);

export const LandingPage: React.FC = () => {
  const { data, isLoading, error } = useLandingData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 text-orange-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Cargando experiencia gastronómica...</p>
        
        {/* Skeleton UI */}
        <div className="w-full max-w-4xl mt-12 space-y-8 px-6">
          <div className="h-64 bg-slate-200 rounded-3xl animate-pulse" />
          <div className="grid grid-cols-3 gap-6">
            <div className="h-40 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="h-40 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="h-40 bg-slate-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <div className="p-4 bg-red-50 rounded-full mb-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="type-display-md text-slate-900 mb-2">Algo salió mal</h1>
        <p className="type-body-md text-slate-600 max-w-md mb-8">
          No pudimos conectar con el restaurante. Por favor, intenta refrescar la página.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg type-label-md tracking-[0.14em]"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Módulos con Renderizado Condicional */}
      {data.topbar && <TopBar config={data.topbar} />}
      
      <main className="flex-1">
        {data.hero && <HeroSection config={data.hero} />}
        
        {/* En el futuro estos también tendrán isActive en su config si se requiere */}
        <MenuHighlights />
        <Agenda />
        <LocationMap />
      </main>

      <footer className="bg-slate-900 text-white py-16 px-6 border-t border-white/5">
        <div className="container mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 tracking-tight">{data.branding?.name || 'Nuestro Restaurante'}</h3>
            <p className="text-slate-400 type-body-sm leading-relaxed">
              {data.branding?.tagline || 'Alta cocina, gestión inteligente. El arte de cocinar elevado por la excelencia.'}
            </p>
          </div>
          <div>
            <h4 className="type-label-md text-white mb-6 tracking-[0.12em]">Explora</h4>
            <ul className="text-slate-400 type-body-sm space-y-3">
              <li className="cursor-pointer hover:text-white transition-colors">Carta</li>
              <li className="cursor-pointer hover:text-white transition-colors">Vinos</li>
              <li className="cursor-pointer hover:text-white transition-colors">Reservas</li>
            </ul>
          </div>
          <div>
            <h4 className="type-label-md text-white mb-6 tracking-[0.12em]">Contacto</h4>
            <div className="text-slate-400 type-body-sm space-y-2">
              <p>{data.footer?.address || 'Calle Principal 123, Ciudad'}</p>
              <p>{data.footer?.email || 'contacto@restaurante.test'}</p>
              {data.footer?.phone && <p>{data.footer?.phone}</p>}
            </div>
            
            {data.footer?.social_links && (
              <div className="flex gap-4 mt-8">
                {Object.entries(data.footer.social_links).map(([platform, url]) => (
                  <a key={platform} href={url} className="type-label-md text-[10px] text-slate-400 hover:text-white transition-colors tracking-[0.14em]">
                    {platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
