"use client";

import { useState } from "react";

type Empleado = {
  nombre: string;
  puesto: string;
  estado: "Trabajando" | "Descanso" | "Ausente" | "Vacaciones";
  entrada: string;
  salida: string;
  horas: string;
  tareas: number;
  rendimiento: number;
  salario: string;
};

const empleados: Empleado[] = [
  { nombre:"Laura Gómez", puesto:"Responsable comercial", estado:"Trabajando", entrada:"08:02", salida:"17:00", horas:"7h 18m", tareas:6, rendimiento:94, salario:"2.150 €" },
  { nombre:"Daniel García", puesto:"Técnico", estado:"Trabajando", entrada:"07:48", salida:"16:00", horas:"7h 32m", tareas:4, rendimiento:91, salario:"1.950 €" },
  { nombre:"Marta Ruiz", puesto:"Administración", estado:"Descanso", entrada:"09:01", salida:"18:00", horas:"5h 54m", tareas:8, rendimiento:97, salario:"2.000 €" },
  { nombre:"Carlos Díaz", puesto:"Comercial", estado:"Trabajando", entrada:"08:34", salida:"17:30", horas:"6h 46m", tareas:5, rendimiento:88, salario:"1.850 €" },
  { nombre:"Ana Martín", puesto:"Marketing", estado:"Vacaciones", entrada:"—", salida:"—", horas:"—", tareas:0, rendimiento:93, salario:"2.100 €" },
];

export default function Empleados() {
  const [seleccionado, setSeleccionado] = useState<Empleado | null>(null);
  const [tab, setTab] = useState("Equipo");

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-violet-600">RR. HH. · Gestión laboral</p>
          <h1 className="mt-1 text-3xl font-bold">Empleados</h1>
          <p className="mt-2 text-sm text-slate-500">
            Personal, fichajes, horarios, rendimiento y gestión laboral desde un único panel.
          </p>
        </div>
        <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
          + Nuevo empleado
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["Equipo","Fichajes","Horarios","Tareas","Vacaciones y bajas","Nóminas","Solicitudes"].map(x => (
          <button
            key={x}
            onClick={() => setTab(x)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold ${
              tab === x ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600"
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["24","Empleados","22 activos"],
          ["18","Trabajando ahora","75% plantilla"],
          ["186h","Horas esta semana","+4,2%"],
          ["91%","Rendimiento medio","+3,8%"],
          ["3","Solicitudes","Pendientes"],
        ].map(([v,l,d]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{v}</div>
            <div className="mt-1 text-sm font-medium">{l}</div>
            <div className="mt-2 text-xs text-slate-400">{d}</div>
          </div>
        ))}
      </section>

      {tab === "Equipo" && (
        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold">Plantilla</h2>
            <p className="text-xs text-slate-400">Estado actual del equipo</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-5 py-3">Empleado</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3">Entrada</th>
                  <th className="px-5 py-3">Horas hoy</th>
                  <th className="px-5 py-3">Tareas</th>
                  <th className="px-5 py-3">Rendimiento</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {empleados.map(e => (
                  <tr key={e.nombre} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="font-semibold">{e.nombre}</div>
                      <div className="text-xs text-slate-400">{e.puesto}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        e.estado === "Trabajando" ? "bg-emerald-50 text-emerald-700" :
                        e.estado === "Vacaciones" ? "bg-blue-50 text-blue-700" :
                        "bg-amber-50 text-amber-700"
                      }`}>
                        {e.estado}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm">{e.entrada}</td>
                    <td className="px-5 py-4 text-sm">{e.horas}</td>
                    <td className="px-5 py-4 text-sm">{e.tareas}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full bg-emerald-500" style={{width:`${e.rendimiento}%`}} />
                        </div>
                        <span className="text-xs font-semibold">{e.rendimiento}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => setSeleccionado(e)} className="text-sm font-semibold text-blue-600">
                        Ver ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab !== "Equipo" && (
        <section className="mt-5 grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{tab}</h2>
            <p className="mt-1 text-sm text-slate-400">Información actual de la plantilla</p>

            <div className="mt-5 space-y-3">
              {[
                ["Laura Gómez","Aprobado / al día","Hoy · 08:02"],
                ["Daniel García","Pendiente de revisión","Hoy · 07:48"],
                ["Marta Ruiz","Aprobado / al día","Hoy · 09:01"],
                ["Carlos Díaz","Nueva solicitud","Ayer · 18:24"],
              ].map(([n,s,t]) => (
                <div key={n} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                  <div>
                    <div className="text-sm font-semibold">{n}</div>
                    <div className="text-xs text-slate-400">{t}</div>
                  </div>
                  <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Resumen</h3>
            <div className="mt-5 space-y-4">
              {[
                ["Horas registradas","186 h"],
                ["Horas extra","12,5 h"],
                ["Vacaciones pendientes","38 días"],
                ["Bajas activas","1"],
                ["Cambios de turno","2"],
              ].map(([l,v]) => (
                <div key={l} className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                  <span className="text-slate-500">{l}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {seleccionado && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/30" onClick={() => setSeleccionado(null)}>
          <div className="h-full w-full max-w-xl overflow-y-auto bg-white p-7 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-violet-600">FICHA DEL EMPLEADO</div>
                <h2 className="mt-1 text-2xl font-bold">{seleccionado.nombre}</h2>
                <p className="text-sm text-slate-500">{seleccionado.puesto}</p>
              </div>
              <button onClick={() => setSeleccionado(null)} className="h-10 rounded-lg bg-slate-100 px-3">✕</button>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {[
                ["Estado",seleccionado.estado],
                ["Salario",seleccionado.salario],
                ["Horario",`${seleccionado.entrada} — ${seleccionado.salida}`],
                ["Rendimiento",`${seleccionado.rendimiento}%`],
              ].map(([l,v]) => (
                <div key={l} className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-400">{l}</div>
                  <div className="mt-1 font-bold">{v}</div>
                </div>
              ))}
            </div>

            <h3 className="mt-7 font-semibold">Gestión del empleado</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {["Horario y turnos","Tareas asignadas","Objetivos y metas","Vacaciones y bajas","Nóminas","Documentos","Reuniones","Incidencias","Peticiones","Permisos"].map(x => (
                <button key={x} className="rounded-xl border border-slate-200 p-3 text-left text-sm font-medium hover:bg-slate-50">
                  {x}
                </button>
              ))}
            </div>

            <div className="mt-7 rounded-2xl bg-slate-900 p-5 text-white">
              <div className="text-xs text-slate-400">RESUMEN DEL MES</div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <div><strong>162 h</strong><p className="text-xs text-slate-400">Trabajadas</p></div>
                <div><strong>42</strong><p className="text-xs text-slate-400">Tareas</p></div>
                <div><strong>{seleccionado.rendimiento}%</strong><p className="text-xs text-slate-400">Rendimiento</p></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
