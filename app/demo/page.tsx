"use client";

import { useState } from "react";
import CRM from "@/components/demo/crm/CRM";
import Empleados from "@/components/demo/empleados/Empleados";
import Operaciones from "@/components/demo/operaciones/Operaciones";
import Finanzas from "@/components/demo/finanzas/Finanzas";
import Inventario from "@/components/demo/inventario/Inventario";
import Marketing from "@/components/demo/marketing/Marketing";
import Leads from "@/components/demo/leads/Leads";
import Analytics from "@/components/demo/analytics/Analytics";
import Comunicaciones from "@/components/demo/comunicaciones/Comunicaciones";
import Automatizaciones from "@/components/demo/automatizaciones/Automatizaciones";
import Cartera from "@/components/demo/cartera/Cartera";
import Reportes from "@/components/demo/reportes/Reportes";
import Soporte from "@/components/demo/soporte/Soporte";
import Integraciones from "@/components/demo/integraciones/Integraciones";
import Configuracion from "@/components/demo/configuracion/Configuracion";
import Documentos from "@/components/demo/documentos/Documentos";
import Proveedores from "@/components/demo/proveedores/Proveedores";
import Calendario from "@/components/demo/calendario/Calendario";
import PanelEmpleado from "@/components/demo/empleado/PanelEmpleado";

const menu = [
  ["▦", "Centro de control"],
  ["◎", "Clientes y CRM"],
  ["♙", "Empleados"],
  ["✓", "Operaciones y tareas"],
  ["◫", "Calendario y agenda"],
  ["€", "Finanzas"],
  ["□", "Productos e inventario"],
  ["▧", "Proveedores y compras"],
  ["✦", "Marketing IA"],
  ["↗", "Leads y ofertas"],
  ["◉", "Web y conversiones"],
  ["✉", "Comunicaciones"],
  ["◈", "Cartera"],
  ["▣", "Documentos"],
  ["▤", "Reportes"],
  ["⚡", "Automatizaciones"],
  ["?", "Soporte GroupW&J"],
  ["⌁", "Integraciones"],
  ["⚙", "Configuración"],
];

const stats = [
  { title: "Facturación mensual", value: "42.850 €", change: "+12,4%" },
  { title: "Clientes activos", value: "284", change: "+18 este mes" },
  { title: "Nuevos leads", value: "73", change: "+21,6%" },
  { title: "Trabajos activos", value: "38", change: "12 para hoy" },
];

const activities = [
  ["Nuevo lead recibido", "Laura Martínez · Formulario web", "Hace 4 min"],
  ["Trabajo completado", "Instalación #TR-1048", "Hace 18 min"],
  ["Nuevo cliente", "Construcciones Rivera S.L.", "Hace 34 min"],
  ["Campaña actualizada", "Google Ads · Servicios Madrid", "Hace 1 h"],
  ["Empleado fichado", "Daniel García", "Hace 1 h"],
];

export default function DemoPage() {
  const [active, setActive] = useState("Centro de control");
  const [tipoPanel, setTipoPanel] = useState<"empresario" | "empleado">("empresario");
  const [accionesAbiertas, setAccionesAbiertas] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="flex min-h-screen">
        {tipoPanel === "empresario" && (
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 overflow-hidden border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="border-b border-slate-100 px-6 py-6">
            <div className="text-xl font-black tracking-tight">
              Group<span className="text-blue-600">W&J</span>
            </div>
            <div className="mt-1 text-xs text-slate-400">Business OS</div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 [scrollbar-width:thin]">
            <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Gestión empresarial
            </p>

            {menu.map(([icon, label]) => (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  active === label
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-sm">
                  {icon}
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 p-4">
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="text-sm font-semibold">Carlos Rodríguez</div>
              <div className="text-xs text-slate-400">Administrador</div>
            </div>
          </div>
        </aside>
        )}

        <main className="min-w-0 flex-1">
          <div className="border-b border-blue-100 bg-blue-50 px-5 py-2 text-center text-xs font-medium text-blue-700">
            DEMO GROUPW&J · Estás utilizando datos ficticios de demostración
          </div>

          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:px-8">
            <div>
              <p className="text-xs text-slate-400">Empresa</p>
              <h2 className="font-semibold">Empresa Demo S.L.</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center rounded-xl bg-slate-100 p-1 md:flex">
                <button
                  onClick={() => setTipoPanel("empresario")}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    tipoPanel === "empresario"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Panel empresario
                </button>

                <button
                  onClick={() => setTipoPanel("empleado")}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    tipoPanel === "empleado"
                      ? "bg-white text-violet-700 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Panel empleado
                </button>
              </div>

              <a
                href="/formulario"
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Quiero este sistema
              </a>
            </div>
          </header>

          <div className="p-5 md:p-8">
            <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-200/70 p-1 md:hidden">
              <button
                onClick={() => setTipoPanel("empresario")}
                className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                  tipoPanel === "empresario"
                    ? "bg-white shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Empresario
              </button>
              <button
                onClick={() => setTipoPanel("empleado")}
                className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                  tipoPanel === "empleado"
                    ? "bg-white text-violet-700 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Empleado
              </button>
            </div>

            {tipoPanel === "empleado" && <PanelEmpleado />}

            {tipoPanel === "empresario" && (
            <>
            <div className="mb-5 lg:hidden">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Módulos
                </span>
                <span className="text-xs font-semibold text-blue-600">
                  {active}
                </span>
              </div>

              <div className="-mx-5 flex max-w-[calc(100vw)] touch-pan-x gap-2 overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
                {menu.map(([icon, label]) => (
                  <button
                    key={label}
                    onClick={() => setActive(label)}
                    className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                      active === label
                        ? "border-blue-200 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
            {active === "Clientes y CRM" && <CRM />}
            {active === "Empleados" && <Empleados />}
            {active === "Operaciones y tareas" && <Operaciones />}
            {active === "Calendario y agenda" && <Calendario />}
            {active === "Finanzas" && <Finanzas />}
            {active === "Productos e inventario" && <Inventario />}
            {active === "Proveedores y compras" && <Proveedores />}
            {active === "Marketing IA" && <Marketing />}
            {active === "Leads y ofertas" && <Leads />}
            {active === "Web y conversiones" && <Analytics />}
            {active === "Comunicaciones" && <Comunicaciones />}
            {active === "Cartera" && <Cartera />}
            {active === "Documentos" && <Documentos />}
            {active === "Reportes" && <Reportes />}
            {active === "Automatizaciones" && <Automatizaciones />}
            {active === "Soporte GroupW&J" && <Soporte />}
            {active === "Integraciones" && <Integraciones />}
            {active === "Configuración" && <Configuracion />}

            {active !== "Centro de control" && active !== "Clientes y CRM" && active !== "Empleados" && active !== "Operaciones y tareas" && active !== "Calendario y agenda" && active !== "Finanzas" && active !== "Productos e inventario" && active !== "Proveedores y compras" && active !== "Marketing IA" && active !== "Leads y ofertas" && active !== "Web y conversiones" && active !== "Comunicaciones" && active !== "Cartera" && active !== "Documentos" && active !== "Reportes" && active !== "Automatizaciones" && active !== "Soporte GroupW&J" && active !== "Integraciones" && active !== "Configuración" && (
              <div className="mb-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Módulo GroupW&J
                </p>
                <h1 className="mt-2 text-2xl font-bold">{active}</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Este módulo formará parte de la demo interactiva. Lo construiremos a continuación.
                </p>
              </div>
            )}

            {active === "Centro de control" && (
              <>
                <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-sm text-slate-500">Buenos días, Carlos</p>
                    <h1 className="mt-1 text-2xl font-bold md:text-3xl">
                      Centro de control
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                      Todo lo que está ocurriendo en tu empresa, desde un único lugar.
                    </p>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setAccionesAbiertas(!accionesAbiertas)}
                      className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                    >
                      + Crear acción
                    </button>

                    {accionesAbiertas && (
                      <div className="absolute right-0 top-12 z-40 w-[280px] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                        <div className="px-3 pb-2 pt-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Acción rápida
                          </div>
                        </div>

                        {[
                          ["◎", "Nuevo cliente", "Clientes y CRM"],
                          ["↗", "Registrar lead", "Leads y ofertas"],
                          ["✓", "Crear trabajo", "Operaciones y tareas"],
                          ["✦", "Crear campaña", "Marketing IA"],
                          ["€", "Registrar ingreso", "Finanzas"],
                          ["♙", "Gestionar empleado", "Empleados"],
                        ].map(([icon, label, destino]) => (
                          <button
                            key={label}
                            onClick={() => {
                              setActive(destino);
                              setAccionesAbiertas(false);
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
                              {icon}
                            </span>
                            <span className="text-sm font-semibold text-slate-700">
                              {label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <p className="text-sm text-slate-500">{stat.title}</p>
                      <div className="mt-3 flex items-end justify-between gap-2">
                        <strong className="text-2xl">{stat.value}</strong>
                        <span className="text-xs font-semibold text-emerald-600">
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </section>

                <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Accesos rápidos</h3>
                      <p className="mt-1 text-xs text-slate-400">
                        Gestiona cualquier área de tu empresa desde aquí
                      </p>
                    </div>
                    <span className="hidden text-xs font-semibold text-blue-600 sm:block">
                      Sistema centralizado
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      ["◎", "CRM", "Clientes y oportunidades", "Clientes y CRM"],
                      ["♙", "Empleados", "Equipo, horarios y nóminas", "Empleados"],
                      ["✓", "Operaciones", "Trabajos, tareas y procesos", "Operaciones y tareas"],
                      ["€", "Finanzas", "Ingresos, gastos y facturas", "Finanzas"],
                      ["□", "Inventario", "Stock, compras y proveedores", "Productos e inventario"],
                      ["✦", "Marketing IA", "Campañas y contenido", "Marketing IA"],
                      ["↗", "Leads", "Contactos, ofertas y citas", "Leads y ofertas"],
                      ["◉", "Analítica", "Web, llamadas y conversiones", "Web y conversiones"],
                    ].map(([icon, title, description, destino]) => (
                      <button
                        key={title}
                        onClick={() => setActive(destino)}
                        className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm transition group-hover:bg-blue-600 group-hover:text-white">
                          {icon}
                        </span>

                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-slate-800">
                            {title}
                          </span>
                          <span className="mt-1 block text-[11px] leading-4 text-slate-400">
                            {description}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_.8fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Rendimiento comercial</h3>
                        <p className="text-xs text-slate-400">Últimos 30 días</p>
                      </div>
                      <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                        +18,7%
                      </span>
                    </div>

                    <div className="flex h-[220px] items-end gap-2">
                      {[38, 51, 43, 68, 58, 76, 63, 82, 72, 91, 78, 96].map(
                        (height, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-md bg-blue-500/80"
                            style={{ height: `${height}%` }}
                          />
                        )
                      )}
                    </div>

                    <div className="mt-3 flex justify-between text-[10px] text-slate-400">
                      <span>1 Sep</span>
                      <span>7 Sep</span>
                      <span>14 Sep</span>
                      <span>21 Sep</span>
                      <span>Hoy</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="font-semibold">Embudo comercial</h3>
                    <p className="mb-5 text-xs text-slate-400">Conversión este mes</p>

                    {[
                      ["Visitas web", "3.842", "100%"],
                      ["Leads", "428", "11,1%"],
                      ["Citas", "146", "34,1%"],
                      ["Clientes", "61", "41,8%"],
                      ["Ventas", "48", "78,7%"],
                    ].map(([name, value, rate]) => (
                      <div
                        key={name}
                        className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0"
                      >
                        <div>
                          <div className="text-sm font-medium">{name}</div>
                          <div className="text-xs text-slate-400">{rate} conversión</div>
                        </div>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold">Actividad reciente</h3>
                      <button className="text-xs font-semibold text-blue-600">Ver todo</button>
                    </div>

                    {activities.map(([title, description, time]) => (
                      <div
                        key={title + description}
                        className="flex gap-3 border-b border-slate-100 py-3 last:border-0"
                      >
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium">{title}</div>
                          <div className="truncate text-xs text-slate-400">{description}</div>
                        </div>
                        <span className="whitespace-nowrap text-[10px] text-slate-400">
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="font-semibold">Hoy en tu empresa</h3>
                    <p className="mb-5 text-xs text-slate-400">
                      Operaciones y equipo
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["12", "Tareas pendientes"],
                        ["8", "Empleados trabajando"],
                        ["6", "Citas programadas"],
                        ["3", "Alertas importantes"],
                      ].map(([value, label]) => (
                        <div key={label} className="rounded-xl bg-slate-50 p-4">
                          <div className="text-xl font-bold">{value}</div>
                          <div className="mt-1 text-xs text-slate-500">{label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-4 text-white">
                      <div className="text-xs font-medium text-blue-100">
                        GROUPW&J INTELLIGENCE
                      </div>
                      <div className="mt-1 font-semibold">
                        Tu negocio creció un 18,7% este mes
                      </div>
                      <p className="mt-1 text-xs text-blue-100">
                        Marketing generó 73 nuevos leads y 18 nuevos clientes.
                      </p>
                    </div>
                  </div>
                </section>
              </>
            )}
            </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
