import { ConversationChain } from 'langchain/chains'
import { OpenAI } from 'langchain/llms/openai'
import { BufferMemory } from 'langchain/memory'

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo'
})
const memory = new BufferMemory()
const chain = new ConversationChain({ llm, memory })

export { chain, llm }

