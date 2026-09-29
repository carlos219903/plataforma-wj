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
    // =========================
    // 1. AUTENTICACIÓN
    // =========================

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

    // =========================
    // 2. SESIONES
    // =========================

    const { data: sesiones, error: sesionesError } = await supabaseAdmin
      .from("sesiones_web")
      .select(`
        id,
        session_id,
        visitante_id,
        origen,
        campana,
        referencia,
        primera_pagina,
        ultima_pagina,
        dispositivo,
        inicio,
        ultima_actividad,
        total_eventos,
        vio_demo,
        llego_formulario,
        envio_formulario,
        inicio_pago,
        convertido,
        visitantes (
          numero_visitante,
          visitor_id
        )
      `)
      .order("inicio", { ascending: false })
      .limit(100);

    if (sesionesError) throw sesionesError;

    const sesionesLista = sesiones ?? [];

    // =========================
    // 3. EVENTOS
    // =========================

    const sessionIds = sesionesLista
      .map((sesion) => sesion.session_id)
      .filter((id): id is string => Boolean(id));

    let eventos: Array<{
      id: number;
      visitante_id: string;
      session_id: string | null;
      evento: string;
      pagina: string | null;
      elemento: string | null;
      destino: string | null;
      metadata: Record<string, unknown> | null;
      created_at: string;
    }> = [];

    if (sessionIds.length > 0) {
      const { data: eventosData, error: eventosError } = await supabaseAdmin
        .from("eventos_web")
        .select(`
          id,
          visitante_id,
          session_id,
          evento,
          pagina,
          elemento,
          destino,
          metadata,
          created_at
        `)
        .in("session_id", sessionIds)
        .order("created_at", { ascending: true });

      if (eventosError) throw eventosError;

      eventos = eventosData ?? [];
    }

    // =========================
    // 4. RECORRIDO POR SESIÓN
    // =========================

    const sesionesConEventos = sesionesLista.map((sesion) => {
      const eventosSesion = eventos.filter(
        (evento) => evento.session_id === sesion.session_id
      );

      const primerEvento =
        eventosSesion.length > 0
          ? new Date(eventosSesion[0].created_at).getTime()
          : new Date(sesion.inicio).getTime();

      const recorrido = eventosSesion.map((evento, index) => {
        const actual = new Date(evento.created_at).getTime();

        const anterior =
          index > 0
            ? new Date(eventosSesion[index - 1].created_at).getTime()
            : actual;

        const segundosDesdeEntrada =
          Math.round(((actual - primerEvento) / 1000) * 10) / 10;

        const segundosDesdeAnterior =
          index === 0
            ? null
            : Math.round(((actual - anterior) / 1000) * 10) / 10;

        return {
          ...evento,
          segundos_desde_entrada: segundosDesdeEntrada,
          segundos_desde_anterior: segundosDesdeAnterior,
        };
      });

      const duracionSegundos =
        eventosSesion.length > 1
          ? Math.round(
              ((
                new Date(
                  eventosSesion[eventosSesion.length - 1].created_at
                ).getTime() -
                primerEvento
              ) /
                1000) *
                10
            ) / 10
          : 0;

      return {
        ...sesion,
        duracion_segundos: duracionSegundos,
        recorrido,
      };
    });

    // =========================
    // 5. RESPUESTA
    // =========================

    return NextResponse.json({
      ok: true,
      sesiones: sesionesConEventos,
    });
  } catch (error) {
    console.error("Admin analytics error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "No se pudieron cargar las estadísticas",
      },
      { status: 500 }
    );
  }
}
