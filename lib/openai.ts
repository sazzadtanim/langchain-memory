import { ConversationChain } from 'langchain/chains'
import { OpenAI } from 'langchain/llms/openai'
import { BufferMemory } from 'langchain/memory'

const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY })
const memory = new BufferMemory()
const chain = new ConversationChain({ llm, memory })

export { chain, llm }

