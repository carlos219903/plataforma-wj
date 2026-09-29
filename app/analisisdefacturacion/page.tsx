"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Cliente = {
  id: string;
  numero_cliente: string | null;
  empresa: string | null;
  sector: string | null;
  telefono: string | null;
  email: string | null;
  estado: string | null;
  plan: string | null;
  precio_alta: number | null;
  precio_mensual: number | null;
  contrato_firmado: boolean | null;
  estado_pago: string | null;
  fecha_alta: string | null;
  fecha_proximo_pago: string | null;
};

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  web_origen: string | null;
  codigo_afiliado: string | null;
  created_at: string | null;
};

type Resumen = {
  totalClientes: number;
  activos: number;
  impagados: number;
  cancelados: number;
  mrr: number;
  ingresosAlta: number;
  leads: number;
};

type FacturacionResponse = {
  ok: boolean;
  error?: string;
  resumen?: Resumen;
  clientes?: Cliente[];
  leads?: Lead[];
};

const resumenVacio: Resumen = {
  totalClientes: 0,
  activos: 0,
  impagados: 0,
  cancelados: 0,
  mrr: 0,
  ingresosAlta: 0,
  leads: 0,
};

function dinero(valor: number | null | undefined) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(Number(valor || 0));
}

function fecha(valor: string | null) {
  if (!valor) return "—";

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(valor));
}

export default function AnalisisFacturacionPage() {
  const router = useRouter();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [resumen, setResumen] = useState<Resumen>(resumenVacio);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/facturacion", {
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data: FacturacionResponse = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Error cargando facturación");
      }

      setClientes(data.clientes || []);
      setLeads(data.leads || []);
      setResumen(data.resumen || resumenVacio);
    } catch {
      setError("No se pudieron cargar los datos de facturación.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const clientesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) return clientes;

    return clientes.filter((cliente) =>
      [
        cliente.numero_cliente,
        cliente.empresa,
        cliente.email,
        cliente.telefono,
        cliente.plan,
      ].some((valor) => valor?.toLowerCase().includes(texto))
    );
  }, [clientes, busqueda]);

  async function cerrarSesion() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              GroupW&J
            </p>
            <h1 className="mt-1 text-2xl font-bold">
              Análisis de facturación
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => router.push("/analisisdecontacto")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50"
            >
              Contactos
            </button>

            <button
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              Ventas
            </button>

            <button
              onClick={() => void cargar()}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50"
            >
              Actualizar
            </button>

            <button
              onClick={cerrarSesion}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 md:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Ventas y clientes
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Control de facturación, clientes, pagos y oportunidades comerciales.
          </p>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            ["MRR", dinero(resumen.mrr), "Recurrente mensual"],
            ["Clientes", resumen.totalClientes, "Total registrados"],
            ["Activos", resumen.activos, "Clientes activos"],
            ["Impagados", resumen.impagados, "Requieren seguimiento"],
            ["Cancelados", resumen.cancelados, "Clientes cancelados"],
            ["Leads", resumen.leads, "Oportunidades"],
          ].map(([titulo, valor, descripcion]) => (
            <div
              key={titulo}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">
                {titulo}
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight">
                {valor}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                {descripcion}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Ingresos por altas registrados
            </p>
            <p className="mt-2 text-4xl font-bold tracking-tight">
              {dinero(resumen.ingresosAlta)}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Suma del precio de alta de los clientes registrados.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Valor recurrente anual estimado
            </p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-blue-700">
              {dinero(resumen.mrr * 12)}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Proyección del MRR actual durante doce meses.
            </p>
          </div>
        </section>

        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-bold">Clientes</h3>
              <p className="mt-1 text-sm text-slate-500">
                Estado comercial y de facturación.
              </p>
            </div>

            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar cliente, email, plan..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 md:w-80"
            />
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Cargando facturación...
            </div>
          ) : error ? (
            <div className="p-10 text-center text-red-600">
              {error}
            </div>
          ) : clientesFiltrados.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No hay clientes que mostrar.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1150px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Cliente</th>
                    <th className="px-5 py-4">Contacto</th>
                    <th className="px-5 py-4">Plan</th>
                    <th className="px-5 py-4">Mensual</th>
                    <th className="px-5 py-4">Alta</th>
                    <th className="px-5 py-4">Estado</th>
                    <th className="px-5 py-4">Pago</th>
                    <th className="px-5 py-4">Próximo pago</th>
                    <th className="px-5 py-4">Contrato</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {clientesFiltrados.map((cliente) => (
                    <tr
                      key={cliente.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-5">
                        <div className="font-bold text-slate-900">
                          {cliente.empresa || "Sin empresa"}
                        </div>
                        <div className="mt-1 text-xs font-medium text-blue-600">
                          {cliente.numero_cliente || "Sin nº cliente"}
                        </div>
                        {cliente.sector && (
                          <div className="mt-1 text-xs text-slate-400">
                            {cliente.sector}
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-5">
                        <div className="text-sm font-medium">
                          {cliente.email || "—"}
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          {cliente.telefono || "—"}
                        </div>
                      </td>

                      <td className="px-5 py-5 font-semibold">
                        {cliente.plan || "—"}
                      </td>

                      <td className="px-5 py-5 font-bold">
                        {dinero(cliente.precio_mensual)}
                      </td>

                      <td className="px-5 py-5">
                        {dinero(cliente.precio_alta)}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                            cliente.estado?.toLowerCase() === "activo"
                              ? "bg-emerald-50 text-emerald-700"
                              : cliente.estado?.toLowerCase() === "cancelado"
                                ? "bg-red-50 text-red-700"
                                : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {cliente.estado || "Sin estado"}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                            cliente.estado_pago?.toLowerCase() === "impagado"
                              ? "bg-red-50 text-red-700"
                              : cliente.estado_pago
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {cliente.estado_pago || "Pendiente"}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-sm">
                        {fecha(cliente.fecha_proximo_pago)}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                            cliente.contrato_firmado
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {cliente.contrato_firmado ? "Firmado" : "Pendiente"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-5">
            <h3 className="font-bold">Leads recientes</h3>
            <p className="mt-1 text-sm text-slate-500">
              Últimas oportunidades comerciales registradas.
            </p>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Cargando leads...
            </div>
          ) : leads.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No hay leads registrados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Lead</th>
                    <th className="px-5 py-4">Contacto</th>
                    <th className="px-5 py-4">Origen</th>
                    <th className="px-5 py-4">Afiliado</th>
                    <th className="px-5 py-4">Fecha</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {leads.slice(0, 20).map((lead) => (
                    <tr
                      key={lead.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-5 font-semibold">
                        {lead.name || "Sin nombre"}
                      </td>

                      <td className="px-5 py-5">
                        <div className="text-sm">
                          {lead.email || "—"}
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          {lead.phone || "—"}
                        </div>
                      </td>

                      <td className="px-5 py-5 text-sm">
                        {lead.web_origen || "—"}
                      </td>

                      <td className="px-5 py-5 text-sm">
                        {lead.codigo_afiliado || "—"}
                      </td>

                      <td className="px-5 py-5 text-sm">
                        {fecha(lead.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
