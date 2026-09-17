'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Formulario() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [affiliateCode, setAffiliateCode] = useState('')
  const [message, setMessage] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  async function enviarFormulario(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Completa nombre, email y teléfono.')
      return
    }

    setEnviando(true)
    setError('')

    const { error: supabaseError } = await supabase
      .from('leads')
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          web_origen: 'groupwj.com',
          cliente_id: 'e1cd0acd-e0b7-44da-90e9-86a765d35161',
          codigo_afiliado: affiliateCode.trim()
        }
      ])

    setEnviando(false)

    if (supabaseError) {
      console.error(supabaseError)
      setError(`Supabase: ${supabaseError.message}`)
      return
    }

    setEnviado(true)
    setName('')
    setEmail('')
    setPhone('')
    setAffiliateCode('')
    setMessage('')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef5ff] px-5 py-8 md:py-12">
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#8ed8ff] blur-[90px]" />
      <div className="pointer-events-none absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-[#b8a8ff] blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-[760px]">

        {/* Cabecera */}
        <div className="mb-7 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img
              src="/FintechX – Plantilla de redacción de inversiones y finanzas de IA_files/YRLlnG3joxHrTMikBU58pHjeOA.svg"
              alt="GroupW&J"
              className="h-[34px] w-auto"
            />
          </a>

          <a
            href="/"
            className="rounded-full border border-[#dfe5e9] bg-white px-4 py-2 text-sm font-medium text-[#4d585f] shadow-sm transition hover:bg-[#f8fafb]"
          >
            ← Volver
          </a>
        </div>

        {/* Tarjeta principal */}
        <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white/95 shadow-[0_25px_80px_rgba(62,105,180,0.16)]">

          {/* Parte superior */}
          <div className="border-b border-[#edf1f3] px-7 pb-8 pt-8 md:px-12 md:pb-10 md:pt-11">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dfe6ea] bg-[#edf5ff] px-3 py-1.5 text-xs font-semibold text-[#4169a8]">
              <span className="h-2 w-2 rounded-full bg-[#4f7cff]" />
              GROUPW&J · SOLUCIONES DIGITALES
            </div>

            <h1 className="max-w-[600px] text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#18181A] md:text-[46px]">
              Hablemos de su empresa
            </h1>

            <p className="mt-4 max-w-[570px] text-[15px] leading-7 text-[#66727a] md:text-base">
              Cuéntenos qué necesita. Analizaremos su situación y le mostraremos
              cómo podemos ayudarle a digitalizar, automatizar y captar más clientes.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-[#66727a]">
              <span className="font-semibold text-[#4169e1]">✓ Análisis personalizado</span>
              <span className="font-semibold text-[#7457e8]">✓ Sin compromiso</span>
              <span className="font-semibold text-[#0f9fa8]">✓ Atención directa</span>
            </div>
          </div>

          <div className="px-7 py-8 md:px-12 md:py-10">
            {enviado ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#18181A] text-2xl text-white">
                  ✓
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#18181A]">
                  Solicitud enviada
                </h2>
                <p className="mx-auto mt-3 max-w-[440px] leading-6 text-[#66727a]">
                  Hemos recibido sus datos correctamente. Nuestro equipo se pondrá
                  en contacto con usted lo antes posible.
                </p>
                <a
                  href="/"
                  className="mt-7 inline-flex rounded-xl bg-gradient-to-r from-[#4169e1] to-[#7457e8] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Volver a GroupW&J
                </a>
              </div>
            ) : (
              <form onSubmit={enviarFormulario} className="space-y-6">

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#25282a]">
                      Nombre *
                    </span>
                    <input
                      type="text"
                      placeholder="Su nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-[12px] border border-[#dfe5e9] bg-[#fafbfc] px-4 py-3.5 text-[#18181A] outline-none transition placeholder:text-[#9aa4aa] focus:border-[#5578ec] focus:bg-white focus:ring-2 focus:ring-[#5578ec]/15"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#25282a]">
                      Teléfono *
                    </span>
                    <input
                      type="tel"
                      placeholder="+34 600 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-[12px] border border-[#dfe5e9] bg-[#fafbfc] px-4 py-3.5 text-[#18181A] outline-none transition placeholder:text-[#9aa4aa] focus:border-[#5578ec] focus:bg-white focus:ring-2 focus:ring-[#5578ec]/15"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#25282a]">
                    Email *
                  </span>
                  <input
                    type="email"
                    placeholder="nombre@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-[12px] border border-[#dfe5e9] bg-[#fafbfc] px-4 py-3.5 text-[#18181A] outline-none transition placeholder:text-[#9aa4aa] focus:border-[#5578ec] focus:bg-white focus:ring-2 focus:ring-[#5578ec]/15"
                  />
                </label>

                <label className="block">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[#25282a]">
                      Código de afiliado
                    </span>
                    <span className="text-xs text-[#8a959c]">Opcional</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Introduzca su código si dispone de uno"
                    value={affiliateCode}
                    onChange={(e) => setAffiliateCode(e.target.value)}
                    className="w-full rounded-[12px] border border-[#dfe5e9] bg-[#fafbfc] px-4 py-3.5 text-[#18181A] outline-none transition placeholder:text-[#9aa4aa] focus:border-[#5578ec] focus:bg-white focus:ring-2 focus:ring-[#5578ec]/15"
                  />
                </label>

                <label className="block">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[#25282a]">
                      ¿Qué necesita?
                    </span>
                    <span className="text-xs text-[#8a959c]">Opcional</span>
                  </div>
                  <textarea
                    placeholder="Cuéntenos brevemente qué quiere mejorar en su empresa..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full resize-none rounded-[12px] border border-[#dfe5e9] bg-[#fafbfc] px-4 py-3.5 leading-6 text-[#18181A] outline-none transition placeholder:text-[#9aa4aa] focus:border-[#5578ec] focus:bg-white focus:ring-2 focus:ring-[#5578ec]/15"
                  />
                </label>

                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={enviando}
                  className="flex w-full items-center justify-center rounded-[12px] bg-gradient-to-r from-[#4169e1] via-[#5578ec] to-[#7457e8] px-6 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(65,105,225,0.28)] transition hover:-translate-y-[1px] hover:shadow-[0_14px_35px_rgba(90,90,220,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {enviando ? 'Enviando solicitud...' : 'Solicitar información →'}
                </button>

                <p className="text-center text-xs leading-5 text-[#8a959c]">
                  Sus datos se utilizarán únicamente para atender su solicitud.
                </p>
              </form>
            )}
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-[#89949b]">
          © GroupW&J · Digitalización, automatización y crecimiento empresarial
        </p>
      </div>
    </main>
  )
}
