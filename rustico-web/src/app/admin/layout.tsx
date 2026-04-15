'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '▦' },
  { href: '/admin/calculadora', label: 'Calculadora', icon: '◈' },
  { href: '/admin/contenido', label: 'Contenido', icon: '◎' },
  { href: '/admin/ventas', label: 'Ventas', icon: '◆' },
  { href: '/admin/logistica', label: 'Logística', icon: '◉' },
  { href: '/admin/respuestas', label: 'Respuestas ML', icon: '◇' },
  { href: '/admin/metricas', label: 'Métricas', icon: '◈' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1008] flex items-center justify-center">
        <div className="text-rustico-gold font-body text-xs tracking-brand uppercase animate-pulse">
          Verificando sesión...
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#1a1008] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-14'} bg-rustico-dark border-r border-rustico-brown flex flex-col transition-all duration-300 flex-shrink-0 sticky top-0 h-screen`}>
        {/* Logo */}
        <div className="p-4 border-b border-rustico-brown flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <p className="font-display text-rustico-gold text-xl tracking-brand leading-none">RÚSTICO</p>
              <p className="font-body text-rustico-sand text-[9px] tracking-brand-sm uppercase">Admin</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-rustico-sand hover:text-rustico-gold transition-colors text-sm"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(item => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-body font-bold tracking-brand-sm uppercase transition-colors
                  ${active
                    ? 'bg-rustico-brown text-rustico-gold border-l-2 border-rustico-gold'
                    : 'text-rustico-sand hover:text-rustico-cream hover:bg-rustico-brown/40'
                  }`}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-rustico-brown">
          <button
            onClick={() => auth && signOut(auth)}
            className="flex items-center gap-3 text-rustico-sand hover:text-red-400 text-xs font-body tracking-brand-sm uppercase transition-colors w-full"
          >
            <span className="text-base flex-shrink-0">✕</span>
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
