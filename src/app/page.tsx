'use client';
import { useState, useEffect } from 'react';

export default function App() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: any) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiContent = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        const chunk = decoder.decode(value);
        aiContent += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = aiContent;
          return updated;
        });
      }
    } catch (err) {
      console.error("Chat Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: '#050505', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ flex: 1, width: '100%', maxWidth: '600px', overflowY: 'auto', marginTop: '50px' }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '20vh' }}>
            <h1 style={{ fontSize: '100px', fontWeight: '900' }}>M</h1>
            <p style={{ color: '#444' }}>BUSINESS INTELLIGENCE</p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} style={{ margin: '20px 0', textAlign: m.role === 'user' ? 'right' : 'left' }}>
              <div style={{ display: 'inline-block', padding: '10px 20px', borderRadius: '10px', background: m.role === 'user' ? '#111' : '#222' }}>
                {m.content}
              </div>
            </div>
          ))
        )}
        {loading && <div style={{ color: '#444' }}>...</div>}
      </div>

      <form onSubmit={sendMessage} style={{ width: '100%', maxWidth: '600px', paddingBottom: '40px', display: 'flex', gap: '10px' }}>
        <input 
          style={{ flex: 1, background: '#0f0f0f', border: '#333 1px solid', padding: '20px', color: 'white', borderRadius: '12px' }}
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask Mwangi...'
        />
        <button type="submit" style={{ background: 'white', color: 'black', padding: '0 20px', borderRadius: '12px', fontWeight: 'bold' }}>
          SEND
        </button>
      </form>
    </div>
  );
}
