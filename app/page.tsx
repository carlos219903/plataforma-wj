'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  // Estados del formulario
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [affiliateCode, setAffiliateCode] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [clienteId, setClienteId] = useState('')

  // Ref del formulario
  const formRef = useRef<HTMLDivElement>(null)

  // Solo usar window y searchParams en useEffect para evitar prerender errors
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setClienteId(params.get('cliente_id') || '206a762e-1038-4624-8772-ab4b9cd8b068')
  }, [])

  // Registrar visita
  useEffect(() => {
    if (!clienteId) return
    supabase.from('visitas').insert([{ pagina: window.location.href, cliente_id: clienteId }])
  }, [clienteId])

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll al formulario
  const irFormulario = () => formRef.current?.scrollIntoView({ behavior: 'smooth' })

  // Auto resize textarea
  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  // Enviar lead a Supabase
  const enviarLead = async () => {
    const { error } = await supabase.from('leads').insert([{
      name,
      email,
      phone,
      message,
      web_origen: 'miweb',
      cliente_id: clienteId,
      codigo_afiliado: affiliateCode
    }])
    if (error) alert('Error')
    else {
      setEnviado(true)
      setName(''); setEmail(''); setPhone(''); setMessage(''); setAffiliateCode('')
      setTimeout(() => setEnviado(false), 3000)
    }
  }

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#0a2540', padding: '0 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 70 }}>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2, background: 'linear-gradient(90deg, #ffffff, #a0c4ff)', WebkitBackgroundClip: 'text', color: 'transparent' }}>W</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: 20 }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 14 }}>+34 613 49 93 98</span>
            <span style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>Hablar con asesor</span>
          </div>
        </div>
      </div>

      <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '60px 20px' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: 30, textAlign: isMobile ? 'center' : 'left' }}>
          <div style={{ maxWidth: 600 }}>
            <h1 style={{ fontSize: isMobile ? 28 : 36 }}>Trabajamos con miles de negocios</h1>
            <p>Creamos webs que generan contactos reales cada semana<br />y hacemos marketing para tu empresa</p>
            <button onClick={irFormulario} style={{ padding: '12px 20px', marginTop: 20, backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>Quiero más clientes</button>
          </div>
          <div style={{ maxWidth: 500 }}>
            <h2 style={{ fontSize: isMobile ? 26 : 38, fontWeight: 800, color: 'white', lineHeight: 1.2 }}>Consigue más clientes para tu negocio automáticamente</h2>
          </div>
        </div>
      </div>

      <div style={{ padding: '30px', textAlign: 'center', backgroundColor: '#0070f3', color: 'white' }}>
        <h2>¿Qué conseguimos?</h2>
        <p>✔ Más llamadas</p><p>✔ Más ventas</p><p>✔ Sin depender de redes sociales</p><p>✔ Gestionamos tu marketing de forma profesional</p>
      </div>

      <div style={{ padding: '30px', maxWidth: 700, margin: 'auto', textAlign: 'center' }}>
        <p style={{ fontSize: 16, lineHeight: 1.6 }}>
          Diseñamos y desarrollamos páginas web con tecnología avanzada orientada a resultados, enfocadas en la captación de clientes reales para tu negocio.
          <br /><br />
          No solo creamos tu web, implementamos sistemas de marketing digital que trabajan por ti, permitiéndote gestionar los contactos que entran, aumentar tus ventas y posicionarte de forma sólida en internet.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="Empresarios" style={{ width: '100%', maxWidth: 700, borderRadius: 10 }} />
      </div>

      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Planes disponibles</h2>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, justifyContent: isMobile ? 'center' : 'space-evenly', marginTop: 20 }}>
          <div style={{ border: '2px solid #0070f3', borderRadius: 10, padding: 20, width: isMobile ? '100%' : 250 }}>
            <p>✔ Web profesional</p><p>✔ Activación rápida</p><p>✔ Estudios de leads</p><p>✔ Marketing básico</p><p>✔ Atención al cliente</p>
            <h3 style={{ marginTop: 20, textAlign: 'center' }}>120€/mes</h3>
          </div>
          <div style={{ border: '2px solid #0070f3', borderRadius: 10, padding: 20, width: isMobile ? '100%' : 250 }}>
            <p>✔ Todo lo anterior</p><p>✔ Marketing personalizado</p><p>✔ Optimización de leads</p><p>✔ Soporte prioritario</p>
            <h3 style={{ marginTop: 20, textAlign: 'center' }}>250€/mes</h3>
          </div>
          <div style={{ border: '2px solid #0070f3', borderRadius: 10, padding: 20, width: isMobile ? '100%' : 250 }}>
            <p>✔ Todo lo anterior</p><p>✔ Estrategia avanzada</p><p>✔ Setup personalizado + Demo</p><p>✔ Mantenimiento completo</p>
            <h3 style={{ marginTop: 20, textAlign: 'center' }}>500€/mes</h3>
          </div>
        </div>
        <p style={{ marginTop: 20 }}>Contacte con operador de ventas para ofertas exclusivas y personalizadas</p>
      </div>

      <div ref={formRef} style={{ padding: '30px', maxWidth: 500, margin: 'auto', border: '2px solid #0070f3', borderRadius: 10, backgroundColor: '#0070f3' }}>
        <h3 style={{ color: 'white' }}>Déjanos tus datos</h3>
        {enviado && <div style={{ backgroundColor: '#4CAF50', color: 'white', padding: 10, marginBottom: 15, textAlign: 'center', borderRadius: 5 }}>Formulario enviado</div>}
        <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 10, backgroundColor: 'white' }} />
        <br /><br />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 10, backgroundColor: 'white' }} />
        <br /><br />
        <input placeholder="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: 10, backgroundColor: 'white' }} />
        <br /><br />
        <input placeholder="Código de afiliado (opcional)" value={affiliateCode} onChange={e => setAffiliateCode(e.target.value)} style={{ width: '100%', padding: 10, backgroundColor: 'white' }} />
        <br /><br />
        <textarea placeholder="¿Qué necesitas? (Opcional)" value={message} onChange={e => { setMessage(e.target.value); autoResize(e) }} rows={3} style={{ width: '100%', padding: 10, backgroundColor: 'white', resize: 'none', overflow: 'hidden' }} />
        <br /><br />
        <button onClick={enviarLead} style={{ width: '100%', padding: 12, backgroundColor: '#0a2540', color: 'white', border: 'none', cursor: 'pointer', borderRadius: 5 }}>Quiero clientes</button>
      </div>

      <div style={{ backgroundColor: '#0a2540', padding: '30px 20px', color: 'white', textAlign: 'center', marginTop: 40 }}>
        <p>Política de privacidad | Términos y condiciones | Política de cookies</p>
        <p>Gmail: sales@groupwj.com</p>
        <p>Atención al cliente: +34 613 49 93 98</p>
        <p style={{ fontSize: 11, opacity: 0.7, marginTop: 20, lineHeight: 1.5 }}>
          Información legal: Los servicios ofrecidos corresponden a soluciones digitales personalizadas. Los resultados pueden variar en función de múltiples factores externos al servicio. Debido a la naturaleza del servicio y su activación inmediata, no se contemplan reembolsos una vez iniciado.
        </p>
      </div>
    </div>
  )
}