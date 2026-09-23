"use client";

import { useState } from "react";

const tickets = [
  { id:"#GW-1048", asunto:"Añadir nuevo campo al CRM", tipo:"Modificación", estado:"En proceso", prioridad:"Media", fecha:"Hoy · 11:24" },
  { id:"#GW-1041", asunto:"Configurar nueva cuenta de email", tipo:"Integración", estado:"Esperando cliente", prioridad:"Baja", fecha:"Ayer · 17:42" },
  { id:"#GW-1036", asunto:"Automatización para presupuestos", tipo:"Automatización", estado:"Completado", prioridad:"Media", fecha:"21 Sep · 13:18" },
  { id:"#GW-1029", asunto:"Problema con permisos de empleado", tipo:"Incidencia", estado:"Completado", prioridad:"Alta", fecha:"19 Sep · 09:35" },
];

export default function Soporte() {
  const [vista, setVista] = useState("Centro de ayuda");
  const [nuevo, setNuevo] = useState(false);
  const [chat, setChat] = useState(false);
  const [mensaje, setMensaje] = useState("");

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            SOPORTE · GROUPW&J
          </p>
          <h1 className="mt-1 text-3xl font-bold">Soporte GroupW&J</h1>
          <p className="mt-2 text-sm text-slate-500">
            Solicita ayuda, modificaciones, nuevas funciones o asistencia técnica desde tu propio sistema.
          </p>
        </div>

        <button
          onClick={() => setNuevo(true)}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          + Nueva solicitud
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["Centro de ayuda","Mis solicitudes","Guías"].map(item => (
          <button
            key={item}
            onClick={() => setVista(item)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold ${
              vista === item
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {vista === "Centro de ayuda" && (
        <>
          <section className="grid gap-5 lg:grid-cols-3">
            <button
              onClick={() => setChat(true)}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm hover:shadow-md"
            >
              <div className="text-3xl">💬</div>
              <h3 className="mt-5 font-semibold">Hablar con soporte</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Contacta con GroupW&J directamente desde tu panel.
              </p>
              <div className="mt-5 text-sm font-semibold text-blue-600">
                Abrir conversación →
              </div>
            </button>

            <button
              onClick={() => setNuevo(true)}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm hover:shadow-md"
            >
              <div className="text-3xl">🛠️</div>
              <h3 className="mt-5 font-semibold">Solicitar modificación</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Pide cambios, nuevas funciones o adaptaciones para tu empresa.
              </p>
              <div className="mt-5 text-sm font-semibold text-blue-600">
                Crear solicitud →
              </div>
            </button>

            <button
              onClick={() => setNuevo(true)}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm hover:shadow-md"
            >
              <div className="text-3xl">⚠️</div>
              <h3 className="mt-5 font-semibold">Reportar incidencia</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Informa de cualquier problema técnico o comportamiento inesperado.
              </p>
              <div className="mt-5 text-sm font-semibold text-blue-600">
                Reportar problema →
              </div>
            </button>
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold">Solicitudes recientes</h2>
                  <p className="text-xs text-slate-400">
                    Seguimiento del soporte y modificaciones
                  </p>
                </div>
                <button
                  onClick={() => setVista("Mis solicitudes")}
                  className="text-sm font-semibold text-blue-600"
                >
                  Ver todas
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {tickets.slice(0,3).map(t => (
                  <div
                    key={t.id}
                    className="rounded-xl border border-slate-100 p-4"
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-blue-600">
                            {t.id}
                          </span>
                          <span className="text-xs text-slate-400">
                            {t.tipo}
                          </span>
                        </div>
                        <div className="mt-2 text-sm font-semibold">
                          {t.asunto}
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          {t.fecha}
                        </div>
                      </div>

                      <span className={`h-fit rounded-full px-3 py-1 text-xs font-semibold ${
                        t.estado === "Completado"
                          ? "bg-emerald-50 text-emerald-700"
                          : t.estado === "En proceso"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        {t.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <div className="text-xs font-semibold text-blue-300">
                GROUPW&J
              </div>
              <h2 className="mt-2 text-xl font-bold">
                Tu sistema puede evolucionar contigo
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Si tu empresa necesita un nuevo proceso, módulo, automatización o adaptación, puedes solicitarlo desde aquí.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-4">
                  <div className="text-2xl font-bold">&lt; 24h</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Respuesta objetivo
                  </div>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Solicitudes
                  </div>
                </div>
              </div>

              <button
                onClick={() => setChat(true)}
                className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-semibold text-slate-900"
              >
                Contactar con GroupW&J
              </button>
            </div>
          </section>
        </>
      )}

      {vista === "Mis solicitudes" && (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold">Todas las solicitudes</h2>
          </div>

          {tickets.map(t => (
            <div
              key={t.id}
              className="grid gap-4 border-b border-slate-100 p-5 md:grid-cols-[110px_1fr_150px_120px]"
            >
              <div className="text-sm font-semibold text-blue-600">
                {t.id}
              </div>
              <div>
                <div className="font-semibold">{t.asunto}</div>
                <div className="mt-1 text-xs text-slate-400">
                  {t.tipo} · {t.fecha}
                </div>
              </div>
              <div className="text-sm">
                Prioridad {t.prioridad}
              </div>
              <div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  t.estado === "Completado"
                    ? "bg-emerald-50 text-emerald-700"
                    : t.estado === "En proceso"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-amber-50 text-amber-700"
                }`}>
                  {t.estado}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {vista === "Guías" && (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Primeros pasos","Configura tu empresa, usuarios y permisos."],
            ["Clientes y CRM","Aprende a gestionar leads, clientes y oportunidades."],
            ["Empleados","Fichajes, horarios, tareas, vacaciones y permisos."],
            ["Marketing","Crea y controla tus campañas desde el sistema."],
            ["Automatizaciones","Automatiza tareas y procesos repetitivos."],
            ["Reportes","Consulta y genera informes de tu empresa."],
          ].map(([titulo,descripcion]) => (
            <div
              key={titulo}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="text-xs font-semibold text-blue-600">
                GUÍA
              </div>
              <h3 className="mt-2 font-semibold">{titulo}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {descripcion}
              </p>
              <button className="mt-5 text-sm font-semibold text-blue-600">
                Ver guía →
              </button>
            </div>
          ))}
        </section>
      )}

      {nuevo && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/30"
          onClick={() => setNuevo(false)}
        >
          <div
            className="h-full w-full max-w-xl overflow-y-auto bg-white p-7 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-blue-600">
                  SOPORTE GROUPW&J
                </div>
                <h2 className="mt-1 text-2xl font-bold">
                  Nueva solicitud
                </h2>
              </div>

              <button
                onClick={() => setNuevo(false)}
                className="h-10 rounded-lg bg-slate-100 px-3"
              >
                ✕
              </button>
            </div>

            <label className="mt-7 block text-sm font-semibold">
              Tipo de solicitud
            </label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option>Necesito ayuda</option>
              <option>Reportar incidencia</option>
              <option>Solicitar modificación</option>
              <option>Nueva funcionalidad</option>
              <option>Nueva automatización</option>
              <option>Integración externa</option>
            </select>

            <label className="mt-5 block text-sm font-semibold">
              Asunto
            </label>
            <input
              placeholder="¿Qué necesitas?"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />

            <label className="mt-5 block text-sm font-semibold">
              Explícanos la solicitud
            </label>
            <textarea
              rows={6}
              placeholder="Describe qué quieres cambiar, añadir o solucionar..."
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />

            <button className="mt-4 w-full rounded-xl border-2 border-dashed border-slate-200 py-4 text-sm font-semibold text-slate-500">
              + Adjuntar captura o documento
            </button>

            <button
              onClick={() => setNuevo(false)}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white"
            >
              Enviar solicitud
            </button>
          </div>
        </div>
      )}

      {chat && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end bg-slate-950/20 p-4"
          onClick={() => setChat(false)}
        >
          <div
            className="flex h-[620px] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-slate-950 p-5 text-white">
              <div>
                <div className="font-semibold">Soporte GroupW&J</div>
                <div className="mt-1 text-xs text-emerald-300">
                  ● Equipo disponible
                </div>
              </div>
              <button onClick={() => setChat(false)}>✕</button>
            </div>

            <div className="flex-1 bg-slate-50 p-5">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-4 shadow-sm">
                <p className="text-sm">
                  Hola 👋 Soy del equipo de GroupW&J. ¿En qué podemos ayudarte con tu sistema?
                </p>
                <div className="mt-2 text-[10px] text-slate-400">
                  16:48
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 p-4">
              <div className="flex gap-2">
                <input
                  value={mensaje}
                  onChange={e => setMensaje(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                />
                <button
                  onClick={() => setMensaje("")}
                  className="rounded-xl bg-blue-600 px-4 font-semibold text-white"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
