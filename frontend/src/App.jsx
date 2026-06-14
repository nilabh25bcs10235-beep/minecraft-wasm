import React, { useState } from 'react';

function App() {
  const [gameState, setGameState] = useState('menu');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [backendUrl] = useState('https://mc3d-ai.onrender.com');

  const startGame = () => {
    setGameState('loading');
    setLoadingProgress(0);

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + Math.random() * 12 + 8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setGameState('playing'), 400);
          return 100;
        }
        return Math.min(next, 100);
      });
    }, 160);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { type: 'user', content: userMsg }]);
    setInput('');

    try {
      const res = await fetch(`${backendUrl}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { type: 'ai', content: data.reply || '...' }]);
    } catch {
      setMessages(prev => [...prev, { type: 'ai', content: 'AI error' }]);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden', position: 'relative' }}>
      {/* MENU */}
      {gameState === 'menu' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '40px' }}>MINECRAFT 3D</h1>
          <button onClick={startGame} style={{ padding: '20px 70px', fontSize: '24px', background: '#4ade80', color: 'black', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>
            Play
          </button>
        </div>
      )}

      {/* MINECRAFT LOADING SCREEN */}
      {gameState === 'loading' && (
        <div style={{ position: 'absolute', inset: 0, background: '#3a2f1f', zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#f4e9d8' }}>
          <div style={{ fontSize: '36px', marginBottom: '30px', fontFamily: 'monospace' }}>Generating World...</div>
          <div style={{ width: '65%', maxWidth: '480px', height: '26px', background: '#5c4633', border: '5px solid #3a2f1f' }}>
            <div style={{ width: `${loadingProgress}%`, height: '100%', background: '#8b5a2b', transition: 'width 0.15s' }} />
          </div>
          <div style={{ marginTop: '18px', fontSize: '18px' }}>{Math.floor(loadingProgress)}%</div>
        </div>
      )}

      {/* GAME AREA */}
      {gameState === 'playing' && (
        <div style={{ width: '100%', height: '100%', background: '#1a252f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
          WASM Voxel World (Stage 3 Ready)
        </div>
      )}

      {/* AI CHAT */}
      {gameState === 'playing' && (
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '260px', background: 'rgba(20,20,20,0.95)', padding: '12px', overflowY: 'auto' }}>
          <h3>AI Companion</h3>
          <div style={{ height: '60%', overflowY: 'auto', marginBottom: '10px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: '12px', fontSize: '14px' }}>
                <strong>{m.type === 'user' ? 'You' : 'AI'}:</strong> {m.content}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} placeholder="Talk to AI..." style={{ flex: 1, padding: '10px', background: '#333', color: 'white', border: 'none' }} />
            <button onClick={sendMessage} style={{ padding: '10px 16px' }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
