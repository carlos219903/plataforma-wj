"use client";

import { useState } from "react";

const proveedores = [
  ["TechSupply S.L.", "Material técnico", "12.480 €", "4,9/5", "Activo"],
  ["Distribuciones Norte", "Consumibles", "8.240 €", "4,7/5", "Activo"],
  ["Office Pro", "Oficina", "3.180 €", "4,5/5", "Activo"],
  ["Servicios Logísticos 24", "Transporte", "6.950 €", "4,8/5", "Activo"],
];

const pedidos = [
  ["PO-2048", "TechSupply S.L.", "4.280 €", "24 Sep", "En tránsito"],
  ["PO-2047", "Distribuciones Norte", "1.840 €", "23 Sep", "Preparando"],
  ["PO-2046", "Office Pro", "620 €", "21 Sep", "Recibido"],
  ["PO-2045", "TechSupply S.L.", "2.950 €", "18 Sep", "Recibido"],
];

export default function Proveedores() {
  const [tab, setTab] = useState("Proveedores");
  const [nuevoPedido, setNuevoPedido] = useState(false);

  const tabs = ["Proveedores", "Pedidos", "Facturas", "Pagos"];

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            COMPRAS Y SUMINISTROS
          </p>
          <h1 className="mt-1 text-3xl font-bold">Proveedores y compras</h1>
          <p className="mt-2 text-sm text-slate-500">
            Controla proveedores, pedidos, costes, facturas y pagos desde un único lugar.
          </p>
        </div>

        <button
          onClick={() => setNuevoPedido(true)}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
        >
          + Nuevo pedido
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["24", "Proveedores activos", "+3 este año"],
          ["7.460 €", "Compras pendientes", "3 pedidos"],
          ["31.850 €", "Compras este mes", "-4,2% vs. anterior"],
          ["4,8/5", "Valoración media", "Proveedores"],
        ].map(([value, title, detail]) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-2xl font-bold">{value}</div>
            <div className="mt-1 text-sm font-semibold">{title}</div>
            <div className="mt-2 text-xs text-slate-400">{detail}</div>
          </div>
        ))}
      </section>

      <div className="mt-5 flex gap-2 overflow-x-auto">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold ${
              tab === item
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Proveedores" && (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold">Directorio de proveedores</h2>
            <p className="mt-1 text-xs text-slate-400">
              Rendimiento, compras y relación comercial
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-5 py-3">Proveedor</th>
                  <th className="px-5 py-3">Categoría</th>
                  <th className="px-5 py-3">Compras 2026</th>
                  <th className="px-5 py-3">Valoración</th>
                  <th className="px-5 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map(([nombre, categoria, compras, rating, estado]) => (
                  <tr key={nombre} className="border-t border-slate-100 text-sm">
                    <td className="px-5 py-4 font-semibold">{nombre}</td>
                    <td className="px-5 py-4 text-slate-500">{categoria}</td>
                    <td className="px-5 py-4 font-semibold">{compras}</td>
                    <td className="px-5 py-4">{rating}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === "Pedidos" && (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold">Pedidos de compra</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-5 py-3">Pedido</th>
                  <th className="px-5 py-3">Proveedor</th>
                  <th className="px-5 py-3">Importe</th>
                  <th className="px-5 py-3">Entrega</th>
                  <th className="px-5 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(([id, proveedor, importe, entrega, estado]) => (
                  <tr key={id} className="border-t border-slate-100 text-sm">
                    <td className="px-5 py-4 font-semibold text-blue-600">{id}</td>
                    <td className="px-5 py-4">{proveedor}</td>
                    <td className="px-5 py-4 font-semibold">{importe}</td>
                    <td className="px-5 py-4 text-slate-500">{entrega}</td>
                    <td className="px-5 py-4">{estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === "Facturas" && (
        <section className="mt-5 grid gap-4 lg:grid-cols-3">
          {[
            ["18.420 €", "Facturas pagadas", "Este mes"],
            ["6.280 €", "Pendientes", "5 facturas"],
            ["1.840 €", "Vencen esta semana", "2 facturas"],
          ].map(([value, title, detail]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-2xl font-bold">{value}</div>
              <div className="mt-2 font-semibold">{title}</div>
              <div className="mt-1 text-xs text-slate-400">{detail}</div>
            </div>
          ))}
        </section>
      )}

      {tab === "Pagos" && (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Planificación de pagos</h2>
          <div className="mt-5 space-y-3">
            {[
              ["TechSupply S.L.", "2.840 €", "25 Sep"],
              ["Distribuciones Norte", "1.840 €", "27 Sep"],
              ["Servicios Logísticos 24", "960 €", "30 Sep"],
            ].map(([nombre, importe, fecha]) => (
              <div
                key={nombre}
                className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
              >
                <div>
                  <div className="text-sm font-semibold">{nombre}</div>
                  <div className="mt-1 text-xs text-slate-400">Vence {fecha}</div>
                </div>
                <strong>{importe}</strong>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <div className="text-xs font-bold text-amber-700">
            REPOSICIÓN RECOMENDADA
          </div>
          <h3 className="mt-2 font-semibold">
            4 productos están por debajo del stock mínimo
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            GroupW&J puede generar automáticamente una propuesta de pedido
            utilizando el proveedor, coste y consumo histórico.
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-5 text-white">
          <div className="text-xs font-semibold text-blue-100">
            GROUPW&J INTELLIGENCE
          </div>
          <h3 className="mt-2 font-semibold">
            Posible ahorro detectado: 1.240 €/mes
          </h3>
          <p className="mt-2 text-sm text-blue-100">
            La simulación detecta oportunidades comparando compras, frecuencia,
            proveedores y costes históricos.
          </p>
        </div>
      </section>

      {nuevoPedido && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() => setNuevoPedido(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600">
                  NUEVA COMPRA
                </p>
                <h2 className="mt-1 text-xl font-bold">Crear pedido</h2>
              </div>
              <button onClick={() => setNuevoPedido(false)}>✕</button>
            </div>

            <label className="mt-6 block text-sm font-semibold">Proveedor</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option>TechSupply S.L.</option>
              <option>Distribuciones Norte</option>
              <option>Office Pro</option>
              <option>Servicios Logísticos 24</option>
            </select>

            <label className="mt-5 block text-sm font-semibold">Concepto</label>
            <input
              placeholder="Material, productos, servicio..."
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />

            <label className="mt-5 block text-sm font-semibold">Importe estimado</label>
            <input
              placeholder="0,00 €"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />

            <button
              onClick={() => setNuevoPedido(false)}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white"
            >
              Crear pedido demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
