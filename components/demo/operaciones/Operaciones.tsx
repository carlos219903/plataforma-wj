"use client";

import { useState } from "react";

type Trabajo = {
  id: string;
  titulo: string;
  cliente: string;
  responsable: string;
  estado: "Pendiente" | "En proceso" | "Bloqueado" | "Completado";
  prioridad: "Alta" | "Media" | "Baja";
  progreso: number;
  fecha: string;
  tareas: string;
};

const trabajos: Trabajo[] = [
  {
    id: "TR-1052",
    titulo: "Instalación sistema eléctrico",
    cliente: "Construcciones Rivera S.L.",
    responsable: "Daniel García",
    estado: "En proceso",
    prioridad: "Alta",
    progreso: 68,
    fecha: "23 Sep",
    tareas: "8 / 12",
  },
  {
    id: "TR-1051",
    titulo: "Mantenimiento preventivo",
    cliente: "Clínica Dental Norte",
    responsable: "Miguel Torres",
    estado: "Pendiente",
    prioridad: "Media",
    progreso: 15,
    fecha: "24 Sep",
    tareas: "1 / 7",
  },
  {
    id: "TR-1050",
    titulo: "Revisión instalación",
    cliente: "Restaurante Central",
    responsable: "Daniel García",
    estado: "Bloqueado",
    prioridad: "Alta",
    progreso: 42,
    fecha: "23 Sep",
    tareas: "4 / 9",
  },
  {
    id: "TR-1049",
    titulo: "Actualización infraestructura",
    cliente: "Hotel Mirador",
    responsable: "Javier López",
    estado: "En proceso",
    prioridad: "Media",
    progreso: 81,
    fecha: "25 Sep",
    tareas: "13 / 16",
  },
  {
    id: "TR-1048",
    titulo: "Instalación completada",
    cliente: "Servicios MG",
    responsable: "Miguel Torres",
    estado: "Completado",
    prioridad: "Baja",
    progreso: 100,
    fecha: "22 Sep",
    tareas: "10 / 10",
  },
];

export default function Operaciones() {
  const [vista, setVista] = useState("Trabajos");
  const [trabajo, setTrabajo] = useState<Trabajo | null>(null);

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-orange-600">
            OPERACIONES · CONTROL OPERATIVO
          </p>
          <h1 className="mt-1 text-3xl font-bold">Operaciones y tareas</h1>
          <p className="mt-2 text-sm text-slate-500">
            Organiza trabajos, equipos, tareas, incidencias y procesos desde un único lugar.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
          + Crear trabajo
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {[
          "Trabajos",
          "Tareas",
          "Calendario",
          "Procesos",
          "Incidencias",
          "Planificación",
        ].map((item) => (
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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["38", "Trabajos activos", "12 para hoy"],
          ["74", "Tareas abiertas", "18 prioritarias"],
          ["91%", "Cumplimiento", "+5,2%"],
          ["4", "Incidencias", "2 importantes"],
          ["8", "Equipos activos", "18 empleados"],
        ].map(([valor, titulo, detalle]) => (
          <div
            key={titulo}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-2xl font-bold">{valor}</div>
            <div className="mt-1 text-sm font-medium">{titulo}</div>
            <div className="mt-2 text-xs text-slate-400">{detalle}</div>
          </div>
        ))}
      </section>

      {vista === "Trabajos" && (
        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="font-semibold">Órdenes de trabajo</h2>
              <p className="text-xs text-slate-400">
                Seguimiento operativo en tiempo real
              </p>
            </div>

            <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              8 equipos trabajando
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-5 py-3">Trabajo</th>
                  <th className="px-5 py-3">Responsable</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3">Prioridad</th>
                  <th className="px-5 py-3">Progreso</th>
                  <th className="px-5 py-3">Fecha</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {trabajos.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold">{item.titulo}</div>
                      <div className="mt-1 text-xs text-slate-400">
                        {item.id} · {item.cliente}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm">{item.responsable}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.estado === "Completado"
                            ? "bg-emerald-50 text-emerald-700"
                            : item.estado === "Bloqueado"
                            ? "bg-red-50 text-red-700"
                            : item.estado === "En proceso"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.estado}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-xs font-semibold ${
                          item.prioridad === "Alta"
                            ? "text-red-600"
                            : item.prioridad === "Media"
                            ? "text-amber-600"
                            : "text-slate-500"
                        }`}
                      >
                        {item.prioridad}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${item.progreso}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold">
                          {item.progreso}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm">{item.fecha}</td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => setTrabajo(item)}
                        className="text-sm font-semibold text-blue-600"
                      >
                        Abrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {vista !== "Trabajos" && (
        <section className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{vista}</h2>
            <p className="mt-1 text-sm text-slate-400">
              Gestión y seguimiento de {vista.toLowerCase()}
            </p>

            <div className="mt-5 space-y-3">
              {[
                ["Instalación Rivera", "Daniel García", "Alta", "Hoy · 14:30"],
                ["Revisión Clínica Norte", "Miguel Torres", "Media", "Hoy · 16:00"],
                ["Pedido proveedor", "Marta Ruiz", "Media", "Mañana · 09:00"],
                ["Informe de trabajo", "Javier López", "Baja", "Mañana · 12:30"],
                ["Seguimiento incidencia", "Daniel García", "Alta", "Mañana · 15:00"],
              ].map(([titulo, responsable, prioridad, fecha]) => (
                <div
                  key={titulo}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <div className="text-sm font-semibold">{titulo}</div>
                    <div className="mt-1 text-xs text-slate-400">
                      {responsable} · {fecha}
                    </div>
                  </div>

                  <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold">
                    {prioridad}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Capacidad operativa</h3>

            <div className="mt-5 space-y-5">
              {[
                ["Equipo técnico", 86],
                ["Comerciales", 62],
                ["Administración", 74],
                ["Logística", 91],
              ].map(([nombre, porcentaje]) => (
                <div key={nombre as string}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{nombre}</span>
                    <strong>{porcentaje}%</strong>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-orange-50 p-4">
              <div className="text-xs font-semibold text-orange-700">
                ALERTA OPERATIVA
              </div>
              <p className="mt-1 text-sm font-medium">
                Logística está al 91% de capacidad.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                GroupW&J recomienda revisar la distribución de trabajos.
              </p>
            </div>
          </div>
        </section>
      )}

      {trabajo && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/30"
          onClick={() => setTrabajo(null)}
        >
          <div
            className="h-full w-full max-w-xl overflow-y-auto bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-orange-600">
                  {trabajo.id} · ORDEN DE TRABAJO
                </div>
                <h2 className="mt-1 text-2xl font-bold">{trabajo.titulo}</h2>
                <p className="mt-1 text-sm text-slate-500">{trabajo.cliente}</p>
              </div>

              <button
                onClick={() => setTrabajo(null)}
                className="h-10 rounded-lg bg-slate-100 px-3"
              >
                ✕
              </button>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {[
                ["Responsable", trabajo.responsable],
                ["Estado", trabajo.estado],
                ["Prioridad", trabajo.prioridad],
                ["Fecha prevista", trabajo.fecha],
              ].map(([titulo, valor]) => (
                <div key={titulo} className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-400">{titulo}</div>
                  <div className="mt-1 font-semibold">{valor}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm">
                <span>Progreso general</span>
                <strong>{trabajo.progreso}%</strong>
              </div>

              <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${trabajo.progreso}%` }}
                />
              </div>
            </div>

            <div className="mt-7">
              <h3 className="font-semibold">Tareas del trabajo</h3>

              {[
                ["Preparar materiales", true],
                ["Confirmar cita con cliente", true],
                ["Desplazamiento del equipo", true],
                ["Realizar instalación", false],
                ["Pruebas y verificación", false],
                ["Firma del cliente", false],
                ["Generar informe final", false],
              ].map(([titulo, completada]) => (
                <div
                  key={titulo as string}
                  className="mt-3 flex items-center gap-3 rounded-xl border border-slate-100 p-3"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      completada
                        ? "bg-emerald-500 text-white"
                        : "border border-slate-300"
                    }`}
                  >
                    {completada ? "✓" : ""}
                  </span>
                  <span
                    className={`text-sm ${
                      completada ? "text-slate-400 line-through" : ""
                    }`}
                  >
                    {titulo}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-slate-200 py-3 text-sm font-semibold">
                Añadir incidencia
              </button>
              <button className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white">
                Actualizar trabajo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
