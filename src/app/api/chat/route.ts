import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      // This helper converts UI messages to the format the model expects
      messages: convertToModelMessages(messages),
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('AI_ERROR:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
