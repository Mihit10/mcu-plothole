"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, AlertTriangle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Character, Event, MultiverseTimeline } from "@/lib/types"

interface CanonTrackerProps {
  events: Event[]
  characters: Character[]
  multiverse: MultiverseTimeline[]
}

type Contradiction = {
  id: string
  title: string
  description: string
  type: "timeline" | "character" | "universe"
  severity: "low" | "medium" | "high"
  relatedEvents: string[]
  relatedCharacters: string[]
}

export default function CanonTracker({ events, characters, multiverse }: CanonTrackerProps) {
  const [activeTab, setActiveTab] = useState("contradictions")
  const [filter, setFilter] = useState<"all" | "timeline" | "character" | "universe">("all")

  // Generate mock contradictions
  const contradictions: Contradiction[] = [
    {
      id: "c1",
      title: "Loki's Death Inconsistency",
      description: "Loki has died multiple times but keeps returning in different forms across the timeline.",
      type: "character",
      severity: "high",
      relatedEvents: ["4", "6"],
      relatedCharacters: ["Loki", "Thor"],
    },
    {
      id: "c2",
      title: "Time Travel Rules Conflict",
      description: "The rules of time travel in Endgame contradict how the Time Stone works in Doctor Strange.",
      type: "timeline",
      severity: "medium",
      relatedEvents: ["7", "10"],
      relatedCharacters: ["Doctor Strange", "Bruce Banner"],
    },
    {
      id: "c3",
      title: "Captain America's Shield Repair",
      description:
        "Captain America's shield was destroyed by Thanos but appears intact in later timelines without explanation.",
      type: "timeline",
      severity: "low",
      relatedEvents: ["6", "7"],
      relatedCharacters: ["Steve Rogers"],
    },
    {
      id: "c4",
      title: "Multiverse Variant Inconsistency",
      description:
        "Some characters have variants that look identical across universes while others look completely different.",
      type: "universe",
      severity: "medium",
      relatedEvents: ["10", "11"],
      relatedCharacters: ["Doctor Strange", "Wanda Maximoff"],
    },
    {
      id: "c5",
      title: "Infinity Stone Powers",
      description: "The power levels and capabilities of Infinity Stones vary dramatically across different films.",
      type: "timeline",
      severity: "high",
      relatedEvents: ["4", "5", "6", "7"],
      relatedCharacters: ["Thanos", "Tony Stark"],
    },
  ]

  const filteredContradictions = filter === "all" ? contradictions : contradictions.filter((c) => c.type === filter)

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bangers text-red-500">Canon Tracker</h2>
          <p className="text-zinc-400 font-comic">Track inconsistencies and contradictions across the MCU</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-sm">Filter:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter("all")}
            className={`font-comic ${filter === "all" ? "bg-zinc-700" : "bg-zinc-800"}`}
          >
            All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter("timeline")}
            className={`font-comic ${filter === "timeline" ? "bg-zinc-700" : "bg-zinc-800"}`}
          >
            Timeline
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter("character")}
            className={`font-comic ${filter === "character" ? "bg-zinc-700" : "bg-zinc-800"}`}
          >
            Character
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter("universe")}
            className={`font-comic ${filter === "universe" ? "bg-zinc-700" : "bg-zinc-800"}`}
          >
            Universe
          </Button>
        </div>
      </div>

      <Tabs defaultValue="contradictions" className="flex-1" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-zinc-800 border-2 border-zinc-700 mb-4">
          <TabsTrigger
            value="contradictions"
            className="font-comic data-[state=active]:bg-red-500 data-[state=active]:text-white"
          >
            Contradictions
          </TabsTrigger>
          <TabsTrigger
            value="theories"
            className="font-comic data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            Fan Theories
          </TabsTrigger>
          <TabsTrigger
            value="retcons"
            className="font-comic data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Retcons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contradictions" className="flex-1">
          <div className="grid grid-cols-1 gap-4">
            {filteredContradictions.map((contradiction) => (
              <motion.div
                key={contradiction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-800 border-4 border-red-500 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {contradiction.severity === "high" ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                      ) : contradiction.severity === "medium" ? (
                        <HelpCircle className="h-5 w-5 text-yellow-500 mt-1" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500 mt-1" />
                      )}

                      <div>
                        <h3 className="text-lg font-bold font-comic text-white">{contradiction.title}</h3>
                        <p className="text-zinc-300 mt-1 font-comic">{contradiction.description}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <div className="bg-zinc-700 px-2 py-1 rounded text-xs font-comic">
                            {contradiction.type.charAt(0).toUpperCase() + contradiction.type.slice(1)} Issue
                          </div>
                          <div
                            className={`px-2 py-1 rounded text-xs font-comic ${getSeverityBadgeColor(contradiction.severity)}`}
                          >
                            {contradiction.severity.charAt(0).toUpperCase() + contradiction.severity.slice(1)} Severity
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-zinc-400 mb-1">Related Events:</div>
                            <div className="flex flex-wrap gap-1">
                              {contradiction.relatedEvents.map((eventId) => {
                                const event = events.find((e) => e.id === eventId)
                                return event ? (
                                  <div key={eventId} className="bg-zinc-700 px-2 py-1 rounded text-xs font-comic">
                                    {event.title}
                                  </div>
                                ) : null
                              })}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-zinc-400 mb-1">Related Characters:</div>
                            <div className="flex flex-wrap gap-1">
                              {contradiction.relatedCharacters.map((charName) => (
                                <div key={charName} className="bg-zinc-700 px-2 py-1 rounded text-xs font-comic">
                                  {charName}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredContradictions.length === 0 && (
              <div className="text-center py-20 text-xl font-comic text-zinc-500">
                No contradictions found with the current filter.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="theories" className="flex-1">
          <div className="text-center py-20 text-xl font-comic text-zinc-500">
            Fan theories will appear here. Coming soon!
          </div>
        </TabsContent>

        <TabsContent value="retcons" className="flex-1">
          <div className="text-center py-20 text-xl font-comic text-zinc-500">
            Official retcons will appear here. Coming soon!
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to get severity badge color
function getSeverityBadgeColor(severity: string): string {
  switch (severity) {
    case "high":
      return "bg-red-500 text-white"
    case "medium":
      return "bg-yellow-500 text-black"
    case "low":
      return "bg-green-500 text-white"
    default:
      return "bg-zinc-500 text-white"
  }
}
