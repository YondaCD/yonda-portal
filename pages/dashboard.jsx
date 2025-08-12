import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getDataClient } from '../src/dataClient';
import { MapPin, ChatsCircle, SpeakerHigh, DotsThree } from "phosphor-react";

// Stable LED palette (order maps to device mental model)
const LED_COLORS = ['#22d3ee','#22c55e','#f43f5e','#eab308','#8b5cf6','#f97316','#a3e635','#60a5fa'];

function Dot({ hex }) {
  return <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: hex }} />;
}

export default function Dashboard() {
  const [device, setDevice] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const dc = getDataClient();
      const d = await dc.getDevice();
      setDevice(d || null);

      const cs = await dc.getContacts(d?.id);
      setContacts(Array.isArray(cs) ? cs : []);

      const ms = await dc.getMessages(d?.id);
      setMessages(Array.isArray(ms) ? ms : []);
    })();
  }, []);

  return (
    <main>
      <Header subtitle="Dashboard" />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px' }}>

        {/* Status + Quick Actions */}
        <section className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <h2 className="text-xl font-semibold" style={{ margin: 0 }}>
                {device?.child_name || 'Your device'}
              </h2>
              <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                <span className="badge">Device code: {device?.device_code || '—'}</span>
                <span className="badge">Lang: {device?.language || 'en'}</span>
                <span className="badge">Data: {process.env.NEXT_PUBLIC_DATA_MODE || 'mock'}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 8, minWidth: 260 }}>
              <a className="card" style={{ textAlign: 'center', padding: 12 }} href="/map">
                <MapPin size={22} />
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>Locate</div>
              </a>
              <a className="card" style={{ textAlign: 'center', padding: 12 }} href="/messages">
                <ChatsCircle size={22} />
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>Send note</div>
              </a>
              <button className="card" style={{ textAlign: 'center', padding: 12 }} onClick={() => alert('Chirp!')}>
                <SpeakerHigh size={22} />
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>Play sound</div>
              </button>
              <a className="card" style={{ textAlign: 'center', padding: 12 }} href="/more">
                <DotsThree size={22} />
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>More</div>
              </a>
            </div>
          </div>
        </section>

        {/* Contacts (LED slots) */}
        <section className="card" style={{ marginBottom: 16 }}>
          <h3 className="font-semibold" style={{ marginTop: 0 }}>Contacts (LED slots)</h3>
          <div
            style={{
              display: 'grid',
              gap: 12,
              gridTemplateColumns: 'repeat(3, minmax(0,1fr))'
            }}
          >
            {[...Array(8)].map((_, i) => {
              const slot = i + 1;
              const color = LED_COLORS[i % LED_COLORS.length];
              const c = contacts.find((x) => x.slot === slot);
              return (
                <div key={slot} className="card" style={{ padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Dot hex={color} />
                    <strong>LED {slot}</strong>
                  </div>
                  <div style={{ opacity: 0.8, fontSize: 14, marginTop: 6 }}>
                    {c ? `${c.name} • ${(c.method || '').toUpperCase()}` : 'Add contact'}
                  </div>
                  <a
                    className="nav-button"
                    href={`/contacts?slot=${slot}`}
                    style={{ display: 'inline-block', marginTop: 10 }}
                  >
                    {c ? 'Edit' : 'Add'}
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="card">
          <h3 className="font-semibold" style={{ marginTop: 0 }}>Recent activity</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {messages.map((m) => (
              <div key={m.id} className="card" style={{ padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.7 }}>
                  <span>{m.direction === 'to_device' ? 'Parent → Device' : 'Device → Parent'}</span>
                  <span>{new Date(m.created_at).toLocaleString()}</span>
                </div>
                <div style={{ marginTop: 8 }}>
                  {m.transcript || '(voice note)'}
                </div>
              </div>
            ))}
            {!messages?.length && (
              <div className="card" style={{ padding: 12, opacity: 0.7 }}>
                No recent messages yet.
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
