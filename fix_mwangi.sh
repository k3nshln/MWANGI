#!/bin/bash
echo "🚀 STARTING TOTAL SYSTEM SCAN..."

# 1. Detect where Next.js is actually looking
if [ -d "src/app" ]; then
    TARGET="src/app"
    echo "📍 Detected 'src' structure. Target set to: $TARGET"
else
    TARGET="app"
    echo "📍 Detected standard structure. Target set to: $TARGET"
fi

# 2. Force-Fix the API Key
echo "🔑 Re-locking the AI Brain (API Key)..."
echo "GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyDfOQ7yIU1C4FMG4uJ2-7kEsMC8PfVVOS4" > .env.local

# 3. Build the Route (The Brain)
echo "🧠 Rebuilding the Brain at $TARGET/api/chat/route.ts..."
mkdir -p "$TARGET/api/chat"
cat << 'INNER' > "$TARGET/api/chat/route.ts"
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: "You are Mwangi, a bold Kenyan business assistant.",
      messages,
    });
    return result.toDataStreamResponse();
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
INNER

# 4. Build the Interface (The Face)
echo "📺 Rebuilding the Face at $TARGET/page.tsx..."
cat << 'INNER' > "$TARGET/page.tsx"
'use client';
import { useChat } from '@ai-sdk/react';
export default function App() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  return (
    <div style={{background:'black',color:'white',minHeight:'100vh',padding:'40px',fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'40px',fontWeight:'900',fontStyle:'italic'}}>MWANGI LIVE</h1>
      <div style={{paddingBottom:'100px'}}>
        {messages.map(m => (
          <div key={m.id} style={{margin:'20px 0',color: m.role === 'user' ? '#888' : '#fff'}}>
            <strong>{m.role.toUpperCase()}:</strong> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{position:'fixed',bottom:'40px',left:'40px',right:'40px'}}>
        <input 
          autoFocus
          style={{width:'100%',background:'#222',border:'1px solid #444',padding:'20px',color:'white',borderRadius:'10px'}}
          value={input} 
          placeholder="Type 'Hello' and hit Enter..." 
          onChange={handleInputChange} 
        />
        {isLoading && <p style={{color:'yellow',fontSize:'12px'}}>THINKING...</p>}
      </form>
    </div>
  );
}
INNER

# 5. Clear Cache and Launch
echo "🧹 Cleaning out the old engine junk (Cache)..."
rm -rf .next
echo "🏁 REPAIR COMPLETE. STARTING ENGINE..."
npm run dev
