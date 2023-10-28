import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAI } from "langchain/llms/openai";

const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
const chatModel = new ChatOpenAI();

export { chatModel, llm };

