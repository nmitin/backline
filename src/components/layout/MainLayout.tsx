// components/layout/MainLayout.tsx
'use client'

import { FC, ReactNode } from 'react'
import Navbar from './Navbar'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {' '}
        {/* Добавлен контейнер с центрированием */}
        <main className="flex-1 py-6">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
