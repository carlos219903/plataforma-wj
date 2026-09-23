"use client";

import { useState } from "react";

type Producto = {
  sku: string;
  nombre: string;
  categoria: string;
  stock: number;
  minimo: number;
  reservado: number;
  coste: string;
  precio: string;
  margen: string;
  proveedor: string;
};

const productos: Producto[] = [
  { sku:"PR-001", nombre:"Kit instalación profesional", categoria:"Material", stock:42, minimo:15, reservado:8, coste:"68 €", precio:"129 €", margen:"47%", proveedor:"Suministros Norte" },
  { sku:"PR-002", nombre:"Cableado técnico 100m", categoria:"Material", stock:9, minimo:12, reservado:4, coste:"54 €", precio:"92 €", margen:"41%", proveedor:"ElectroSupply" },
  { sku:"PR-003", nombre:"Módulo control inteligente", categoria:"Equipamiento", stock:18, minimo:8, reservado:6, coste:"120 €", precio:"249 €", margen:"52%", proveedor:"Tech Industrial" },
  { sku:"PR-004", nombre:"Sensor profesional", categoria:"Equipamiento", stock:6, minimo:10, reservado:2, coste:"39 €", precio:"89 €", margen:"56%", proveedor:"Tech Industrial" },
  { sku:"PR-005", nombre:"Pack mantenimiento", categoria:"Servicio", stock:84, minimo:20, reservado:12, coste:"22 €", precio:"79 €", margen:"72%", proveedor:"Interno" },
];

export default function Inventario() {
  const [vista, setVista] = useState("Inventario");
  const [producto, setProducto] = useState<Producto | null>(null);

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-cyan-600">
            INVENTARIO · COMPRAS Y STOCK
          </p>
          <h1 className="mt-1 text-3xl font-bold">Productos e inventario</h1>
          <p className="mt-2 text-sm text-slate-500">
            Controla productos, materiales, almacenes, proveedores y movimientos de stock.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold">
            Registrar movimiento
          </button>
          <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
            + Nuevo producto
          </button>
        </div>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["Inventario","Movimientos","Compras","Proveedores","Almacenes"].map(item => (
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
          ["248","Referencias","5 categorías"],
          ["38.420 €","Valor inventario","+6,8%"],
          ["4","Stock bajo","Requieren atención"],
          ["12","Proveedores","9 activos"],
          ["17","Movimientos hoy","8 entradas · 9 salidas"],
        ].map(([v,l,d]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{v}</div>
            <div className="mt-1 text-sm font-medium">{l}</div>
            <div className="mt-2 text-xs text-slate-400">{d}</div>
          </div>
        ))}
      </section>

      {vista === "Inventario" && (
        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="font-semibold">Stock actual</h2>
              <p className="text-xs text-slate-400">
                Existencias y disponibilidad en tiempo real
              </p>
            </div>
            <span className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
              4 alertas de stock
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-5 py-3">Producto</th>
                  <th className="px-5 py-3">Stock</th>
                  <th className="px-5 py-3">Reservado</th>
                  <th className="px-5 py-3">Coste</th>
                  <th className="px-5 py-3">Precio</th>
                  <th className="px-5 py-3">Margen</th>
                  <th className="px-5 py-3">Proveedor</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {productos.map(p => (
                  <tr key={p.sku} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="font-semibold">{p.nombre}</div>
                      <div className="mt-1 text-xs text-slate-400">
                        {p.sku} · {p.categoria}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`font-bold ${p.stock <= p.minimo ? "text-red-600" : "text-slate-900"}`}>
                        {p.stock}
                      </span>
                      {p.stock <= p.minimo && (
                        <div className="text-[10px] font-semibold text-red-500">STOCK BAJO</div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm">{p.reservado}</td>
                    <td className="px-5 py-4 text-sm">{p.coste}</td>
                    <td className="px-5 py-4 text-sm font-semibold">{p.precio}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-emerald-600">{p.margen}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{p.proveedor}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => setProducto(p)} className="text-sm font-semibold text-blue-600">
                        Abrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {vista !== "Inventario" && (
        <section className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{vista}</h2>
            <p className="mt-1 text-sm text-slate-400">Actividad reciente de inventario</p>

            <div className="mt-5 space-y-3">
              {[
                ["Entrada · Kit instalación","+24 unidades","Hoy · 11:42"],
                ["Salida · Sensor profesional","-3 unidades","Hoy · 10:18"],
                ["Reserva · Módulo control","-6 disponibles","Hoy · 09:54"],
                ["Compra · Cableado técnico","+50 unidades","Ayer · 16:20"],
                ["Salida · Pack mantenimiento","-8 unidades","Ayer · 14:08"],
              ].map(([titulo,cantidad,fecha]) => (
                <div key={titulo} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                  <div>
                    <div className="text-sm font-semibold">{titulo}</div>
                    <div className="text-xs text-slate-400">{fecha}</div>
                  </div>
                  <strong>{cantidad}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Reposición recomendada</h3>
            <div className="mt-5 space-y-3">
              {[
                ["Cableado técnico","Comprar 40"],
                ["Sensor profesional","Comprar 25"],
                ["Conectores","Comprar 100"],
                ["Material auxiliar","Comprar 30"],
              ].map(([producto,cantidad]) => (
                <div key={producto} className="rounded-xl bg-slate-50 p-4">
                  <div className="text-sm font-semibold">{producto}</div>
                  <div className="mt-1 text-xs text-red-500">{cantidad}</div>
                </div>
              ))}
            </div>

            <button className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white">
              Generar pedido
            </button>
          </div>
        </section>
      )}

      {producto && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/30" onClick={() => setProducto(null)}>
          <div className="h-full w-full max-w-xl overflow-y-auto bg-white p-7 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-cyan-600">{producto.sku}</div>
                <h2 className="mt-1 text-2xl font-bold">{producto.nombre}</h2>
                <p className="text-sm text-slate-500">{producto.categoria}</p>
              </div>
              <button onClick={() => setProducto(null)} className="h-10 rounded-lg bg-slate-100 px-3">✕</button>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {[
                ["Stock",`${producto.stock} unidades`],
                ["Reservado",`${producto.reservado} unidades`],
                ["Stock mínimo",`${producto.minimo} unidades`],
                ["Proveedor",producto.proveedor],
                ["Coste",producto.coste],
                ["Precio venta",producto.precio],
                ["Margen",producto.margen],
                ["Disponible",`${producto.stock - producto.reservado} unidades`],
              ].map(([l,v]) => (
                <div key={l} className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-400">{l}</div>
                  <div className="mt-1 font-bold">{v}</div>
                </div>
              ))}
            </div>

            <h3 className="mt-7 font-semibold">Últimos movimientos</h3>
            {[
              ["Salida a trabajo TR-1052","-4","Hoy · 10:42"],
              ["Entrada proveedor","+20","20 Sep · 16:15"],
              ["Reserva trabajo TR-1049","-2","19 Sep · 11:20"],
            ].map(([m,c,f]) => (
              <div key={m} className="mt-3 flex justify-between rounded-xl border border-slate-100 p-4">
                <div>
                  <div className="text-sm font-medium">{m}</div>
                  <div className="text-xs text-slate-400">{f}</div>
                </div>
                <strong>{c}</strong>
              </div>
            ))}

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-slate-200 py-3 text-sm font-semibold">
                Ajustar stock
              </button>
              <button className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white">
                Crear pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
