import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Badge } from '@/components/ui/badge'
import { ManualRichText } from '@/components/ManualRichText'

// Функция для генерации метаданных страницы
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({
    config: configPromise,
  })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const post = docs[0]

  if (!post) return { title: 'Пост не найден' }

  return {
    title: post.title,
    description: post.summary || '',
  }
}

// Основной компонент страницы
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({
    config: configPromise,
  })

  const defaultImage = await payload.findByID({
    collection: 'media',
    id: process.env.DEFAULT_IMAGE_ID!,
  })

  // Получаем пост по slug
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    depth: 2, // Увеличиваем глубину, чтобы получить связанные данные
    limit: 1,
  })

  const post = docs[0]

  // Если пост не найден, возвращаем 404
  if (!post) {
    return notFound()
  }

  // Получаем данные об авторе
  const author = post.author ? (typeof post.author === 'object' ? post.author : null) : null

  return (
    <article className="container mx-auto py-8 max-w-4xl">
      {/* Хлебные крошки */}
      <div className="mb-6">
        <nav className="flex space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Главная
          </Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>
      </div>

      {/* Заголовок и мета-информация */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
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
          {author && (
            <>
              <span>•</span>
              <span>Автор: {author.name || author.email}</span>
            </>
          )}
        </div>
      </header>

      {/* Изображение поста */}
      {post.featuredImage && typeof post.featuredImage === 'object' && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.featuredImage.url || defaultImage.url!}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Теги */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag.tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Содержимое поста */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {post.content && (
          <ManualRichText
            content={post.content}
            className="prose prose-lg max-w-none dark:prose-invert"
          />
        )}
      </div>

      {/* Навигация в конце поста */}
      <div className="mt-12 pt-6 border-t">
        <Link href="/" className="text-primary hover:underline">
          ← Вернуться к списку постов
        </Link>
      </div>
    </article>
  )
}
