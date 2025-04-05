// components/layout/Navbar.tsx
'use client'

import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { useUser } from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import { FiUser, FiLogIn, FiLogOut, FiUserPlus, FiShield } from 'react-icons/fi'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const Navbar: FC = () => {
  const router = useRouter()
  const { user, isLoading, logout } = useUser()

  // Функция для проверки роли админа
  const isAdmin = () => user?.role === 'admin'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      {/* Контейнер с центрированием */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Логотип и название сайта */}
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl">
              YourBlogName
            </Link>
          </div>

          {/* Навигационные ссылки */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Главная
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/posts" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Посты
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    О сайте
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Ссылка на админку для администраторов */}
              {user && isAdmin() && (
                <NavigationMenuItem>
                  <Link href="/admin" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <MdOutlineAdminPanelSettings />
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Правая часть с авторизацией и темой */}
          <div className="flex items-center gap-4">
            {/* Кнопка переключения темы */}
            <ThemeToggle />

            {/* Интерфейс авторизации с иконками */}
            <TooltipProvider>
              {isLoading ? (
                <div>Загрузка...</div>
              ) : user ? (
                <>
                  {/* Кнопка профиля */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant={'outline'} onClick={() => router.push('/profile')}>
                        {isAdmin() ? (
                          <FiShield className="h-5 w-5" />
                        ) : (
                          <FiUser className="h-5 w-5" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Профиль{isAdmin() && ' (Администратор)'}</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Кнопка выхода */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => logout()}>
                        <FiLogOut className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Выйти</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              ) : (
                <>
                  {/* Кнопка входа */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push('/admin/login?redirect=/')}
                      >
                        <FiLogIn className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Войти</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Кнопка регистрации */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push('/register')}
                      >
                        <FiUserPlus className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Зарегистрироваться</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
