"use client";

import { useState } from "react";

type Conversacion = {
  nombre: string;
  empresa: string;
  canal: "WhatsApp" | "Email" | "Llamada" | "Interno";
  mensaje: string;
  hora: string;
  pendiente: boolean;
};

const conversaciones: Conversacion[] = [
  { nombre:"Patricia León", empresa:"Clínica León", canal:"WhatsApp", mensaje:"Perfecto, ¿podemos hacer la reunión mañana?", hora:"16:42", pendiente:true },
  { nombre:"Sergio Molina", empresa:"Reformas Molina", canal:"Email", mensaje:"He recibido la propuesta. Tengo una consulta sobre el sistema.", hora:"15:18", pendiente:true },
  { nombre:"Miguel Santos", empresa:"Distribuciones Santos", canal:"Llamada", mensaje:"Llamada comercial · 8 min 24 s", hora:"13:06", pendiente:false },
  { nombre:"Lucía Fernández", empresa:"Centro Estética LF", canal:"WhatsApp", mensaje:"Me interesa especialmente la parte de marketing.", hora:"12:41", pendiente:false },
  { nombre:"Daniel García", empresa:"Equipo interno", canal:"Interno", mensaje:"Trabajo TR-1052 actualizado al 68%.", hora:"11:28", pendiente:false },
];

export default function Comunicaciones() {
  const [canal, setCanal] = useState("Todos");
  const [seleccionada, setSeleccionada] = useState<Conversacion>(conversaciones[0]);
  const [mensaje, setMensaje] = useState("");

  const filtradas =
    canal === "Todos"
      ? conversaciones
      : conversaciones.filter(c => c.canal === canal);

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-sky-600">
            COMUNICACIONES · BANDEJA UNIFICADA
          </p>
          <h1 className="mt-1 text-3xl font-bold">Comunicaciones</h1>
          <p className="mt-2 text-sm text-slate-500">
            WhatsApp, email, llamadas y comunicación interna desde un único lugar.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
          + Nueva conversación
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["46","Conversaciones hoy","8 pendientes"],
          ["23","WhatsApp","5 sin responder"],
          ["14","Emails","2 pendientes"],
          ["17","Llamadas","2h 48m"],
          ["4m 12s","Respuesta media","-38 segundos"],
        ].map(([v,l,d]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{v}</div>
            <div className="mt-1 text-sm font-medium">{l}</div>
            <div className="mt-2 text-xs text-slate-400">{d}</div>
          </div>
        ))}
      </section>

      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-[360px_1fr_300px]">
        <div className="border-r border-slate-100">
          <div className="border-b border-slate-100 p-4">
            <input
              placeholder="Buscar conversación..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none"
            />

            <div className="mt-3 flex gap-2 overflow-x-auto">
              {["Todos","WhatsApp","Email","Llamada","Interno"].map(item => (
                <button
                  key={item}
                  onClick={() => setCanal(item)}
                  className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    canal === item ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto">
            {filtradas.map(c => (
              <button
                key={c.nombre + c.hora}
                onClick={() => setSeleccionada(c)}
                className={`w-full border-b border-slate-100 p-4 text-left hover:bg-slate-50 ${
                  seleccionada.nombre === c.nombre ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex justify-between gap-3">
                  <div className="font-semibold text-sm">{c.nombre}</div>
                  <span className="text-[10px] text-slate-400">{c.hora}</span>
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {c.canal} · {c.empresa}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {c.pendiente && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                  <p className="truncate text-xs text-slate-500">{c.mensaje}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-[600px] flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <div className="font-semibold">{seleccionada.nombre}</div>
              <div className="text-xs text-slate-400">
                {seleccionada.empresa} · {seleccionada.canal}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold">
                ☎ Llamar
              </button>
              <button className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold">
                Ver CRM
              </button>
            </div>
          </div>

          <div className="flex-1 bg-slate-50 p-5">
            <div className="mx-auto max-w-2xl space-y-4">
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white p-4 shadow-sm">
                <p className="text-sm">
                  Hola, me gustaría recibir más información sobre vuestro sistema.
                </p>
                <div className="mt-2 text-[10px] text-slate-400">10:14</div>
              </div>

              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 p-4 text-white">
                <p className="text-sm">
                  Claro. Podemos centralizar clientes, empleados, operaciones y marketing en el mismo sistema.
                </p>
                <div className="mt-2 text-[10px] text-blue-200">10:18 · ✓✓</div>
              </div>

              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white p-4 shadow-sm">
                <p className="text-sm">{seleccionada.mensaje}</p>
                <div className="mt-2 text-[10px] text-slate-400">{seleccionada.hora}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 p-4">
            <div className="flex gap-2">
              <button className="rounded-xl border border-slate-200 px-3">＋</button>
              <input
                value={mensaje}
                onChange={e => setMensaje(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
              />
              <button
                onClick={() => setMensaje("")}
                className="rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>

        <div className="border-l border-slate-100 p-5">
          <div className="text-xs font-semibold text-slate-400">CONTACTO</div>
          <div className="mt-2 text-lg font-bold">{seleccionada.nombre}</div>
          <div className="text-sm text-slate-500">{seleccionada.empresa}</div>

          <div className="mt-6 space-y-4">
            {[
              ["Estado CRM","Oportunidad"],
              ["Responsable","Laura Gómez"],
              ["Valor potencial","2.400 €"],
              ["Último contacto","Hoy"],
              ["Próxima acción","Seguimiento"],
            ].map(([l,v]) => (
              <div key={l} className="border-b border-slate-100 pb-3">
                <div className="text-xs text-slate-400">{l}</div>
                <div className="mt-1 text-sm font-semibold">{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-violet-50 p-4">
            <div className="text-xs font-semibold text-violet-700">
              ✦ RESUMEN IA
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              El contacto muestra interés comercial y ha preguntado por las funciones del sistema. Se recomienda seguimiento en menos de 24 horas.
            </p>
          </div>

          <button className="mt-4 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold">
            Abrir ficha completa
          </button>
        </div>
      </section>
    </div>
  );
}
