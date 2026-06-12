'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {

  const [leads,setLeads] = useState<any[]>([])
  const [clientes,setClientes] = useState<any[]>([])

  useEffect(()=>{
    cargarLeads()
    cargarClientes()
  },[])

  async function cargarLeads(){

    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at',{ascending:false})

    if(data){
      setLeads(data)
    }

  }

  async function cargarClientes(){

    const { data } = await supabase
      .from('clientes')
      .select('*')
      .order('fecha_alta',{ascending:false})

    if(data){
      setClientes(data)
    }

  }

  const activos =
    clientes.filter(
      c => c.estado === 'activo'
    ).length

  const impagados =
    clientes.filter(
      c => c.estado_pago === 'impagado'
    ).length

  const cancelados =
    clientes.filter(
      c => c.estado === 'cancelado'
    ).length

  const mrr =
    clientes
      .filter(c => c.estado === 'activo')
      .reduce(
        (acc,c)=>acc+(c.precio_mensual || 0),
        0
      )

  return(

    <div style={{padding:40}}>

      <h1>Dashboard</h1>

      <h2>Resumen</h2>

      <p>Clientes activos: {activos}</p>

      <p>Clientes impagados: {impagados}</p>

      <p>Clientes cancelados: {cancelados}</p>

      <p>MRR: €{mrr}</p>

      <hr />

      <h2>Clientes</h2>

      {clientes.map((cliente)=>(
        <div
          key={cliente.id}
          style={{
            border:'1px solid #ccc',
            marginBottom:10,
            padding:10
          }}
        >

          <b>{cliente.numero_cliente}</b>

          <p>{cliente.email}</p>

          <p>Plan: {cliente.plan}</p>

          <p>Estado: {cliente.estado}</p>

          <p>Pago: {cliente.estado_pago}</p>

          <p>Mensual: €{cliente.precio_mensual}</p>

        </div>
      ))}

      <hr />

      <h2>Leads</h2>

      {leads.map((lead)=>(
        <div
          key={lead.id}
          style={{
            border:'1px solid #ccc',
            marginBottom:10,
            padding:10
          }}
        >

          <b>{lead.name}</b>

          <p>{lead.email}</p>

          <p>{lead.phone}</p>

          <p>{lead.message}</p>

        </div>
      ))}

    </div>

  )
}
