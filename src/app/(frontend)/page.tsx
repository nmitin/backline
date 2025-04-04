// import { headers as getHeaders } from 'next/headers.js'
// import Image from 'next/image'
// import { getPayload } from 'payload'
// import React from 'react'
// import { fileURLToPath } from 'url'

// import config from '@/payload.config'
// import './styles.css'
// import { ThemeToggle } from '@/components/theme-toggle'

import React from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { PostsList } from '@/components/posts-list'

export default async function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Мой блог</h1>
        <ThemeToggle />
      </header>

      <main>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Последние публикации</h2>
          <PostsList />
        </section>
      </main>
    </div>
  )
}
