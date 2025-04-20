"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, SendHorizontal, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface MainQueryProps {
  className?: string
  redirect?: boolean
  requery?: string
  onQuerySent?: () => void;
}

export default function MainQuery({ className, redirect = false, requery = "", onQuerySent }: MainQueryProps) {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (redirect && requery) {
      setQuery(requery)
    }
  }, [redirect, requery])

  const mockResponses: Record<string, string> = {
    default: `**Thanks for your theory!**  
The multiverse is indeed complex, but this opens up fascinating possibilities for future storylines.  
*Keep exploring the cosmic possibilities!* ✨`,

    timeline: `## Timeline Analysis

Your question touches on a fascinating timeline anomaly!  
The Sacred Timeline has multiple branches that create what we call **nexus events**.  

According to the TVA records, this particular event you're curious about happens in what we call a *branch reality* — not quite our main MCU timeline.  

🕰️ *Remember: "Time works differently in the TVA!"*`,

    infinity: `## Infinity Stone Theory

**FASCINATING THEORY!** 💫

The Infinity Stones do indeed work differently across dimensions.  
In Earth-616 (our main MCU reality), the stones have specific powers,  
but your theory about their interconnection is actually supported by evidence in *Loki* Season 1!

The Time Stone and Space Stone particularly have shown unusual interactions — exactly as you've described.  
This could explain why Doctor Strange saw **14,000,605 futures**!`,

    kang: `## Kang Analysis

⚡ **MULTIVERSE ALERT!** ⚡

Your Kang theory touches on something crucial!  
As a being who exists across timelines, Kang's variants are indeed connected through quantum entanglement.

The Council of Kangs exists *outside conventional time*,  
and your theory about how He Who Remains connects to Rama-Tut is **eerily accurate**.  

Marvel Studios might be heading exactly where you're thinking for **Phase 6**!`,

    secret: `## CLASSIFIED INFORMATION

*The file you're attempting to access has been restricted by order of Director Fury.*

\`\`\`
SHIELD CLEARANCE LEVEL 9 REQUIRED
\`\`\`

Your theory touches on something we're not supposed to talk about yet...  
But between us, you might be onto something big for **Phase 5's conclusion**.  
Keep this between us, Agent. 🕵️‍♀️`
  }

  const handleSubmit = () => {
    if (!query.trim()) return

    setResponse(null)
    setIsTyping(true)

    let selectedResponse = mockResponses.default
    const queryLower = query.toLowerCase()

    if (queryLower.includes("timeline") || queryLower.includes("multiverse") || queryLower.includes("branch")) {
      selectedResponse = mockResponses.timeline
    } else if (queryLower.includes("infinity") || queryLower.includes("stone") || queryLower.includes("thanos")) {
      selectedResponse = mockResponses.infinity
    } else if (queryLower.includes("kang") || queryLower.includes("conqueror") || queryLower.includes("he who remains")) {
      selectedResponse = mockResponses.kang
    } else if (queryLower.includes("secret") || queryLower.includes("spoiler") || queryLower.includes("leak")) {
      selectedResponse = mockResponses.secret
    }

    setTimeout(() => {
      setIsTyping(false)
      setResponse(selectedResponse)
    }, 1500)
    onQuerySent?.();
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="font-bangers text-4xl md:text-5xl lg:text-6xl text-red-500 tracking-wide">
            THE MULTIVERSE ORACLE
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <p className="font-comic text-lg text-zinc-300">
              Ask about your MCU theories, timeline questions & multiverse mysteries!
            </p>
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Share your MCU theory or question here... (e.g., 'How do the Infinity Stones connect across the multiverse?')"
              className="min-h-32 bg-zinc-800 border-4 border-purple-500 rounded-lg text-white font-comic placeholder:text-zinc-400 p-4"
            />
            <Button
              onClick={handleSubmit}
              className="absolute bottom-4 right-4 bg-purple-500 hover:bg-purple-600 rounded-full w-10 h-10 p-0 flex items-center justify-center"
              disabled={!query.trim() || isTyping}
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <Card className="bg-zinc-800 border-4 border-yellow-500 rounded-lg p-6">
                <div className="flex items-center space-x-2 font-comic text-yellow-400">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-150" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-300" />
                  <span className="ml-2">The Oracle is processing your question...</span>
                </div>
              </Card>
            </motion.div>
          )}

          {response && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card className="bg-purple-800 border-4 border-yellow-500 rounded-xl p-6 shadow-lg shadow-yellow-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bangers text-2xl text-yellow-300">THE ORACLE SPEAKS</h3>
                    <p className="text-sm text-zinc-200 font-comic">Powered by the Time Variance Authority</p>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-400 pl-4 py-1 mb-4">
                  <p className="text-sm italic text-zinc-100 font-comic">In response to your theory:</p>
                </div>

                <div className="bg-purple-900 border-2 border-yellow-500 rounded-lg p-4 text-white font-comic whitespace-pre-wrap text-base leading-relaxed shadow-md shadow-yellow-500/20">
                  {response}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const googleQuery = encodeURIComponent(`${query} marvel theory`)
                      window.open(`https://www.google.com/search?q=${googleQuery}`, "_blank")
                    }}
                    className="border-2 border-yellow-500 text-yellow-300 hover:bg-yellow-500/10 font-comic text-sm rounded-full px-4 py-2 transition-all duration-200"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Explore Related Theories
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
    