import { BaseMessage } from 'langchain/schema'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface History {
  messages: BaseMessage[]
  addMessages: (message: BaseMessage) => void
}

const historyStore = create<History>()(
  persist(
    set => ({
      messages: [],
      addMessages: message =>
        set(oldMessages => ({
          messages: [...oldMessages.messages, message]
        }))
    }),
    {
      name: 'chatHistory'
    }
  )
)

export { historyStore }

