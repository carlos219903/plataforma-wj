"use client";

import { useState } from "react";

type Automatizacion = {
  nombre: string;
  descripcion: string;
  disparador: string;
  acciones: string[];
  ejecuciones: number;
  estado: boolean;
};

const iniciales: Automatizacion[] = [
  {
    nombre: "Nuevo lead → seguimiento comercial",
    descripcion: "Gestiona automáticamente cada nuevo contacto recibido.",
    disparador: "Nuevo lead recibido",
    acciones: [
      "Asignar comercial",
      "Enviar email de bienvenida",
      "Crear tarea de llamada",
      "Avisar si no se contacta en 2 horas",
    ],
    ejecuciones: 184,
    estado: true,
  },
  {
    nombre: "Presupuesto sin respuesta",
    descripcion: "Recupera oportunidades comerciales que se han quedado paradas.",
    disparador: "Presupuesto sin respuesta durante 3 días",
    acciones: [
      "Enviar recordatorio",
      "Crear tarea de seguimiento",
      "Notificar al responsable",
    ],
    ejecuciones: 42,
    estado: true,
  },
  {
    nombre: "Stock bajo",
    descripcion: "Detecta productos que necesitan reposición.",
    disparador: "Stock inferior al mínimo",
    acciones: [
      "Avisar a compras",
      "Crear propuesta de pedido",
      "Notificar al responsable",
    ],
    ejecuciones: 18,
    estado: true,
  },
  {
    nombre: "Empleado no ficha",
    descripcion: "Detecta incidencias en el control horario.",
    disparador: "Empleado sin fichaje 15 min después de su entrada",
    acciones: [
      "Notificar al empleado",
      "Avisar al supervisor",
      "Registrar incidencia",
    ],
    ejecuciones: 7,
    estado: false,
  },
];

export default function Automatizaciones() {
  const [automatizaciones, setAutomatizaciones] = useState(iniciales);
  const [vista, setVista] = useState("Automatizaciones");
  const [crear, setCrear] = useState(false);

  const cambiarEstado = (index: number) => {
    setAutomatizaciones(prev =>
      prev.map((a, i) =>
        i === index ? { ...a, estado: !a.estado } : a
      )
    );
  };

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-violet-600">
            AUTOMATIZACIÓN · WORKFLOWS
          </p>
          <h1 className="mt-1 text-3xl font-bold">Automatizaciones</h1>
          <p className="mt-2 text-sm text-slate-500">
            Haz que tareas repetitivas se ejecuten automáticamente según lo que ocurre en tu empresa.
          </p>
        </div>

        <button
          onClick={() => setCrear(true)}
          className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white"
        >
          + Crear automatización
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["Automatizaciones","Actividad","Plantillas"].map(item => (
          <button
            key={item}
            onClick={() => setVista(item)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              vista === item
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["11","Automatizaciones","9 activas"],
          ["1.284","Ejecuciones","Este mes"],
          ["96 h","Tiempo ahorrado","Estimación mensual"],
          ["98,7%","Completadas","16 incidencias"],
        ].map(([v,l,d]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{v}</div>
            <div className="mt-1 text-sm font-medium">{l}</div>
            <div className="mt-2 text-xs text-slate-400">{d}</div>
          </div>
        ))}
      </section>

      {vista === "Automatizaciones" && (
        <section className="mt-5 space-y-4">
          {automatizaciones.map((a,index) => (
            <div
              key={a.nombre}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
                <div className="max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${a.estado ? "bg-emerald-500" : "bg-slate-300"}`} />
                    <h3 className="font-semibold">{a.nombre}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{a.descripcion}</p>
                  <div className="mt-3 text-xs text-slate-400">
                    {a.ejecuciones} ejecuciones este mes
                  </div>
                </div>

                <div className="flex flex-1 flex-wrap items-center gap-2">
                  <div className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-2">
                    <div className="text-[10px] font-bold text-blue-500">CUANDO</div>
                    <div className="mt-1 text-xs font-semibold">{a.disparador}</div>
                  </div>

                  <div className="text-slate-300">→</div>

                  {a.acciones.map((accion,i) => (
                    <div key={accion} className="flex items-center gap-2">
                      <div className="rounded-xl border border-violet-100 bg-violet-50 px-3 py-2">
                        <div className="text-[10px] font-bold text-violet-500">
                          ACCIÓN {i + 1}
                        </div>
                        <div className="mt-1 text-xs font-semibold">{accion}</div>
                      </div>
                      {i < a.acciones.length - 1 && (
                        <div className="text-slate-300">→</div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => cambiarEstado(index)}
                  className={`relative h-7 w-12 rounded-full transition ${
                    a.estado ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                      a.estado ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {vista === "Actividad" && (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Actividad automática reciente</h2>

          <div className="mt-5 space-y-3">
            {[
              ["16:42","Nuevo lead asignado a Laura Gómez","Completado"],
              ["16:42","Email de bienvenida enviado a Patricia León","Completado"],
              ["16:43","Tarea de seguimiento creada","Completado"],
              ["15:20","Recordatorio de presupuesto enviado","Completado"],
              ["14:08","Alerta de stock enviada a Compras","Completado"],
              ["12:16","Fichaje tardío registrado","Revisión"],
            ].map(([hora,accion,estado]) => (
              <div key={hora + accion} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                <div>
                  <div className="text-sm font-semibold">{accion}</div>
                  <div className="mt-1 text-xs text-slate-400">{hora}</div>
                </div>

                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  estado === "Completado"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}>
                  {estado}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {vista === "Plantillas" && (
        <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Recuperar leads","Si un lead no responde → seguimiento automático"],
            ["Cliente nuevo","Crear cliente → bienvenida + tareas + documentación"],
            ["Factura vencida","Factura vencida → recordatorio + aviso a administración"],
            ["Nueva venta","Venta → actualizar inventario + finanzas + CRM"],
            ["Vacaciones","Solicitud → supervisor → aprobación → calendario"],
            ["Campaña terminada","Campaña → analizar resultados → generar reporte"],
          ].map(([titulo,desc]) => (
            <div key={titulo} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold text-violet-600">PLANTILLA</div>
              <h3 className="mt-2 font-semibold">{titulo}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
              <button className="mt-5 text-sm font-semibold text-blue-600">
                Usar plantilla →
              </button>
            </div>
          ))}
        </section>
      )}

      {crear && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/30"
          onClick={() => setCrear(false)}
        >
          <div
            className="h-full w-full max-w-2xl overflow-y-auto bg-white p-7 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-violet-600">
                  NUEVO WORKFLOW
                </div>
                <h2 className="mt-1 text-2xl font-bold">
                  Crear automatización
                </h2>
              </div>

              <button
                onClick={() => setCrear(false)}
                className="h-10 rounded-lg bg-slate-100 px-3"
              >
                ✕
              </button>
            </div>

            <div className="mt-7">
              <label className="text-sm font-semibold">Nombre</label>
              <input
                placeholder="Ej. Seguimiento automático de leads"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              />
            </div>

            <div className="mt-6">
              <div className="text-xs font-bold text-blue-600">1 · CUANDO OCURRA</div>
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                <option>Se recibe un nuevo lead</option>
                <option>Se crea un cliente</option>
                <option>Una factura vence</option>
                <option>El stock baja del mínimo</option>
                <option>Se recibe una solicitud</option>
                <option>Se completa una venta</option>
              </select>
            </div>

            <div className="my-5 ml-6 h-8 border-l-2 border-dashed border-slate-200" />

            <div>
              <div className="text-xs font-bold text-violet-600">2 · HACER ESTO</div>
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                <option>Enviar WhatsApp</option>
                <option>Enviar email</option>
                <option>Crear tarea</option>
                <option>Asignar empleado</option>
                <option>Crear notificación</option>
                <option>Actualizar CRM</option>
                <option>Crear incidencia</option>
              </select>
            </div>

            <div className="my-5 ml-6 h-8 border-l-2 border-dashed border-slate-200" />

            <button className="w-full rounded-xl border-2 border-dashed border-slate-200 py-4 text-sm font-semibold text-slate-500">
              + Añadir otra acción
            </button>

            <div className="mt-7 rounded-xl bg-violet-50 p-4">
              <div className="text-xs font-semibold text-violet-700">
                ✦ GROUPW&J INTELLIGENCE
              </div>
              <p className="mt-2 text-sm text-slate-600">
                También podrás describir en lenguaje natural qué quieres automatizar para generar el flujo automáticamente.
              </p>
            </div>

            <button
              onClick={() => setCrear(false)}
              className="mt-7 w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white"
            >
              Guardar automatización
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
