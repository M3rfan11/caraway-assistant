'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mic, Send, X } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  text: string
  timestamp: Date
}

interface ChatInterfaceProps {
  onComplete?: (data: any) => void
}

export function ChatInterface({ onComplete }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const [chatDone, setChatDone] = useState(false)
  const [responseData, setResponseData] = useState<any>(null)

  useEffect(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)

    // Initialize welcome message
    const welcomeMsg: Message = {
      id: '0',
      type: 'bot',
      text: 'Hello! I am your medical assistant. Please describe your symptoms or health concerns so I can help assess your condition.',
      timestamp: new Date(),
    }
    setMessages([welcomeMsg])

    // Initialize speech recognition if available
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onstart = () => setIsListening(true)
        recognitionRef.current.onend = () => setIsListening(false)
        recognitionRef.current.onerror = () => setIsListening(false)

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('')
          setInputValue(transcript)
        }
      }
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      recognitionRef.current.start()
    }
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || chatDone) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const payload: any = {
        session_id: sessionId,
        latest_message: inputValue,
      }

      // Add patient history on first message (you can customize this)
      if (messages.length === 1) {
        payload.api_response = {
          PatientHistory: [],
        }
      }

      const response = await fetch('https://careway-chatbot-1056327500922.us-central1.run.app/invoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      if (data.chat_done) {
        setChatDone(true)
        setResponseData(data)
        if (onComplete) {
          onComplete(data)
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: 'Sorry, I encountered an error processing your message. Please try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const startNewChat = () => {
    setMessages([
      {
        id: '0',
        type: 'bot',
        text: 'Hello! I am your medical assistant. Please describe your symptoms or health concerns so I can help assess your condition.',
        timestamp: new Date(),
      },
    ])
    setInputValue('')
    setChatDone(false)
    setResponseData(null)
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-primary to-primary/80 px-4 py-4 text-white shadow-sm sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Careway Medical Chatbot</h1>
            <p className="text-sm text-primary-foreground/80">AI-powered symptom assessment</p>
          </div>
          {chatDone && (
            <Button onClick={startNewChat} variant="outline" className="bg-white text-primary hover:bg-primary/10">
              New Chat
            </Button>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs space-y-1 rounded-lg px-4 py-2 sm:max-w-md ${
                  message.type === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-foreground border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs ${message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-secondary px-4 py-2">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                  <div className="animation-delay-200 h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                  <div className="animation-delay-400 h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {!chatDone && (
        <div className="border-t border-gray-200 bg-white p-4 sm:p-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe your symptoms..."
              className="flex-1 rounded-lg border border-gray-300 bg-input px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={isLoading}
            />
            <Button
              onClick={toggleSpeechRecognition}
              variant="outline"
              size="icon"
              className={`${isListening ? 'bg-red-100 text-red-600 hover:bg-red-100' : ''}`}
              title={isListening ? 'Stop listening' : 'Start listening'}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button onClick={sendMessage} disabled={isLoading || !inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Completion Message */}
      {chatDone && responseData && (
        <div className="border-t border-gray-200 bg-white p-4 sm:p-6">
          <div className="space-y-4 rounded-lg bg-secondary p-4">
            <p className="text-sm font-medium text-foreground">Assessment complete! Your results are ready below.</p>
          </div>
        </div>
      )}
    </div>
  )
}
