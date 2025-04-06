'use client'

import React from 'react'
import { CodeBlock } from '@/blocks/Code/Component'

// Определяем типы для узлов Lexical
type LexicalNode = {
  type: string
  tag?: string
  text?: string
  children?: LexicalNode[]
  format?: string | null
  version?: number
  fields?: {
    blockType?: string
    code?: string
    language?: string
    [key: string]: unknown
  }
  blockType?: string
  listType?: string
  url?: string
  newTab?: boolean
  [key: string]: unknown
}

type LexicalContent = {
  root: LexicalNode
  [key: string]: unknown
}

export const ManualRichText: React.FC<{
  content: LexicalContent
  className?: string
}> = ({ content, className }) => {
  if (!content || !content.root) return null

  // Рекурсивная функция для рендеринга узлов
  const renderNode = (node: LexicalNode): React.ReactNode => {
    // Для текстовых узлов
    if (node.text !== undefined) {
      const text = node.text

      if (node.format === 'bold') return <strong>{text}</strong>
      if (node.format === 'italic') return <em>{text}</em>
      if (node.format === 'underline') return <u>{text}</u>
      if (node.format === 'code') return <code>{text}</code>

      return text
    }

    // Для блочных узлов
    switch (node.type) {
      case 'root':
        return (
          <div>
            {node.children?.map((child: LexicalNode, i: number) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </div>
        )

      case 'paragraph':
        return (
          <p>
            {node.children?.map((child: LexicalNode, i: number) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </p>
        )

      case 'heading':
        // Определяем, какой тег заголовка использовать
        const HeadingTag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        return (
          <HeadingTag>
            {node.children?.map((child: LexicalNode, i: number) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </HeadingTag>
        )

      case 'list':
        const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
        return (
          <ListTag>
            {node.children?.map((child: LexicalNode, i: number) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </ListTag>
        )

      case 'listitem':
        return (
          <li>
            {node.children?.map((child: LexicalNode, i: number) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </li>
        )

      case 'block':
        // Обработка блока кода
        if (node.fields?.blockType === 'code') {
          return (
            <CodeBlock
              code={node.fields.code || ''}
              language={node.fields.language}
              blockType="code"
            />
          )
        }

        // Для других блоков
        return (
          <div>
            {node.children?.map((child: LexicalNode, i: number) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </div>
        )

      default:
        // Для любых других узлов просто рендерим их детей
        if (node.children) {
          return node.children.map((child: LexicalNode, i: number) => (
            <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
          ))
        }
        return null
    }
  }

  return <div className={className}>{renderNode(content.root)}</div>
}
