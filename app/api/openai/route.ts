import { huggingfaceInterface } from '@/lib/huggingfaceInterface'

export async function POST(req: Request) {
  const userMessageFromClient = await req.json()
  console.dir({ userMessageFromClient })

  // if (!userMessageFromClient) {
  //   return Response.json({ error: 'empty user message' })
  // }

  // try {
  //   const res = await chain.call({ input: userMessageFromClient })
  //   console.dir(res)
  //   return Response.json(res)
  // } catch (error) {
  //   return Response.json({ error })
  // }

  const res = await huggingfaceInterface.call(userMessageFromClient)
  console.dir({ res })
  return Response.json(res)
}
