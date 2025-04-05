// contexts/UserContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  // другие поля пользователя
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Запрос к Payload CMS API для получения текущего пользователя
        const response = await fetch('/api/users/me')

        if (!response.ok) {
          setUser(null)
          return
        }

        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error('Ошибка при получении пользователя:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
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

      const userData = await response.json()
      setUser(userData.user)
    } catch (error) {
      console.error('Ошибка входа:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST' })
      setUser(null)
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
