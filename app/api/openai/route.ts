import { chatModel, llm } from "@/lib/openai";

export async function POST(req: Request) {
  const userMessageFromClient = await req.json();

  if (!userMessageFromClient) {
    return Response.json({ error: "empty user message" });
    console.dir("empty user message");
  }

  try {
    const llmResult = await llm.predict(userMessageFromClient);
    const chatModelResult = await chatModel.predict(userMessageFromClient);
    return Response.json({ llmResult, chatModelResult });
  } catch (error) {
    console.dir({ error });
    return Response.json({ error });
  }
}
