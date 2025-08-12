import Header from '../components/Header';

export default function Home(){
  return (
    <div className="container">
      <Header subtitle="Parent Portal • MVP"/>
      <div className="card">
        <h1 style={{marginTop:0}}>Welcome to Yonda</h1>
        <p>Manage your child's screen‑free voice device: contacts, messages, and GPS alerts.</p>
        <div className="row">
          <a className="btn" href="/dashboard">Open Dashboard</a>
          <a className="btn secondary" href="/login">Sign In</a>
        </div>
        <hr className="hr"/>
        <div className="row">
          <span className="badge">Data mode: <b>{process.env.NEXT_PUBLIC_DATA_MODE || 'mock'}</b></span>
        </div>
      </div>
    </div>
  );
}
