// hooks/useUser.ts
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface PayloadUser {
  id: string
  email?: string
  name?: string
  role?: 'admin' | 'user'
}

export const useUser = () => {
  const [user, setUser] = useState<PayloadUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()

  const fetchUser = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/users/me')

      if (!response.ok) {
        setUser(null)
        return
      }

      const userData = await response.json()
      // Проверка, является ли ответ действительным пользовательским объектом
      if (userData && (userData.user || userData.id)) {
        setUser(userData.user || userData)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
      setIsInitialized(true)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Ошибка входа')
      }

      const result = await response.json()
      setUser(result.user)
      return result
    } catch (error) {
      console.error('Ошибка входа:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setUser(null)
        router.push('/')
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isLoading,
    isInitialized, // Новое свойство, указывающее, была ли выполнена начальная проверка
    login,
    logout,
  }
}
