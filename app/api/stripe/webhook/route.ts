const session: any = event.data.object

const email = session.customer_details?.email
const amount = session.amount_total

if (!email) {
  return NextResponse.json({ error: 'No email' }, { status: 400 })
}

// Buscar último cliente para generar número
const { data: lastClient } = await supabaseAdmin
  .from('clientes')
  .select('numero_cliente')
  .order('fecha_alta', { ascending: false })
  .limit(1)
  .maybeSingle()

let nextNumber = 1

if (lastClient?.numero_cliente) {
  const lastNum = parseInt(lastClient.numero_cliente.replace('CL-', ''))
  nextNumber = lastNum + 1
}

const numeroCliente = CL-${String(nextNumber).padStart(4, '0')}

// Insertar o actualizar cliente
const payload = {
  email,
  numero_cliente: numeroCliente,
  estado: 'activo',
  contrato_firmado: true,
  fecha_alta: new Date().toISOString(),
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
