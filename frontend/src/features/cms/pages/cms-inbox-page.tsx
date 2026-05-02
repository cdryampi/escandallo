import { useMemo, useState } from 'react'
import {
  useAdminContactSubmission,
  useAdminContactSubmissions,
  useUpdateContactSubmissionStatus,
} from '@/api/cms'
import { EmptyState } from '@/components/feedback/empty-state'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableCell, TableContainer, TableHeadCell } from '@/components/ui/table'
import type { ContactSubmission, ContactSubmissionStatus } from '@/types/cms'
import { Link } from '@tanstack/react-router'
import { Inbox, MailCheck, MailOpen, MailQuestion } from 'lucide-react'

const EMPTY_SUBMISSIONS: ContactSubmission[] = []

const filters: Array<{ key: ContactSubmissionStatus | 'all'; label: string }> = [
  { key: 'all', label: 'Todas' },
  { key: 'new', label: 'Nuevas' },
  { key: 'read', label: 'Leidas' },
  { key: 'resolved', label: 'Resueltas' },
]

const statusLabels: Record<ContactSubmissionStatus, string> = {
  new: 'Nueva',
  read: 'Leida',
  resolved: 'Resuelta',
}

const statusVariants: Record<ContactSubmissionStatus, 'warning' | 'info' | 'success'> = {
  new: 'warning',
  read: 'info',
  resolved: 'success',
}

export const CmsInboxPage = () => {
  const [activeFilter, setActiveFilter] = useState<ContactSubmissionStatus | 'all'>('all')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const { data, isLoading, error, refetch } = useAdminContactSubmissions(activeFilter)
  const submissions = data?.data ?? EMPTY_SUBMISSIONS
  const counts = data?.meta.counts
  const effectiveSelectedId =
    selectedId != null && submissions.some((submission) => submission.id === selectedId)
      ? selectedId
      : submissions[0]?.id ?? null

  const selectedFromList = useMemo(
    () => submissions.find((submission) => submission.id === effectiveSelectedId) ?? null,
    [effectiveSelectedId, submissions],
  )

  const { data: selectedSubmission, isLoading: isDetailLoading } = useAdminContactSubmission(effectiveSelectedId)
  const updateStatus = useUpdateContactSubmissionStatus()
  const activeSubmission = selectedSubmission ?? selectedFromList

  return (
    <div className="space-y-6">
      <BackofficePageHeader
        title="Buzon CMS"
        description="Consulta mensajes enviados desde formularios publicos y actualiza su seguimiento."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MailQuestion className="size-4 text-warning-foreground" />
              Nuevas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="type-display-md">{counts?.new ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MailOpen className="size-4 text-info-foreground" />
              Leidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="type-display-md">{counts?.read ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MailCheck className="size-4 text-success-foreground" />
              Resueltas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="type-display-md">{counts?.resolved ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </Button>
        ))}
        <Button asChild variant="ghost" size="sm" className="ml-auto">
          <Link to="/backoffice/cms/pages">Volver a paginas</Link>
        </Button>
      </div>

      {isLoading ? (
        <LoadingState
          title="Cargando buzon CMS"
          description="Recuperando consultas, filtros y estado actual del seguimiento."
        />
      ) : error ? (
        <ErrorState
          title="No se pudo cargar el buzon"
          description="No pudimos recuperar las consultas enviadas desde el sitio publico."
          onRetry={() => void refetch()}
        />
      ) : submissions.length === 0 ? (
        <EmptyState
          title="No hay consultas para este filtro"
          description="Cuando visitantes envien mensajes desde el formulario publico, apareceran aqui."
        />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,1fr)]">
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeadCell>Contacto</TableHeadCell>
                  <TableHeadCell>Pagina</TableHeadCell>
                  <TableHeadCell>Estado</TableHeadCell>
                  <TableHeadCell>Fecha</TableHeadCell>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className={`cursor-pointer border-t border-border transition-colors hover:bg-surface-container-lowest ${
                      submission.id === effectiveSelectedId ? 'bg-surface-container-lowest' : ''
                    }`}
                    onClick={() => setSelectedId(submission.id)}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground">{submission.subject}</p>
                        <p className="text-xs text-muted-foreground">{submission.name} · {submission.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{submission.page?.name ?? 'Sin pagina'}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[submission.status]}>
                        {statusLabels[submission.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(submission.created_at).toLocaleString()}
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>

          <Card className="min-h-[420px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Inbox className="size-4 text-brand" />
                Detalle de consulta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {isDetailLoading && activeSubmission == null ? (
                <LoadingState
                  title="Cargando detalle"
                  description="Preparando mensaje completo y acciones de estado."
                />
              ) : activeSubmission == null ? (
                <EmptyState
                  title="Selecciona una consulta"
                  description="Elige un mensaje del listado para ver detalle completo y cambiar su estado."
                />
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant={statusVariants[activeSubmission.status]}>
                      {statusLabels[activeSubmission.status]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(activeSubmission.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="ui-field-label">Pagina</p>
                      <p className="type-body-md text-foreground">{activeSubmission.page?.name ?? 'Sin pagina'}</p>
                    </div>
                    <div>
                      <p className="ui-field-label">Remitente</p>
                      <p className="type-body-md text-foreground">{activeSubmission.name}</p>
                      <p className="text-sm text-muted-foreground">{activeSubmission.email}</p>
                    </div>
                    <div>
                      <p className="ui-field-label">Asunto</p>
                      <p className="type-body-md text-foreground">{activeSubmission.subject}</p>
                    </div>
                    <div>
                      <p className="ui-field-label">Mensaje</p>
                      <div className="rounded-lg border border-border bg-surface-container-lowest p-4 text-sm leading-relaxed text-foreground">
                        {activeSubmission.message}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-border pt-4">
                    <p className="ui-field-label">Cambiar estado</p>
                    <div className="flex flex-wrap gap-2">
                      {(['new', 'read', 'resolved'] as ContactSubmissionStatus[]).map((status) => (
                        <Button
                          key={status}
                          variant={activeSubmission.status === status ? 'default' : 'outline'}
                          size="sm"
                          disabled={updateStatus.isPending}
                          onClick={() => {
                            updateStatus.mutate({
                              submissionId: activeSubmission.id,
                              status,
                            })
                          }}
                        >
                          {statusLabels[status]}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
