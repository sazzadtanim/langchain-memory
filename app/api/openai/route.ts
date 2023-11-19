import { chain } from '@/lib/openai'
import { ChatMessageHistory } from 'langchain/memory'

const history = new ChatMessageHistory()

export async function POST(req: Request) {
  const userMessageFromClient = await req.json()

  if (!userMessageFromClient) {
    return Response.json({ error: 'empty user message' })
  }

  try {
    const res = await chain.call({ input: userMessageFromClient })
    console.dir({ res })
    await history.addUserMessage(userMessageFromClient)
    await history.addAIChatMessage(res?.response)

    return Response.json({ messages: await history.getMessages() })
  } catch (error) {
    return Response.json({ error })
  }
}
