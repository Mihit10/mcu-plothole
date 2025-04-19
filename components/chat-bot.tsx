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

export default function ChatBot({ onClose, characters, events, multiverse, selectedYear }: ChatBotProps) {
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

  // Scroll to bottom when messages change
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

    // Simulate AI response with contradiction checking
    setTimeout(() => {
      const botResponse = generateBotResponse(input, characters, events, multiverse, selectedYear)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      <div className="p-4 border-b-4 border-purple-500 flex items-center justify-between bg-zinc-900">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
          <h2 className="font-bangers text-xl text-purple-400">AI Writer Assistant</h2>
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
                  {/* Comic book speech bubble pointer */}
                  <div
                    className={`absolute top-0 ${
                      message.role === "user"
                        ? "right-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-purple-600"
                        : "left-0 border-r-[12px] border-r-transparent border-t-[12px] border-t-zinc-700"
                    }`}
                  ></div>

                  {/* Message content */}
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_transparent_20%,_black_70%)] bg-[length:3px_3px] opacity-5 pointer-events-none"></div>
                    <p>{message.content}</p>
                  </div>

                  {/* Contradictions if any */}
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
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
                    className="w-2 h-2 bg-zinc-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
                    className="w-2 h-2 bg-zinc-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
                    className="w-2 h-2 bg-zinc-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

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

// Helper function to generate bot responses with contradiction checking
function generateBotResponse(
  input: string,
  characters: Character[],
  events: Event[],
  multiverse: MultiverseTimeline[],
  selectedYear: number | null,
): ChatMessage {
  const inputLower = input.toLowerCase()
  let response = ""
  let contradictions: ChatMessage["contradictions"] = []

  // Check for character existence questions
  if (inputLower.includes("exist") || inputLower.includes("alive")) {
    const characterMatches = characters.filter((char) => inputLower.includes(char.name.toLowerCase()))

    if (characterMatches.length > 0) {
      const character = characterMatches[0]

      // Check for universe specific questions
      if (inputLower.includes("earth-") || inputLower.includes("universe")) {
        const universeMatch = multiverse.find((univ) => inputLower.includes(univ.name.toLowerCase()))

        if (universeMatch) {
          const exists = universeMatch.characters.includes(character.name)
          response = exists
            ? `Yes, ${character.name} exists in ${universeMatch.name}.`
            : `No, ${character.name} does not exist in ${universeMatch.name}.`

          if (!exists && inputLower.includes("what if")) {
            contradictions.push({
              type: "universe",
              description: `Creating ${character.name} in ${universeMatch.name} would be a new variant not seen in canon.`,
              severity: "low",
            })
          }
        } else {
          response = `I'm not sure which universe you're referring to. Could you specify the universe designation (like Earth-199999)?`
        }
      } else {
        // General existence question
        const isAlive = selectedYear
          ? (character.deathYear ? selectedYear < character.deathYear : true) &&
            selectedYear >= character.firstAppearance
          : true

        response = isAlive
          ? `Yes, ${character.name} is alive in ${selectedYear || "the current MCU timeline"}.`
          : `No, ${character.name} is not alive in ${selectedYear || "the current MCU timeline"}.`
      }
    } else {
      response = "I couldn't find that character in the MCU database. Are you referring to a new character?"
    }
  }

  // Check for "what if" scenario questions
  else if (inputLower.includes("what if") || inputLower.includes("kill off") || inputLower.includes("create a new")) {
    const characterMatches = characters.filter((char) => inputLower.includes(char.name.toLowerCase()))

    if (characterMatches.length > 0) {
      const character = characterMatches[0]

      // Death scenario
      if (inputLower.includes("kill") || inputLower.includes("die")) {
        response = `Creating a scenario where ${character.name} dies would impact the following events:`

        // Find events that would be affected
        const affectedEvents = events.filter(
          (event) =>
            event.characters.includes(character.name) && (!character.deathYear || event.year < character.deathYear),
        )

        if (affectedEvents.length > 0) {
          response += ` ${affectedEvents.length} major timeline events would be affected.`

          // Add contradictions for major events
          contradictions = affectedEvents.slice(0, 3).map((event) => ({
            type: "timeline" as const,
            description: `Event "${event.title}" (${event.year}) would be altered or impossible.`,
            severity: "high" as const,
          }))
        } else {
          response += " Surprisingly, no major timeline events would be directly affected."
        }
      }
      // Creation scenario
      else if (inputLower.includes("create") || inputLower.includes("new version")) {
        response = `Creating a new version of ${character.name} is an interesting concept!`

        // Check for universe conflicts
        const universeConflicts = multiverse.filter((univ) => univ.characters.includes(character.name))

        if (universeConflicts.length > 1) {
          response += ` Note that ${character.name} already exists in ${universeConflicts.length} different universes with varying characteristics.`

          contradictions.push({
            type: "character",
            description: `${character.name} already has variants in ${universeConflicts.map((u) => u.name).join(", ")}`,
            severity: "medium",
          })
        } else {
          response += " This would create a new variant that doesn't conflict with existing timelines."
        }
      }
    } else {
      response =
        "I couldn't identify which character you're referring to. Could you clarify which MCU character you want to explore in this scenario?"
    }
  }

  // General timeline questions
  else if (inputLower.includes("timeline") || inputLower.includes("when")) {
    const yearMatch = input.match(/\b(19|20)\d{2}\b/)

    if (yearMatch) {
      const year = Number.parseInt(yearMatch[0])
      const eventsInYear = events.filter((e) => e.year === year)

      if (eventsInYear.length > 0) {
        response = `In ${year}, the following events occurred in the MCU: ${eventsInYear.map((e) => e.title).join(", ")}.`
      } else {
        response = `I don't have any recorded MCU events for the year ${year}.`
      }
    } else {
      response =
        "I can help with timeline questions! You can ask about specific years, character appearances, or major events."
    }
  }

  // Default response for other queries
  else {
    response =
      "I'm your MCU timeline assistant. I can help check for contradictions, explore character histories, or analyze 'what if' scenarios. What would you like to know about the Marvel Cinematic Universe?"
  }

  return {
    id: Date.now().toString(),
    role: "assistant",
    content: response,
    timestamp: new Date(),
    contradictions,
  }
}
