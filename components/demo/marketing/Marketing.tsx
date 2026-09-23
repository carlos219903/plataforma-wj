"use client";

import { useState } from "react";

const canales = [
  { nombre: "Google Ads", icono: "G", detalle: "Búsqueda y Display" },
  { nombre: "Instagram", icono: "◎", detalle: "Posts, Stories y Reels" },
  { nombre: "Facebook", icono: "f", detalle: "Facebook Ads" },
  { nombre: "TikTok", icono: "♪", detalle: "Vídeo corto" },
  { nombre: "YouTube", icono: "▶", detalle: "Vídeo y Shorts" },
  { nombre: "Email", icono: "✉", detalle: "Campañas de email" },
];

export default function Marketing() {
  const [vista, setVista] = useState("Centro de marketing");
  const [canal, setCanal] = useState("Instagram");
  const [objetivo, setObjetivo] = useState("Conseguir clientes");
  const [presupuesto, setPresupuesto] = useState(300);
  const [descripcion, setDescripcion] = useState(
    "Promocionar nuestros servicios y conseguir nuevos clientes."
  );
  const [generado, setGenerado] = useState(false);
  const [lanzada, setLanzada] = useState(false);

  const alcance = Math.round(presupuesto * 42);
  const clics = Math.round(presupuesto * 1.8);
  const leads = Math.max(1, Math.round(presupuesto * 0.12));

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-violet-600">
            MARKETING · INTELIGENCIA ARTIFICIAL
          </p>
          <h1 className="mt-1 text-3xl font-bold">Marketing IA</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-500">
            Crea, analiza y gestiona campañas desde GroupW&J sin tener que trabajar
            plataforma por plataforma.
          </p>
        </div>

        <button
          onClick={() => setVista("Crear campaña")}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          ✦ Crear campaña con IA
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["Centro de marketing","Crear campaña","Campañas","Contenido IA","Audiencias"].map(item => (
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
          ["5.780 €","Inversión","Este mes"],
          ["24.680","Visitas","+22,4%"],
          ["428","Leads","+18,1%"],
          ["61","Clientes","14,2% conversión"],
          ["4,3x","ROI marketing","+0,7x"],
        ].map(([v,l,d]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold">{v}</div>
            <div className="mt-1 text-sm font-medium">{l}</div>
            <div className="mt-2 text-xs text-slate-400">{d}</div>
          </div>
        ))}
      </section>

      {vista === "Centro de marketing" && (
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold">Rendimiento por canal</h2>
                <p className="text-xs text-slate-400">Campañas activas</p>
              </div>
              <span className="text-xs font-semibold text-emerald-600">
                7 campañas activas
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["Google Ads","2.100 €","186 leads","4,8x","Activa"],
                ["Instagram","1.280 €","102 leads","4,1x","Activa"],
                ["Facebook","940 €","67 leads","3,6x","Activa"],
                ["TikTok","760 €","51 leads","3,9x","Activa"],
                ["YouTube","520 €","22 leads","2,8x","Activa"],
                ["Email","180 €","36 leads","7,2x","Activa"],
              ].map(([nombre,gasto,leads,roi,estado]) => (
                <div key={nombre} className="grid gap-3 rounded-xl border border-slate-100 p-4 sm:grid-cols-5 sm:items-center">
                  <strong className="text-sm">{nombre}</strong>
                  <span className="text-sm text-slate-500">{gasto}</span>
                  <span className="text-sm">{leads}</span>
                  <span className="text-sm font-semibold text-emerald-600">ROI {roi}</span>
                  <span className="text-xs font-semibold text-blue-600">{estado}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-gradient-to-br from-slate-950 to-violet-950 p-6 text-white shadow-sm">
            <div className="text-xs font-bold tracking-wider text-violet-300">
              GROUPW&J AI
            </div>
            <h2 className="mt-3 text-xl font-bold">Asistente de marketing</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Analizamos tus campañas, clientes y conversiones para detectar oportunidades.
            </p>

            <div className="mt-6 rounded-xl bg-white/10 p-4">
              <div className="text-xs text-violet-200">OPORTUNIDAD DETECTADA</div>
              <p className="mt-2 text-sm font-semibold">
                Instagram está generando leads un 21% más baratos esta semana.
              </p>
              <p className="mt-2 text-xs text-slate-300">
                Simulación: aumentar 200 € podría generar aproximadamente 24 leads adicionales.
              </p>
            </div>

            <button
              onClick={() => setVista("Crear campaña")}
              className="mt-5 w-full rounded-xl bg-white py-3 text-sm font-bold text-slate-900"
            >
              Crear campaña ahora
            </button>
          </section>
        </div>
      )}

      {vista === "Crear campaña" && (
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <div className="text-xs font-semibold text-violet-600">NUEVA CAMPAÑA</div>
              <h2 className="mt-1 text-xl font-bold">¿Dónde quieres anunciarte?</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {canales.map(c => (
                <button
                  key={c.nombre}
                  onClick={() => setCanal(c.nombre)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    canal === c.nombre
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 font-bold text-white">
                    {c.icono}
                  </div>
                  <div className="mt-3 font-semibold">{c.nombre}</div>
                  <div className="mt-1 text-xs text-slate-400">{c.detalle}</div>
                </button>
              ))}
            </div>

            <div className="mt-7">
              <label className="text-sm font-semibold">Objetivo de la campaña</label>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {["Conseguir clientes","Recibir llamadas","Visitas a la web","Reservas","Vender productos","Reconocimiento"].map(o => (
                  <button
                    key={o}
                    onClick={() => setObjetivo(o)}
                    className={`rounded-xl border p-3 text-sm ${
                      objetivo === o
                        ? "border-violet-500 bg-violet-50 font-semibold text-violet-700"
                        : "border-slate-200"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <div className="flex justify-between">
                <label className="text-sm font-semibold">Presupuesto</label>
                <strong>{presupuesto} €</strong>
              </div>

              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={presupuesto}
                onChange={e => setPresupuesto(Number(e.target.value))}
                className="mt-4 w-full"
              />

              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>50 €</span>
                <span>3.000 €</span>
              </div>
            </div>

            <div className="mt-7">
              <label className="text-sm font-semibold">
                ¿Qué quieres promocionar?
              </label>
              <textarea
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                rows={4}
                className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-400"
              />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <button className="rounded-xl border border-dashed border-slate-300 p-4 text-sm font-medium">
                + Subir imagen
              </button>
              <button className="rounded-xl border border-dashed border-slate-300 p-4 text-sm font-medium">
                + Subir vídeo
              </button>
              <button className="rounded-xl border border-dashed border-slate-300 p-4 text-sm font-medium">
                + Añadir producto
              </button>
            </div>

            <button
              onClick={() => {
                setGenerado(true);
                setLanzada(false);
              }}
              className="mt-7 w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3.5 font-semibold text-white"
            >
              ✦ Generar campaña con GroupW&J AI
            </button>
          </section>

          <section>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Estimación de campaña</h3>
              <p className="text-xs text-slate-400">
                Simulación basada en datos de demostración
              </p>

              <div className="mt-5 space-y-4">
                {[
                  ["Canal",canal],
                  ["Objetivo",objetivo],
                  ["Presupuesto",`${presupuesto} €`],
                  ["Alcance estimado",alcance.toLocaleString("es-ES")],
                  ["Clics estimados",clics.toLocaleString("es-ES")],
                  ["Leads estimados",`${leads} – ${leads + 8}`],
                ].map(([l,v]) => (
                  <div key={l} className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                    <span className="text-slate-500">{l}</span>
                    <strong className="text-right">{v}</strong>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-blue-50 p-4">
                <div className="text-xs font-semibold text-blue-700">PRESUPUESTO ESTIMADO</div>
                <div className="mt-1 text-2xl font-bold">{presupuesto} €</div>
                <p className="mt-1 text-xs text-blue-700">
                  En el producto real se mostrarían los costes y condiciones disponibles mediante las integraciones autorizadas con cada plataforma.
                </p>
              </div>
            </div>

            {generado && (
              <div className="mt-5 rounded-2xl border border-violet-200 bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold text-violet-600">
                  ✦ CONTENIDO GENERADO
                </div>
                <h3 className="mt-2 font-bold">
                  Haz crecer tu negocio con un servicio profesional
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Descubre una forma más sencilla y profesional de conseguir el resultado que necesitas. Atención personalizada, rapidez y un equipo preparado para ayudarte.
                </p>

                <div className="mt-4 aspect-video rounded-xl bg-gradient-to-br from-blue-100 via-violet-100 to-fuchsia-100 p-5">
                  <div className="flex h-full items-center justify-center rounded-lg border border-white/70 bg-white/40 text-center">
                    <div>
                      <div className="text-xs font-semibold text-violet-600">CREATIVIDAD IA</div>
                      <div className="mt-2 text-xl font-black">Tu empresa. Tu campaña.</div>
                      <div className="mt-1 text-sm text-slate-500">Creada desde GroupW&J</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="rounded-xl border border-slate-200 py-2.5 text-sm font-semibold">
                    Regenerar
                  </button>
                  <button className="rounded-xl border border-slate-200 py-2.5 text-sm font-semibold">
                    Editar contenido
                  </button>
                </div>

                <button
                  onClick={() => setLanzada(true)}
                  className="mt-2 w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white"
                >
                  Lanzar campaña
                </button>

                {lanzada && (
                  <div className="mt-3 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                    ✓ Demo: campaña preparada correctamente. En producción se enviaría a la plataforma publicitaria mediante su integración autorizada.
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      )}

      {["Campañas","Contenido IA","Audiencias"].includes(vista) && (
        <section className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{vista}</h2>
            <p className="mt-1 text-sm text-slate-400">
              Gestión centralizada de marketing
            </p>

            <div className="mt-5 space-y-3">
              {[
                ["Captación servicios Madrid","Google Ads","1.200 €","Activa"],
                ["Campaña septiembre","Instagram","650 €","Activa"],
                ["Remarketing visitantes","Facebook","420 €","Activa"],
                ["Vídeo promocional","TikTok","350 €","Programada"],
                ["Clientes inactivos","Email","80 €","Completada"],
              ].map(([nombre,canal,presupuesto,estado]) => (
                <div key={nombre} className="grid gap-2 rounded-xl border border-slate-100 p-4 sm:grid-cols-4 sm:items-center">
                  <strong className="text-sm">{nombre}</strong>
                  <span className="text-sm text-slate-500">{canal}</span>
                  <span className="text-sm">{presupuesto}</span>
                  <span className="text-xs font-semibold text-blue-600">{estado}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Audiencia inteligente</h3>
            <p className="mt-1 text-xs text-slate-400">
              Datos ficticios de demostración
            </p>

            <div className="mt-5 space-y-4">
              {[
                ["Visitantes web","3.842"],
                ["Leads sin comprar","367"],
                ["Clientes activos","284"],
                ["Clientes inactivos","92"],
                ["Audiencia similar","18.400"],
              ].map(([l,v]) => (
                <div key={l} className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                  <span className="text-slate-500">{l}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
