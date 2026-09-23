"use client";

import { useState } from "react";

const eventos = [
  { hora: "08:30", titulo: "Reunión equipo comercial", tipo: "Reunión", responsable: "Laura + equipo", color: "blue" },
  { hora: "09:45", titulo: "Visita · Construcciones Rivera", tipo: "Trabajo", responsable: "Daniel García", color: "emerald" },
  { hora: "11:00", titulo: "Demo · Clínica Nova", tipo: "Cita", responsable: "Laura Martín", color: "violet" },
  { hora: "13:00", titulo: "Entrega pedido PO-2048", tipo: "Proveedor", responsable: "Almacén", color: "amber" },
  { hora: "15:30", titulo: "Seguimiento presupuesto PR-1098", tipo: "Comercial", responsable: "Carlos", color: "blue" },
  { hora: "17:00", titulo: "Revisión financiera semanal", tipo: "Finanzas", responsable: "Administración", color: "rose" },
];

export default function Calendario() {
  const [vista, setVista] = useState("Semana");
  const [nuevo, setNuevo] = useState(false);

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">AGENDA EMPRESARIAL</p>
          <h1 className="mt-1 text-3xl font-bold">Calendario y agenda</h1>
          <p className="mt-2 text-sm text-slate-500">
            Citas, trabajos, reuniones, empleados y vencimientos en una sola agenda.
          </p>
        </div>

        <button
          onClick={() => setNuevo(true)}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
        >
          + Nuevo evento
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["14", "Eventos hoy", "6 pendientes"],
          ["8", "Citas comerciales", "Esta semana"],
          ["21", "Trabajos programados", "Próximos 7 días"],
          ["4", "Reuniones", "Esta semana"],
        ].map(([value, title, detail]) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{value}</div>
            <div className="mt-1 text-sm font-semibold">{title}</div>
            <div className="mt-2 text-xs text-slate-400">{detail}</div>
          </div>
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">23 – 27 septiembre 2026</h2>
              <p className="mt-1 text-xs text-slate-400">Agenda compartida de la empresa</p>
            </div>

            <div className="flex rounded-xl bg-slate-100 p-1">
              {["Día", "Semana", "Mes"].map((item) => (
                <button
                  key={item}
                  onClick={() => setVista(item)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                    vista === item ? "bg-white shadow-sm" : "text-slate-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-5 border-b border-slate-100 text-center">
            {[
              ["LUN", "23"],
              ["MAR", "24"],
              ["MIÉ", "25"],
              ["JUE", "26"],
              ["VIE", "27"],
            ].map(([dia, numero], i) => (
              <div
                key={dia}
                className={`border-r border-slate-100 p-4 last:border-r-0 ${
                  i === 2 ? "bg-blue-50" : ""
                }`}
              >
                <div className="text-[10px] font-bold text-slate-400">{dia}</div>
                <div className={`mt-1 text-lg font-bold ${i === 2 ? "text-blue-600" : ""}`}>
                  {numero}
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto p-5">
            <div className="min-w-[620px] space-y-3">
              {eventos.map((evento) => (
                <div
                  key={evento.hora + evento.titulo}
                  className="grid grid-cols-[70px_1fr_120px] items-center gap-3 rounded-xl border border-slate-100 p-4"
                >
                  <div className="text-sm font-bold">{evento.hora}</div>

                  <div>
                    <div className="text-sm font-semibold">{evento.titulo}</div>
                    <div className="mt-1 text-xs text-slate-400">{evento.responsable}</div>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-center text-xs font-semibold text-slate-600">
                    {evento.tipo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl bg-slate-950 p-6 text-white">
            <div className="text-xs font-semibold text-blue-300">PRÓXIMO EVENTO</div>
            <div className="mt-3 text-2xl font-bold">09:45</div>
            <div className="mt-2 font-semibold">Construcciones Rivera</div>
            <div className="mt-1 text-sm text-slate-400">Visita técnica · Daniel García</div>

            <button className="mt-5 w-full rounded-xl bg-white py-3 text-sm font-semibold text-slate-900">
              Abrir trabajo
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Tipos de evento</h3>

            <div className="mt-4 space-y-3 text-sm">
              {[
                ["●", "Citas comerciales", "8"],
                ["●", "Trabajos", "21"],
                ["●", "Reuniones", "4"],
                ["●", "Entregas", "6"],
                ["●", "Vencimientos", "9"],
              ].map(([dot, label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-slate-500">{dot} {label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
            <div className="text-xs font-bold text-violet-700">AUTOMATIZACIÓN</div>
            <h3 className="mt-2 font-semibold">Agenda conectada</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Las citas, trabajos y reuniones pueden generar recordatorios y tareas automáticamente.
            </p>
          </div>
        </div>
      </section>

      {nuevo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() => setNuevo(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600">AGENDA</p>
                <h2 className="mt-1 text-xl font-bold">Nuevo evento</h2>
              </div>
              <button onClick={() => setNuevo(false)}>✕</button>
            </div>

            <label className="mt-6 block text-sm font-semibold">Tipo de evento</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option>Cita comercial</option>
              <option>Trabajo</option>
              <option>Reunión</option>
              <option>Entrega</option>
              <option>Vencimiento</option>
              <option>Evento interno</option>
            </select>

            <label className="mt-5 block text-sm font-semibold">Título</label>
            <input
              placeholder="Nombre del evento..."
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold">Fecha</label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">Hora</label>
                <input
                  type="time"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                />
              </div>
            </div>

            <label className="mt-5 block text-sm font-semibold">Responsable</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option>Laura Martín</option>
              <option>Daniel García</option>
              <option>Marta López</option>
              <option>Carlos Rodríguez</option>
            </select>

            <button
              onClick={() => setNuevo(false)}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white"
            >
              Crear evento demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
