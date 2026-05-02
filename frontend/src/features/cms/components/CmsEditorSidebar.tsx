import { Link, useParams } from '@tanstack/react-router'
import {
  Layout,
  Search,
  Settings,
  History,
} from 'lucide-react'
import { useAdminPageDraft } from '@/api/cms'
import { useCmsEditorStore } from '../stores/cms-editor-store'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableTreeItem } from './SortableTreeItem'

export const CmsEditorSidebar = () => {
  const { pageId } = useParams({ from: '/backoffice/cms/pages/$pageId' })
  const parsedPageId = Number(pageId)
  const { data: draft } = useAdminPageDraft(parsedPageId)
  
  const { selectedBlockId, setSelectedBlockId, workingBlocks } = useCmsEditorStore()

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
        <div className="p-3 border-b border-border bg-surface-container-lowest shrink-0">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground truncate">
            Estructura de la Página
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar min-w-0">
          {blocksToDisplay.length === 0 ? (
            <p className="p-4 text-center text-xs text-muted-foreground italic">
              No hay bloques añadidos.
            </p>
          ) : (
            <SortableContext
              items={blocksToDisplay.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-1 min-w-0">
                {blocksToDisplay.map((block) => (
                  <SortableTreeItem
                    key={block.id}
                    block={block}
                    isSelected={selectedBlockId === block.id}
                    onClick={() => setSelectedBlockId(block.id)}
                  />
                ))}
              </div>
            </SortableContext>
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
