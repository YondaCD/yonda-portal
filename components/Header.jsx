export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-[#1a1d26]">
      <h1 className="text-xl font-bold text-white">Yonda</h1>
      <nav className="flex gap-2">
        {["Dashboard", "Contacts", "Messages", "GPS", "Settings"].map(tab => (
          <button key={tab} className="nav-button">{tab}</button>
        ))}
      </nav>
    </header>
  );
}
