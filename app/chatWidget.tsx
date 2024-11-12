"use client"

import { ChevronDown, Send, Edit2, Trash2 } from "lucide-react"
import React, { useState, createContext, useContext, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

type ContextColors = {
  text: string
  bg: string
  border: string
  hoverBg: string
}

type Message = {
  id: number
  sender: 'user' | 'bot'
  content: string | React.ReactNode
  timestamp: Date
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

function ContextButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const colors = useContext(ColorContext)
  return (
    <button 
      className={`px-4 py-2 rounded-full ${colors.border} ${colors.text} ${colors.hoverBg} transition-colors`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const complianceData = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 88 },
  { month: 'Mar', score: 92 },
  { month: 'Apr', score: 90 },
  { month: 'May', score: 94 },
  { month: 'Jun', score: 92 }
]

const ComplianceReport = () => (
  <div className="bg-white rounded-lg p-4 space-y-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Compliance Overview</h3>
      <span className="text-sm text-gray-500">Last 6 months</span>
    </div>
    
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={complianceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[80, 100]} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            dot={{ fill: '#8B5CF6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <Alert>
      <AlertTitle>Monthly Highlights</AlertTitle>
      <AlertDescription>
        <ul className="mt-2 space-y-1">
          <li className="flex items-center text-sm">
            <span className="w-32">Current Score:</span>
            <span className="font-semibold text-purple-600">92%</span>
          </li>
          <li className="flex items-center text-sm">
            <span className="w-32">Improvement:</span>
            <span className="font-semibold text-green-600">+2.5%</span>
          </li>
          <li className="flex items-center text-sm">
            <span className="w-32">Requirements:</span>
            <span className="font-semibold">45/49 Complete</span>
          </li>
        </ul>
      </AlertDescription>
    </Alert>
  </div>
)

const CampaignReport = () => (
  <div className="bg-white rounded-lg p-4 space-y-4">
    <Alert className="border-yellow-200 bg-yellow-50">
      <AlertTitle className="text-yellow-800">Campaign Performance</AlertTitle>
      <AlertDescription>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-yellow-800">Overall Engagement</span>
            <div className="w-48 h-2 bg-yellow-200 rounded-full">
              <div className="w-[75%] h-full bg-yellow-600 rounded-full"></div>
            </div>
            <span className="text-sm font-semibold text-yellow-800">75%</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">1,234</div>
              <div className="text-sm text-yellow-800">Clicks</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">56%</div>
              <div className="text-sm text-yellow-800">Open Rate</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">89</div>
              <div className="text-sm text-yellow-800">Conversions</div>
            </div>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  </div>
)

export default function ChatWidget() {
  const [inputMessage, setInputMessage] = useState('')
  const [showFullScreen, setShowFullScreen] = useState(false)
  const [context, setContext] = useState('Onboarding')
  const [messages, setMessages] = useState<Message[]>([])
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null)
  const [reportGenerated, setReportGenerated] = useState(false)
  const colors = getContextColor(context)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    // Reset messages and report status when context changes
    setMessages([])
    setReportGenerated(false)
    
    // Add initial message for the selected context
    const initialMessage = {
      id: Date.now(),
      sender: 'bot' as const,
      content: getInitialMessage(context),
      timestamp: new Date()
    }
    setMessages([initialMessage])
  }, [context])

  const getInitialMessage = (ctx: string): string => {
    if (ctx === 'Onboarding') {
      return "Hi there! I'm Ava, your onboarding assistant. I'm here to help you get started with our platform and ensure you're compliant with all necessary regulations. What would you like to know about our onboarding process?"
    } else if (ctx === 'Campaign') {
      return "Hello! I'm Cam, your campaign manager. I'm here to help you create, manage, and optimize your marketing campaigns. How can I assist you with your campaign strategy today?"
    }
    return "Hello! How can I assist you today?"
  }

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return

    const newMessage: Message = {
      id: Date.now(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages([...messages, newMessage])
    setInputMessage('')

    try {
      const response = await fetch('/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      let botResponse = ''
      while (reader) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = JSON.parse(line.slice(5))
            if (data === '[DONE]') {
              break
            }
            botResponse += data.content
            setMessages(prevMessages => {
              const lastMessage = prevMessages[prevMessages.length - 1]
              if (lastMessage.sender === 'bot') {
                return [
                  ...prevMessages.slice(0, -1),
                  { ...lastMessage, content: botResponse }
                ]
              } else {
                return [
                  ...prevMessages,
                  { id: Date.now(), sender: 'bot', content: botResponse, timestamp: new Date() }
                ]
              }
            })
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDeleteMessage = async (id: number) => {
    try {
      const response = await fetch(`/delete/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      while (reader) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = JSON.parse(line.slice(5))
            if (data === '[DONE]') {
              break
            }
            if (data.deleted) {
              setMessages(messages.filter(message => message.id !== data.deleted))
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleEditMessage = async (id: number, newContent: string) => {
    try {
      const response = await fetch(`/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      let updatedContent = ''
      while (reader) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = JSON.parse(line.slice(5))
            if (data === '[DONE]') {
              break
            }
            updatedContent += data.content
            setMessages(prevMessages => 
              prevMessages.map(message => 
                message.id === id ? { ...message, content: updatedContent } : message
              )
            )
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
    }
    setEditingMessageId(null)
  }

  const generateReport = () => {
    if (!reportGenerated) {
      const reportMessage: Message = {
        id: Date.now(),
        sender: 'bot',
        content: context === 'Onboarding' ? <ComplianceReport /> : <CampaignReport />,
        timestamp: new Date()
      }
      setMessages(prevMessages => [...prevMessages, reportMessage])
      setReportGenerated(true)
    }
  }

  const startDialog = () => {
    const dialogMessage: Message = {
      id: Date.now(),
      sender: 'bot',
      content: context === 'Onboarding' 
        ? "Great! Let's start by discussing your current compliance status. What industry are you in, and what specific regulations are you most concerned about?"
        : "Excellent! To help with your campaign, let's begin by identifying your target audience and main campaign objectives. Could you tell me more about who you're trying to reach and what you want to achieve?",
      timestamp: new Date()
    }
    setMessages(prevMessages => [...prevMessages, dialogMessage])
  }

  return (
    <ColorContext.Provider value={colors}>
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col ${showFullScreen ? 'w-full h-full fixed top-0 left-0 m-0' : 'w-[420px] h-[600px]'}`}>
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
                alt={context === 'Onboarding' ? 'Ava profile' : 'Cam profile'} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className={`${colors.text} text-xl font-semibold flex items-center`}>
                Hey👋, I&apos;m {context === 'Onboarding' ? 'Ava' : 'Cam'}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {context === 'Onboarding' ? 'Your onboarding assistant' : 'Your campaign manager'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'items-start'} space-x-3 mb-4`}>
              {message.sender === 'bot' && (
                <div className={`w-8 h-8 rounded-full ${colors.bg} overflow-hidden flex-shrink-0`}>
                  <img 
                    src="/placeholder.svg?height=32&width=32" 
                    alt={context === 'Onboarding' ? 'Ava' : 'Cam'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.sender === 'user' ? `${colors.text} ${colors.bg}` : 'bg-gray-100'
                }`}>
                  {editingMessageId === message.id ? (
                    <input
                      type="text"
                      value={message.content as string}
                      onChange={(e) => handleEditMessage(message.id, e.target.value)}
                      onBlur={() => setEditingMessageId(null)}
                      autoFocus
                      className="w-full bg-transparent outline-none"
                    />
                  ) : (
                    typeof message.content === 'string' ? (
                      <p className="text-sm">{message.content}</p>
                    ) : (
                      message.content
                    )
                  )}
                </div>
                {message.sender === 'user' && (
                  <div className="flex mt-1 space-x-2">
                    <button onClick={() => setEditingMessageId(message.id)} className="text-gray-400 hover:text-gray-600">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDeleteMessage(message.id)} className="text-gray-400 hover:text-gray-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {messages.length === 1 && (
            <div className="mt-4">
              <div className="text-sm space-y-2">
                <ContextButton onClick={generateReport}>
                  Generate {context === 'Onboarding' ? 'Compliance' : 'Campaign'} Report
                </ContextButton>
                <ContextButton onClick={startDialog}>
                  Start {context === 'Onboarding' ? 'Onboarding' : 'Campaign Planning'}
                </ContextButton>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input section */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full ${colors.bg} overflow-hidden flex-shrink-0`}>
              <img 
                src="/placeholder.svg?height=32&width=32" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex items-center">
              <input
                type="text"
                placeholder="Your question"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3 py-2 text-sm border-none focus:ring-0 placeholder-gray-400"
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
                <button onClick={handleSendMessage} className={`ml-2 p-2 rounded-full ${colors.bg} ${colors.text}`}>
                <Send size={18} />
              </button>
            </div>
        </div>
      </div>
    </ColorContext.Provider>
  )
}