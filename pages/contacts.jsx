import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getDataClient } from '../src/dataClient';

const LED_COLORS = ['#22d3ee','#22c55e','#f43f5e','#eab308','#8b5cf6','#f97316','#a3e635','#60a5fa'];

export default function Contacts(){
  const [device,setDevice]=useState(null);
  const [contacts,setContacts]=useState([]);

  useEffect(()=>{(async()=>{
    const dc=getDataClient();
    const d=await dc.getDevice(); setDevice(d);
    const cs=await dc.getContacts(d?.id); setContacts(cs);
  })()},[]);

  return (
    <div className="container">
      <Header subtitle="Contacts"/>
      <div className="card">
        <h2 style={{marginTop:0}}>Assign contacts to LED slots</h2>
        <div className="list">
          {[...Array(8)].map((_,i)=>{
            const slot=i+1, color=LED_COLORS[i%LED_COLORS.length];
            const c=contacts.find(x=>x.slot===slot);
            return (
              <div key={slot} className="item">
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div><span className="color-dot" style={{background:color}}/><strong>LED {slot}</strong></div>
                  <a className="btn secondary" href={`/edit-contact?slot=${slot}`}>{c?'Edit':'Add'}</a>
                </div>
                <div style={{color:'#9db2ce', marginTop:6}}>{c? `${c.name} • ${c.method.toUpperCase()}` : 'Unassigned'}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
