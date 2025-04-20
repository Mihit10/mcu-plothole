"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, AlertTriangle, HelpCircle, Star } from "lucide-react"
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
  const [theoryFilter, setTheoryFilter] = useState<string>("all")
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

  // Fan theories from the JSON
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
  const filteredTheories = theoryFilter === "all" 
    ? fanTheories 
    : fanTheories.filter(theory => theory.characters.includes(theoryFilter))

  // Get unique character names for the filter dropdown
  const uniqueCharacters = Array.from(
    new Set(fanTheories.flatMap(theory => theory.characters))
  ).sort()

  return (
    <div className="h-full flex flex-col bg-blue-500 p-6 rounded-lg shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bangers text-black transform -rotate-1 drop-shadow-md">THE MULTIVERSAL TRACKER</h2>
          <p className="text-blue-900 font-comic font-bold text-lg">Track inconsistencies and contradictions across universes</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-blue-900 text-base font-bold">Filter:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter("all")}
            className={`font-comic border-2 border-black ${filter === "all" ? "bg-yellow-300" : "bg-yellow-200"} text-black font-bold`}
          >
            All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter("timeline")}
            className={`font-comic border-2 border-black ${filter === "timeline" ? "bg-yellow-300" : "bg-yellow-200"} text-black font-bold`}
          >
            Timeline
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter("character")}
            className={`font-comic border-2 border-black ${filter === "character" ? "bg-yellow-300" : "bg-yellow-200"} text-black font-bold`}
          >
            Character
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter("universe")}
            className={`font-comic border-2 border-black ${filter === "universe" ? "bg-yellow-300" : "bg-yellow-200"} text-black font-bold`}
          >
            Universe
          </Button>
        </div>
      </div>

      {/* <div className="text-center mb-6">
        <h3 className="bg-yellow-400 inline-block px-8 py-2 text-2xl font-bangers text-black transform -rotate-1 border-4 border-black rounded-lg shadow-md">
          SELECT YOUR UNIVERSE
        </h3>
      </div> */}

      <Tabs defaultValue="contradictions" className="flex-1" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-red-200 border-4 border-black mb-4 p-1 rounded-lg">
          <TabsTrigger
            value="contradictions"
            className="font-comic font-bold text-lg text-black data-[state=active]:bg-red-500 data-[state=active]:text-white border-2 border-black rounded-md shadow-sm"
          >
            Contradictions
          </TabsTrigger>
          <TabsTrigger
            value="theories"
            className="font-comic font-bold text-lg text-black data-[state=active]:bg-purple-500 data-[state=active]:text-white border-2 border-black rounded-md shadow-sm"
          >
            Fan Theories
          </TabsTrigger>
          <TabsTrigger
            value="retcons"
            className="font-comic font-bold text-lg text-black data-[state=active]:bg-orange-500 data-[state=active]:text-white border-2 border-black rounded-md shadow-sm"
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
                className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg transform -rotate-1"
              >
                <div className="bg-red-400 p-3 border-b-4 border-black">
                  <h3 className="text-xl font-bold font-comic text-black text-center">{contradiction.title}</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {contradiction.severity === "high" ? (
                        <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                      ) : contradiction.severity === "medium" ? (
                        <HelpCircle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                      ) : (
                        <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      )}

                      <div>
                        <p className="text-black text-lg font-comic">{contradiction.description}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <div className="bg-blue-200 px-3 py-1 rounded text-sm font-comic border-2 border-black font-bold">
                            {contradiction.type.charAt(0).toUpperCase() + contradiction.type.slice(1)} Issue
                          </div>
                          <div
                            className={`px-3 py-1 rounded text-sm font-comic border-2 border-black font-bold ${getComicSeverityBadgeColor(
                              contradiction.severity
                            )}`}
                          >
                            {contradiction.severity.charAt(0).toUpperCase() + contradiction.severity.slice(1)} Severity
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-base text-blue-900 font-bold mb-2">Related Events:</div>
                            <div className="flex flex-wrap gap-1">
                              {contradiction.relatedEvents.map((eventId) => {
                                const event = events.find((e) => e.id === eventId)
                                return event ? (
                                  <div
                                    key={eventId}
                                    className="bg-yellow-200 px-3 py-1 rounded text-sm font-comic border-2 border-black text-black font-bold"
                                  >
                                    {event.title}
                                  </div>
                                ) : null
                              })}
                            </div>
                          </div>

                          <div>
                            <div className="text-base text-blue-900 font-bold mb-2">Related Characters:</div>
                            <div className="flex flex-wrap gap-1">
                              {contradiction.relatedCharacters.map((charName) => (
                                <div
                                  key={charName}
                                  className="bg-yellow-200 px-3 py-1 rounded text-sm font-comic border-2 border-black text-black font-bold"
                                >
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
              <div className="text-center py-20 text-2xl font-comic text-blue-900 bg-white border-4 border-black rounded-lg">
                No contradictions found with the current filter.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="theories" className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bangers text-black">FAN THEORIES</h3>
            <div className="flex items-center gap-2">
              <span className="text-blue-900 text-base font-bold">Filter by Character:</span>
              <select 
                className="bg-purple-200 border-2 border-black rounded px-3 py-1 font-comic text-black"
                value={theoryFilter}
                onChange={(e) => setTheoryFilter(e.target.value)}
              >
                <option value="all">All Characters</option>
                {uniqueCharacters.map(char => (
                  <option key={char} value={char}>{char}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {filteredTheories.map((theory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg transform -rotate-1"
              >
                <div className="bg-purple-400 p-3 border-b-4 border-black">
                  <h3 className="text-xl font-bold font-comic text-black text-center">{theory.title}</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <Star className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-black text-lg font-comic">{theory.theory}</p>
                      
                      <div className="mt-4">
                        <div className="text-base text-blue-900 font-bold mb-2">Related Characters:</div>
                        <div className="flex flex-wrap gap-1">
                          {theory.characters.map((charName) => (
                            <div
                              key={charName}
                              className="bg-yellow-200 px-3 py-1 rounded text-sm font-comic border-2 border-black text-black font-bold"
                            >
                              {charName}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredTheories.length === 0 && (
              <div className="text-center py-20 text-2xl font-comic text-blue-900 bg-white border-4 border-black rounded-lg">
                No theories found for the selected character.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="retcons" className="flex-1">
          <div className="text-center py-20 text-2xl font-comic text-blue-900 bg-white border-4 border-black rounded-lg">
            Official retcons will appear here. Coming soon!
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-center">
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black border-4 border-black rounded-lg font-bangers text-xl px-8 py-3 shadow-md">
          Explore Universe
        </Button>
      </div>
    </div>
  )
}

// Helper function to get severity badge color with comic styling
function getComicSeverityBadgeColor(severity: string): string {
  switch (severity) {
    case "high":
      return "bg-red-400 text-black"
    case "medium":
      return "bg-yellow-400 text-black"
    case "low":
      return "bg-green-400 text-black"
    default:
      return "bg-blue-400 text-black"
  }
}