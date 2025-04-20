"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, BrainCircuit } from "lucide-react"
import TimelineSidebar from "@/components/timeline-sidebar"
import KnowledgeGraph from "@/components/knowledge-graph"
import ChatBot from "@/components/chat-bot"
import CanonTracker from "@/components/canon-tracker"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockEvents, mockCharacters, mockMultiverse } from "@/lib/mock-data"

export default function HomePage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(2023)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("timeline")

  // Filter events based on selected year and search query
  useEffect(() => {
    let filtered = mockEvents

    if (selectedYear) {
      filtered = filtered.filter((event) => event.year === selectedYear)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.characters.some((char) => char.toLowerCase().includes(query)),
      )
    }

    if (selectedCharacter) {
      filtered = filtered.filter((event) => event.characters.includes(selectedCharacter))
    }

    setFilteredEvents(filtered)
  }, [selectedYear, searchQuery, selectedCharacter])

  return (
    <div className="flex h-screen bg-zinc-900 text-white overflow-hidden">
      <TimelineSidebar selectedYear={selectedYear} onYearSelect={setSelectedYear} />

      <main className="flex-1 overflow-auto relative">
        {/* Halftone background texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat z-0"></div>

        <div className="relative z-10 h-full flex flex-col">
          <header className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <motion.h1
                className="text-6xl font-bold font-bangers text-yellow-400 drop-shadow-[0.1em_0.1em_0_rgba(0,0,0,0.5)]"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                PLOTHOLES
              </motion.h1>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search timelines, characters, events..."
                    className="pl-9 pr-4 py-2 bg-zinc-800 border-2 border-zinc-700 text-white rounded-md w-64 font-comic"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Button
                  variant="outline"
                  className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-400"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                >
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  AI Writer Assistant
                </Button>
              </div>
            </div>

            <motion.div
              className="mt-2 text-xl text-zinc-300 font-comic"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Untangling Universes, One Story at a Time
            </motion.div>
          </header>

          <Tabs defaultValue="timeline" className="flex-1 flex flex-col" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="bg-zinc-800 border-2 border-zinc-700">
                <TabsTrigger
                  value="timeline"
                  className="font-comic data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  Timeline Explorer
                </TabsTrigger>
                <TabsTrigger
                  value="knowledge"
                  className="font-comic data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  Knowledge Graph
                </TabsTrigger>
                <TabsTrigger
                  value="canon"
                  className="font-comic data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Canon Tracker
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="timeline" className="flex-1 p-6 pt-4 overflow-auto bg-blue-300">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <AnimatePresence>
      {filteredEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white rounded-lg overflow-hidden border-2 border-black relative shadow-lg"
        >
          {/* Event image */}
          <div
            className="h-48 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${event.image || "/placeholder.svg?height=300&width=500"})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

            <div className="absolute top-3 left-3">
              <div
                className="inline-block px-2 py-1 rounded font-comic text-sm bg-blue-500 text-white border border-black"
              >
                {event.type}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-xl font-bold text-white font-comic drop-shadow-md">{event.title}</h3>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center text-gray-600 text-sm mb-3 space-x-4 border-b border-gray-200 pb-2">
              <div className="flex items-center">
                <span>{event.year}</span>
              </div>

              <div className="flex items-center">
                <span>{event.location}</span>
              </div>

              {event.universe && (
                <div className="flex items-center">
                  <span>{event.universe}</span>
                </div>
              )}
            </div>

            <p className="text-gray-800 mb-4 font-comic">{event.description}</p>

            {event.characters.length > 0 && (
              <div className="mt-3">
                <div className="text-sm text-gray-600 mb-2">Characters:</div>
                <div className="flex flex-wrap gap-2">
                  {event.characters.map((character) => (
                    <Button
                      key={character}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCharacter(character)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-400 font-comic text-xs"
                    >
                      {character}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </AnimatePresence>

    {filteredEvents.length === 0 && (
      <motion.div
        className="col-span-full text-center py-20 text-2xl font-comic text-gray-700 bg-white rounded-lg border-2 border-black shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        No events found for this criteria. Try adjusting your search or year selection.
      </motion.div>
    )}
  </div>
</TabsContent>

            <TabsContent value="knowledge" className="flex-1 p-6 pt-4 overflow-auto">
              <KnowledgeGraph
                characters={mockCharacters}
                events={filteredEvents}
                selectedCharacter={selectedCharacter}
                onSelectCharacter={setSelectedCharacter}
              />
            </TabsContent>

            <TabsContent value="canon" className="flex-1 p-6 pt-4 overflow-auto">
              <CanonTracker events={mockEvents} characters={mockCharacters} multiverse={mockMultiverse} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* AI Writer Assistant Chatbot */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-96 h-screen bg-zinc-800 border-l-4 border-purple-500 flex flex-col"
          >
            <ChatBot
              onClose={() => setIsChatOpen(false)}
              characters={mockCharacters}
              events={mockEvents}
              multiverse={mockMultiverse}
              selectedYear={selectedYear}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper functions for event styling
function getEventBorderColor(type: string): string {
  switch (type) {
    case "Canon":
      return "border-blue-500"
    case "Theory":
      return "border-purple-500"
    case "Retcon":
      return "border-orange-500"
    case "Rumor":
      return "border-red-500"
    default:
      return "border-zinc-500"
  }
}

function getEventBadgeColor(type: string): string {
  switch (type) {
    case "Canon":
      return "bg-blue-500 text-white"
    case "Theory":
      return "bg-purple-500 text-white"
    case "Retcon":
      return "bg-orange-500 text-white"
    case "Rumor":
      return "bg-red-500 text-white"
    default:
      return "bg-zinc-500 text-white"
  }
}
