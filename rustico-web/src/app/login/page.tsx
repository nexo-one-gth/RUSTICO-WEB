'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (!auth) {
                setError('Error de configuración: Firebase no está inicializado.')
                return
            }
            await signInWithEmailAndPassword(auth, email, password)
            router.push('/admin')
        } catch (err: any) {
            console.error('Login error:', err)
            setError('Credenciales inválidas. Verificá tu email y contraseña.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#1a1008] flex items-center justify-center p-6">
            <div className="w-full max-width-[400px] border border-rustico-brown bg-rustico-dark p-8 shadow-card">
                <div className="text-center mb-8">
                    <p className="font-body text-rustico-gold text-[10px] tracking-brand uppercase mb-2">Acceso Restringido</p>
                    <h1 className="font-display text-4xl text-rustico-cream tracking-brand-xs uppercase">Rústico Admin</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block font-body text-rustico-sand text-[10px] tracking-brand-sm uppercase mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input !bg-[#1a1008] !text-rustico-cream !border-rustico-brown focus:!border-rustico-gold"
                            placeholder="admin@rustico.com"
                        />
                    </div>

                    <div>
                        <label className="block font-body text-rustico-sand text-[10px] tracking-brand-sm uppercase mb-2">Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input !bg-[#1a1008] !text-rustico-cream !border-rustico-brown focus:!border-rustico-gold"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-xs font-body">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary disabled:opacity-50"
                    >
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-rustico-brown text-center">
                    <p className="font-body text-rustico-sand text-[10px] uppercase">
                        Taller González Catán | Rústico
                    </p>
                </div>
            </div>
        </div>
    )
}
