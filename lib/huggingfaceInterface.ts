import { HuggingFaceInference } from 'langchain/llms/hf'

const huggingfaceInterface = new HuggingFaceInference({
  model: 'gpt2',
  apiKey: process.env.HUGGINGFACEHUB_API_KEY
})

export { huggingfaceInterface }

