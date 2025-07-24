'use client'

import { LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { Menu } from './Menu'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { deleteToken } from '@/services/auth/delete-token'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  function handleSignOut() {
    deleteToken()
    setTimeout(() => {
      router.push('/login')
    }, 100)
  }

  if (pathname === '/login') {
    return null
  }

  return (
    <header className='flex bg-sidebar p-2 justify-between items-center border-b'>
      <Menu />
      <div className='flex gap-2'>
        <ThemeToggle />
        <Button
          className='text-foreground hover:text-red-500 gap-2'
          variant='outline'
          onClick={handleSignOut}
        >
          <LogOut size={16} /> Desconectar
        </Button>
      </div>
    </header>
  )
}
