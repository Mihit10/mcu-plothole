"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Sparkles, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Character, Event, MultiverseTimeline } from "@/lib/types"

interface ChatBotProps {
  onClose: () => void
  characters: Character[]
  events: Event[]
  multiverse: MultiverseTimeline[]
  selectedYear: number | null
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  contradictions?: {
    type: "character" | "timeline" | "universe"
    description: string
    severity: "low" | "medium" | "high"
  }[]
}

export default function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello writer! I'm your MCU timeline assistant. Ask me about characters, timelines, or check your story ideas for contradictions!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    const botResponse = await generateBotResponse(input)
    setMessages((prev) => [...prev, botResponse])
    setIsTyping(false)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="p-4 border-b-4 border-purple-500 flex items-center justify-between bg-zinc-900">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
          <h2 className="font-bangers text-xl text-purple-400">AI MCU Assistant</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-zinc-400 hover:text-white hover:bg-zinc-700"
        >
          <X />
        </Button>
      </div>

      {/* Chat Display */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 font-comic relative ${
                    message.role === "user"
                      ? "bg-purple-600 text-white rounded-tr-none"
                      : "bg-zinc-700 text-white rounded-tl-none"
                  }`}
                >
                  <div
                    className={`absolute top-0 ${
                      message.role === "user"
                        ? "right-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-purple-600"
                        : "left-0 border-r-[12px] border-r-transparent border-t-[12px] border-t-zinc-700"
                    }`}
                  ></div>

                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_transparent_20%,_black_70%)] bg-[length:3px_3px] opacity-5 pointer-events-none"></div>
                    <p>{message.content}</p>
                  </div>

                  {message.contradictions && message.contradictions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-zinc-600">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-yellow-400 text-sm font-bold">Potential Contradictions:</span>
                      </div>
                      <ul className="space-y-2">
                        {message.contradictions.map((contradiction, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <div className="mt-1 mr-2">
                              {contradiction.severity === "high" ? (
                                <AlertTriangle className="h-3 w-3 text-red-400" />
                              ) : contradiction.severity === "medium" ? (
                                <HelpCircle className="h-3 w-3 text-yellow-400" />
                              ) : (
                                <CheckCircle className="h-3 w-3 text-green-400" />
                              )}
                            </div>
                            <span>{contradiction.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-xs opacity-50 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-zinc-700 text-white rounded-lg rounded-tl-none p-3 max-w-[80%]">
                <div className="flex space-x-1">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-zinc-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-zinc-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-zinc-400 rounded-full" />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Bar */}
      <div className="p-4 border-t-2 border-zinc-700 bg-zinc-800">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about MCU timelines, characters, or check your story ideas..."
            className="resize-none bg-zinc-700 border-zinc-600 text-white font-comic"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            disabled={!input.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}

// ✅ Fixed async function
async function generateBotResponse(input: string): Promise<ChatMessage> {
  const systemPrompt = `You are a helpful assistant that only answers questions about the Marvel Cinematic Universe (MCU). If the question is unrelated, respond with "I can only answer questions about the MCU." Do not make up facts.`

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input },
        ],
        temperature: 0.3,
        stream: false,
      }),
    })

    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content || "I wasn't able to generate a response."

    return {
      id: Date.now().toString(),
      role: "assistant",
      content,
      timestamp: new Date(),
      contradictions: [],
    }
  } catch (err) {
    console.error("Groq error:", err)
    return {
      id: Date.now().toString(),
      role: "assistant",
      content: "Sorry, something went wrong while contacting the MCU assistant.",
      timestamp: new Date(),
      contradictions: [],
    }
  }
}
