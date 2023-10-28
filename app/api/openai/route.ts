import { chatModel, llm } from "@/lib/openai";

export async function GET() {
  const text =
    "What would be a good company name for a company that makes colorful socks?";

  try {
    const llmResult = await llm.predict(text);
    const chatModelResult = await chatModel.predict(text);
    return Response.json({ message: "sazzad", llmResult, chatModelResult });
  } catch (error) {
    console.dir({ errorline12: error });
    return Response.json({ errorline13: error });
  }
}
