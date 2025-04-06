import React from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Post } from '@/payload-types'
import { PostCard } from './post-card'

// Тип для упрощенного поста
type PostDoc = {
  id: string
  title: string
  slug: string
  summary?: string | null
  publishedDate?: string | null
  featuredImage?:
    | {
        url?: string
        alt?: string
      }
    | undefined
  readingTime?: number | null
  tags?: Array<{ tag?: string | null }> | undefined
  [key: string]: unknown
}

export async function PostsList() {
  const payload = await getPayload({
    config: configPromise,
  })

  const { docs: postDocs } = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
    depth: 1,
  })

  // Преобразуем данные в формат, подходящий для упрощенного PostCard
  const posts = postDocs.map((post: Partial<Post>) => {
    // Извлекаем URL и alt из featuredImage
    let featuredImage = undefined
    if (post.featuredImage) {
      if (typeof post.featuredImage === 'string') {
        // Если это ID, нам нужно будет увеличить depth при запросе или оставить undefined
        featuredImage = undefined
      } else if (typeof post.featuredImage === 'object') {
        featuredImage = {
          url: post.featuredImage.url || '',
          alt: post.featuredImage.alt,
        }
      }
    }

    // Собираем необходимые данные для отображения
    return {
      id: post.id || '',
      title: post.title || '',
      slug: post.slug || '',
      summary: post.summary,
      publishedDate: post.publishedDate,
      featuredImage,
      readingTime: post.readingTime,
      tags: post.tags || undefined,
    } as PostDoc
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
