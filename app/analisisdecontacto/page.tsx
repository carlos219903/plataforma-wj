"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type EventoWeb = {
  id: number;
  visitante_id: string;
  session_id: string | null;
  evento: string;
  pagina: string | null;
  elemento: string | null;
  destino: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  segundos_desde_entrada: number;
  segundos_desde_anterior: number | null;
};

type Sesion = {
  id: string;
  session_id: string;
  visitante_id: string;
  origen: string | null;
  campana: string | null;
  referencia: string | null;
  primera_pagina: string | null;
  ultima_pagina: string | null;
  dispositivo: string | null;
  inicio: string;
  ultima_actividad: string;
  total_eventos: number;
  vio_demo: boolean;
  llego_formulario: boolean;
  envio_formulario: boolean;
  inicio_pago: boolean;
  convertido: boolean;
  duracion_segundos: number;
  recorrido: EventoWeb[];
  visitantes: {
    numero_visitante: number;
    visitor_id: string;
  } | null;
};

function duracion(inicio: string, fin: string) {
  const segundos = Math.max(
    0,
    Math.round(
      (new Date(fin).getTime() - new Date(inicio).getTime()) / 1000
    )
  );

  if (segundos < 60) return `${segundos}s`;

  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;

  return `${minutos}m ${resto}s`;
}

function fecha(value: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

function nombreEvento(evento: EventoWeb) {
  if (evento.evento === "page_view") return "Entró en la web";
  if (evento.evento === "demo_view") return "Entró en la demo";
  if (evento.evento === "form_view") return "Entró en el formulario";
  if (evento.evento === "form_submit") return "Envió el formulario";
  if (evento.evento === "checkout_start") return "Inició el pago";
  if (evento.evento === "purchase") return "Compra completada";

  if (evento.evento === "demo_module") {
    return evento.elemento
      ? `Abrió ${evento.elemento}`
      : "Abrió un módulo de la demo";
  }

  if (evento.evento === "click") {
    return evento.elemento
      ? `Hizo clic en ${evento.elemento}`
      : "Hizo clic";
  }

  return evento.elemento || evento.evento;
}

function tiempoEvento(segundos: number) {
  if (segundos < 60) {
    return `${segundos.toFixed(1)} s`;
  }

  const minutos = Math.floor(segundos / 60);
  const resto = Math.round((segundos % 60) * 10) / 10;

  return `${minutos}m ${resto.toFixed(1)}s`;
}

function Estado({
  activo,
  texto,
}: {
  activo: boolean;
  texto: string;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        activo
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-400"
      }`}
    >
      {activo ? "✓ " : "— "}
      {texto}
    </span>
  );
}

export default function AdminAnalyticsPage() {
  const router = useRouter();

  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sesionSeleccionada, setSesionSeleccionada] =
    useState<Sesion | null>(null);

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/analytics", {
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("No se pudieron cargar los datos");
      }

      const data = await response.json();

      setSesiones(data.sesiones || []);
    } catch {
      setError("No se pudieron cargar las estadísticas.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const resumen = useMemo(() => {
    const visitantes = new Set(
      sesiones.map((s) => s.visitantes?.numero_visitante).filter(Boolean)
    );

    return {
      visitantes: visitantes.size,
      sesiones: sesiones.length,
      demo: sesiones.filter((s) => s.vio_demo).length,
      formularios: sesiones.filter((s) => s.llego_formulario).length,
      conversiones: sesiones.filter((s) => s.convertido).length,
    };
  }, [sesiones]);

  async function cerrarSesion() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.replace("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              GroupW&J
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Análisis de contacto
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              Contactos
            </button>

            <button
              onClick={() => router.push("/analisisdefacturacion")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50"
            >
              Ventas
            </button>

            <button
              onClick={cargar}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50"
            >
              Actualizar
            </button>

            <button
              onClick={cerrarSesion}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 md:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Visitantes y conversiones
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Seguimiento de llamadas, emails, demo, formularios y ventas.
          </p>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            ["Visitantes", resumen.visitantes],
            ["Sesiones", resumen.sesiones],
            ["Vieron demo", resumen.demo],
            ["Formulario", resumen.formularios],
            ["Conversiones", resumen.conversiones],
          ].map(([titulo, valor]) => (
            <div
              key={titulo}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">
                {titulo}
              </p>

              <p className="mt-2 text-3xl font-bold">
                {valor}
              </p>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-5">
            <h3 className="font-bold">Actividad reciente</h3>

            <p className="mt-1 text-sm text-slate-500">
              Últimas sesiones registradas en GroupW&J.
            </p>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Cargando estadísticas...
            </div>
          ) : error ? (
            <div className="p-10 text-center text-red-600">
              {error}
            </div>
          ) : sesiones.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              Todavía no hay sesiones registradas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1150px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Visitante</th>
                    <th className="px-5 py-4">Referencia</th>
                    <th className="px-5 py-4">Origen</th>
                    <th className="px-5 py-4">Entrada</th>
                    <th className="px-5 py-4">Duración</th>
                    <th className="px-5 py-4">Eventos</th>
                    <th className="px-5 py-4">Embudo</th>
                    <th className="px-5 py-4">Dispositivo</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {sesiones.map((sesion) => (
                    <tr
                      key={sesion.id}
                      onClick={() => setSesionSeleccionada(sesion)}
                      className="cursor-pointer transition hover:bg-blue-50/60"
                      title="Ver recorrido completo"
                    >
                      <td className="px-5 py-5">
                        <div className="font-bold text-blue-700">
                          #{sesion.visitantes?.numero_visitante ?? "?"}
                        </div>

                        <div className="mt-1 max-w-[130px] truncate text-xs text-slate-400">
                          {sesion.session_id}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="font-semibold">
                          {sesion.referencia || "Sin referencia"}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          {sesion.campana || "Sin campaña"}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700">
                          {sesion.origen || "directo"}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <div className="text-sm font-medium">
                          {fecha(sesion.inicio)}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          {sesion.primera_pagina || "/"}
                        </div>
                      </td>

                      <td className="px-5 py-5 font-semibold">
                        {duracion(
                          sesion.inicio,
                          sesion.ultima_actividad
                        )}
                      </td>

                      <td className="px-5 py-5">
                        <span className="text-lg font-bold">
                          {sesion.total_eventos}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex max-w-[300px] flex-wrap gap-1.5">
                          <Estado
                            activo={sesion.vio_demo}
                            texto="Demo"
                          />

                          <Estado
                            activo={sesion.llego_formulario}
                            texto="Formulario"
                          />

                          <Estado
                            activo={sesion.inicio_pago}
                            texto="Pago"
                          />

                          <Estado
                            activo={sesion.convertido}
                            texto="Cliente"
                          />
                        </div>
                      </td>

                      <td className="px-5 py-5 capitalize text-slate-600">
                        {sesion.dispositivo || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {sesionSeleccionada && (
          <div
            className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-[2px]"
            onClick={() => setSesionSeleccionada(null)}
          >
            <aside
              className="h-full w-full max-w-2xl overflow-y-auto bg-[#f8fafc] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                      Recorrido comercial
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                      Visitante #{sesionSeleccionada.visitantes?.numero_visitante ?? "?"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {sesionSeleccionada.referencia || "Sin referencia"}
                    </p>
                  </div>

                  <button
                    onClick={() => setSesionSeleccionada(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-slate-500 transition hover:bg-slate-100"
                    aria-label="Cerrar"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Origen
                    </p>
                    <p className="mt-1 font-bold text-slate-900">
                      {sesionSeleccionada.origen || "directo"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Campaña
                    </p>
                    <p className="mt-1 font-bold text-slate-900">
                      {sesionSeleccionada.campana || "Sin campaña"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Dispositivo
                    </p>
                    <p className="mt-1 font-bold capitalize text-slate-900">
                      {sesionSeleccionada.dispositivo || "Desconocido"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Duración
                    </p>
                    <p className="mt-1 font-bold text-slate-900">
                      {tiempoEvento(sesionSeleccionada.duracion_segundos)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Entrada
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {fecha(sesionSeleccionada.inicio)}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {sesionSeleccionada.primera_pagina || "/"}
                    {" → "}
                    {sesionSeleccionada.ultima_pagina || "/"}
                  </p>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Embudo
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Estado
                      activo={sesionSeleccionada.vio_demo}
                      texto="Demo"
                    />
                    <Estado
                      activo={sesionSeleccionada.llego_formulario}
                      texto="Formulario"
                    />
                    <Estado
                      activo={sesionSeleccionada.envio_formulario}
                      texto="Formulario enviado"
                    />
                    <Estado
                      activo={sesionSeleccionada.inicio_pago}
                      texto="Pago"
                    />
                    <Estado
                      activo={sesionSeleccionada.convertido}
                      texto="Cliente"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Recorrido completo
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {sesionSeleccionada.recorrido.length} acciones registradas
                      </p>
                    </div>

                    <span className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                      {tiempoEvento(sesionSeleccionada.duracion_segundos)}
                    </span>
                  </div>

                  {sesionSeleccionada.recorrido.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                      Esta sesión todavía no tiene eventos registrados.
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="absolute bottom-5 left-[19px] top-5 w-px bg-slate-200" />

                      <div className="space-y-4">
                        {sesionSeleccionada.recorrido.map((evento, index) => (
                          <div
                            key={evento.id}
                            className="relative flex gap-4"
                          >
                            <div
                              className={`relative z-[1] mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-[#f8fafc] text-xs font-black ${
                                evento.evento === "purchase"
                                  ? "bg-emerald-500 text-white"
                                  : evento.evento === "form_submit"
                                  ? "bg-violet-500 text-white"
                                  : evento.evento === "checkout_start"
                                  ? "bg-amber-500 text-white"
                                  : evento.evento === "demo_module"
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-800 text-white"
                              }`}
                            >
                              {index + 1}
                            </div>

                            <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <p className="font-bold text-slate-900">
                                    {nombreEvento(evento)}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-400">
                                    {evento.pagina || "Página desconocida"}
                                  </p>
                                </div>

                                <div className="text-right">
                                  <p className="font-mono text-sm font-bold text-blue-700">
                                    +{tiempoEvento(evento.segundos_desde_entrada)}
                                  </p>

                                  {evento.segundos_desde_anterior !== null && (
                                    <p className="mt-1 text-xs text-slate-400">
                                      {tiempoEvento(evento.segundos_desde_anterior)} desde anterior
                                    </p>
                                  )}
                                </div>
                              </div>

                              {evento.destino && (
                                <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                                  Destino: {evento.destino}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 border-t border-slate-200 pt-5">
                  <p className="break-all text-xs text-slate-400">
                    Sesión: {sesionSeleccionada.session_id}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
