import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getDataClient } from '../src/dataClient';

export default function Messages(){
  const [device,setDevice]=useState(null);
  const [messages,setMessages]=useState([]);

  useEffect(()=>{(async()=>{
    const dc=getDataClient();
    const d=await dc.getDevice(); setDevice(d);
    const ms=await dc.getMessages(d?.id); setMessages(ms);
  })()},[]);

  return (
    <div className="container">
      <Header subtitle="Messages"/>
      <div className="card">
        <h2 style={{marginTop:0}}>My messages</h2>
        <div className="list">
          {messages.map(m=> (
            <div key={m.id} className="item">
              <div className="row" style={{justifyContent:'space-between'}}>
                <div><span className="badge">{m.direction}</span></div>
                <div className="badge">{new Date(m.created_at).toLocaleString()}</div>
              </div>
              <div style={{marginTop:6}}>{m.transcript||'(voice note)'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
