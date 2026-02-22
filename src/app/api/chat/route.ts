import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const result = await streamText({
      model: google('gemini-1.5-flash'),
      messages,
    });
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('CRITICAL_API_ERROR:', error.message);
    return new Response(error.message, { status: 500 });
  }
}
