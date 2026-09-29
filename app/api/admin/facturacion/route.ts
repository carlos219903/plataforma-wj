import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

function createSessionToken(password: string) {
  return crypto
    .createHmac("sha256", password)
    .update("groupwj-admin-session-v1")
    .digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) return false;

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

export async function GET(request: NextRequest) {
  try {
    const adminPassword = process.env.ADMIN_ANALYTICS_PASSWORD;
    const receivedToken = request.cookies.get("gw_admin_session")?.value;

    if (!adminPassword || !receivedToken) {
      return NextResponse.json(
        { ok: false, error: "No autorizado" },
        { status: 401 }
      );
    }

    const expectedToken = createSessionToken(adminPassword);

    if (!safeEqual(receivedToken, expectedToken)) {
      return NextResponse.json(
        { ok: false, error: "No autorizado" },
        { status: 401 }
      );
    }

    const [
      { data: clientes, error: clientesError },
      { data: leads, error: leadsError },
    ] = await Promise.all([
      supabaseAdmin
        .from("clientes")
        .select(`
          id,
          numero_cliente,
          empresa,
          sector,
          telefono,
          email,
          web,
          documento,
          tipo_documento,
          estado,
          plan,
          precio,
          precio_alta,
          precio_mensual,
          contrato_firmado,
          estado_pago,
          fecha_alta,
          fecha_baja,
          motivo_baja,
          fecha_ultimo_pago,
          fecha_proximo_pago,
          fecha_fin_compromiso,
          penalizacion,
          meses_compromiso,
          entrega
        `)
        .order("fecha_alta", { ascending: false }),

      supabaseAdmin
        .from("leads")
        .select(`
          id,
          name,
          email,
          phone,
          message,
          web_origen,
          cliente_id,
          codigo_afiliado,
          created_at
        `)
        .order("created_at", { ascending: false })
        .limit(200),
    ]);

    if (clientesError) throw clientesError;
    if (leadsError) throw leadsError;

    const listaClientes = clientes ?? [];
    const listaLeads = leads ?? [];

    const activos = listaClientes.filter(
      (cliente) => cliente.estado === "activo"
    ).length;

    const impagados = listaClientes.filter(
      (cliente) => cliente.estado_pago === "impagado"
    ).length;

    const cancelados = listaClientes.filter(
      (cliente) => cliente.estado === "cancelado"
    ).length;

    const mrr = listaClientes
      .filter((cliente) => cliente.estado === "activo")
      .reduce(
        (total, cliente) =>
          total + Number(cliente.precio_mensual || 0),
        0
      );

    const ingresosAlta = listaClientes.reduce(
      (total, cliente) =>
        total + Number(cliente.precio_alta || 0),
      0
    );

    return NextResponse.json({
      ok: true,

      resumen: {
        totalClientes: listaClientes.length,
        activos,
        impagados,
        cancelados,
        mrr,
        ingresosAlta,
        leads: listaLeads.length,
      },

      clientes: listaClientes,
      leads: listaLeads,
    });
  } catch (error) {
    console.error("Admin facturacion error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "No se pudieron cargar los datos de facturación",
      },
      { status: 500 }
    );
  }
}
