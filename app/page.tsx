'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [affiliateCode, setAffiliateCode] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [clienteId, setClienteId] = useState('')

  const formRef = useRef<HTMLDivElement>(null)

  // Capturar cliente_id de la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setClienteId(params.get('cliente_id') || 'e1cd0acd-e0b7-44da-90e9-86a765d35161')
  }, [])

  // Registrar visita en background
  useEffect(() => {
    if (!clienteId) return
    const insertarVisita = async () => {
      try {
        await supabase.from('visitas').insert([{ pagina: window.location.href, cliente_id: clienteId }])
      } catch (error: any) {
        console.log('ERROR VISITA:', error)
      }
    }
    insertarVisita()
  }, [clienteId])

  // Detectar dispositivo móvil con debounce
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const checkMobile = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsMobile(window.innerWidth < 768), 150)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const irFormulario = useCallback(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), [])

  const autoResize = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }, [])

  const enviarLead = useCallback(async () => {
    try {
      const { error } = await supabase.from('leads').insert([{
        name,
        email,
        phone,
        message,
        web_origen: 'miweb',
        cliente_id: clienteId,
        codigo_afiliado: affiliateCode
      }])
      if (error) throw error
      setEnviado(true)
      setName(''); setEmail(''); setPhone(''); setMessage(''); setAffiliateCode('')
      setTimeout(() => setEnviado(false), 3000)
    } catch (err: any) {
      console.log('ERROR LEAD:', err)
      alert(err.message)
    }
  }, [name, email, phone, message, affiliateCode, clienteId])

  // Productos memoizados
  const productos = useMemo(() => [
    { name: 'iPhone 17 Pro Max', price: '1.499€', img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab' },
    { name: 'Ordenador Oficina', price: '900€', img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7' },
    { name: 'MacBook Pro', price: '2.400€', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' },
    { name: 'Cascos Profesionales', price: '250€', img: 'https://images.unsplash.com/photo-1580894908361-967195033215' }
  ], [])

  return (
    <div style={{ fontFamily: 'sans-serif' }}>

      {/* HEADER */}
      <div style={{ backgroundColor: '#0a2540', padding: '0 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 70 }}>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2, background: 'linear-gradient(90deg, #ffffff, #a0c4ff)', WebkitBackgroundClip: 'text', color: 'transparent' }}>W</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: 20 }} loading="lazy"/>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => window.open('https://wa.me/34613499398', '_blank')}>
            <span style={{ fontSize: 14, textDecoration: 'underline' }}>+34 613 49 93 98</span>
            <span style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>Hablar con asesor</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '60px 20px' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: 30, textAlign: isMobile ? 'center' : 'left' }}>
          <div style={{ maxWidth: 600 }}>
            <h1 style={{ fontSize: isMobile ? 28 : 36 }}>Trabajamos con miles de negocios</h1>
            <p>
              Ayudamos a empresas a conseguir más clientes mediante páginas web, sistemas CRM y automatización de marketing.
              <br />
              We help businesses get more clients through websites, CRM systems and marketing automation.
            </p>
            <p>Creamos webs que generan contactos reales cada semana<br />y hacemos marketing para tu empresa</p>
            <button onClick={irFormulario} style={{ padding: '12px 20px', marginTop: 20, backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>Quiero más clientes</button>
          </div>
          <div style={{ maxWidth: 500 }}>
            <h2 style={{ fontSize: isMobile ? 26 : 38, fontWeight: 800, color: 'white', lineHeight: 1.2 }}>Consigue más clientes para tu negocio automáticamente</h2>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
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
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="Empresarios" style={{ width: '100%', maxWidth: 700, borderRadius: 10 }} loading="lazy"/>
      </div>

      {/* FINANCIACIÓN */}
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Financiación disponible</h2>
        <p>contacte con +34 613 49 93 98 para mas informacion</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: 20,
          maxWidth: 1000,
          margin: '30px auto'
        }}>
          {productos.map((item, i) => (
            <div key={i} style={{
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              height: 260
            }}>
              <div style={{ height: 140, overflow: 'hidden' }}>
                <img 
                  src={item.img} 
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                <h3 style={{ fontSize: 15, margin: 0 }}>{item.name}</h3>
                <p style={{ fontWeight: 'bold', marginTop: 8 }}>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BLOQUE ROPA PERSONALIZADA */}
      <div style={{ padding: '40px 20px', textAlign: 'center', maxWidth: 900, margin: '40px auto', border: '2px solid #0070f3', borderRadius: 10, backgroundColor: '#f0f4f8' }}>
        <img src="https://images.unsplash.com/photo-1591012911203-bc89d1c77ee6" alt="Ropa de trabajo personalizada" style={{ width: '100%', maxWidth: 300, marginBottom: 20, borderRadius: 8 }} loading="lazy"/>
        <h3 style={{ fontSize: 22, marginBottom: 10 }}>Encarga tu ropa de trabajo personalizada</h3>
        <p style={{ fontSize: 16, lineHeight: 1.5 }}>
          Danos tu marca y logo, elige el bordado y te hacemos tu traje de trabajo personalizado al gusto de tu empresa.  
          Calidad profesional y diseño exclusivo para tu negocio.
        </p>
      </div>

      {/* PLANES */}
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

      {/* FORMULARIO */}
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

      {/* FOOTER */}
      <div style={{ backgroundColor: '#0a2540', padding: '30px 20px', color: 'white', textAlign: 'center', marginTop: 40 }}>
        <p>Política de privacidad | Términos y condiciones | Política de cookies</p>
        <p>Email: sales@groupwj.com</p>
        <p>Atención al cliente: +34 613 49 93 98</p>

        <p style={{ marginTop: 10 }}>
          © 2026 GroupWJ. Todos los derechos reservados.
          <br />
          Razón social: W. C. A. B.
          <br />
          CNPJ: 65.653.650/0001-81
          <br />
          Dirección: Balneario Camboriu, Santa Catarina, Brasil
          <br />
          Empresa registrada en Brasil
        </p>

        <p style={{ marginTop: 15 }}>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'white' }}>Sobre nosotros</a> |   
          <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'white', marginLeft: 10 }}>Servicios</a> |   
          <a href="https://wa.me/34613499398" target="_blank" rel="noopener noreferrer" style={{ color: 'white', marginLeft: 10 }}>Contacto</a>
        </p>

        <p style={{ fontSize: 11, opacity: 0.7, marginTop: 20, lineHeight: 1.5 }}>
          Información legal: Los servicios ofrecidos corresponden a soluciones digitales personalizadas. Los resultados pueden variar en función de múltiples factores externos al servicio. Debido a la naturaleza del servicio y su activación inmediata, no se contemplan reembolsos una vez iniciado.
        </p>
      </div>

    </div>
  )
}