'use client'
import { MouseEvent, ReactNode, useState } from 'react'

export default function Home() {
  const [userInput, setUserInput] = useState('')
  const [aiReply, setAiReply] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true)
    const sendUserInputToApi = async () => {
      const res = await fetch('/api/openai', {
        body: JSON.stringify(userInput),
        method: 'POST'
      })

      // Post request failed
      if (res.ok === false) {
        console.dir({ res })
        return new Error(`Error happened. Error:${res.statusText}`)
      }

      const messageFromServer = await res.json()

      // handle messageFromServer
      if (typeof messageFromServer.error === 'string') {
        console.dir(messageFromServer.error)
        setAiReply(messageFromServer.error)
        setIsLoading(false)
        setUserInput('')
      } else {
        setIsLoading(false)
        setAiReply(messageFromServer.chatModelResult)
        setUserInput('')
      }
    }
    sendUserInputToApi()
  }

  return (
    <main className='container text-black'>
      <h1 className='text-center font-serif text-xl font-bold'>
        LANCHAIN MEMORY
      </h1>

      {/* Use it later */}
      {/* <Messages messages={[{ message: "scdsad", user: "sadsa" }]} /> */}

      <div className='flex justify-center p-10'>
        <Conversation
          conversation={{ message: aiReply, user: 'AI', isLoading }}
        />
      </div>

      <div className='absolute bottom-10 inline-block w-full gap-10 text-center'>
        <input
          type='text'
          name='user_input'
          id='user_input'
          placeholder='chat with openai'
          onChange={e => setUserInput(e.target.value)}
          className='mx-10 px-2 py-1 ring-1 disabled:ring-red-500'
          disabled={isLoading}
          value={userInput}
        />
        <button
          type='submit'
          onClick={e => onSubmit(e)}
          className='rounded-full px-3 py-2 ring-2 disabled:ring-red-500'
          disabled={isLoading}
        >
          Submit
        </button>
      </div>
    </main>
  )
}

type Conversation = { user: string; message: string; isLoading: boolean }
type Messages = Conversation[]

const Conversation = (props: { conversation: Conversation }): ReactNode => (
  <div className='flex gap-4 '>
    <p className='font-medium'>{props.conversation.user}:</p>
    {props.conversation.isLoading ? (
      <LoadingSpinner />
    ) : (
      <p className='font-serif'>{props.conversation.message}</p>
    )}
  </div>
)

const Messages = (props: { messages: Messages }) => (
  <div>
    {props.messages.map((conversation, index) => (
      <Conversation conversation={conversation} key={index} />
    ))}
  </div>
)

const LoadingSpinner = () => (
  <div role='status'>
    <svg
      aria-hidden='true'
      className='mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
      viewBox='0 0 100 101'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
        fill='currentColor'
      />
      <path
        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
        fill='currentFill'
      />
    </svg>
    <span className='sr-only'>Loading...</span>
  </div>
)
