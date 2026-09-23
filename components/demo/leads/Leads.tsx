"use client";

import { useState } from "react";

type Lead = {
  nombre: string;
  empresa: string;
  origen: string;
  interes: string;
  estado: string;
  valor: string;
  responsable: string;
  actividad: string;
  temperatura: "Caliente" | "Templado" | "Frío";
};

const leads: Lead[] = [
  { nombre:"Sergio Molina", empresa:"Reformas Molina", origen:"Google Ads", interes:"Sistema empresarial", estado:"Nuevo", valor:"3.600 €", responsable:"Laura Gómez", actividad:"Hace 4 min", temperatura:"Caliente" },
  { nombre:"Patricia León", empresa:"Clínica León", origen:"Formulario web", interes:"CRM + Marketing", estado:"Contactado", valor:"2.400 €", responsable:"Carlos Díaz", actividad:"Hace 22 min", temperatura:"Caliente" },
  { nombre:"David Romero", empresa:"Romero Electricidad", origen:"Llamada", interes:"Gestión empleados", estado:"Cita", valor:"1.800 €", responsable:"Laura Gómez", actividad:"Hoy · 12:30", temperatura:"Templado" },
  { nombre:"Lucía Fernández", empresa:"Centro Estética LF", origen:"Instagram", interes:"Marketing IA", estado:"Seguimiento", valor:"1.200 €", responsable:"Carlos Díaz", actividad:"Hoy · 10:14", temperatura:"Templado" },
  { nombre:"Miguel Santos", empresa:"Distribuciones Santos", origen:"Referido", interes:"Sistema completo", estado:"Presupuesto", valor:"5.400 €", responsable:"Laura Gómez", actividad:"Ayer · 18:40", temperatura:"Caliente" },
];

export default function Leads() {
  const [vista, setVista] = useState("Leads");
  const [seleccionado, setSeleccionado] = useState<Lead | null>(null);

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-fuchsia-600">
            CAPTACIÓN · OPORTUNIDADES
          </p>
          <h1 className="mt-1 text-3xl font-bold">Leads y ofertas</h1>
          <p className="mt-2 text-sm text-slate-500">
            Convierte visitas, llamadas y contactos en clientes y ventas.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
          + Añadir lead
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["Leads","Embudo","Seguimientos","Ofertas","Citas"].map(item => (
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
          ["428","Leads este mes","+21,6%"],
          ["73","Nuevos","Pendientes de gestión"],
          ["146","Citas","34,1% conversión"],
          ["61","Nuevos clientes","14,2% conversión"],
          ["48.900 €","Pipeline","Valor potencial"],
        ].map(([v,l,d]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{v}</div>
            <div className="mt-1 text-sm font-medium">{l}</div>
            <div className="mt-2 text-xs text-slate-400">{d}</div>
          </div>
        ))}
      </section>

      {vista === "Leads" && (
        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold">Bandeja de oportunidades</h2>
            <p className="text-xs text-slate-400">
              Todos los contactos comerciales centralizados
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-5 py-3">Lead</th>
                  <th className="px-5 py-3">Origen</th>
                  <th className="px-5 py-3">Interés</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3">Valor</th>
                  <th className="px-5 py-3">Responsable</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {leads.map(lead => (
                  <tr key={lead.nombre} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="font-semibold">{lead.nombre}</div>
                      <div className="text-xs text-slate-400">{lead.empresa}</div>
                    </td>
                    <td className="px-5 py-4 text-sm">{lead.origen}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{lead.interes}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        {lead.estado}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold">{lead.valor}</td>
                    <td className="px-5 py-4 text-sm">{lead.responsable}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSeleccionado(lead)}
                        className="text-sm font-semibold text-blue-600"
                      >
                        Gestionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {vista === "Embudo" && (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Embudo de captación</h2>
          <p className="text-xs text-slate-400">
            Desde la primera visita hasta la venta
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {[
              ["3.842","Visitantes"],
              ["428","Leads"],
              ["286","Contactados"],
              ["146","Citas"],
              ["82","Presupuestos"],
              ["61","Clientes"],
            ].map(([valor,nombre],i) => (
              <div key={nombre} className="rounded-xl bg-slate-50 p-4">
                <div className="text-xs font-bold text-blue-600">PASO {i + 1}</div>
                <div className="mt-3 text-2xl font-bold">{valor}</div>
                <div className="text-sm text-slate-500">{nombre}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-emerald-50 p-4">
            <div className="text-xs font-semibold text-emerald-700">
              CONVERSIÓN TOTAL
            </div>
            <div className="mt-1 text-xl font-bold">14,2% de los leads → cliente</div>
          </div>
        </section>
      )}

      {["Seguimientos","Ofertas","Citas"].includes(vista) && (
        <section className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{vista}</h2>

            <div className="mt-5 space-y-3">
              {[
                ["Reformas Molina","Llamar","Hoy · 17:30","Alta"],
                ["Clínica León","Enviar propuesta","Hoy · 18:00","Alta"],
                ["Romero Electricidad","Videollamada","Mañana · 10:00","Media"],
                ["Centro Estética LF","WhatsApp seguimiento","Mañana · 12:30","Media"],
                ["Distribuciones Santos","Revisar presupuesto","24 Sep · 09:30","Alta"],
              ].map(([empresa,accion,fecha,prioridad]) => (
                <div key={empresa} className="flex justify-between rounded-xl border border-slate-100 p-4">
                  <div>
                    <div className="text-sm font-semibold">{empresa}</div>
                    <div className="text-xs text-slate-400">{accion} · {fecha}</div>
                  </div>
                  <span className="text-xs font-semibold text-blue-600">{prioridad}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Ofertas inteligentes</h3>
            <p className="mt-2 text-sm text-slate-500">
              Aprovecha los contactos que ya han mostrado interés para realizar nuevas acciones comerciales.
            </p>

            <div className="mt-5 rounded-xl bg-violet-50 p-4">
              <div className="text-xs font-semibold text-violet-700">
                367 LEADS SIN CONVERTIR
              </div>
              <p className="mt-2 text-sm font-semibold">
                Puedes crear una oferta para intentar recuperarlos.
              </p>
            </div>

            <button className="mt-4 w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white">
              Crear oferta
            </button>
          </div>
        </section>
      )}

      {seleccionado && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/30"
          onClick={() => setSeleccionado(null)}
        >
          <div
            className="h-full w-full max-w-xl overflow-y-auto bg-white p-7 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-fuchsia-600">
                  OPORTUNIDAD COMERCIAL
                </div>
                <h2 className="mt-1 text-2xl font-bold">{seleccionado.nombre}</h2>
                <p className="text-sm text-slate-500">{seleccionado.empresa}</p>
              </div>
              <button
                onClick={() => setSeleccionado(null)}
                className="h-10 rounded-lg bg-slate-100 px-3"
              >
                ✕
              </button>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {[
                ["Origen",seleccionado.origen],
                ["Estado",seleccionado.estado],
                ["Valor potencial",seleccionado.valor],
                ["Temperatura",seleccionado.temperatura],
                ["Responsable",seleccionado.responsable],
                ["Última actividad",seleccionado.actividad],
              ].map(([l,v]) => (
                <div key={l} className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-400">{l}</div>
                  <div className="mt-1 font-semibold">{v}</div>
                </div>
              ))}
            </div>

            <h3 className="mt-7 font-semibold">Historial</h3>

            {[
              ["Lead recibido automáticamente","Formulario / campaña"],
              ["Email de bienvenida enviado","Automatización GroupW&J"],
              ["Comercial asignado","Laura Gómez"],
              ["Seguimiento programado","Hoy · 17:30"],
            ].map(([accion,detalle]) => (
              <div key={accion} className="mt-3 rounded-xl border border-slate-100 p-4">
                <div className="text-sm font-medium">{accion}</div>
                <div className="mt-1 text-xs text-slate-400">{detalle}</div>
              </div>
            ))}

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-slate-200 py-3 text-sm font-semibold">
                ✉ Enviar email
              </button>
              <button className="rounded-xl border border-slate-200 py-3 text-sm font-semibold">
                WhatsApp
              </button>
              <button className="rounded-xl border border-slate-200 py-3 text-sm font-semibold">
                Programar cita
              </button>
              <button className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white">
                Convertir en cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
