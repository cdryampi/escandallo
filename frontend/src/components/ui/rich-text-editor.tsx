import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import { Button } from './button'
import { cn } from '@/lib/utils'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Quote,
  Undo,
  Redo,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Underline as UnderlineIcon,
} from 'lucide-react'

interface Props {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export const RichTextEditor = ({ content, onChange, placeholder = 'Escribe algo aquí...' }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[180px] w-full rounded-md border border-border/60 bg-white px-5 py-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand/30 focus-visible:border-brand/40 disabled:cursor-not-allowed disabled:opacity-50 prose prose-sm max-w-none transition-all shadow-sm',
      },
    },
  })

  if (!editor) {
    return null
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL del enlace:', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const getButtonVariant = (active: boolean) => active ? 'default' : 'ghost'

  return (
    <div className="space-y-3 group/editor">
      <div className="flex flex-wrap items-center gap-1 rounded-md border border-border/50 bg-surface-container-lowest p-1 shadow-sm transition-colors group-focus-within/editor:border-brand/30">
        {/* Estilos básicos */}
        <div className="flex gap-0.5 mr-1 pr-1 border-r border-border/40">
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive('bold'))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive('bold') && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className={cn("h-4 w-4", editor.isActive('bold') ? "text-white" : "text-on-surface-variant")} />
          </Button>
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive('italic'))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive('italic') && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className={cn("h-4 w-4", editor.isActive('italic') ? "text-white" : "text-on-surface-variant")} />
          </Button>
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive('underline'))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive('underline') && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className={cn("h-4 w-4", editor.isActive('underline') ? "text-white" : "text-on-surface-variant")} />
          </Button>
        </div>

        {/* Encabezados */}
        <div className="flex gap-0.5 mr-1 pr-1 border-r border-border/40">
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive('heading', { level: 1 }))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive('heading', { level: 1 }) && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 className={cn("h-4 w-4", editor.isActive('heading', { level: 1 }) ? "text-white" : "text-on-surface-variant")} />
          </Button>
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive('heading', { level: 2 }))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive('heading', { level: 2 }) && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className={cn("h-4 w-4", editor.isActive('heading', { level: 2 }) ? "text-white" : "text-on-surface-variant")} />
          </Button>
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive('heading', { level: 3 }))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive('heading', { level: 3 }) && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 className={cn("h-4 w-4", editor.isActive('heading', { level: 3 }) ? "text-white" : "text-on-surface-variant")} />
          </Button>
        </div>

        {/* Alineación */}
        <div className="flex gap-0.5 mr-1 pr-1 border-r border-border/40">
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive({ textAlign: 'left' }))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive({ textAlign: 'left' }) && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <AlignLeft className={cn("h-4 w-4", editor.isActive({ textAlign: 'left' }) ? "text-white" : "text-on-surface-variant")} />
          </Button>
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive({ textAlign: 'center' }))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive({ textAlign: 'center' }) && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <AlignCenter className={cn("h-4 w-4", editor.isActive({ textAlign: 'center' }) ? "text-white" : "text-on-surface-variant")} />
          </Button>
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive({ textAlign: 'right' }))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive({ textAlign: 'right' }) && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <AlignRight className={cn("h-4 w-4", editor.isActive({ textAlign: 'right' }) ? "text-white" : "text-on-surface-variant")} />
          </Button>
        </div>

        {/* Listas y otros */}
        <div className="flex gap-0.5 mr-1 pr-1 border-r border-border/40">
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive('bulletList'))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive('bulletList') && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className={cn("h-4 w-4", editor.isActive('bulletList') ? "text-white" : "text-on-surface-variant")} />
          </Button>
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive('orderedList'))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive('orderedList') && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className={cn("h-4 w-4", editor.isActive('orderedList') ? "text-white" : "text-on-surface-variant")} />
          </Button>
        </div>

        <div className="flex gap-0.5">
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive('link'))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive('link') && "bg-brand text-white hover:bg-brand-strong")}
            onClick={setLink}
          >
            <LinkIcon className={cn("h-4 w-4", editor.isActive('link') ? "text-white" : "text-on-surface-variant")} />
          </Button>
          <Button
            type="button"
            variant={getButtonVariant(editor.isActive('blockquote'))}
            size="icon"
            className={cn("h-8 w-8", editor.isActive('blockquote') && "bg-brand text-white hover:bg-brand-strong")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className={cn("h-4 w-4", editor.isActive('blockquote') ? "text-white" : "text-on-surface-variant")} />
          </Button>
        </div>

        <div className="flex-1" />
        
        <div className="flex gap-0.5 border-l border-border/40 pl-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground/60 hover:text-foreground"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo className="h-4 w-4 text-on-surface-variant" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground/60 hover:text-foreground"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo className="h-4 w-4 text-on-surface-variant" />
          </Button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
