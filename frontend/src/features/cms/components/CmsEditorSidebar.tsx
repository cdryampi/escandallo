import { Link, useParams } from '@tanstack/react-router'
import {
  Layout,
  Search,
  Settings,
  History,
  ChevronRight,
  Eye,
  Type,
  List as ListIcon,
  Phone,
  Star,
} from 'lucide-react'
import { useAdminPageDraft } from '@/api/cms'
import { useCmsEditorStore } from '../stores/cms-editor-store'
import type { Block } from '@/types/cms'

export const CmsEditorSidebar = () => {
  const { pageId } = useParams({ from: '/backoffice/cms/pages/$pageId' })
  const parsedPageId = Number(pageId)
  const { data: draft } = useAdminPageDraft(parsedPageId)
  
  const { selectedBlockId, setSelectedBlockId, workingBlocks } = useCmsEditorStore()

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'HeroBlock': return <Eye className="size-3.5" />
      case 'RichTextBlock': return <Type className="size-3.5" />
      case 'FeatureListBlock': return <ListIcon className="size-3.5" />
      case 'ContactFormBlock': return <Phone className="size-3.5" />
      case 'MenuHighlightsBlock': return <Star className="size-3.5" />
      default: return <Layout className="size-3.5" />
    }
  }

  const getBlockLabel = (block: Block) => {
    switch (block.type) {
      case 'HeroBlock': return block.data.title || 'Sección Hero'
      case 'RichTextBlock': return 'Contenido de Texto'
      case 'FeatureListBlock': return block.data.title || 'Lista de Características'
      case 'MenuHighlightsBlock': return block.data.title || 'Platos Destacados'
      case 'ContactFormBlock': return 'Formulario de Contacto'
      default: return (block as Block).type
    }
  }

  const blocksToDisplay = workingBlocks.length > 0 ? workingBlocks : (draft?.blocks ?? [])

  return (
    <aside className="flex flex-col gap-6 h-full">
      {/* Navegación Principal */}
      <nav className="flex flex-col gap-1 rounded-xl border border-border bg-white p-2 shadow-sm">
        <Link
          to="/backoffice/cms/pages/$pageId/content"
          params={{ pageId }}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-container-low [&.active]:bg-primary/10 [&.active]:text-primary"
        >
          <Layout className="size-4" />
          Contenido y Bloques
        </Link>
        <Link
          to="/backoffice/cms/pages/$pageId/seo"
          params={{ pageId }}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-container-low [&.active]:bg-primary/10 [&.active]:text-primary"
        >
          <Search className="size-4" />
          SEO y Metadatos
        </Link>
        <Link
          to="/backoffice/cms/pages/$pageId/settings"
          params={{ pageId }}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-container-low [&.active]:bg-primary/10 [&.active]:text-primary"
        >
          <Settings className="size-4" />
          Configuración
        </Link>
        <Link
          to="/backoffice/cms/pages/$pageId/history"
          params={{ pageId }}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-container-low [&.active]:bg-primary/10 [&.active]:text-primary"
        >
          <History className="size-4" />
          Historial
        </Link>
      </nav>

      {/* Árbol de Bloques */}
      <div className="flex flex-col flex-1 min-h-0 rounded-xl border border-border bg-white shadow-sm overflow-hidden">
        <div className="p-3 border-b border-border bg-surface-container-lowest">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Estructura de la Página
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {blocksToDisplay.length === 0 ? (
            <p className="p-4 text-center text-xs text-muted-foreground italic">
              No hay bloques añadidos.
            </p>
          ) : (
            blocksToDisplay.map((block) => (
              <button
                key={block.id}
                onClick={() => setSelectedBlockId(block.id)}
                className={`w-full flex items-center gap-2 rounded-md px-3 py-2 text-xs transition-all text-left ${
                  selectedBlockId === block.id
                    ? 'bg-primary/10 text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded bg-surface-container text-muted-foreground shrink-0">
                  {getBlockIcon(block.type)}
                </div>
                <span className="truncate flex-1">{getBlockLabel(block)}</span>
                {selectedBlockId === block.id && <ChevronRight className="size-3" />}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Info de Versión */}
      <div className="rounded-xl border border-border bg-surface-container-lowest p-4 space-y-3 shrink-0">
         <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">Estado</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              draft?.status === 'published' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
            }`}>
              {draft?.status.toUpperCase() || 'DRAFT'}
            </span>
         </div>
         <div className="flex justify-between items-center text-[10px]">
            <span className="text-muted-foreground">Versión</span>
            <span className="font-mono">v{draft?.version_number || 1}</span>
         </div>
      </div>
    </aside>
  )
}
