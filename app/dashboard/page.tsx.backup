'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {

  const [leads,setLeads] = useState<any[]>([])

  useEffect(()=>{
    cargarLeads()
  },[])

  async function cargarLeads(){

   const { data, error } = await supabase
  .from('leads')
  .select('*')
  .order('created_at',{ascending:false})

    if(data){
      setLeads(data)
    }

    if(error){
      console.log(error)
    }

  }

  return(

    <div style={{padding:40}}>

      <h1>Panel de Leads</h1>

      {leads.map((lead)=>(
        <div key={lead.id} style={{border:'1px solid #ccc',marginBottom:10,padding:10}}>

          <b>{lead.name}</b>

          <p>{lead.email}</p>

          <p>{lead.phone}</p>

          <p>{lead.message}</p>

          <p><b>Empresa:</b> {lead.clientes?.empresa}</p>

          <small>{lead.web_origen}</small>

        </div>
      ))}

    </div>

  )
}