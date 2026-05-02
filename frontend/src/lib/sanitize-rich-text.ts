const ALLOWED_TAGS = new Set([
  'a',
  'blockquote',
  'br',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'li',
  'ol',
  'p',
  'strong',
  'ul',
  'u',
  'img',
  'div',
  'span',
])

const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:'])

const isSafeHref = (value: string) => {
  if (value.startsWith('/') || value.startsWith('#')) {
    return true
  }

  try {
    return SAFE_PROTOCOLS.has(new URL(value).protocol)
  } catch {
    return false
  }
}

const sanitizeNode = (node: Node, document: Document): Node | null => {
  if (node.nodeType === Node.TEXT_NODE) {
    return document.createTextNode(node.textContent ?? '')
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null
  }

  const element = node as Element
  const tagName = element.tagName.toLowerCase()

  if (tagName === 'script') {
    return null
  }

  if (!ALLOWED_TAGS.has(tagName)) {
    const fragment = document.createDocumentFragment()

    for (const child of Array.from(element.childNodes)) {
      const sanitizedChild = sanitizeNode(child, document)
      if (sanitizedChild) {
        fragment.appendChild(sanitizedChild)
      }
    }

    return fragment
  }

  const cleanElement = document.createElement(tagName)

  // Atributos permitidos globales
  const style = element.getAttribute('style')
  if (style && /text-align\s*:\s*(left|center|right|justify)/i.test(style)) {
    cleanElement.setAttribute('style', style)
  }

  if (tagName === 'a') {
    const href = element.getAttribute('href')
    if (href && isSafeHref(href)) {
      cleanElement.setAttribute('href', href)
    }

    if (element.getAttribute('target') === '_blank') {
      cleanElement.setAttribute('target', '_blank')
      cleanElement.setAttribute('rel', 'noopener noreferrer')
    }
  }

  if (tagName === 'img') {
    const src = element.getAttribute('src')
    if (src && (isSafeHref(src) || src.startsWith('/storage/'))) {
      cleanElement.setAttribute('src', src)
    }
    const alt = element.getAttribute('alt')
    if (alt) cleanElement.setAttribute('alt', alt)
    cleanElement.setAttribute('class', 'max-w-full h-auto rounded-lg')
  }

  for (const child of Array.from(element.childNodes)) {
    const sanitizedChild = sanitizeNode(child, document)
    if (sanitizedChild) {
      cleanElement.appendChild(sanitizedChild)
    }
  }

  return cleanElement
}

export const sanitizeRichText = (value?: string | null) => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return ''
  }

  if (typeof DOMParser === 'undefined') {
    return value
  }

  const parser = new DOMParser()
  const source = parser.parseFromString(value, 'text/html')
  const cleanDocument = document.implementation.createHTMLDocument('')
  const container = cleanDocument.createElement('div')

  for (const node of Array.from(source.body.childNodes)) {
    const sanitizedNode = sanitizeNode(node, cleanDocument)
    if (sanitizedNode) {
      container.appendChild(sanitizedNode)
    }
  }

  return container.innerHTML
}
