import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

// Упрощенный тип с только необходимыми полями
type SimplifiedPostCardProps = {
  post: {
    id: string
    title: string
    slug: string
    summary?: string | null
    // Делаем publishedDate опциональным
    publishedDate?: string | null
    // Упрощаем featuredImage
    featuredImage?: {
      url?: string
      alt?: string
    }
    // Опциональные метаданные
    readingTime?: number | null
    // Упрощаем массив тегов
    tags?: Array<{ tag?: string | null }>
  }
}

export function PostCard({ post }: SimplifiedPostCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {post.featuredImage?.url && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || ''}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          {post.publishedDate && (
            <time dateTime={post.publishedDate}>
              {format(new Date(post.publishedDate), 'dd MMMM yyyy', { locale: ru })}
            </time>
          )}
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime} мин. чтения</span>
            </>
          )}
        </div>
        <Link href={`/posts/${post.slug}`} className="hover:underline">
          <h3 className="text-xl font-semibold">{post.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        {post.summary && <p className="text-muted-foreground">{post.summary}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        {post.tags?.map((tag, index) => (
          <Badge key={index} variant="secondary">
            {tag.tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}
