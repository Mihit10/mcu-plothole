"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, SendHorizontal, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import Markdown from 'react-markdown'
import { useRouter } from "next/navigation"


interface MainQueryProps {
  className?: string
  redirect?: boolean
  requery?: string
  onQuerySent?: (query: string) => void;
}

export default function MainQuery({ className, redirect = false, requery = "", onQuerySent }: MainQueryProps) {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const router = useRouter()  


  useEffect(() => {
    if (redirect && requery) {
      setQuery(requery)
    }
  }, [redirect, requery])

  

  const handleSubmit = async () => {
    if (!query.trim()) return;
  
    setResponse(null);
    setIsTyping(true);
    const encodedQuery = encodeURIComponent(`${query}`);
    router.push(`/graph?redirect=true&requery=${query}`);
  
    try {
      const res = await fetch("https://rhino-frank-tightly.ngrok-free.app/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: query, // Send the current query for validation
          theory: query,
        }),
      });
      const data = await res.json();
      const markdownText = data.result;
  
      setTimeout(() => {
        setIsTyping(false);
        setResponse(markdownText);
      }, 1500);
  
      onQuerySent?.(query); // Pass the current 'query' here
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsTyping(false);
      setResponse("Oops! Something went wrong. Try again later.");
    }
  };
  
  

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
                <Markdown>{response}</Markdown>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const googleQuery = encodeURIComponent(`${query} marvel theory`)
                      window.open(`https://www.google.com/search?q=${googleQuery}`, "_blank")
                    }}
                    className="border-2 border-yellow-500 text-slate-900 hover:bg-yellow-500/10 font-comic text-sm rounded-full px-4 py-2 transition-all duration-200"
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
    