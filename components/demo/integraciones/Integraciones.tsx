"use client";

import { useState } from "react";

type Integracion = {
  nombre: string;
  categoria: string;
  descripcion: string;
  icono: string;
  conectada: boolean;
  detalle: string;
};

const iniciales: Integracion[] = [
  { nombre:"Sitio web", categoria:"Web", descripcion:"Leads, formularios, visitas y conversiones.", icono:"🌐", conectada:true, detalle:"empresa-demo.es" },
  { nombre:"Gmail", categoria:"Comunicación", descripcion:"Emails de clientes y automatizaciones.", icono:"✉️", conectada:true, detalle:"ventas@empresa-demo.es" },
  { nombre:"WhatsApp", categoria:"Comunicación", descripcion:"Conversaciones, avisos y seguimiento comercial.", icono:"💬", conectada:true, detalle:"+34 600 000 000" },
  { nombre:"Google Ads", categoria:"Marketing", descripcion:"Campañas, inversión y resultados comerciales.", icono:"🔎", conectada:true, detalle:"Cuenta Demo Ads" },
  { nombre:"Instagram", categoria:"Marketing", descripcion:"Campañas, contactos y rendimiento.", icono:"📸", conectada:true, detalle:"@empresa_demo" },
  { nombre:"Facebook", categoria:"Marketing", descripcion:"Publicidad y captación de oportunidades.", icono:"📘", conectada:true, detalle:"Empresa Demo" },
  { nombre:"TikTok", categoria:"Marketing", descripcion:"Contenido y campañas publicitarias.", icono:"🎵", conectada:false, detalle:"Sin conectar" },
  { nombre:"YouTube", categoria:"Marketing", descripcion:"Vídeos y campañas de adquisición.", icono:"▶️", conectada:false, detalle:"Sin conectar" },
  { nombre:"Google Calendar", categoria:"Productividad", descripcion:"Citas, reuniones, empleados y trabajos.", icono:"📅", conectada:true, detalle:"Calendario empresa" },
  { nombre:"Stripe", categoria:"Pagos", descripcion:"Pagos y eventos de facturación.", icono:"💳", conectada:true, detalle:"Modo demostración" },
];

export default function Integraciones() {
  const [integraciones, setIntegraciones] = useState(iniciales);
  const [categoria, setCategoria] = useState("Todas");
  const [seleccionada, setSeleccionada] = useState<Integracion | null>(null);

  const visibles =
    categoria === "Todas"
      ? integraciones
      : integraciones.filter(i => i.categoria === categoria);

  const toggle = (nombre: string) => {
    setIntegraciones(prev =>
      prev.map(i =>
        i.nombre === nombre
          ? {
              ...i,
              conectada: !i.conectada,
              detalle: !i.conectada ? "Cuenta Demo" : "Sin conectar",
            }
          : i
      )
    );

    setSeleccionada(prev =>
      prev?.nombre === nombre
        ? {
            ...prev,
            conectada: !prev.conectada,
            detalle: !prev.conectada ? "Cuenta Demo" : "Sin conectar",
          }
        : prev
    );
  };

  return (
    <div>
      <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs text-blue-800">
        <strong>Demo:</strong> las conexiones mostradas son simuladas. Una implementación real requiere autorización, credenciales y APIs oficiales de cada proveedor.
      </div>

      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-cyan-600">
            INTEGRACIONES · ECOSISTEMA
          </p>
          <h1 className="mt-1 text-3xl font-bold">Integraciones</h1>
          <p className="mt-2 text-sm text-slate-500">
            Conecta las herramientas de tu empresa para trabajar desde un único sistema.
          </p>
        </div>

        <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
          + Solicitar integración
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["7","Conectadas","Funcionando"],
          ["3","Disponibles","Sin configurar"],
          ["6","Categorías","Centralizadas"],
          ["1","Sistema","Toda la empresa"],
        ].map(([v,l,d]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{v}</div>
            <div className="mt-1 text-sm font-medium">{l}</div>
            <div className="mt-2 text-xs text-slate-400">{d}</div>
          </div>
        ))}
      </section>

      <div className="mt-5 flex gap-2 overflow-x-auto">
        {["Todas","Comunicación","Marketing","Productividad","Pagos","Web"].map(item => (
          <button
            key={item}
            onClick={() => setCategoria(item)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold ${
              categoria === item
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibles.map(i => (
          <div
            key={i.nombre}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                {i.icono}
              </div>

              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                i.conectada
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {i.conectada ? "● CONECTADA" : "SIN CONECTAR"}
              </span>
            </div>

            <h3 className="mt-5 font-semibold">{i.nombre}</h3>
            <div className="mt-1 text-xs font-medium text-cyan-600">
              {i.categoria}
            </div>

            <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
              {i.descripcion}
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <div className="text-[10px] font-semibold text-slate-400">
                {i.conectada ? "CUENTA" : "ESTADO"}
              </div>
              <div className="mt-1 text-xs font-semibold">{i.detalle}</div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setSeleccionada(i)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold"
              >
                Configurar
              </button>

              {!i.conectada && (
                <button
                  onClick={() => toggle(i.nombre)}
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white"
                >
                  Conectar
                </button>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Cómo se conectan los datos</h2>
          <p className="mt-1 text-xs text-slate-400">
            Ejemplo de flujo centralizado
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {[
              ["🌐","Web"],
              ["→",""],
              ["👤","Lead"],
              ["→",""],
              ["🗂️","CRM"],
              ["→",""],
              ["💬","Comunicación"],
              ["→",""],
              ["💶","Venta"],
              ["→",""],
              ["📊","Reporte"],
            ].map(([icono,nombre],index) =>
              nombre ? (
                <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                  <div className="text-xl">{icono}</div>
                  <div className="mt-1 text-xs font-semibold">{nombre}</div>
                </div>
              ) : (
                <div key={index} className="font-bold text-slate-300">{icono}</div>
              )
            )}
          </div>

          <div className="mt-6 rounded-xl bg-cyan-50 p-4">
            <div className="text-xs font-semibold text-cyan-700">
              INFORMACIÓN CENTRALIZADA
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              La finalidad es evitar que la información quede separada entre aplicaciones. Cada interacción puede alimentar automáticamente CRM, operaciones, marketing, finanzas y reportes.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-950 p-6 text-white">
          <div className="text-xs font-semibold text-cyan-300">
            ¿FALTA UNA HERRAMIENTA?
          </div>
          <h2 className="mt-2 text-xl font-bold">
            Integraciones personalizadas
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            GroupW&J puede estudiar nuevas conexiones según las herramientas y procesos que utilice cada empresa.
          </p>

          <button className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-semibold text-slate-900">
            Solicitar nueva integración
          </button>
        </div>
      </section>

      {seleccionada && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/30"
          onClick={() => setSeleccionada(null)}
        >
          <div
            className="h-full w-full max-w-lg overflow-y-auto bg-white p-7 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                  {seleccionada.icono}
                </div>
                <div>
                  <div className="text-xs font-semibold text-cyan-600">
                    {seleccionada.categoria.toUpperCase()}
                  </div>
                  <h2 className="text-xl font-bold">{seleccionada.nombre}</h2>
                </div>
              </div>

              <button
                onClick={() => setSeleccionada(null)}
                className="h-10 rounded-lg bg-slate-100 px-3"
              >
                ✕
              </button>
            </div>

            <div className="mt-7 rounded-xl bg-slate-50 p-4">
              <div className="text-xs text-slate-400">ESTADO</div>
              <div className="mt-2 flex items-center justify-between">
                <div className="font-semibold">
                  {seleccionada.conectada ? "Conectada" : "Sin conectar"}
                </div>
                <div className={`h-3 w-3 rounded-full ${
                  seleccionada.conectada ? "bg-emerald-500" : "bg-slate-300"
                }`} />
              </div>
            </div>

            <h3 className="mt-7 font-semibold">
              Información que puede sincronizar
            </h3>

            <div className="mt-4 space-y-3">
              {[
                "Datos relacionados con clientes",
                "Actividad y eventos",
                "Información comercial autorizada",
                "Métricas disponibles mediante la integración",
                "Automatizaciones configuradas por la empresa",
              ].map(item => (
                <div key={item} className="flex gap-3 rounded-xl border border-slate-100 p-3 text-sm">
                  <span className="text-emerald-500">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="text-xs font-semibold text-blue-700">
                DEMOSTRACIÓN
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Esta pantalla no realiza una conexión real. Las integraciones reales dependen de las APIs, permisos y condiciones disponibles en cada servicio.
              </p>
            </div>

            <button
              onClick={() => toggle(seleccionada.nombre)}
              className={`mt-6 w-full rounded-xl py-3.5 text-sm font-semibold text-white ${
                seleccionada.conectada ? "bg-red-500" : "bg-blue-600"
              }`}
            >
              {seleccionada.conectada
                ? "Simular desconexión"
                : "Simular conexión"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
