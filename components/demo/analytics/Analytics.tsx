"use client";

import { useState } from "react";

const fuentes = [
  { canal:"Google", visitas:"1.482", leads:"186", clientes:"28", ventas:"18.420 €", conversion:"15,1%" },
  { canal:"Instagram", visitas:"824", leads:"102", clientes:"14", ventas:"8.760 €", conversion:"13,7%" },
  { canal:"Directo", visitas:"618", leads:"54", clientes:"8", ventas:"5.240 €", conversion:"14,8%" },
  { canal:"Facebook", visitas:"446", leads:"48", clientes:"6", ventas:"4.180 €", conversion:"12,5%" },
  { canal:"TikTok", visitas:"301", leads:"25", clientes:"3", ventas:"2.190 €", conversion:"12,0%" },
  { canal:"Email", visitas:"171", leads:"13", clientes:"2", ventas:"1.640 €", conversion:"15,4%" },
];

export default function Analytics() {
  const [periodo, setPeriodo] = useState("30 días");

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            ANALÍTICA · CONVERSIONES
          </p>
          <h1 className="mt-1 text-3xl font-bold">Web y conversiones</h1>
          <p className="mt-2 text-sm text-slate-500">
            Descubre de dónde llegan tus clientes y qué ocurre desde la primera visita hasta la venta.
          </p>
        </div>

        <select
          value={periodo}
          onChange={e => setPeriodo(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold"
        >
          <option>7 días</option>
          <option>30 días</option>
          <option>90 días</option>
          <option>Este año</option>
        </select>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["3.842","Visitas web","+18,4%"],
          ["428","Leads","+21,6%"],
          ["214","Llamadas / WhatsApp","+16,2%"],
          ["146","Citas","+11,8%"],
          ["61","Clientes","+14,8%"],
        ].map(([v,l,d]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{v}</div>
            <div className="mt-1 text-sm font-medium">{l}</div>
            <div className="mt-2 text-xs font-semibold text-emerald-600">{d}</div>
          </div>
        ))}
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="font-semibold">Embudo completo de conversión</h2>
          <p className="text-xs text-slate-400">
            Recorrido del cliente · {periodo}
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4 xl:grid-cols-8">
          {[
            ["3.842","Visitas","100%"],
            ["428","Leads","11,1%"],
            ["286","Contactados","66,8%"],
            ["214","Conversaciones","74,8%"],
            ["146","Citas","68,2%"],
            ["82","Presupuestos","56,2%"],
            ["61","Clientes","74,4%"],
            ["48","Ventas","78,7%"],
          ].map(([valor,nombre,tasa],i) => (
            <div key={nombre} className="relative rounded-xl bg-slate-50 p-4">
              <div className="text-[10px] font-bold text-blue-600">
                ETAPA {i + 1}
              </div>
              <div className="mt-2 text-xl font-bold">{valor}</div>
              <div className="text-xs font-medium">{nombre}</div>
              <div className="mt-2 text-[10px] text-slate-400">{tasa}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_.7fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold">Rendimiento por canal</h2>
            <p className="text-xs text-slate-400">
              Qué fuentes generan negocio realmente
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-5 py-3">Canal</th>
                  <th className="px-5 py-3">Visitas</th>
                  <th className="px-5 py-3">Leads</th>
                  <th className="px-5 py-3">Clientes</th>
                  <th className="px-5 py-3">Ventas</th>
                  <th className="px-5 py-3">Conversión</th>
                </tr>
              </thead>
              <tbody>
                {fuentes.map(f => (
                  <tr key={f.canal} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold">{f.canal}</td>
                    <td className="px-5 py-4 text-sm">{f.visitas}</td>
                    <td className="px-5 py-4 text-sm">{f.leads}</td>
                    <td className="px-5 py-4 text-sm">{f.clientes}</td>
                    <td className="px-5 py-4 font-semibold">{f.ventas}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-emerald-600">
                      {f.conversion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Actividad hoy</h3>

            <div className="mt-5 space-y-4">
              {[
                ["Personas en la web ahora","14"],
                ["Formularios recibidos","8"],
                ["Llamadas recibidas","17"],
                ["WhatsApp iniciados","23"],
                ["Citas creadas","6"],
                ["Ventas cerradas","3"],
              ].map(([l,v]) => (
                <div key={l} className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                  <span className="text-slate-500">{l}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 p-5 text-white">
            <div className="text-xs font-semibold text-blue-300">
              GROUPW&J INTELLIGENCE
            </div>
            <h3 className="mt-2 font-bold">¿Qué está funcionando?</h3>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Google genera el mayor volumen de clientes, mientras que Email presenta una alta conversión sobre una audiencia menor.
            </p>

            <div className="mt-4 rounded-xl bg-white/10 p-4">
              <div className="text-xs text-slate-400">VENTAS ATRIBUIDAS</div>
              <div className="mt-1 text-2xl font-bold">40.430 €</div>
              <div className="mt-1 text-xs text-emerald-300">
                +17,8% respecto al periodo anterior
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Páginas más visitadas</h3>
          <div className="mt-4 space-y-3">
            {[
              ["/","1.824"],
              ["/servicios","842"],
              ["/precios","516"],
              ["/contacto","382"],
              ["/ofertas","278"],
            ].map(([pagina,visitas]) => (
              <div key={pagina} className="flex justify-between text-sm">
                <span className="text-slate-500">{pagina}</span>
                <strong>{visitas}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Acciones de contacto</h3>
          <div className="mt-4 space-y-3">
            {[
              ["Formularios","428"],
              ["WhatsApp","184"],
              ["Llamadas","132"],
              ["Emails","96"],
              ["Reservas","146"],
            ].map(([accion,total]) => (
              <div key={accion} className="flex justify-between text-sm">
                <span className="text-slate-500">{accion}</span>
                <strong>{total}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Dispositivos</h3>
          <div className="mt-4 space-y-4">
            {[
              ["Móvil",68],
              ["Ordenador",27],
              ["Tablet",5],
            ].map(([nombre,valor]) => (
              <div key={nombre as string}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{nombre}</span>
                  <strong>{valor}%</strong>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-blue-500"
                    style={{width:`${valor}%`}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
