import { NextRequest, NextResponse } from 'next/server'
import { Lead, LeadFormData, ApiResponse } from '@/types'

// ── DEV MODE: guarda en memoria (sin Firebase Admin) ──────
// En producción reemplazar con firebase-admin + Firestore
const leadsStore: Array<Lead & { id: string }> = []

export async function POST(req: NextRequest) {
  try {
    const body: LeadFormData = await req.json()

    if (!body.nombre?.trim() || !body.telefono?.trim()) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Nombre y teléfono son requeridos' },
        { status: 400 }
      )
    }

    const id = `lead_${Date.now()}`
    const lead: Lead & { id: string } = {
      id,
      nombre:           body.nombre.trim(),
      telefono:         body.telefono.trim(),
      tipo:             body.tipo ?? 'b2c',
      canal_origen:     'landing_form',
      producto_interes: body.producto_interes?.trim() || undefined,
      mensaje:          body.mensaje?.trim() || undefined,
      nombre_negocio:   body.nombre_negocio?.trim() || undefined,
      etapa:            'NUEVO',
      fecha_ingreso:    new Date().toISOString(),
      utm_source:       req.nextUrl.searchParams.get('utm_source') ?? 'directo',
    }

    leadsStore.push(lead)

    // Log en consola para ver leads durante dev
    console.log('\n🪵 NUEVO LEAD:', JSON.stringify(lead, null, 2))
    console.log(`📱 Total leads en memoria: ${leadsStore.length}\n`)

    return NextResponse.json<ApiResponse<{ id: string }>>(
      { success: true, data: { id } },
      { status: 201 }
    )
  } catch (error) {
    console.error('[API /leads]', error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Error interno' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json<ApiResponse<typeof leadsStore>>(
    { success: true, data: leadsStore }
  )
}
