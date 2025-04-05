import React from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PostCard } from './post-card'

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
  const posts = postDocs.map((post: any) => {
    // Извлекаем URL и alt из featuredImage
    let featuredImage = undefined
    if (post.featuredImage) {
      if (typeof post.featuredImage === 'string') {
        // Если это ID, нам нужно будет увеличить depth при запросе или оставить undefined
        featuredImage = undefined
      } else {
        featuredImage = {
          url: post.featuredImage.url,
          alt: post.featuredImage.alt,
        }
      }
    }

    // Собираем необходимые данные для отображения
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      publishedDate: post.publishedDate,
      featuredImage,
      readingTime: post.readingTime,
      tags: post.tags,
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
