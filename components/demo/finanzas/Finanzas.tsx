"use client";

import { useState } from "react";

const facturas = [
  { id:"FAC-2026-184", cliente:"Construcciones Rivera S.L.", fecha:"21 Sep", vencimiento:"06 Oct", importe:"4.850 €", estado:"Pagada" },
  { id:"FAC-2026-183", cliente:"Clínica Dental Norte", fecha:"20 Sep", vencimiento:"05 Oct", importe:"2.400 €", estado:"Pendiente" },
  { id:"FAC-2026-182", cliente:"Restaurante Central", fecha:"18 Sep", vencimiento:"03 Oct", importe:"3.180 €", estado:"Pagada" },
  { id:"FAC-2026-181", cliente:"Hotel Mirador", fecha:"15 Sep", vencimiento:"30 Sep", importe:"5.720 €", estado:"Pendiente" },
  { id:"FAC-2026-180", cliente:"Servicios Eléctricos MG", fecha:"10 Sep", vencimiento:"25 Sep", importe:"1.890 €", estado:"Vencida" },
];

export default function Finanzas() {
  const [vista, setVista] = useState("Resumen");

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-emerald-600">
            FINANZAS · CONTROL ECONÓMICO
          </p>
          <h1 className="mt-1 text-3xl font-bold">Finanzas</h1>
          <p className="mt-2 text-sm text-slate-500">
            Controla ingresos, gastos, facturación, cobros y rentabilidad de tu empresa.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold">
            + Registrar gasto
          </button>
          <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
            + Crear factura
          </button>
        </div>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["Resumen","Facturas","Ingresos","Gastos","Cobros","Previsión"].map(item => (
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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["42.850 €","Ingresos este mes","+12,4%"],
          ["18.420 €","Gastos","-3,2%"],
          ["24.430 €","Beneficio neto","+18,7%"],
          ["57,0%","Margen neto","+4,1%"],
        ].map(([valor,titulo,cambio]) => (
          <div key={titulo} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{valor}</div>
            <div className="mt-1 text-sm font-medium">{titulo}</div>
            <div className="mt-2 text-xs font-semibold text-emerald-600">{cambio}</div>
          </div>
        ))}
      </section>

      {vista === "Resumen" && (
        <>
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold">Flujo financiero</h2>
                  <p className="text-xs text-slate-400">Ingresos vs. gastos · últimos 6 meses</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600">+18,7%</span>
              </div>

              <div className="mt-8 flex h-64 items-end justify-between gap-4">
                {[
                  ["Abr",55,35],
                  ["May",64,41],
                  ["Jun",58,32],
                  ["Jul",72,38],
                  ["Ago",80,42],
                  ["Sep",94,40],
                ].map(([mes,ingreso,gasto]) => (
                  <div key={mes as string} className="flex h-full flex-1 flex-col justify-end">
                    <div className="flex flex-1 items-end justify-center gap-1">
                      <div className="w-5 rounded-t bg-blue-500" style={{height:`${ingreso}%`}} />
                      <div className="w-5 rounded-t bg-slate-300" style={{height:`${gasto}%`}} />
                    </div>
                    <div className="mt-2 text-center text-xs text-slate-400">{mes}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-5 text-xs">
                <span><b className="text-blue-600">●</b> Ingresos</span>
                <span><b className="text-slate-400">●</b> Gastos</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold">Situación de caja</h2>
              <p className="text-xs text-slate-400">Estado financiero actual</p>

              <div className="mt-6">
                <div className="text-sm text-slate-500">Saldo disponible</div>
                <div className="mt-1 text-3xl font-bold">68.420 €</div>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  ["Por cobrar","14.010 €"],
                  ["Por pagar","6.840 €"],
                  ["Impuestos previstos","4.210 €"],
                  ["Caja proyectada","71.380 €"],
                ].map(([titulo,valor]) => (
                  <div key={titulo} className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                    <span className="text-slate-500">{titulo}</span>
                    <strong>{valor}</strong>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-emerald-50 p-4">
                <div className="text-xs font-semibold text-emerald-700">SALUD FINANCIERA</div>
                <div className="mt-1 font-bold text-emerald-900">Muy buena</div>
                <p className="mt-1 text-xs text-emerald-700">
                  La liquidez cubre aproximadamente 3,7 meses de gastos.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-5 grid gap-5 lg:grid-cols-3">
            {[
              ["Ventas","42.850 €","61 operaciones","+12,4%"],
              ["Costes operativos","12.640 €","29,5% ingresos","-2,1%"],
              ["Marketing","5.780 €","ROI estimado 4,3x","+21,8%"],
            ].map(([titulo,valor,detalle,cambio]) => (
              <div key={titulo} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-sm text-slate-500">{titulo}</div>
                <div className="mt-2 text-2xl font-bold">{valor}</div>
                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-slate-400">{detalle}</span>
                  <strong className="text-emerald-600">{cambio}</strong>
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      {vista === "Facturas" && (
        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold">Facturación</h2>
            <p className="text-xs text-slate-400">Facturas emitidas y estado de cobro</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-5 py-3">Factura</th>
                  <th className="px-5 py-3">Cliente</th>
                  <th className="px-5 py-3">Emisión</th>
                  <th className="px-5 py-3">Vencimiento</th>
                  <th className="px-5 py-3">Importe</th>
                  <th className="px-5 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map(f => (
                  <tr key={f.id} className="border-t border-slate-100">
                    <td className="px-5 py-4 text-sm font-semibold text-blue-600">{f.id}</td>
                    <td className="px-5 py-4 text-sm font-medium">{f.cliente}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{f.fecha}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{f.vencimiento}</td>
                    <td className="px-5 py-4 font-semibold">{f.importe}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        f.estado === "Pagada"
                          ? "bg-emerald-50 text-emerald-700"
                          : f.estado === "Vencida"
                          ? "bg-red-50 text-red-700"
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        {f.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {!["Resumen","Facturas"].includes(vista) && (
        <section className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{vista}</h2>
            <p className="mt-1 text-sm text-slate-400">Movimientos financieros recientes</p>

            <div className="mt-5 space-y-3">
              {[
                ["Construcciones Rivera S.L.","+4.850 €","Hoy · 10:24"],
                ["Proveedor Industrial Norte","-1.240 €","Hoy · 09:10"],
                ["Clínica Dental Norte","+2.400 €","Ayer · 17:32"],
                ["Google Ads","-980 €","Ayer · 14:05"],
                ["Restaurante Central","+3.180 €","21 Sep · 11:42"],
              ].map(([concepto,importe,fecha]) => (
                <div key={concepto} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                  <div>
                    <div className="text-sm font-semibold">{concepto}</div>
                    <div className="text-xs text-slate-400">{fecha}</div>
                  </div>
                  <strong className={importe.startsWith("+") ? "text-emerald-600" : "text-red-500"}>
                    {importe}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Previsión 30 días</h3>

            <div className="mt-5 space-y-4">
              {[
                ["Ingresos previstos","51.200 €"],
                ["Gastos previstos","20.850 €"],
                ["Resultado previsto","30.350 €"],
                ["Margen previsto","59,3%"],
              ].map(([titulo,valor]) => (
                <div key={titulo} className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                  <span className="text-slate-500">{titulo}</span>
                  <strong>{valor}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
