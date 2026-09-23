"use client";

import { useState } from "react";

const documentos = [
  { nombre: "Contrato Construcciones Rivera", tipo: "Contrato", relacionado: "Construcciones Rivera S.L.", fecha: "22 Sep 2026", estado: "Firmado", tamano: "1,4 MB" },
  { nombre: "Factura F-2026-0842", tipo: "Factura", relacionado: "Clínica Nova", fecha: "21 Sep 2026", estado: "Emitida", tamano: "428 KB" },
  { nombre: "Presupuesto PR-1098", tipo: "Presupuesto", relacionado: "Restaurante Central", fecha: "20 Sep 2026", estado: "Pendiente", tamano: "612 KB" },
  { nombre: "Contrato laboral Daniel García", tipo: "RRHH", relacionado: "Daniel García", fecha: "15 Sep 2026", estado: "Firmado", tamano: "1,1 MB" },
  { nombre: "Prevención de riesgos 2026", tipo: "RRHH", relacionado: "Toda la empresa", fecha: "10 Sep 2026", estado: "Vigente", tamano: "2,8 MB" },
  { nombre: "Acuerdo proveedor TechSupply", tipo: "Proveedor", relacionado: "TechSupply S.L.", fecha: "5 Sep 2026", estado: "Firmado", tamano: "940 KB" },
  { nombre: "Informe comercial Agosto", tipo: "Informe", relacionado: "Dirección", fecha: "1 Sep 2026", estado: "Finalizado", tamano: "3,2 MB" },
];

export default function Documentos() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [subir, setSubir] = useState(false);
  const [seleccionado, setSeleccionado] = useState<(typeof documentos)[number] | null>(null);

  const categorias = ["Todos", "Contrato", "Factura", "Presupuesto", "RRHH", "Proveedor", "Informe"];

  const filtrados = documentos.filter((doc) => {
    const coincideCategoria = categoria === "Todos" || doc.tipo === categoria;
    const texto = `${doc.nombre} ${doc.tipo} ${doc.relacionado}`.toLowerCase();
    return coincideCategoria && texto.includes(busqueda.toLowerCase());
  });

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">GESTIÓN DOCUMENTAL</p>
          <h1 className="mt-1 text-3xl font-bold">Documentos</h1>
          <p className="mt-2 text-sm text-slate-500">
            Centraliza contratos, facturas, presupuestos y archivos de toda la empresa.
          </p>
        </div>

        <button
          onClick={() => setSubir(true)}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          + Subir documento
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["1.284", "Documentos", "+48 este mes"],
          ["38", "Pendientes de firma", "7 prioritarios"],
          ["94", "Facturas archivadas", "Este año"],
          ["12,8 GB", "Almacenamiento", "de 50 GB"],
        ].map(([valor, titulo, detalle]) => (
          <div key={titulo} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{valor}</div>
            <div className="mt-1 text-sm font-semibold">{titulo}</div>
            <div className="mt-2 text-xs text-slate-400">{detalle}</div>
          </div>
        ))}
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold">Biblioteca empresarial</h2>
              <p className="mt-1 text-xs text-slate-400">
                Documentación de clientes, empleados, proveedores y administración
              </p>
            </div>

            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar documento..."
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 xl:w-[280px]"
            />
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {categorias.map((item) => (
              <button
                key={item}
                onClick={() => setCategoria(item)}
                className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold ${
                  categoria === item
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3">Documento</th>
                <th className="px-5 py-3">Categoría</th>
                <th className="px-5 py-3">Relacionado con</th>
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3">Tamaño</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {filtrados.map((doc) => (
                <tr key={doc.nombre} className="border-t border-slate-100 text-sm">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
                        ▤
                      </div>
                      <div className="font-semibold">{doc.nombre}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{doc.tipo}</td>
                  <td className="px-5 py-4 text-slate-500">{doc.relacionado}</td>
                  <td className="px-5 py-4 text-slate-500">{doc.fecha}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        doc.estado === "Pendiente"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {doc.estado}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{doc.tamano}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSeleccionado(doc)}
                      className="font-semibold text-blue-600"
                    >
                      Abrir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        {[
          ["✍", "Firma de documentos", "Envía contratos y documentos para firma y controla quién los ha firmado."],
          ["⚡", "Automatización documental", "Genera documentos automáticamente desde clientes, trabajos, empleados o facturas."],
          ["🔒", "Permisos y seguridad", "Define qué documentos puede consultar, modificar o descargar cada usuario."],
        ].map(([icono, titulo, texto]) => (
          <div key={titulo} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl">{icono}</div>
            <h3 className="mt-4 font-semibold">{titulo}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{texto}</p>
          </div>
        ))}
      </section>

      {seleccionado && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/40"
          onClick={() => setSeleccionado(null)}
        >
          <div
            className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-blue-600">{seleccionado.tipo}</p>
                <h2 className="mt-2 text-xl font-bold">{seleccionado.nombre}</h2>
              </div>
              <button onClick={() => setSeleccionado(null)}>✕</button>
            </div>

            <div className="mt-7 flex h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
              <div className="text-center">
                <div className="text-5xl">📄</div>
                <div className="mt-4 text-sm font-semibold">Vista previa del documento</div>
                <div className="mt-1 text-xs text-slate-400">
                  Simulación de la demo GroupW&J
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                <span className="text-slate-400">Relacionado con</span>
                <strong>{seleccionado.relacionado}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                <span className="text-slate-400">Fecha</span>
                <strong>{seleccionado.fecha}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                <span className="text-slate-400">Estado</span>
                <strong>{seleccionado.estado}</strong>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Tamaño</span>
                <strong>{seleccionado.tamano}</strong>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-slate-200 py-3 text-sm font-semibold">
                Descargar
              </button>
              <button className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white">
                Compartir
              </button>
            </div>
          </div>
        </div>
      )}

      {subir && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() => setSubir(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600">NUEVO DOCUMENTO</p>
                <h2 className="mt-1 text-xl font-bold">Subir documento</h2>
              </div>
              <button onClick={() => setSubir(false)}>✕</button>
            </div>

            <div className="mt-6 flex h-40 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
              <div className="text-center">
                <div className="text-3xl">↑</div>
                <div className="mt-2 text-sm font-semibold">Seleccionar archivo</div>
                <div className="mt-1 text-xs text-slate-400">
                  PDF, DOCX, XLSX, JPG o PNG
                </div>
              </div>
            </div>

            <label className="mt-5 block text-sm font-semibold">Categoría</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option>Contrato</option>
              <option>Factura</option>
              <option>Presupuesto</option>
              <option>RRHH</option>
              <option>Proveedor</option>
              <option>Informe</option>
              <option>Otro</option>
            </select>

            <button
              onClick={() => setSubir(false)}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white"
            >
              Guardar documento demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
