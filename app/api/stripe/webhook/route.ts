import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase-admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
try {
const body = await req.text()

const signature = req.headers.get('stripe-signature')

if (!signature) {
  return NextResponse.json(
    { error: 'Missing signature' },
    { status: 400 }
  )
}

const event = stripe.webhooks.constructEvent(
  body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET!
)

if (event.type === 'checkout.session.completed') {
  const session: any = event.data.object

  console.log('CUSTOMER:', session.customer)
console.log('SUBSCRIPTION:', session.subscription)

const fullSession = await stripe.checkout.sessions.retrieve(
  session.id,
  {
    expand: ['line_items']
  }
)

console.log(
  JSON.stringify(fullSession.line_items, null, 2)
)

  const email = session.customer_details?.email

const customerId = session.customer || null
const subscriptionId = session.subscription || null

let plan = 'Desconocido'
let precioAlta = 0
let precioMensual = 0

const lineItems: any = fullSession.line_items?.data || []

for (const item of lineItems) {
  const priceId = item.price?.id

  if (
    priceId === 'price_1TglkbLleVRUae4cBHK9JXeH' ||
    priceId === 'price_1TglmzLleVRUae4cuIAnBLF8'
  ) {
    plan = 'Premium'
    precioAlta = 900
    precioMensual = 300
  }

  if (
    priceId === 'price_1TglwgLleVRUae4cfTgkMzGc' ||
    priceId === 'price_1TgmR2LleVRUae4cUz7I2khi'
  ) {
    plan = 'Profesional'
    precioAlta = 320
    precioMensual = 180
  }

  if (
    priceId === 'price_1TgmS9LleVRUae4ceBgRkiTi' ||
    priceId === 'price_1TgmSSLleVRUae4cjDAqXAQ0'
  ) {
    plan = 'Basico'
    precioAlta = 210
    precioMensual = 90
  }
}

const fechaAlta = new Date()

const fechaFinCompromiso = new Date(fechaAlta)

fechaFinCompromiso.setMonth(
  fechaFinCompromiso.getMonth() + 3
)

  if (!email) {
    return NextResponse.json(
      { error: 'No email found' },
      { status: 400 }
    )
  }

  const { data: lastClient } = await supabaseAdmin
    .from('clientes')
    .select('numero_cliente')
    .not('numero_cliente', 'is', null)
    .order('numero_cliente', { ascending: false })
    .limit(1)
    .maybeSingle()

  let nextNumber = 1

  if (lastClient?.numero_cliente) {
    const lastNum = parseInt(
      lastClient.numero_cliente.replace('CL-', '')
    )

    nextNumber = lastNum + 1
  }

  const numeroCliente =
    `CL-${String(nextNumber).padStart(4, '0')}`

  const payload = {
  email,
  numero_cliente: numeroCliente,

  estado: 'activo',
  estado_pago: 'activo',

  contrato_firmado: true,

  plan,

  precio_alta: precioAlta,
  precio_mensual: precioMensual,

  stripe_customer_id: customerId,
  stripe_subscription_id: subscriptionId,

  meses_compromiso: 3,

  fecha_alta: fechaAlta.toISOString(),
  fecha_fin_compromiso: fechaFinCompromiso.toISOString()
}

  const { data: existing } = await supabaseAdmin
    .from('clientes')
    .select('*')
    .eq('email', email)
    .maybeSingle()

  if (existing) {
    await supabaseAdmin
      .from('clientes')
      .update(payload)
      .eq('email', email)
  } else {
    await supabaseAdmin
      .from('clientes')
      .insert([payload])
  }
}
if (event.type === 'invoice.paid') {

  const invoice: any = event.data.object

  const customerId = invoice.customer

  const fechaUltimoPago = new Date()

  const fechaProximoPago = new Date()

  fechaProximoPago.setMonth(
    fechaProximoPago.getMonth() + 1
  )

  await supabaseAdmin
    .from('clientes')
    .update({
      estado_pago: 'activo',
      fecha_ultimo_pago:
        fechaUltimoPago.toISOString(),
      fecha_proximo_pago:
        fechaProximoPago.toISOString()
    })
    .eq('stripe_customer_id', customerId)

}
return NextResponse.json({ received: true })

} catch (error: any) {
console.error(error)

return NextResponse.json(
  { error: error.message },
  { status: 500 }
)

}
}
