import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getDataClient } from '../src/dataClient';

function ColorDot({hex}){ return <span className="color-dot" style={{background:hex}}/> }

const LED_COLORS = ['#22d3ee','#22c55e','#f43f5e','#eab308','#8b5cf6','#f97316','#a3e635','#60a5fa'];

export default function Dashboard(){
  const [device,setDevice]=useState(null);
  const [contacts,setContacts]=useState([]);
  const [messages,setMessages]=useState([]);

  useEffect(()=>{(async()=>{
    const dc=getDataClient();
    const d=await dc.getDevice(); setDevice(d);
    const cs=await dc.getContacts(d?.id); setContacts(cs);
    const ms=await dc.getMessages(d?.id); setMessages(ms);
  })()},[]);

  return (
    <div className="container">
      <Header subtitle="Dashboard"/>
      <div className="card">
        <div className="row" style={{alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <h2 style={{margin:'0 0 6px 0'}}>{device?.child_name || 'Your device'}</h2>
            <div className="row"><span className="badge">Device code: {device?.device_code || '—'}</span><span className="badge">Lang: {device?.language || 'en'}</span></div>
          </div>
          <div className="row">
            <a className="qbtn" href="/map"><div>📍</div><strong>Locate</strong></a>
            <a className="qbtn" href="/messages"><div>🎙️</div><strong>Send note</strong></a>
            <button className="qbtn" onClick={()=>alert('Chirp!')}><div>🔊</div><strong>Play sound</strong></button>
            <a className="qbtn" href="/more"><div>⋯</div><strong>More</strong></a>
          </div>
        </div>

        <hr className="hr"/>
        <h3>Contacts (LED slots)</h3>
        <div className="grid3">
          {[...Array(8)].map((_,i)=>{
            const slot=i+1;
            const c=contacts.find(x=>x.slot===slot);
            const color=LED_COLORS[i%LED_COLORS.length];
            return (
              <div key={slot} className="item" style={{background:'#0f1420', border:'1px solid #22304a', borderRadius:12, padding:12}}>
                <div><ColorDot hex={color}/><strong>LED {slot}</strong></div>
                <div style={{color:'#9db2ce'}}>{c? c.name : 'Add contact'}</div>
                <div className="row">
                  <a className="btn secondary" href={`/contacts?slot=${slot}`}>{c?'Edit':'Add'}</a>
                </div>
              </div>
            );
          })}
        </div>

        <hr className="hr"/>
        <h3>Recent activity</h3>
        <div className="list">
          {messages.map(m=> (
            <div key={m.id} className="item">
              <div className="row" style={{justifyContent:'space-between'}}>
                <div>
                  <span className="tag">{m.direction==='to_device'?'Parent → Device':'Device → Parent'}</span>
                  <span style={{marginLeft:8, color:'#9db2ce'}}>{new Date(m.created_at).toLocaleString()}</span>
                </div>
                <div className="badge">{m.status||'sent'}</div>
              </div>
              <div style={{marginTop:6}}>{m.transcript||'(voice note)'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
