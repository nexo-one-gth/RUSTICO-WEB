'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const PASSWORD = 'rustico2026'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '▦' },
  { href: '/admin/calculadora', label: 'Calculadora', icon: '◈' },
  { href: '/admin/contenido', label: 'Contenido', icon: '◎' },
  { href: '/admin/ventas', label: 'Ventas', icon: '◆' },
  { href: '/admin/logistica', label: 'Logística', icon: '◉' },
  { href: '/admin/respuestas', label: 'Respuestas ML', icon: '◇' },
  { href: '/admin/metricas', label: 'Métricas', icon: '◈' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const stored = localStorage.getItem('rustico_admin_auth')
    if (stored === 'true') setAuthed(true)
  }, [])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (input === PASSWORD) {
      localStorage.setItem('rustico_admin_auth', 'true')
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
      setInput('')
    }
  }

  function handleLogout() {
    localStorage.removeItem('rustico_admin_auth')
    setAuthed(false)
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-rustico-dark flex items-center justify-center p-4">
        <div className="bg-rustico-text w-full max-w-sm p-8 border border-rustico-brown">
          <div className="text-center mb-8">
            <p className="font-display text-4xl text-rustico-gold tracking-brand">RÚSTICO</p>
            <p className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase mt-2">
              Panel Operativo
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase block mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="w-full bg-rustico-dark border border-rustico-brown text-rustico-cream font-body text-sm px-4 py-3 outline-none focus:border-rustico-gold transition-colors"
                placeholder="Ingresá la contraseña"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-xs mt-2 font-body">Contraseña incorrecta</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-rustico-gold text-rustico-dark font-body font-bold text-xs tracking-brand-sm uppercase py-3 hover:bg-rustico-cream transition-colors"
            >
              Ingresar
            </button>
          </form>
          <p className="text-rustico-sand text-xs text-center mt-6 font-body">
            Contraseña por defecto: <span className="text-rustico-gold">rustico2026</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1008] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-14'} bg-rustico-dark border-r border-rustico-brown flex flex-col transition-all duration-300 flex-shrink-0`}>
        {/* Logo */}
        <div className="p-4 border-b border-rustico-brown flex items-center gap-3">
          {sidebarOpen && (
            <div>
              <p className="font-display text-rustico-gold text-xl tracking-brand leading-none">RÚSTICO</p>
              <p className="font-body text-rustico-sand text-[9px] tracking-brand-sm uppercase">Panel Operativo</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-rustico-sand hover:text-rustico-gold transition-colors text-sm"
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
            onClick={handleLogout}
            className="flex items-center gap-3 text-rustico-sand hover:text-red-400 text-xs font-body tracking-brand-sm uppercase transition-colors w-full"
          >
            <span>✕</span>
            {sidebarOpen && <span>Salir</span>}
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
