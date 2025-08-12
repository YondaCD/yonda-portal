import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getDataClient } from '../src/dataClient';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    (async () => {
      const dc = getDataClient();
      const ms = await dc.getMessages('demo-device-1');
      setMessages(ms || []);
    })();
  }, []);

  async function simulate(pressMs, vadActiveMs) {
    const dc = getDataClient();
    const res = await dc.simulateRecordAttempt({ pressMs, vadActiveMs, now: Date.now() });

    if (!res.accepted) {
      const map = {
        too_short: 'Ignored: press too short',
        no_voice: 'Ignored: no voice detected',
        debounce_ignored: 'Ignored: pressed again too quickly',
        rate_limited: 'Ignored: too many attempts, slow down',
        mock_only: 'Live mode does not simulate',
      };
      setStatus(map[res.reason] || 'Ignored');
      return;
    }

    // If accepted, create a mock message with a tiny transcript
    const entry = await dc.sendTranscript({ transcript: `Voice note (${Math.round(pressMs)}ms)` });
    setMessages(prev => [entry, ...prev]);
    setStatus(res.merged ? 'Accepted (merged burst)' : 'Accepted');
  }

  return (
    <main>
      <Header subtitle="My messages" />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
        {/* Compose (placeholder) */}
        <section className="card" style={{ marginBottom: 16 }}>
          <h3 className="font-semibold" style={{ marginTop: 0 }}>Send a quick note</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="input" placeholder="Type a short note..." />
            <button className="btn">Send</button>
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
            This is a placeholder UI. Recording simulation is below.
          </div>
        </section>

        {/* Recording Test */}
        <section className="card" style={{ marginBottom: 16 }}>
          <h3 className="font-semibold" style={{ marginTop: 0 }}>Recording Test (flick prevention)</h3>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>
            <button className="nav-button" onClick={() => simulate(120, 30)}>Short flick</button>
            <button className="nav-button" onClick={() => simulate(360, 80)}>Borderline</button>
            <button className="nav-button" onClick={() => simulate(900, 500)}>Proper hold</button>
          </div>
          {status && <div style={{ marginTop: 10, fontSize: 14, opacity: 0.9 }}>{status}</div>}
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
            Policy: min hold 500ms, min voice 250ms, debounce 350ms, burst merge window 2.5s, rate limit 15/min.
          </div>
        </section>

        {/* Feed */}
        <section className="card">
          <h3 className="font-semibold" style={{ marginTop: 0 }}>Recent messages</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {messages.map((m) => (
              <div key={m.id} className="card" style={{ padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.7 }}>
                  <span>{m.direction === 'to_device' ? 'Parent → Device' : 'Device → Parent'}</span>
                  <span>{new Date(m.created_at).toLocaleString()}</span>
                </div>
                <div style={{ marginTop: 8 }}>{m.transcript || '(voice note)'}</div>
              </div>
            ))}
            {!messages?.length && (
              <div className="card" style={{ padding: 12, opacity: 0.7 }}>
                No messages yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
