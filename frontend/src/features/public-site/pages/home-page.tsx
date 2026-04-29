import { motion } from 'motion/react'
import { PublicCtaCard } from '@/features/public-site/components/public-cta-card'

export const HomePage = () => (
  <div className="mx-auto max-w-7xl px-6 py-16">
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]"
    >
      <div className="space-y-6">
        <p className="ui-kicker">Restaurante · escandallo · control</p>
        <h1 className="max-w-4xl text-foreground type-display-lg md:text-[3.75rem] md:leading-[1.05]">
          Escandallos precisos para un restaurante que quiere operar con margen real.
        </h1>
        <p className="max-w-2xl type-body-lg text-muted-foreground">
          Base frontend preparada para separar landing, CMS y backoffice sin convertir la aplicación en una bola de barro.
        </p>
      </div>
      <PublicCtaCard />
    </motion.section>
  </div>
)
