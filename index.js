// pages/index.js
import dynamic from 'next/dynamic';

const GameCanvas = dynamic(() => import('../components/GameCanvas'), { ssr: false });

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '20px', background: 'black', color: 'white' }}>
      <h1>Void Tower Defense</h1>
      <GameCanvas />
    </div>
  );
}
