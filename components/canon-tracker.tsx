"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, AlertTriangle, HelpCircle, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Character, Event, MultiverseTimeline } from "@/lib/types"
import { useRouter } from "next/navigation"

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

type FanTheory = {
  id: string
  title: string
  theory: string
  characters: string[]
  relatedEvents?: string[]
  type?: "timeline" | "character" | "universe" | "Universe" | "Character" | "Timeline"
}

export default function CanonTracker({ events, characters, multiverse }: CanonTrackerProps) {
  const [activeTab, setActiveTab] = useState("contradictions")
  const [filter, setFilter] = useState<"all" | "timeline" | "character" | "universe">("all")
  const router = useRouter()  

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

  // Fan theories data
  const fanTheories: FanTheory[] = [
    {
      "id": "t1",
      "title": "Superior Iron Man in 'Doctor Strange in the Multiverse of Madness'",
      "theory": "Fans speculated that the Ultron bots seen in the Illuminati's headquarters were created by a variant of Tony Stark, known as Superior Iron Man, suggesting his presence in the multiverse.",
      "characters": ["Tony Stark", "Doctor Strange", "Ultron"],
      "relatedEvents": ["1"],
      "type": "Universe"
    },
    {
      "id": "t2",
      "title": "Thanos' Name Foreshadowed the Infinity Stone Locations",
      "theory": "A theory posited that each letter in 'Thanos' corresponded to the location of an Infinity Stone: Tesseract, Heart (Soul Stone), Aether, Necklace (Time Stone), Orb, and Scepter.",
      "characters": ["Thanos", "Gamora", "Doctor Strange"],
      "relatedEvents": ["2"],
      "type": "Universe"
    },
    {
      "id": "t3",
      "title": "Steve Dies and Bucky Becomes Captain America",
      "theory": "Based on comic storylines, fans believed Steve Rogers would die in 'Civil War', leading Bucky Barnes to take up the Captain America mantle.",
      "characters": ["Steve Rogers", "Bucky Barnes", "Tony Stark"],
      "relatedEvents": ["3"],
      "type": "Character"
    },
    {
      "id": "t4",
      "title": "Doctor Strange Sent the Time Stone to the Future",
      "theory": "After viewing millions of futures, it's theorized that Doctor Strange sent the Time Stone forward in time to aid in defeating Thanos.",
      "characters": ["Doctor Strange", "Thanos", "Tony Stark"],
      "relatedEvents": ["4"],
      "type": "Timeline"
    },
    {
      "id": "t6",
      "title": "Ant-Man's... Special Move",
      "theory": "A humorous yet plausible theory suggested Ant-Man could defeat Thanos by entering his body at a microscopic level and expanding.",
      "characters": ["Ant-Man", "Thanos"],
      "relatedEvents": ["6"],
      "type": "Universe"
    },
    {
      "id": "t8",
      "title": "Heimdall Had the Soul Stone",
      "theory": "Given Heimdall's ability to see all souls, it was speculated he possessed the Soul Stone, explaining his powers.",
      "characters": ["Heimdall", "Odin"],
      "relatedEvents": ["8"],
      "type": "Universe"
    },
    {
      "id": "t9",
      "title": "Tony's Arm Foreshadowing",
      "theory": "Observations of Tony Stark frequently favoring his left arm led to theories it was foreshadowing his use of the Infinity Gauntlet.",
      "characters": ["Tony Stark"],
      "relatedEvents": ["9"],
      "type": "Character"
    },
    {
      "id": "t10",
      "title": "Thanos Played the Long Game",
      "theory": "It's believed Thanos waited to collect the Infinity Stones until powerful beings like Odin and the Ancient One were gone, reducing opposition.",
      "characters": ["Thanos", "Odin", "The Ancient One"],
      "relatedEvents": ["10"],
      "type": "Timeline"
    },
    {
      "id": "t11",
      "title": "Bucky Barnes was brainwashed into killing Peter Parker's parents while he was the Winter Soldier.",
      "theory": "Fans theorize that Bucky Barnes, during his time as the Winter Soldier, was responsible for the deaths of Peter Parker's parents. A hint supporting this theory is that one of the trigger words used to activate Bucky's mind control is 'homecoming,' which is also the title of the first Spider-Man film featuring Tom Holland.",
      "characters": ["Bucky Barnes", "Peter Parker"],
      "relatedEvents": ["11"],
      "type": "Character"
    },
    {
      "id": "t13",
      "title": "There was a cover-up of the Avengers' involvement in creating Ultron.",
      "theory": "A theory posits that the Avengers' role in creating Ultron was concealed from the public. Since Tony Stark doesn't face significant backlash for Ultron's actions, it's believed that the government covered up their involvement, possibly finding a scapegoat to blame.",
      "characters": ["Tony Stark", "Ultron"],
      "relatedEvents": ["13"],
      "type": "Universe"
    },
    {
      "id": "t19",
      "title": "Black Widow is actually alive and she just didn't return in Avengers: Endgame because she's waiting on Vormir.",
      "theory": "Some fans believe that Natasha Romanoff didn't die but remained on Vormir to maintain the timeline's integrity. Steve Rogers might have informed her of future events, leading her to stay hidden.",
      "characters": ["Natasha Romanoff", "Steve Rogers"],
      "relatedEvents": ["19"],
      "type": "Timeline"
    },
    {
      "id": "t20",
      "title": "Tony Stark didn't completely die in Avengers: Endgame.",
      "theory": "It's theorized that Tony Stark's consciousness was uploaded into an AI before his death, similar to the comics where he guides others as an AI. This is hinted at when his hologram interacts meaningfully with his daughter, Morgan.",
      "characters": ["Tony Stark", "Morgan Stark"],
      "relatedEvents": ["20"],
      "type": "Timeline"
    },
    {
      "id": "t21",
      "title": "M'Baku became the king of Wakanda and maybe Black Panther during the five-year time jump in Avengers: Endgame.",
      "theory": "Given that T'Challa and Shuri were blipped, fans speculate that M'Baku took on the mantle of king, and possibly Black Panther, to lead Wakanda during the five-year gap.",
      "characters": ["M'Baku", "T'Challa", "Shuri"],
      "relatedEvents": ["21"],
      "type": "Timeline"
    },
    {
      "id": "t23",
      "title": "Thanos adopted Gamora specifically as a sacrifice for the Soul Stone, but when he grew too attached to her, he adopted Nebula to be sacrificed by Gamora instead.",
      "theory": "A theory suggests that Thanos initially adopted Gamora intending to sacrifice her for the Soul Stone. However, growing fond of her, he adopted Nebula, hoping Gamora would sacrifice her sister instead.",
      "characters": ["Thanos", "Gamora", "Nebula"],
      "relatedEvents": ["23"],
      "type": "Character"
    },
    {
      "id": "t24",
      "title": "Bruce Banner's Super Soldier Serum wasn't the fail we think it was. He actually got it right.",
      "theory": "It's proposed that Bruce Banner successfully recreated the Super Soldier Serum. The transformation into the Hulk amplified his inherent rage, aligning with the serum's trait-enhancing properties.",
      "characters": ["Bruce Banner"],
      "relatedEvents": ["24"],
      "type": "Character"
    },
    {
      "id": "t25",
      "title": "Thanos gives Loki the Mind Stone in Avengers, not to get the Space Stone, but to further corrupt Loki and destabilize Asgard so Thanos could eventually invade an unprotected Nidavellir and force Eitri into making the Infinity Gauntlet.",
      "theory": "This theory posits that Thanos gave Loki the Mind Stone to sow discord within Asgard, making it easier for him to invade Nidavellir and coerce Eitri into forging the Infinity Gauntlet.",
      "characters": ["Thanos", "Loki", "Eitri"],
      "relatedEvents": ["25"],
      "type": "Character"
    }
  ];
  // Combine events and characters for display;

  const filteredContradictions = filter === "all" ? contradictions : contradictions.filter((c) => c.type === filter)
  const filteredTheories = filter === "all" ? fanTheories : fanTheories.filter((t) => t.type === filter)

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
          <div className="grid grid-cols-1 gap-4">
            {filteredTheories.map((theory) => (
              <motion.div
                key={theory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-800 border-4 border-purple-500 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-purple-500 mt-1" />
                      <div>
                        <h3 className="text-lg font-bold font-comic text-white">{theory.title}</h3>
                        <p className="text-zinc-300 mt-1 font-comic">{theory.theory}</p>

                        {theory.type && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            <div className="bg-zinc-700 px-2 py-1 rounded text-xs font-comic">
                              {theory.type.charAt(0).toUpperCase() + theory.type.slice(1)} Theory
                            </div>
                          </div>
                        )}

                        <div className="mt-3 grid grid-cols-3 gap-4">
                          {theory.relatedEvents && theory.relatedEvents.length > 0 && (
                            <div>
                              <div className="text-sm text-zinc-400 mb-1">Related Events:</div>
                              <div className="flex flex-wrap gap-1">
                                {theory.relatedEvents.map((eventId) => {
                                  const event = events.find((e) => e.id === eventId)
                                  return event ? (
                                    <div key={eventId} className="bg-zinc-700 px-2 py-1 rounded text-xs font-comic">
                                      {event.title}
                                    </div>
                                  ) : null
                                })}
                              </div>
                            </div>
                          )}

                          <div>
                            <div className="text-sm text-zinc-400 mb-1">Related Characters:</div>
                            <div className="flex flex-wrap gap-1">
                              {theory.characters.map((charName) => (
                                <div key={charName} className="bg-zinc-700 px-2 py-1 rounded text-xs font-comic">
                                  {charName}
                                </div>
                              ))}
                            </div>
                            
                          </div>
                          
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button
                            onClick={() => {
                              const requery = encodeURIComponent(`${theory.theory} — is this valid?`)
                              router.push(`/graph?redirect=true&requery=${requery}`)
                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-comic text-sm rounded-full px-4 py-2"
                          >
                            Validate Theory
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredTheories.length === 0 && (
              <div className="text-center py-20 text-xl font-comic text-zinc-500">
                No fan theories found with the current filter.
              </div>
            )}
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