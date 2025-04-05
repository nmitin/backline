// components/layout/MobileMenu.tsx
import { FC, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useRouter } from 'next/navigation'

const MobileMenu: FC = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-8 pt-10">
        <nav className="flex flex-col gap-6">
          <Link href="/" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Главная
          </Link>
          <Link href="/posts" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Посты
          </Link>
          <Link href="/about" className="text-lg font-medium" onClick={() => setOpen(false)}>
            О сайте
          </Link>
        </nav>
        <div className="flex flex-col gap-4 mt-auto">
          <Button
            onClick={() => {
              router.push('/login')
              setOpen(false)
            }}
          >
            Вход
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              router.push('/register')
              setOpen(false)
            }}
          >
            Регистрация
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
