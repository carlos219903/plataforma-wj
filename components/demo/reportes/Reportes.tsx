"use client";

import { useState } from "react";

const informes = [
  { nombre:"Informe comercial", area:"Ventas y CRM", periodo:"Septiembre 2026", actualizado:"Hoy · 16:20", icono:"📈" },
  { nombre:"Resultados financieros", area:"Finanzas", periodo:"Septiembre 2026", actualizado:"Hoy · 15:45", icono:"💶" },
  { nombre:"Rendimiento de empleados", area:"RR. HH.", periodo:"Septiembre 2026", actualizado:"Hoy · 14:10", icono:"👥" },
  { nombre:"Marketing y adquisición", area:"Marketing", periodo:"Últimos 30 días", actualizado:"Ayer · 18:32", icono:"🎯" },
  { nombre:"Operaciones y productividad", area:"Operaciones", periodo:"Últimos 30 días", actualizado:"Ayer · 17:05", icono:"⚙️" },
  { nombre:"Inventario y compras", area:"Inventario", periodo:"Septiembre 2026", actualizado:"22 Sep · 19:14", icono:"📦" },
];

export default function Reportes() {
  const [vista, setVista] = useState("Centro de reportes");
  const [generando, setGenerando] = useState(false);
  const [detalle, setDetalle] = useState<(typeof informes)[number] | null>(null);

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            INFORMES · INTELIGENCIA EMPRESARIAL
          </p>
          <h1 className="mt-1 text-3xl font-bold">Reportes</h1>
          <p className="mt-2 text-sm text-slate-500">
            Toda la información de la empresa convertida en informes claros para tomar decisiones.
          </p>
        </div>

        <button
          onClick={() => setGenerando(true)}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          + Crear informe
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["Centro de reportes","Programados","Historial"].map(item => (
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
          ["24","Informes disponibles","6 áreas conectadas"],
          ["12","Generados este mes","+4 respecto agosto"],
          ["7","Programados","Envío automático"],
          ["100%","Datos centralizados","Una única fuente"],
        ].map(([v,l,d]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{v}</div>
            <div className="mt-1 text-sm font-medium">{l}</div>
            <div className="mt-2 text-xs text-slate-400">{d}</div>
          </div>
        ))}
      </section>

      {vista === "Centro de reportes" && (
        <>
          <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {informes.map(informe => (
              <button
                key={informe.nombre}
                onClick={() => setDetalle(informe)}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
                    {informe.icono}
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                    ACTUALIZADO
                  </span>
                </div>

                <h3 className="mt-5 font-semibold">{informe.nombre}</h3>
                <p className="mt-1 text-sm text-slate-500">{informe.area}</p>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <div className="text-xs text-slate-400">{informe.periodo}</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Actualizado {informe.actualizado}
                  </div>
                </div>

                <div className="mt-4 text-sm font-semibold text-blue-600">
                  Abrir informe →
                </div>
              </button>
            ))}
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold">Resumen ejecutivo</h2>
                  <p className="text-xs text-slate-400">
                    Septiembre 2026 · Empresa Demo S.L.
                  </p>
                </div>
                <span className="text-xs font-semibold text-indigo-600">
                  ACTUALIZADO AHORA
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Facturación","64.820 €","+12,4%"],
                  ["Beneficio","18.460 €","+8,7%"],
                  ["Clientes nuevos","61","+14,8%"],
                  ["Conversión","14,2%","+2,1 pts"],
                ].map(([l,v,d]) => (
                  <div key={l} className="rounded-xl bg-slate-50 p-4">
                    <div className="text-xs text-slate-400">{l}</div>
                    <div className="mt-2 text-xl font-bold">{v}</div>
                    <div className="mt-1 text-xs font-semibold text-emerald-600">{d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold">Evolución del negocio</h3>

                <div className="mt-5 flex h-48 items-end gap-3">
                  {[38,48,44,61,56,69,64,78,72,84,79,92].map((valor,i) => (
                    <div key={i} className="flex flex-1 flex-col items-center justify-end gap-2">
                      <div
                        className="w-full rounded-t-md bg-indigo-500"
                        style={{height:`${valor}%`}}
                      />
                      <span className="text-[9px] text-slate-400">
                        {["O","N","D","E","F","M","A","M","J","J","A","S"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <div className="text-xs font-semibold text-indigo-300">
                ✦ GROUPW&J INTELLIGENCE
              </div>
              <h2 className="mt-2 text-xl font-bold">Resumen automático</h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <div className="text-xs font-semibold text-emerald-300">
                    OPORTUNIDAD
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Google está generando el mayor volumen comercial y mantiene una conversión superior al 15%.
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <div className="text-xs font-semibold text-amber-300">
                    ATENCIÓN
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Hay 21 presupuestos sin respuesta que representan aproximadamente 14.600 € en oportunidades.
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <div className="text-xs font-semibold text-blue-300">
                    OPERACIONES
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    La carga operativa se encuentra al 78%. Dos equipos superan el 90% de capacidad.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {vista === "Programados" && (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
          {[
            ["Resumen semanal de dirección","Cada lunes · 08:00","Dirección","Activo"],
            ["Informe comercial","Cada viernes · 18:00","Ventas","Activo"],
            ["Resultados de marketing","Día 1 de cada mes","Marketing","Activo"],
            ["Control de empleados","Cada viernes · 17:30","RR. HH.","Activo"],
            ["Cierre financiero","Último día del mes","Administración","Activo"],
          ].map(([nombre,frecuencia,destino,estado]) => (
            <div
              key={nombre}
              className="grid gap-3 border-b border-slate-100 p-5 md:grid-cols-[1fr_220px_150px_100px]"
            >
              <div>
                <div className="font-semibold">{nombre}</div>
                <div className="mt-1 text-xs text-slate-400">
                  Generación y envío automáticos
                </div>
              </div>
              <div className="text-sm text-slate-500">{frecuencia}</div>
              <div className="text-sm">{destino}</div>
              <div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {estado}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {vista === "Historial" && (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Informes generados recientemente</h2>

          <div className="mt-5 space-y-3">
            {[
              ["Informe comercial · Septiembre","Hoy · 16:20","PDF","2,4 MB"],
              ["Resultados financieros","Hoy · 15:45","PDF","1,8 MB"],
              ["Marketing · últimos 30 días","Ayer · 18:32","PDF","3,1 MB"],
              ["Productividad de empleados","20 Sep · 17:30","PDF","1,2 MB"],
              ["Inventario y compras","18 Sep · 19:14","Excel","846 KB"],
            ].map(([nombre,fecha,tipo,tamano]) => (
              <div
                key={nombre}
                className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="text-sm font-semibold">{nombre}</div>
                  <div className="mt-1 text-xs text-slate-400">{fecha}</div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400">{tipo} · {tamano}</span>
                  <button className="text-sm font-semibold text-blue-600">
                    Descargar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {detalle && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/30"
          onClick={() => setDetalle(null)}
        >
          <div
            className="h-full w-full max-w-2xl overflow-y-auto bg-white p-7 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-indigo-600">
                  {detalle.area.toUpperCase()}
                </div>
                <h2 className="mt-1 text-2xl font-bold">{detalle.nombre}</h2>
                <p className="mt-1 text-sm text-slate-500">{detalle.periodo}</p>
              </div>
              <button
                onClick={() => setDetalle(null)}
                className="h-10 rounded-lg bg-slate-100 px-3"
              >
                ✕
              </button>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {[
                ["Resultado","64.820 €"],
                ["Variación","+12,4%"],
                ["Objetivo","58.000 €"],
                ["Cumplimiento","111,8%"],
              ].map(([l,v]) => (
                <div key={l} className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-400">{l}</div>
                  <div className="mt-1 text-xl font-bold">{v}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-slate-200 p-5">
              <h3 className="font-semibold">Conclusiones principales</h3>

              <div className="mt-4 space-y-3">
                {[
                  "El rendimiento general mejora respecto al periodo anterior.",
                  "La captación digital representa una parte significativa de las nuevas oportunidades.",
                  "Existen oportunidades pendientes que requieren seguimiento comercial.",
                  "La empresa mantiene una evolución positiva en facturación y conversión.",
                ].map(texto => (
                  <div key={texto} className="flex gap-3 text-sm text-slate-600">
                    <span className="text-emerald-500">●</span>
                    {texto}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-slate-200 py-3 text-sm font-semibold">
                Exportar PDF
              </button>
              <button className="rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white">
                Compartir informe
              </button>
            </div>
          </div>
        </div>
      )}

      {generando && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() => setGenerando(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-indigo-600">
                  NUEVO INFORME
                </div>
                <h2 className="mt-1 text-xl font-bold">Crear informe</h2>
              </div>
              <button
                onClick={() => setGenerando(false)}
                className="rounded-lg bg-slate-100 px-3"
              >
                ✕
              </button>
            </div>

            <label className="mt-6 block text-sm font-semibold">Área</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option>Empresa completa</option>
              <option>Ventas y CRM</option>
              <option>Finanzas</option>
              <option>Empleados</option>
              <option>Marketing</option>
              <option>Operaciones</option>
              <option>Inventario</option>
            </select>

            <label className="mt-5 block text-sm font-semibold">Periodo</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option>Últimos 30 días</option>
              <option>Este mes</option>
              <option>Últimos 90 días</option>
              <option>Este año</option>
            </select>

            <div className="mt-5 rounded-xl bg-indigo-50 p-4">
              <div className="text-xs font-semibold text-indigo-700">
                ✦ INFORME INTELIGENTE
              </div>
              <p className="mt-2 text-sm text-slate-600">
                La demostración simula la combinación de datos de diferentes áreas para crear un resumen ejecutivo.
              </p>
            </div>

            <button
              onClick={() => setGenerando(false)}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white"
            >
              Generar informe
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
