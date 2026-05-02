import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpen,
  Eye,
  Inbox,
  Layout,
  MousePointer2,
  Smartphone,
} from 'lucide-react'

export const CmsIndexPage = () => {
  return (
    <div className="space-y-8 pb-12">
      <BackofficePageHeader
        title="Centro de Ayuda CMS"
        description="Guia rapida para paginas publicas, editor visual y seguimiento de formularios."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-primary/10 bg-primary/5">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <Layout className="size-5" />
            </div>
            <CardTitle className="text-xl">Gestor de Paginas</CardTitle>
            <CardDescription>
              Edita portada, carta, contacto y contenido legal desde un mismo flujo multi-pagina.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full gap-2">
              <Link to="/backoffice/cms/pages">
                Ir al listado de paginas <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container text-primary">
              <BookOpen className="size-5" />
            </div>
            <CardTitle className="text-xl">Conceptos Clave</CardTitle>
            <CardDescription>Entiende como funciona el flujo editorial.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container text-[10px] font-bold">1</div>
              <div>
                <p className="text-sm font-bold text-on-surface">Borrador</p>
                <p className="text-[11px] text-muted-foreground">
                  Cuando entras a una pagina, el sistema puede crear borrador desde la version publicada. No se ve fuera hasta publicar.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container text-[10px] font-bold">2</div>
              <div>
                <p className="text-sm font-bold text-on-surface">Publicacion Directa</p>
                <p className="text-[11px] text-muted-foreground">
                  Al publicar, la version actual reemplaza contenido visible del slug publico y la anterior queda archivada.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container text-primary">
              <Inbox className="size-5" />
            </div>
            <CardTitle className="text-xl">Buzon de Contacto</CardTitle>
            <CardDescription>
              Revisa consultas enviadas desde bloques de contacto y prioriza mensajes nuevos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full gap-2">
              <Link to="/backoffice/cms/inbox">
                Abrir buzon <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="type-headline-sm flex items-center gap-2 font-bold">
          <MousePointer2 className="size-4 text-primary" />
          Uso del Editor
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-3 rounded-xl border border-border bg-white p-5 shadow-sm">
            <p className="text-sm font-bold">Estructura por Bloques</p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Cada pagina se construye apilando bloques. Puedes arrastrar y soltar para cambiar orden visual.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-white p-5 shadow-sm">
            <p className="text-sm font-bold">Panel de Propiedades</p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Al seleccionar un bloque, el panel derecho muestra sus campos editables, media y configuracion.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-white p-5 shadow-sm">
            <p className="text-sm font-bold">Vista Previa</p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Usa los iconos de <Smartphone className="inline size-3" /> para revisar contenido en movil, tablet o escritorio antes de guardar.
            </p>
          </div>
        </div>
      </div>

      <Card className="border-dashed border-primary/30">
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
          <div className="rounded-full bg-primary/5 p-4">
            <Eye className="size-8 text-primary/40" />
          </div>
          <div className="max-w-md">
            <h4 className="font-bold">Listo para empezar</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Abre cualquier slug base y empieza a editar bloques, SEO o formularios desde el mismo modulo.
            </p>
          </div>
          <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5">
            <Link to="/backoffice/cms/pages">Explorar catalogo de paginas</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
