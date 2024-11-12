"use client"

import { ChevronDown } from "lucide-react"
import React, { useState, createContext, useContext } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ContextColors = {
  text: string
  bg: string
  border: string
  hoverBg: string
}

const ColorContext = createContext<ContextColors>({
  text: 'text-purple-600',
  bg: 'bg-purple-100',
  border: 'border-purple-500',
  hoverBg: 'hover:bg-purple-50'
})

const getContextColor = (ctx: string): ContextColors => {
  switch (ctx) {
    case 'Onboarding':
      return {
        text: 'text-purple-600',
        bg: 'bg-purple-100',
        border: 'border-purple-500',
        hoverBg: 'hover:bg-purple-50'
      }
    case 'Campaign':
      return {
        text: 'text-yellow-600',
        bg: 'bg-yellow-100',
        border: 'border-yellow-500',
        hoverBg: 'hover:bg-yellow-50'
      }
    default:
      return {
        text: 'text-gray-600',
        bg: 'bg-gray-100',
        border: 'border-gray-500',
        hoverBg: 'hover:bg-gray-50'
      }
  }
}

function ContextButton({ children }: { children: React.ReactNode }) {
  const colors = useContext(ColorContext)
  return (
    <button className={`px-4 py-2 rounded-full ${colors.border} ${colors.text} ${colors.hoverBg} transition-colors`}>
      {children}
    </button>
  )
}

export default function ChatWidget() {
  const [inputMessage, setInputMessage] = useState('')
  const [showFullScreen, setShowFullScreen] = useState(false)
  const [context, setContext] = useState('Onboarding')
  const colors = getContextColor(context)

  return (
    <ColorContext.Provider value={colors}>
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${showFullScreen ? 'w-full h-full fixed top-0 left-0 m-0' : 'w-[420px]'}`}>
        {/* Header with controls */}
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex-1">
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setShowFullScreen(!showFullScreen)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-2V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Profile section */}
        <div className="p-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full ${colors.bg} overflow-hidden`}>
              <img 
                src="/placeholder.svg?height=48&width=48" 
                alt="Ava profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className={`${colors.text} text-xl font-semibold flex items-center`}>
                Hey👋, I&apos;m Ava
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Ask me anything or pick a place to start
              </p>
            </div>
          </div>
        </div>

        {/* Sample messages */}
        <div className="px-6 py-2">
          <div className="flex items-start space-x-3 mb-6">
            <div className={`w-8 h-8 rounded-full ${colors.bg} overflow-hidden flex-shrink-0`}>
              <img 
                src="/placeholder.svg?height=32&width=32" 
                alt="Ava" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-1">Hi Jane,</p>
              <p className="text-sm text-gray-700">
                Amazing how Mosey is simplifying state compliance<br/>
                for businesses across the board!
              </p>
              <div className="mt-4">
                <div className="text-sm space-y-2">
                  <ContextButton>
                    Create Report this month
                  </ContextButton>
                  <ContextButton>
                    Call Lead
                  </ContextButton>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <div className={`${colors.text} ${colors.bg} rounded-lg px-4 py-2 max-w-[80%]`}>
              <p className="text-sm">Hi, thanks for connecting!</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 mb-6">
            <div className={`w-8 h-8 rounded-full ${colors.bg} overflow-hidden flex-shrink-0`}>
              <img 
                src="/placeholder.svg?height=32&width=32" 
                alt="Ava" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-1">Hi Jane,</p>
              <p className="text-sm text-gray-700">
                Amazing how Mosey is simplifying state compliance<br/>
                for businesses across the board!
              </p>
            </div>
          </div>
        </div>

        {/* Input section */}
        <div className="p-4 mt-auto">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full ${colors.bg} overflow-hidden flex-shrink-0`}>
              <img 
                src="/placeholder.svg?height=32&width=32" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Your question"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="w-full px-3 py-2 text-sm border-none focus:ring-0 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Context selector */}
        <div className="px-4 py-3 border-t flex items-center justify-between">
                <div>
                <span className="text-sm text-gray-600">Context{" "}</span>
                
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className={`gap-1 ${colors.text} ${colors.bg}`}>
                    {context}
                    <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setContext('Onboarding')} className={getContextColor('Onboarding').text + ' ' + getContextColor('Onboarding').bg}>
                    Onboarding
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setContext('Campaign')} className={getContextColor('Campaign').text + ' ' + getContextColor('Campaign').bg}>
                    Campaign
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                </button>
            </div>
            </div>
      </div>
    </ColorContext.Provider>
  )
}