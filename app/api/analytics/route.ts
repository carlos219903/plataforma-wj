import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type AnalyticsBody = {
  visitorId?: string;
  sessionId?: string;
  event?: string;
  page?: string;
  element?: string;
  destination?: string;
  source?: string;
  campaign?: string;
  reference?: string;
  device?: string;
  metadata?: Record<string, unknown>;
};

const allowedEvents = new Set([
  "page_view",
  "click",
  "demo_view",
  "demo_module",
  "form_view",
  "form_submit",
  "checkout_start",
  "purchase",
]);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyticsBody;

    const visitorId = body.visitorId?.trim();
    const sessionId = body.sessionId?.trim();
    const event = body.event?.trim();

    if (!visitorId || !sessionId || !event) {
      return NextResponse.json(
        { error: "visitorId, sessionId y event son obligatorios" },
        { status: 400 }
      );
    }

    if (!allowedEvents.has(event)) {
      return NextResponse.json(
        { error: "Evento no permitido" },
        { status: 400 }
      );
    }

    // =========================================================
    // 1. VISITANTE
    // =========================================================

    const { data: existingVisitor, error: visitorLookupError } =
      await supabaseAdmin
        .from("visitantes")
        .select("id, total_eventos, total_sesiones")
        .eq("visitor_id", visitorId)
        .maybeSingle();

    if (visitorLookupError) throw visitorLookupError;

    let visitanteId: string;

    if (!existingVisitor) {
      const { data: createdVisitor, error: visitorCreateError } =
        await supabaseAdmin
          .from("visitantes")
          .insert({
            visitor_id: visitorId,
            origen: body.source || null,
            campana: body.campaign || null,
            referencia: body.reference || null,
            primera_pagina: body.page || null,
            ultima_pagina: body.page || null,
            dispositivo: body.device || null,
            total_eventos: 1,
            total_sesiones: 1,
            vio_demo: event === "demo_view",
            llego_formulario: event === "form_view",
            envio_formulario: event === "form_submit",
            inicio_pago: event === "checkout_start",
            convertido: event === "purchase",
          })
          .select("id")
          .single();

      if (visitorCreateError) throw visitorCreateError;

      visitanteId = createdVisitor.id;
    } else {
      visitanteId = existingVisitor.id;

      const visitorUpdates: Record<string, unknown> = {
        ultima_visita: new Date().toISOString(),
        ultima_pagina: body.page || null,
        total_eventos: (existingVisitor.total_eventos || 0) + 1,
      };

      if (event === "demo_view") visitorUpdates.vio_demo = true;
      if (event === "form_view") visitorUpdates.llego_formulario = true;
      if (event === "form_submit") visitorUpdates.envio_formulario = true;
      if (event === "checkout_start") visitorUpdates.inicio_pago = true;
      if (event === "purchase") visitorUpdates.convertido = true;

      const { error: visitorUpdateError } = await supabaseAdmin
        .from("visitantes")
        .update(visitorUpdates)
        .eq("id", visitanteId);

      if (visitorUpdateError) throw visitorUpdateError;
    }

    // =========================================================
    // 2. SESIÓN
    // =========================================================

    const { data: existingSession, error: sessionLookupError } =
      await supabaseAdmin
        .from("sesiones_web")
        .select("id, total_eventos")
        .eq("session_id", sessionId)
        .maybeSingle();

    if (sessionLookupError) throw sessionLookupError;

    if (!existingSession) {
      const { error: sessionCreateError } = await supabaseAdmin
        .from("sesiones_web")
        .insert({
          session_id: sessionId,
          visitante_id: visitanteId,
          origen: body.source || null,
          campana: body.campaign || null,
          referencia: body.reference || null,
          primera_pagina: body.page || null,
          ultima_pagina: body.page || null,
          dispositivo: body.device || null,
          total_eventos: 1,
          vio_demo: event === "demo_view",
          llego_formulario: event === "form_view",
          envio_formulario: event === "form_submit",
          inicio_pago: event === "checkout_start",
          convertido: event === "purchase",
        });

      if (sessionCreateError) throw sessionCreateError;

      // Solo incrementamos sesiones cuando realmente aparece
      // un session_id que todavía no existía.
      if (existingVisitor) {
        const { error: sessionCountError } = await supabaseAdmin
          .from("visitantes")
          .update({
            total_sesiones: (existingVisitor.total_sesiones || 0) + 1,
          })
          .eq("id", visitanteId);

        if (sessionCountError) throw sessionCountError;
      }
    } else {
      const sessionUpdates: Record<string, unknown> = {
        ultima_actividad: new Date().toISOString(),
        ultima_pagina: body.page || null,
        total_eventos: (existingSession.total_eventos || 0) + 1,
      };

      if (event === "demo_view") sessionUpdates.vio_demo = true;
      if (event === "form_view") sessionUpdates.llego_formulario = true;
      if (event === "form_submit") sessionUpdates.envio_formulario = true;
      if (event === "checkout_start") sessionUpdates.inicio_pago = true;
      if (event === "purchase") sessionUpdates.convertido = true;

      const { error: sessionUpdateError } = await supabaseAdmin
        .from("sesiones_web")
        .update(sessionUpdates)
        .eq("id", existingSession.id);

      if (sessionUpdateError) throw sessionUpdateError;
    }

    // =========================================================
    // 3. EVENTO INDIVIDUAL
    // =========================================================

    const { error: eventError } = await supabaseAdmin
      .from("eventos_web")
      .insert({
        visitante_id: visitanteId,
        session_id: sessionId,
        evento: event,
        pagina: body.page || null,
        elemento: body.element || null,
        destino: body.destination || null,
        metadata: body.metadata || {},
      });

    if (eventError) throw eventError;

    return NextResponse.json({
      ok: true,
      visitanteId,
      sessionId,
    });
  } catch (error) {
    console.error("Analytics error:", error);

    return NextResponse.json(
      { error: "No se pudo registrar el evento" },
      { status: 500 }
    );
  }
}
