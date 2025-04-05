import React from 'react'
import { PostsList } from '@/components/posts-list'

export default async function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <header className="flex justify-between items-center mb-8"></header>
      <main>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Последние публикации</h2>
          <PostsList />
        </section>
      </main>
    </div>
  )
}
