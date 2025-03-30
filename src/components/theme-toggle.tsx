'use client'

import * as React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Переключить тему">
      <FiSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0 dark:opacity-0" />
      <FiMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all dark:scale-100 dark:opacity-100" />
    </Button>
  )
}
