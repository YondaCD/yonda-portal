export default function QuickActions({ onLocate, onSendNote, onPlaySound, onMore }) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      <button className="card" onClick={onLocate}>📍 Locate</button>
      <button className="card" onClick={onSendNote}>🎤 Send note</button>
      <button className="card" onClick={onPlaySound}>🔔 Play sound</button>
      <button className="card" onClick={onMore}>⋯ More</button>
    </div>
  );
}
