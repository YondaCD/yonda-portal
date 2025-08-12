export default function Header({ title='Yonda', subtitle='' }){
  return (
    <div className="header">
      <div>
        <div style={{fontSize:22, fontWeight:800}}>Yonda</div>
        {subtitle && <div className="badge">{subtitle}</div>}
      </div>
      <div className="row">
        <a href="/dashboard" className="badge">Dashboard</a>
        <a href="/contacts" className="badge">Contacts</a>
        <a href="/messages" className="badge">Messages</a>
        <a href="/map" className="badge">GPS</a>
        <a href="/settings" className="badge">Settings</a>
      </div>
    </div>
  );
}
