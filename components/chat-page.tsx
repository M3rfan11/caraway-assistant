'use client'

import { useState } from 'react'
import { ChatInterface } from '@/components/chat-interface'
import { ResultsDisplay } from '@/components/results-display'

export function ChatPage() {
  const [completionData, setCompletionData] = useState(null)

  const handleChatComplete = (data: any) => {
    setCompletionData(data)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Chat Section */}
        <div className="flex flex-1 flex-col lg:w-1/2 lg:border-r lg:border-gray-200">
          <ChatInterface onComplete={handleChatComplete} />
        </div>

        {/* Results Section */}
        <div className="flex-1 overflow-y-auto bg-white lg:w-1/2">
          {completionData ? (
            <ResultsDisplay data={completionData} />
          ) : (
            <div className="flex h-full items-center justify-center p-4">
              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-foreground">Assessment Results</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Complete the chat to see detailed medical assessment results here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
