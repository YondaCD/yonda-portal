import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getDataClient } from '../src/dataClient';

export default function Map(){
  const [places,setPlaces]=useState([]);
  useEffect(()=>{(async()=>{
    const dc=getDataClient();
    const ps=await dc.getPlaces(); setPlaces(ps);
  })()},[]);

  return (
    <div className="container">
      <Header subtitle="GPS & Alerts"/>
      <div className="card">
        <h2 style={{marginTop:0}}>Notify me</h2>
        <p>Set alerts for Home/School. (Map wiring added later.)</p>
        <div className="list">
          {places.map(p=> (
            <div key={p.id} className="item">
              <div className="row" style={{justifyContent:'space-between'}}>
                <strong>{p.label}</strong>
                <span className="badge">{p.radius_m} m radius</span>
              </div>
              <div style={{color:'#9db2ce'}}>Lat {p.lat.toFixed(4)}, Lng {p.lng.toFixed(4)}</div>
              <div className="row" style={{marginTop:8}}>
                <button className="btn">Enable alert</button>
                <button className="btn secondary">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
