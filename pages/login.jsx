import Header from '../components/Header';

export default function Login(){
  return (
    <div className="container">
      <Header subtitle="Sign In"/>
      <div className="card">
        <h2 style={{marginTop:0}}>Email & Password</h2>
        <p>Auth UI will be wired when Supabase keys are present. For now, this is a placeholder.</p>
        <form onSubmit={(e)=>{e.preventDefault(); alert('Auth wiring comes next.')}}>
          <input className="input" placeholder="Email" style={{marginBottom:10}}/>
          <input className="input" type="password" placeholder="Password" style={{marginBottom:10}}/>
          <button className="btn" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
