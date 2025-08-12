import Header from '../components/Header';

export default function Settings(){
  return (
    <div className="container">
      <Header subtitle="Settings"/>
      <div className="card">
        <h2 style={{marginTop:0}}>Account & Device</h2>
        <div className="list">
          <div className="item">
            <div className="row" style={{justifyContent:'space-between'}}>
              <div>
                <strong>Language</strong>
                <div style={{color:'#9db2ce'}}>English / Français</div>
              </div>
              <button className="btn secondary">Change</button>
            </div>
          </div>
          <div className="item">
            <div className="row" style={{justifyContent:'space-between'}}>
              <div>
                <strong>Deactivate subscription & wipe device</strong>
                <div style={{color:'#9db2ce'}}>You can reactivate later; you’ll reconfigure as new.</div>
              </div>
              <button className="btn" style={{background:'#f43f5e'}}>Deactivate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
