"use client";

import { useState } from "react";

const movimientos = [
  { concepto: "Recarga de saldo", tipo: "Entrada", importe: "+1.500,00 €", fecha: "Hoy · 09:42", estado: "Completado" },
  { concepto: "Google Ads", tipo: "Marketing", importe: "-420,00 €", fecha: "22 Sep · 14:10", estado: "Completado" },
  { concepto: "Instagram Ads", tipo: "Marketing", importe: "-180,00 €", fecha: "21 Sep · 18:35", estado: "Completado" },
  { concepto: "Campaña Email", tipo: "Marketing", importe: "-45,00 €", fecha: "20 Sep · 10:12", estado: "Completado" },
  { concepto: "Recarga de saldo", tipo: "Entrada", importe: "+2.000,00 €", fecha: "18 Sep · 11:20", estado: "Completado" },
];

export default function Cartera() {
  const [tab, setTab] = useState("Resumen");
  const [recargar, setRecargar] = useState(false);

  return (
    <div>
      <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        <strong>Modo demostración:</strong> todos los saldos, pagos y movimientos son ficticios. No se almacena ni mueve dinero real.
      </div>

      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-emerald-600">
            CARTERA · PRESUPUESTOS
          </p>
          <h1 className="mt-1 text-3xl font-bold">Cartera empresarial</h1>
          <p className="mt-2 text-sm text-slate-500">
            Controla presupuestos destinados a marketing y otros servicios desde un único lugar.
          </p>
        </div>

        <button
          onClick={() => setRecargar(true)}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          + Añadir fondos
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["Resumen", "Movimientos", "Presupuestos", "Métodos de pago"].map(item => (
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

      {tab === "Resumen" && (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["4.865,40 €", "Saldo disponible", "Demo"],
              ["1.200,00 €", "Presupuesto marketing", "Este mes"],
              ["645,00 €", "Invertido", "Este mes"],
              ["555,00 €", "Disponible marketing", "Presupuesto restante"],
            ].map(([valor, titulo, detalle]) => (
              <div key={titulo} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-2xl font-bold">{valor}</div>
                <div className="mt-1 text-sm font-semibold">{titulo}</div>
                <div className="mt-2 text-xs text-slate-400">{detalle}</div>
              </div>
            ))}
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Movimientos recientes</h2>
                  <p className="mt-1 text-xs text-slate-400">Actividad ficticia de la cartera</p>
                </div>
                <button
                  onClick={() => setTab("Movimientos")}
                  className="text-sm font-semibold text-blue-600"
                >
                  Ver todos
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {movimientos.slice(0, 4).map((m, index) => (
                  <div key={index} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                    <div>
                      <div className="text-sm font-semibold">{m.concepto}</div>
                      <div className="mt-1 text-xs text-slate-400">{m.tipo} · {m.fecha}</div>
                    </div>
                    <div className={`font-semibold ${m.importe.startsWith("+") ? "text-emerald-600" : "text-slate-900"}`}>
                      {m.importe}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <div className="text-xs font-semibold text-emerald-300">PRESUPUESTO DE MARKETING</div>
              <h2 className="mt-2 text-xl font-bold">Distribución mensual</h2>

              <div className="mt-6 space-y-5">
                {[
                  ["Google Ads", 420, 35],
                  ["Instagram", 180, 15],
                  ["Email", 45, 4],
                  ["Disponible", 555, 46],
                ].map(([nombre, cantidad, porcentaje]) => (
                  <div key={String(nombre)}>
                    <div className="flex justify-between text-sm">
                      <span>{nombre}</span>
                      <span className="font-semibold">{cantidad} €</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {tab === "Movimientos" && (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold">Historial de movimientos</h2>
          </div>

          {movimientos.map((m, index) => (
            <div
              key={index}
              className="grid gap-3 border-b border-slate-100 p-5 md:grid-cols-[1fr_150px_160px_120px]"
            >
              <div>
                <div className="font-semibold">{m.concepto}</div>
                <div className="mt-1 text-xs text-slate-400">{m.fecha}</div>
              </div>
              <div className="text-sm text-slate-500">{m.tipo}</div>
              <div className={`font-semibold ${m.importe.startsWith("+") ? "text-emerald-600" : ""}`}>
                {m.importe}
              </div>
              <div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {m.estado}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {tab === "Presupuestos" && (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Marketing digital", "1.200 €", "645 € utilizados", 54],
            ["Software e integraciones", "500 €", "185 € utilizados", 37],
            ["Operaciones", "2.000 €", "1.240 € utilizados", 62],
          ].map(([nombre, total, usado, porcentaje]) => (
            <div key={String(nombre)} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold text-blue-600">PRESUPUESTO</div>
              <h3 className="mt-2 font-semibold">{nombre}</h3>
              <div className="mt-5 text-2xl font-bold">{total}</div>
              <div className="mt-1 text-xs text-slate-400">{usado}</div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-slate-900"
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
              <button className="mt-5 text-sm font-semibold text-blue-600">
                Gestionar presupuesto →
              </button>
            </div>
          ))}
        </section>
      )}

      {tab === "Métodos de pago" && (
        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-400">MÉTODO DEMO</div>
                <div className="mt-3 text-lg font-bold">•••• •••• •••• 4242</div>
                <div className="mt-2 text-sm text-slate-500">Empresa Demo S.L.</div>
              </div>
              <div className="text-2xl">💳</div>
            </div>
            <div className="mt-6 text-xs text-slate-400">Tarjeta ficticia para demostración</div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="text-xs font-semibold text-blue-700">IMPLEMENTACIÓN REAL</div>
            <h3 className="mt-2 font-semibold">Pagos mediante proveedores autorizados</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Una versión real utilizaría proveedores de pago autorizados, autenticación segura y los requisitos legales y regulatorios correspondientes. GroupW&J no necesita almacenar directamente los datos completos de la tarjeta.
            </p>
          </div>
        </section>
      )}

      {recargar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() => setRecargar(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-blue-600">SIMULACIÓN</div>
                <h2 className="mt-1 text-xl font-bold">Añadir fondos</h2>
              </div>
              <button onClick={() => setRecargar(false)}>✕</button>
            </div>

            <label className="mt-6 block text-sm font-semibold">Importe</label>
            <div className="mt-2 flex items-center rounded-xl border border-slate-200 px-4">
              <input
                type="number"
                defaultValue="500"
                className="w-full py-3 outline-none"
              />
              <span className="font-semibold">€</span>
            </div>

            <div className="mt-4 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-800">
              Esta acción es únicamente visual y no realizará ningún cobro.
            </div>

            <button
              onClick={() => setRecargar(false)}
              className="mt-5 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white"
            >
              Simular recarga
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
