"use client";

import { useMemo, useState } from "react";

type Cliente = {
  id: string;
  empresa: string;
  contacto: string;
  email: string;
  telefono: string;
  estado: "Activo" | "Prospecto" | "Seguimiento";
  responsable: string;
  facturacion: string;
  ultimaActividad: string;
};

const clientesIniciales: Cliente[] = [
  {
    id: "CL-1028",
    empresa: "Construcciones Rivera S.L.",
    contacto: "Javier Rivera",
    email: "javier@empresa-demo.es",
    telefono: "+34 612 345 810",
    estado: "Activo",
    responsable: "Laura Gómez",
    facturacion: "8.420 €",
    ultimaActividad: "Hoy, 10:32",
  },
  {
    id: "CL-1027",
    empresa: "Clínica Dental Norte",
    contacto: "María Santos",
    email: "maria@clinica-demo.es",
    telefono: "+34 611 294 381",
    estado: "Seguimiento",
    responsable: "Daniel Ruiz",
    facturacion: "3.850 €",
    ultimaActividad: "Ayer, 18:04",
  },
  {
    id: "CL-1026",
    empresa: "Restaurante Central",
    contacto: "Alejandro Martín",
    email: "alejandro@restaurante-demo.es",
    telefono: "+34 622 810 194",
    estado: "Activo",
    responsable: "Laura Gómez",
    facturacion: "5.190 €",
    ultimaActividad: "Ayer, 12:20",
  },
  {
    id: "CL-1025",
    empresa: "Servicios Eléctricos MG",
    contacto: "Miguel García",
    email: "miguel@electricidad-demo.es",
    telefono: "+34 633 729 450",
    estado: "Prospecto",
    responsable: "Carlos Díaz",
    facturacion: "0 €",
    ultimaActividad: "22 Sep, 16:40",
  },
];

const pipeline = [
  { etapa: "Nuevos leads", cantidad: 23, valor: "18.400 €" },
  { etapa: "Contactados", cantidad: 17, valor: "14.750 €" },
  { etapa: "Reunión", cantidad: 9, valor: "10.200 €" },
  { etapa: "Propuesta", cantidad: 6, valor: "7.850 €" },
  { etapa: "Negociación", cantidad: 4, valor: "5.900 €" },
  { etapa: "Ganados", cantidad: 8, valor: "12.600 €" },
];

export default function CRM() {
  const [busqueda, setBusqueda] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] =
    useState<Cliente | null>(null);

  const clientes = useMemo(() => {
    const q = busqueda.toLowerCase().trim();

    if (!q) return clientesIniciales;

    return clientesIniciales.filter((cliente) =>
      `${cliente.empresa} ${cliente.contacto} ${cliente.email} ${cliente.estado}`
        .toLowerCase()
        .includes(q)
    );
  }, [busqueda]);

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            CRM · Gestión comercial
          </p>
          <h1 className="mt-1 text-3xl font-bold">Clientes y ventas</h1>
          <p className="mt-2 text-sm text-slate-500">
            Controla clientes, oportunidades, contactos y todo el proceso comercial.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm">
            Importar
          </button>
          <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
            + Nuevo cliente
          </button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["284", "Clientes activos", "+18 este mes"],
          ["73", "Oportunidades", "48.900 € potencial"],
          ["61", "Ventas cerradas", "+14,8%"],
          ["42.850 €", "Facturación", "+12,4%"],
        ].map(([value, label, detail]) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-2xl font-bold">{value}</div>
            <div className="mt-1 text-sm font-medium text-slate-700">{label}</div>
            <div className="mt-2 text-xs font-medium text-emerald-600">
              {detail}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Pipeline comercial</h2>
            <p className="text-xs text-slate-400">
              Oportunidades por etapa de venta
            </p>
          </div>

          <button className="text-sm font-semibold text-blue-600">
            Ver oportunidades
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {pipeline.map((item, index) => (
            <div
              key={item.etapa}
              className="relative rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-700">
                  {index + 1}
                </span>
                <span className="text-xs text-slate-400">{item.cantidad}</span>
              </div>

              <div className="text-sm font-semibold">{item.etapa}</div>
              <div className="mt-1 text-xs text-slate-500">{item.valor}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 md:flex-row md:items-center">
          <div>
            <h2 className="font-semibold">Base de clientes</h2>
            <p className="text-xs text-slate-400">
              Información comercial centralizada
            </p>
          </div>

          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar cliente..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-blue-400 md:w-72"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3">Responsable</th>
                <th className="px-5 py-3">Facturación</th>
                <th className="px-5 py-3">Última actividad</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {clientes.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold">{cliente.empresa}</div>
                    <div className="mt-1 text-xs text-slate-400">
                      {cliente.contacto} · {cliente.id}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        cliente.estado === "Activo"
                          ? "bg-emerald-50 text-emerald-700"
                          : cliente.estado === "Prospecto"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {cliente.estado}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {cliente.responsable}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold">
                    {cliente.facturacion}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {cliente.ultimaActividad}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setClienteSeleccionado(cliente)}
                      className="text-sm font-semibold text-blue-600"
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

      {clienteSeleccionado && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/30"
          onClick={() => setClienteSeleccionado(null)}
        >
          <div
            className="h-full w-full max-w-lg overflow-y-auto bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold text-blue-600">
                  {clienteSeleccionado.id}
                </div>
                <h2 className="mt-1 text-2xl font-bold">
                  {clienteSeleccionado.empresa}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {clienteSeleccionado.contacto}
                </p>
              </div>

              <button
                onClick={() => setClienteSeleccionado(null)}
                className="rounded-lg bg-slate-100 px-3 py-2"
              >
                ✕
              </button>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-xs text-slate-400">Facturación</div>
                <div className="mt-1 font-bold">
                  {clienteSeleccionado.facturacion}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-xs text-slate-400">Estado</div>
                <div className="mt-1 font-bold">
                  {clienteSeleccionado.estado}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase text-slate-400">
                  Email
                </div>
                <div className="mt-1 text-sm">{clienteSeleccionado.email}</div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase text-slate-400">
                  Teléfono
                </div>
                <div className="mt-1 text-sm">{clienteSeleccionado.telefono}</div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase text-slate-400">
                  Responsable
                </div>
                <div className="mt-1 text-sm">
                  {clienteSeleccionado.responsable}
                </div>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="font-semibold">Actividad del cliente</h3>

              {[
                ["Llamada comercial realizada", "Hoy · 10:32"],
                ["Presupuesto enviado", "Ayer · 17:20"],
                ["Formulario recibido desde la web", "20 Sep · 09:14"],
                ["Cliente creado automáticamente", "20 Sep · 09:14"],
              ].map(([title, time]) => (
                <div
                  key={title}
                  className="mt-3 rounded-xl border border-slate-100 p-4"
                >
                  <div className="text-sm font-medium">{title}</div>
                  <div className="mt-1 text-xs text-slate-400">{time}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-slate-200 py-3 text-sm font-semibold">
                Enviar email
              </button>
              <button className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white">
                Crear oportunidad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
