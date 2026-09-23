"use client";

import { useState } from "react";

export default function PanelEmpleado() {
  const [tab, setTab] = useState("Inicio");
  const [fichado, setFichado] = useState(false);
  const [solicitud, setSolicitud] = useState(false);

  const tabs = [
    "Inicio",
    "Mi jornada",
    "Mis tareas",
    "Horario",
    "Vacaciones",
    "Nóminas",
    "Documentos",
  ];

  return (
    <div>
      <div className="mb-4 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 text-xs text-violet-800">
        <strong>Vista empleado:</strong> este usuario solo puede acceder a la información y funciones autorizadas por la empresa.
      </div>

      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-violet-600">
            PORTAL DEL EMPLEADO
          </p>
          <h1 className="mt-1 text-3xl font-bold">Hola, Daniel</h1>
          <p className="mt-2 text-sm text-slate-500">
            Consulta tu jornada, tareas, horario, documentos y solicitudes.
          </p>
        </div>

        <button
          onClick={() => setFichado(!fichado)}
          className={`rounded-xl px-6 py-3 text-sm font-semibold text-white ${
            fichado ? "bg-red-500" : "bg-emerald-600"
          }`}
        >
          {fichado ? "■ Finalizar jornada" : "● Fichar entrada"}
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {tabs.map(item => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold ${
              tab === item
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Inicio" && (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["08:00 – 16:00", "Horario de hoy", "Turno mañana"],
              ["7 h 32 min", "Jornada realizada", "Hoy"],
              ["4", "Tareas pendientes", "2 prioritarias"],
              ["168 h", "Horas este mes", "Objetivo 176 h"],
            ].map(([valor,titulo,detalle]) => (
              <div key={titulo} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-2xl font-bold">{valor}</div>
                <div className="mt-1 text-sm font-semibold">{titulo}</div>
                <div className="mt-2 text-xs text-slate-400">{detalle}</div>
              </div>
            ))}
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold">Mis tareas de hoy</h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Asignadas por Operaciones
                  </p>
                </div>
                <button
                  onClick={() => setTab("Mis tareas")}
                  className="text-sm font-semibold text-blue-600"
                >
                  Ver todas
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Revisar instalación TR-1048","Alta","10:00","En curso"],
                  ["Llamar al cliente Rivera","Media","11:30","Pendiente"],
                  ["Actualizar parte de trabajo","Media","14:00","Pendiente"],
                  ["Revisión de material","Baja","15:15","Pendiente"],
                ].map(([tarea,prioridad,hora,estado]) => (
                  <div key={tarea} className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                    <div>
                      <div className="text-sm font-semibold">{tarea}</div>
                      <div className="mt-1 text-xs text-slate-400">
                        {hora} · Prioridad {prioridad}
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      estado === "En curso"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {estado}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl bg-slate-950 p-6 text-white">
                <div className="text-xs font-semibold text-violet-300">
                  PRÓXIMO TURNO
                </div>
                <div className="mt-3 text-2xl font-bold">Mañana · 08:00</div>
                <div className="mt-2 text-sm text-slate-300">
                  Jornada 08:00 – 16:00
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  Equipo Operaciones A
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-semibold">Próxima reunión</h3>
                <div className="mt-4 rounded-xl bg-violet-50 p-4">
                  <div className="text-sm font-semibold">
                    Reunión de operaciones
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Miércoles · 09:30 · Sala principal
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {tab === "Mi jornada" && (
        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold text-emerald-600">
              CONTROL HORARIO
            </div>
            <h2 className="mt-2 text-xl font-bold">Jornada de hoy</h2>

            <div className="mt-6 text-center">
              <div className="text-5xl font-bold">
                {fichado ? "07:34:18" : "00:00:00"}
              </div>
              <div className="mt-2 text-sm text-slate-400">
                {fichado ? "Jornada en curso" : "Jornada no iniciada"}
              </div>

              <button
                onClick={() => setFichado(!fichado)}
                className={`mt-7 rounded-xl px-8 py-3.5 font-semibold text-white ${
                  fichado ? "bg-red-500" : "bg-emerald-600"
                }`}
              >
                {fichado ? "Finalizar jornada" : "Fichar entrada"}
              </button>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="font-bold">08:00</div>
                <div className="mt-1 text-xs text-slate-400">Entrada</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="font-bold">00:28</div>
                <div className="mt-1 text-xs text-slate-400">Descanso</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="font-bold">16:00</div>
                <div className="mt-1 text-xs text-slate-400">Salida prevista</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Esta semana</h2>
            <div className="mt-5 space-y-3">
              {[
                ["Lunes","08:01","16:03","8 h 02 min"],
                ["Martes","07:58","16:00","8 h 02 min"],
                ["Miércoles","08:04","16:06","8 h 02 min"],
                ["Jueves","08:00","16:00","8 h"],
                ["Viernes","—","—","Hoy"],
              ].map(([dia,entrada,salida,total]) => (
                <div key={dia} className="grid grid-cols-4 rounded-xl border border-slate-100 p-3 text-sm">
                  <strong>{dia}</strong>
                  <span>{entrada}</span>
                  <span>{salida}</span>
                  <span className="text-right text-slate-500">{total}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === "Mis tareas" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Tareas asignadas</h2>

          <div className="mt-5 space-y-3">
            {[
              ["TR-1048","Revisar instalación","Hoy · 10:00","En curso","Alta"],
              ["TR-1051","Llamar al cliente Rivera","Hoy · 11:30","Pendiente","Media"],
              ["TR-1052","Actualizar parte de trabajo","Hoy · 14:00","Pendiente","Media"],
              ["TR-1058","Preparar material almacén","Mañana · 08:30","Pendiente","Baja"],
              ["TR-1061","Visita técnica cliente","Mañana · 11:00","Pendiente","Alta"],
            ].map(([id,tarea,fecha,estado,prioridad]) => (
              <div key={id} className="grid gap-3 rounded-xl border border-slate-100 p-4 md:grid-cols-[90px_1fr_160px_110px]">
                <div className="text-xs font-semibold text-blue-600">{id}</div>
                <div>
                  <div className="text-sm font-semibold">{tarea}</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Prioridad {prioridad}
                  </div>
                </div>
                <div className="text-sm text-slate-500">{fecha}</div>
                <div className="text-sm font-semibold">{estado}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "Horario" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Mi horario semanal</h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            {[
              ["LUN","08:00","16:00"],
              ["MAR","08:00","16:00"],
              ["MIÉ","08:00","16:00"],
              ["JUE","08:00","16:00"],
              ["VIE","08:00","16:00"],
            ].map(([dia,inicio,fin]) => (
              <div key={dia} className="rounded-2xl border border-slate-200 p-5 text-center">
                <div className="text-xs font-bold text-blue-600">{dia}</div>
                <div className="mt-4 font-bold">{inicio}</div>
                <div className="my-2 text-xs text-slate-300">↓</div>
                <div className="font-bold">{fin}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSolicitud(true)}
            className="mt-6 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold"
          >
            Solicitar cambio de turno
          </button>
        </section>
      )}

      {tab === "Vacaciones" && (
        <section className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-2xl bg-slate-950 p-6 text-white">
            <div className="text-xs font-semibold text-violet-300">
              VACACIONES 2026
            </div>
            <div className="mt-5 text-4xl font-bold">17 días</div>
            <div className="mt-1 text-sm text-slate-400">
              disponibles
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 p-4">
                <div className="text-xl font-bold">30</div>
                <div className="text-xs text-slate-400">Totales</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <div className="text-xl font-bold">13</div>
                <div className="text-xs text-slate-400">Utilizados</div>
              </div>
            </div>

            <button
              onClick={() => setSolicitud(true)}
              className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-semibold text-slate-900"
            >
              Solicitar vacaciones
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Mis solicitudes</h2>

            <div className="mt-5 space-y-3">
              {[
                ["Vacaciones","10 – 14 agosto","Aprobada"],
                ["Día libre","2 octubre","Pendiente"],
                ["Cambio de turno","18 septiembre","Aprobada"],
              ].map(([tipo,fecha,estado]) => (
                <div key={tipo + fecha} className="flex justify-between rounded-xl border border-slate-100 p-4">
                  <div>
                    <div className="text-sm font-semibold">{tipo}</div>
                    <div className="mt-1 text-xs text-slate-400">{fecha}</div>
                  </div>
                  <span className={`h-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    estado === "Aprobada"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {estado}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === "Nóminas" && (
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold">Mis nóminas</h2>
            <p className="mt-1 text-xs text-slate-400">
              Documentos ficticios de demostración
            </p>
          </div>

          {[
            ["Agosto 2026","1.842,50 €","31/08/2026"],
            ["Julio 2026","1.842,50 €","31/07/2026"],
            ["Junio 2026","1.815,20 €","30/06/2026"],
            ["Mayo 2026","1.842,50 €","31/05/2026"],
          ].map(([mes,neto,fecha]) => (
            <div key={mes} className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <div className="font-semibold">{mes}</div>
                <div className="mt-1 text-xs text-slate-400">{fecha}</div>
              </div>
              <div className="flex items-center gap-5">
                <strong>{neto}</strong>
                <button className="text-sm font-semibold text-blue-600">
                  Ver PDF
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {tab === "Documentos" && (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Contrato laboral","PDF · 1,2 MB","Firmado"],
            ["Prevención de riesgos","PDF · 840 KB","Leído"],
            ["Política interna","PDF · 620 KB","Leído"],
            ["Manual del empleado","PDF · 2,4 MB","Disponible"],
            ["Certificado formación","PDF · 430 KB","Vigente"],
            ["Protección de datos","PDF · 510 KB","Firmado"],
          ].map(([nombre,tipo,estado]) => (
            <div key={nombre} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-3xl">📄</div>
              <h3 className="mt-4 font-semibold">{nombre}</h3>
              <div className="mt-2 text-xs text-slate-400">{tipo}</div>
              <div className="mt-4 text-xs font-semibold text-emerald-600">
                {estado}
              </div>
              <button className="mt-5 text-sm font-semibold text-blue-600">
                Abrir documento →
              </button>
            </div>
          ))}
        </section>
      )}

      {solicitud && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() => setSolicitud(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-violet-600">
                  NUEVA SOLICITUD
                </div>
                <h2 className="mt-1 text-xl font-bold">
                  Solicitud al responsable
                </h2>
              </div>
              <button onClick={() => setSolicitud(false)}>✕</button>
            </div>

            <label className="mt-6 block text-sm font-semibold">
              Tipo
            </label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option>Vacaciones</option>
              <option>Día libre</option>
              <option>Cambio de turno</option>
              <option>Ausencia</option>
              <option>Permiso</option>
              <option>Otra solicitud</option>
            </select>

            <label className="mt-5 block text-sm font-semibold">
              Comentario
            </label>
            <textarea
              rows={4}
              placeholder="Explica tu solicitud..."
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />

            <button
              onClick={() => setSolicitud(false)}
              className="mt-6 w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white"
            >
              Enviar solicitud demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
