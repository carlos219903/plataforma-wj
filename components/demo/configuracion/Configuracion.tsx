"use client";

import { useState } from "react";

const usuarios = [
  { nombre: "Carlos Rodríguez", email: "carlos@empresa-demo.es", rol: "Administrador", estado: "Activo", acceso: "Hoy · 09:14" },
  { nombre: "Laura Martín", email: "laura@empresa-demo.es", rol: "Comercial", estado: "Activo", acceso: "Hoy · 08:51" },
  { nombre: "Daniel García", email: "daniel@empresa-demo.es", rol: "Operaciones", estado: "Activo", acceso: "Hoy · 07:58" },
  { nombre: "Marta López", email: "marta@empresa-demo.es", rol: "Administración", estado: "Activo", acceso: "Ayer · 18:22" },
];

const permisos = [
  ["Clientes y CRM", true, true, true, false],
  ["Empleados", true, false, false, false],
  ["Operaciones", true, true, true, true],
  ["Finanzas", false, false, false, false],
  ["Marketing", true, true, false, false],
  ["Reportes", true, false, false, false],
];

export default function Configuracion() {
  const [tab, setTab] = useState("Empresa");
  const [nuevoUsuario, setNuevoUsuario] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [dosFactores, setDosFactores] = useState(true);
  const [alertas, setAlertas] = useState(true);
  const [emails, setEmails] = useState(true);

  const guardar = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 1800);
  };

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            ADMINISTRACIÓN · SISTEMA
          </p>
          <h1 className="mt-1 text-3xl font-bold">Configuración</h1>
          <p className="mt-2 text-sm text-slate-500">
            Configura tu empresa, usuarios, permisos, seguridad y preferencias.
          </p>
        </div>

        <button
          onClick={guardar}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          {guardado ? "✓ Cambios guardados" : "Guardar cambios"}
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["Empresa", "Usuarios", "Roles y permisos", "Seguridad", "Notificaciones", "Personalización"].map(item => (
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

      {tab === "Empresa" && (
        <section className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Información de la empresa</h2>
            <p className="mt-1 text-xs text-slate-400">
              Datos utilizados dentro del sistema
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Campo label="Nombre comercial" valor="Empresa Demo S.L." />
              <Campo label="Razón social" valor="Empresa Demo Sociedad Limitada" />
              <Campo label="NIF / CIF" valor="B12345678" />
              <Campo label="Teléfono" valor="+34 910 000 000" />
              <Campo label="Email principal" valor="administracion@empresa-demo.es" />
              <Campo label="Sitio web" valor="empresa-demo.es" />
            </div>

            <label className="mt-5 block text-sm font-semibold">Dirección</label>
            <input
              defaultValue="Calle Empresa 24, Madrid, España"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
            />

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">Zona horaria</label>
                <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                  <option>Europa/Madrid</option>
                  <option>America/Sao_Paulo</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold">Moneda</label>
                <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                  <option>EUR — Euro</option>
                  <option>BRL — Real brasileño</option>
                  <option>USD — Dólar estadounidense</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-white">
                ED
              </div>
              <h3 className="mt-5 font-semibold">Identidad empresarial</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Personaliza el logotipo y la información que verán tus empleados.
              </p>
              <button className="mt-5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">
                Cambiar logotipo
              </button>
            </div>

            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <div className="text-xs font-semibold text-blue-300">
                GROUPW&J
              </div>
              <h3 className="mt-2 text-lg font-bold">
                Sistema adaptado a tu empresa
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Los módulos, procesos y permisos pueden configurarse según la estructura de cada negocio.
              </p>
            </div>
          </div>
        </section>
      )}

      {tab === "Usuarios" && (
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="font-semibold">Usuarios del sistema</h2>
              <p className="mt-1 text-xs text-slate-400">
                Controla quién puede acceder
              </p>
            </div>

            <button
              onClick={() => setNuevoUsuario(true)}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              + Crear usuario
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-slate-50 text-xs text-slate-400">
                <tr>
                  <th className="px-5 py-3">Usuario</th>
                  <th className="px-5 py-3">Rol</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3">Último acceso</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.email} className="border-t border-slate-100">
                    <td className="px-5 py-4">
                      <div className="font-semibold">{u.nombre}</div>
                      <div className="mt-1 text-xs text-slate-400">{u.email}</div>
                    </td>
                    <td className="px-5 py-4 text-sm">{u.rol}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        ● {u.estado}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{u.acceso}</td>
                    <td className="px-5 py-4">
                      <button className="text-sm font-semibold text-blue-600">
                        Gestionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === "Roles y permisos" && (
        <section className="grid gap-5 xl:grid-cols-[280px_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="px-2 pb-3 text-xs font-semibold text-slate-400">
              ROLES
            </div>

            {["Administrador", "Comercial", "Operaciones", "Administración", "Empleado"].map((rol, index) => (
              <button
                key={rol}
                className={`mb-1 w-full rounded-xl px-4 py-3 text-left text-sm font-semibold ${
                  index === 1
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-slate-50"
                }`}
              >
                {rol}
              </button>
            ))}

            <button className="mt-3 w-full rounded-xl border border-dashed border-slate-300 py-3 text-sm font-semibold text-slate-500">
              + Nuevo rol
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <div className="text-xs font-semibold text-blue-600">ROL</div>
              <h2 className="mt-1 text-xl font-bold">Comercial</h2>
              <p className="mt-2 text-sm text-slate-500">
                Define exactamente qué puede ver y modificar este usuario.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead>
                  <tr className="text-left text-xs text-slate-400">
                    <th className="py-3">Módulo</th>
                    <th className="py-3 text-center">Ver</th>
                    <th className="py-3 text-center">Crear</th>
                    <th className="py-3 text-center">Editar</th>
                    <th className="py-3 text-center">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {permisos.map(([modulo, ...valores]) => (
                    <tr key={String(modulo)} className="border-t border-slate-100">
                      <td className="py-4 text-sm font-semibold">{modulo}</td>
                      {valores.map((valor, index) => (
                        <td key={index} className="py-4 text-center">
                          <input
                            type="checkbox"
                            defaultChecked={Boolean(valor)}
                            className="h-4 w-4"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {tab === "Seguridad" && (
        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Seguridad de acceso</h2>

            <Ajuste
              titulo="Autenticación en dos pasos"
              descripcion="Añade una segunda verificación al iniciar sesión."
              activo={dosFactores}
              onClick={() => setDosFactores(!dosFactores)}
            />

            <Ajuste
              titulo="Alertas de nuevos accesos"
              descripcion="Avisar cuando se detecte un nuevo inicio de sesión."
              activo={alertas}
              onClick={() => setAlertas(!alertas)}
            />

            <Ajuste
              titulo="Caducidad de sesión"
              descripcion="Cerrar sesiones inactivas automáticamente."
              activo={true}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Actividad de seguridad</h2>

            <div className="mt-5 space-y-3">
              {[
                ["Inicio de sesión correcto", "Carlos Rodríguez · Madrid", "Hoy · 09:14"],
                ["Cambio de permisos", "Laura Martín · rol Comercial", "Ayer · 16:32"],
                ["Nuevo usuario creado", "Daniel García", "20 Sep · 12:18"],
                ["Contraseña actualizada", "Marta López", "18 Sep · 10:05"],
              ].map(([titulo, detalle, fecha]) => (
                <div key={titulo} className="rounded-xl border border-slate-100 p-4">
                  <div className="text-sm font-semibold">{titulo}</div>
                  <div className="mt-1 text-xs text-slate-500">{detalle}</div>
                  <div className="mt-2 text-[10px] text-slate-400">{fecha}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === "Notificaciones" && (
        <section className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Preferencias de notificaciones</h2>
          <p className="mt-1 text-sm text-slate-500">
            Decide qué información necesita recibir el administrador.
          </p>

          <Ajuste
            titulo="Resumen diario por email"
            descripcion="Actividad, ventas, empleados, tareas y alertas."
            activo={emails}
            onClick={() => setEmails(!emails)}
          />
          <Ajuste titulo="Nuevo lead recibido" descripcion="Avisar cuando llegue una nueva oportunidad comercial." activo={true} />
          <Ajuste titulo="Incidencias operativas" descripcion="Alertas sobre trabajos, empleados o procesos." activo={true} />
          <Ajuste titulo="Stock bajo" descripcion="Avisar antes de quedarse sin productos importantes." activo={true} />
          <Ajuste titulo="Facturas vencidas" descripcion="Avisar cuando existan cobros pendientes." activo={true} />
        </section>
      )}

      {tab === "Personalización" && (
        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Aspecto del sistema</h2>

            <label className="mt-6 block text-sm font-semibold">
              Nombre del sistema
            </label>
            <input
              defaultValue="Empresa Demo · Business OS"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />

            <label className="mt-5 block text-sm font-semibold">
              Página inicial
            </label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option>Centro de control</option>
              <option>Clientes y CRM</option>
              <option>Operaciones y tareas</option>
            </select>

            <label className="mt-5 block text-sm font-semibold">
              Densidad de información
            </label>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {["Compacta", "Normal", "Amplia"].map((x, i) => (
                <button
                  key={x}
                  className={`rounded-xl border px-3 py-3 text-sm font-semibold ${
                    i === 1
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200"
                  }`}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold text-blue-600">
              MÓDULOS ACTIVOS
            </div>
            <h2 className="mt-1 font-semibold">
              Personaliza el menú de tu empresa
            </h2>

            <div className="mt-5 grid gap-2">
              {[
                "CRM",
                "Empleados",
                "Operaciones",
                "Finanzas",
                "Inventario",
                "Marketing IA",
                "Cartera",
                "Reportes",
                "Automatizaciones",
              ].map(modulo => (
                <div
                  key={modulo}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
                >
                  <span className="text-sm font-medium">{modulo}</span>
                  <div className="h-6 w-11 rounded-full bg-blue-600 p-1">
                    <div className="ml-auto h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {nuevoUsuario && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/30"
          onClick={() => setNuevoUsuario(false)}
        >
          <div
            className="h-full w-full max-w-lg bg-white p-7 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-blue-600">
                  USUARIOS
                </div>
                <h2 className="mt-1 text-2xl font-bold">Crear usuario</h2>
              </div>
              <button
                onClick={() => setNuevoUsuario(false)}
                className="h-10 rounded-lg bg-slate-100 px-3"
              >
                ✕
              </button>
            </div>

            <Campo label="Nombre completo" valor="" placeholder="Nombre del empleado" />
            <Campo label="Email" valor="" placeholder="empleado@empresa.es" />

            <label className="mt-5 block text-sm font-semibold">
              Rol y permisos
            </label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option>Empleado</option>
              <option>Comercial</option>
              <option>Operaciones</option>
              <option>Administración</option>
              <option>Administrador</option>
            </select>

            <div className="mt-5 rounded-xl bg-blue-50 p-4 text-xs leading-5 text-blue-800">
              El empleado recibiría sus credenciales para acceder únicamente a las funciones autorizadas por la empresa.
            </div>

            <button
              onClick={() => setNuevoUsuario(false)}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white"
            >
              Crear usuario demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Campo({
  label,
  valor,
  placeholder,
}: {
  label: string;
  valor: string;
  placeholder?: string;
}) {
  return (
    <div className="mt-5 first:mt-0">
      <label className="text-sm font-semibold">{label}</label>
      <input
        defaultValue={valor}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
      />
    </div>
  );
}

function Ajuste({
  titulo,
  descripcion,
  activo,
  onClick,
}: {
  titulo: string;
  descripcion: string;
  activo: boolean;
  onClick?: () => void;
}) {
  return (
    <div className="mt-5 flex items-center justify-between gap-5 border-t border-slate-100 pt-5 first:border-0">
      <div>
        <div className="text-sm font-semibold">{titulo}</div>
        <div className="mt-1 text-xs leading-5 text-slate-500">{descripcion}</div>
      </div>

      <button
        onClick={onClick}
        className={`h-7 w-12 shrink-0 rounded-full p-1 transition ${
          activo ? "bg-blue-600" : "bg-slate-200"
        }`}
      >
        <div
          className={`h-5 w-5 rounded-full bg-white shadow-sm transition ${
            activo ? "ml-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
