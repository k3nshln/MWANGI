'use client';
import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, status }: any = useChat();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ background: '#050505', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ flex: 1, width: '100%', maxWidth: '600px', overflowY: 'auto', marginTop: '50px' }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '20vh' }}>
            <h1 style={{ fontSize: '100px', fontWeight: '900' }}>M</h1>
            <p style={{ color: '#444' }}>BUSINESS INTELLIGENCE</p>
          </div>
        ) : (
          messages.map((m: any, i: number) => (
            <div key={i} style={{ margin: '20px 0', textAlign: m.role === 'user' ? 'right' : 'left' }}>
              <div style={{ display: 'inline-block', padding: '10px 20px', borderRadius: '10px', background: m.role === 'user' ? '#111' : '#222' }}>
                {m.content}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', paddingBottom: '40px', display: 'flex', gap: '10px' }}>
        <input 
          style={{ flex: 1, background: '#0f0f0f', border: '1px solid #333', padding: '20px', color: 'white', borderRadius: '12px', outline: 'none' }}
          value={input} 
          onChange={handleInputChange}
          placeholder='Ask Mwangi...'
        />
        <button 
          type="submit"
          disabled={status === 'submitted' || status === 'streaming'}
          style={{ 
            background: 'white', 
            color: 'black', 
            padding: '0 20px', 
            borderRadius: '12px', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            border: 'none',
            opacity: (status === 'submitted' || status === 'streaming') ? 0.5 : 1
          }}
        >
          SEND
        </button>
      </form>
    </div>
  );
}
