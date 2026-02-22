import { GoogleGenerativeAI } from "@google/generative-ai";

// We initialize without a version to let the library pick the best one
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    
    // Using the ID that works for both v1 and v1beta
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
    });

    const result = await model.generateContentStream({
        contents: [{ role: 'user', parts: [{ text: lastMessage }] }],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
                controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      },
    });

    return new Response(stream, {
        headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(error.message, { status: 500 });
  }
}
