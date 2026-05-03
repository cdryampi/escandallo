export interface LandingPaletteConfig {
  brand: string;
  brand_strong: string;
  accent: string;
}

export interface BrandingConfig {
  name: string;
  tagline?: string;
  logo_url?: string;
  palette?: LandingPaletteConfig;
}

export interface TopBarConfig {
  isActive: boolean;
  message: string;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
}

export interface MenuConfig {
  featured: number[];
}

export interface AgendaConfig {
  events: unknown[];
}

export interface MapConfig {
  lat: number;
  lng: number;
}

export interface FooterConfig {
  address: string;
  email: string;
  phone?: string;
  social_links?: Record<string, string>;
}

export interface LandingData {
  branding?: BrandingConfig;
  topbar?: TopBarConfig;
  hero?: HeroConfig;
  menu?: MenuConfig;
  agenda?: AgendaConfig;
  map?: MapConfig;
  footer?: FooterConfig;
}
