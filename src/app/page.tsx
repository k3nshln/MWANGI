'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function App() {
  // New version of useChat uses sendMessage instead of handleInputChange
  const [input, setInput] = useState('');
  const { messages, sendMessage, status }: any = useChat();

  const handleManualSend = () => {
    if (!input || input.trim().length === 0) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div style={{ background: '#050505', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ flex: 1, width: '100%', maxWidth: '600px', overflowY: 'auto', marginTop: '50px' }}>
        {messages?.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '20vh' }}>
            <h1 style={{ fontSize: '100px', fontWeight: '900' }}>M</h1>
            <p style={{ color: '#444' }}>BUSINESS INTELLIGENCE</p>
          </div>
        ) : (
          messages?.map((m: any, i: number) => (
            <div key={i} style={{ margin: '20px 0', textAlign: m.role === 'user' ? 'right' : 'left' }}>
              <div style={{ display: 'inline-block', padding: '10px 20px', borderRadius: '10px', background: m.role === 'user' ? '#111' : '#222' }}>
                {/* Newer SDK uses message.parts for text */}
                {m.parts ? m.parts.map((p: any) => p.text).join('') : m.content}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ width: '100%', maxWidth: '600px', paddingBottom: '40px', display: 'flex', gap: '10px' }}>
        <input 
          style={{ flex: 1, background: '#0f0f0f', border: '1px solid #333', padding: '20px', color: 'white', borderRadius: '12px', outline: 'none' }}
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if(e.key === 'Enter') handleManualSend(); }}
          placeholder='Ask Mwangi...'
          disabled={status === 'streaming'}
        />
        <button 
          onClick={handleManualSend}
          disabled={status === 'streaming'}
          style={{ background: 'white', color: 'black', padding: '0 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', border: 'none', opacity: status === 'streaming' ? 0.5 : 1 }}
        >SEND</button>
      </div>
    </div>
  );
}
