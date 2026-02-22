import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      messages: await convertToModelMessages(messages),
    });

    // Renamed to the correct method for SDK 5.0
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('AI_ERROR:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
