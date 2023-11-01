import { chain } from '@/lib/openai'

export async function POST(req: Request) {
  const userMessageFromClient = await req.json()

  if (!userMessageFromClient) {
    console.dir('empty user message')
    return Response.json({ error: 'empty user message' })
  }

  try {
    const res = await chain.call({ input: userMessageFromClient })
    console.dir(res)
    return Response.json(res)
  } catch (error) {
    console.dir({ error })
    return Response.json({ error })
  }
}
