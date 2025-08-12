import Header from '../components/Header';
import QuickActions from '../components/QuickActions';

export default function Dashboard() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-lg font-semibold">Avery</h2>
        <div className="text-sm mt-1">
          Device code: <span className="font-mono">YND-6J9Q-4C2M-AX7T</span> | Lang: en
        </div>

        <QuickActions
          onLocate={() => console.log("Locate clicked")}
          onSendNote={() => console.log("Send note clicked")}
          onPlaySound={() => console.log("Play sound clicked")}
          onMore={() => console.log("More clicked")}
        />
      </main>
    </div>
  );
}
