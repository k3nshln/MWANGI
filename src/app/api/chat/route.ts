import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
export const runtime = 'edge';
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('--- BRAIN ACTIVATED ---');
    const result = streamText({
      model: google('gemini-1.5-flash'),
      messages,
    });
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('CRITICAL_API_ERROR:', error.message);
    return new Response(error.message, { status: 500 });
  }
}