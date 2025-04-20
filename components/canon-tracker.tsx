"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, AlertTriangle, HelpCircle, Star } from "lucide-react"
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

type FanTheory = {
  title: string
  theory: string
  characters: string[]
}

export default function CanonTracker({ events, characters, multiverse }: CanonTrackerProps) {
  const [activeTab, setActiveTab] = useState("contradictions")
  const [filter, setFilter] = useState<"all" | "timeline" | "character" | "universe">("all")
  const [theoryFilter, setTheoryFilter] = useState<string>("all")

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
      title: "Superior Iron Man in 'Doctor Strange in the Multiverse of Madness'",
      theory: "Fans speculated that the Ultron bots seen in the Illuminati's headquarters were created by a variant of Tony Stark, known as Superior Iron Man, suggesting his presence in the multiverse.",
      characters: ["Tony Stark", "Doctor Strange", "Ultron"]
    },
    {
      title: "Thanos' Name Foreshadowed the Infinity Stone Locations",
      theory: "A theory posited that each letter in 'Thanos' corresponded to the location of an Infinity Stone: Tesseract, Heart (Soul Stone), Aether, Necklace (Time Stone), Orb, and Scepter.",
      characters: ["Thanos", "Gamora", "Doctor Strange"]
    },
    {
      title: "Steve Dies and Bucky Becomes Captain America",
      theory: "Based on comic storylines, fans believed Steve Rogers would die in 'Civil War', leading Bucky Barnes to take up the Captain America mantle.",
      characters: ["Steve Rogers", "Bucky Barnes", "Tony Stark"]
    },
    {
      title: "Doctor Strange Sent the Time Stone to the Future",
      theory: "After viewing millions of futures, it's theorized that Doctor Strange sent the Time Stone forward in time to aid in defeating Thanos.",
      characters: ["Doctor Strange", "Thanos", "Tony Stark"]
    },
    {
      title: "Coulson Would Become Vision",
      theory: "Some believed that Agent Coulson's consciousness would be transferred into the Vision body, reviving him as a superhero.",
      characters: ["Phil Coulson", "Vision", "Jarvis"]
    },
    {
      title: "Ant-Man's... Special Move",
      theory: "A humorous yet plausible theory suggested Ant-Man could defeat Thanos by entering his body at a microscopic level and expanding.",
      characters: ["Ant-Man", "Thanos"]
    },
    {
      title: "Hela is Lady Death",
      theory: "Fans theorized that Hela, the Goddess of Death, was the MCU's version of Lady Death, the entity Thanos seeks to impress in the comics.",
      characters: ["Hela", "Thanos"]
    },
    {
      title: "Heimdall Had the Soul Stone",
      theory: "Given Heimdall's ability to see all souls, it was speculated he possessed the Soul Stone, explaining his powers.",
      characters: ["Heimdall", "Odin"]
    },
    {
      title: "Tony's Arm Foreshadowing",
      theory: "Observations of Tony Stark frequently favoring his left arm led to theories it was foreshadowing his use of the Infinity Gauntlet.",
      characters: ["Tony Stark"]
    },
    {
      title: "Thanos Played the Long Game",
      theory: "It's believed Thanos waited to collect the Infinity Stones until powerful beings like Odin and the Ancient One were gone, reducing opposition.",
      characters: ["Thanos", "Odin", "The Ancient One"]
    },
    {
      title: "Bucky Barnes was brainwashed into killing Peter Parker's parents while he was the Winter Soldier.",
      theory: "Fans theorize that Bucky Barnes, during his time as the Winter Soldier, was responsible for the deaths of Peter Parker's parents. A hint supporting this theory is that one of the trigger words used to activate Bucky's mind control is 'homecoming,' which is also the title of the first Spider-Man film featuring Tom Holland.",
      characters: ["Bucky Barnes", "Peter Parker"]
    },
    {
      title: "WandaVision and the Loki series are connected.",
      theory: "Some fans believe that the events of WandaVision and Loki are interconnected. The theory suggests that when Wanda became the Scarlet Witch, she created a Nexus event, leading to the branching of the Sacred Timeline. This could have prompted He Who Remains (Kang) to unleash infinite variants of himself to counteract the unpredictability introduced by Wanda.",
      characters: ["Wanda Maximoff", "Loki", "Kang the Conqueror"]
    },
    {
      title: "There was a cover-up of the Avengers' involvement in creating Ultron.",
      theory: "A theory posits that the Avengers' role in creating Ultron was concealed from the public. Since Tony Stark doesn't face significant backlash for Ultron's actions, it's believed that the government covered up their involvement, possibly finding a scapegoat to blame.",
      characters: ["Tony Stark", "Ultron"]
    },
    {
      title: "The Guardians of the Galaxy will retire and be born anew.",
      theory: "Given that Dave Bautista has confirmed his departure and Rocket's rumored demise, fans speculate that the current Guardians team will disband. Drax and Mantis might settle down together, Groot could join Thor, and Peter Quill may venture off alone, leading to a new lineup of Guardians.",
      characters: ["Drax", "Mantis", "Rocket", "Groot", "Peter Quill"]
    },
    {
      title: "HYDRA is the reason there's no X-Men in the Marvel movies and no Avengers in Fox movies.",
      theory: "This theory suggests that HYDRA's rise in the MCU prevented the formation of the X-Men by stopping events like the Holocaust, which was pivotal in Magneto's origin. Conversely, in the Fox universe, the absence of HYDRA meant no formation of SHIELD, and thus, no Avengers.",
      characters: ["HYDRA", "Magneto", "Captain America"]
    },
    {
      title: "SHIELD intentionally made the mistake of having dates that already passed when Steve Rogers woke up.",
      theory: "Fans believe that SHIELD deliberately played a baseball game from the past when Steve Rogers awoke to test his cognitive abilities and ensure he was truly the original super-soldier.",
      characters: ["Steve Rogers"]
    },
    {
      title: "Instead of the Mind Stone giving Pietro his powers, he actually got them from Wanda.",
      theory: "It's theorized that Wanda unknowingly granted Pietro his super speed powers. Given that Wanda's powers can alter DNA and create life, as seen with Monica Rambeau, it's plausible she did the same for her brother.",
      characters: ["Wanda Maximoff", "Pietro Maximoff"]
    },
    {
      title: "In Spider-Man: No Way Home, Peter will join the Venom symbiote to beat the Sinister Six.",
      theory: "A theory suggests that Venom seeks out Peter Parker not to harm him but to bond with him, aiding in the battle against the Sinister Six. This alliance could lead to Peter donning the iconic black suit.",
      characters: ["Peter Parker", "Venom"]
    },
    {
      title: "Black Widow is actually alive and she just didn't return in Avengers: Endgame because she's waiting on Vormir.",
      theory: "Some fans believe that Natasha Romanoff didn't die but remained on Vormir to maintain the timeline's integrity. Steve Rogers might have informed her of future events, leading her to stay hidden.",
      characters: ["Natasha Romanoff", "Steve Rogers"]
    },
    {
      title: "Tony Stark didn't completely die in Avengers: Endgame.",
      theory: "It's theorized that Tony Stark's consciousness was uploaded into an AI before his death, similar to the comics where he guides others as an AI. This is hinted at when his hologram interacts meaningfully with his daughter, Morgan.",
      characters: ["Tony Stark", "Morgan Stark"]
    },
    {
      title: "M'Baku became the king of Wakanda and maybe Black Panther during the five-year time jump in Avengers: Endgame.",
      theory: "Given that T'Challa and Shuri were blipped, fans speculate that M'Baku took on the mantle of king, and possibly Black Panther, to lead Wakanda during the five-year gap.",
      characters: ["M'Baku", "T'Challa", "Shuri"]
    },
    {
      title: "Vision's mention of the Ship of Theseus is not simply a nod to his character but to the MCU moving forward with variants, Skrulls, and multiversal versions of characters.",
      theory: "The Ship of Theseus dialogue in WandaVision is believed to symbolize the MCU's exploration of identity, especially with the introduction of variants, Skrulls, and multiverse characters in Phase Four.",
      characters: ["Vision", "Wanda Maximoff"]
    },
    {
      title: "Thanos adopted Gamora specifically as a sacrifice for the Soul Stone, but when he grew too attached to her, he adopted Nebula to be sacrificed by Gamora instead.",
      theory: "A theory suggests that Thanos initially adopted Gamora intending to sacrifice her for the Soul Stone. However, growing fond of her, he adopted Nebula, hoping Gamora would sacrifice her sister instead.",
      characters: ["Thanos", "Gamora", "Nebula"]
    },
    {
      title: "Bruce Banner's Super Soldier Serum wasn't the fail we think it was. He actually got it right.",
      theory: "It's proposed that Bruce Banner successfully recreated the Super Soldier Serum. The transformation into the Hulk amplified his inherent rage, aligning with the serum's trait-enhancing properties.",
      characters: ["Bruce Banner"]
    },
    {
      title: "Thanos gives Loki the Mind Stone in Avengers, not to get the Space Stone, but to further corrupt Loki and destabilize Asgard so Thanos could eventually invade an unprotected Nidavellir and force Eitri into making the Infinity Gauntlet.",
      theory: "This theory posits that Thanos gave Loki the Mind Stone to sow discord within Asgard, making it easier for him to invade Nidavellir and coerce Eitri into forging the Infinity Gauntlet.",
      characters: ["Thanos", "Loki", "Eitri"]
    },
    {
      title: "Doctor Strange Will Let Doom Or Kang Reshape The Multiverse",
      theory: "Doctor Strange, burdened by guilt over his past actions and the incursions he caused, might allow either Doctor Doom or Kang to reshape the multiverse, believing that they can restore balance better than he can.",
      characters: ["Doctor Strange", "Doctor Doom", "Kang the Conqueror", "Clea"]
    },
    {
      title: "Kang The Conqueror Will Become The Beyonder",
      theory: "Kang's exposure to the Multiverse Power Core could transform him into the Beyonder, a being with immense power who creates Battleworld by piecing together different Marvel locations.",
      characters: ["Kang the Conqueror", "The Beyonder"]
    },
    {
      title: "Kang Will Save The Multiverse From Doctor Strange",
      theory: "In a twist, Doctor Strange becomes a threat to the multiverse due to his ego and knowledge, and Kang emerges as the one to stop him, saving the multiverse from destruction.",
      characters: ["Kang the Conqueror", "Doctor Strange"]
    },
    {
      title: "He Who Remains Will Return In Secret Wars, With A Twist",
      theory: "A version of Nathaniel Richards, before becoming He Who Remains, teams up with the Avengers. After Kang's defeat, he becomes He Who Remains again, creating the TVA to oversee the Sacred Timeline.",
      characters: ["He Who Remains", "Nathaniel Richards", "Kang the Conqueror", "The Avengers"]
    },
    {
      title: "Secret Wars Brings In A Multiverse T'Challa",
      theory: "A variant of T'Challa from another universe joins forces with Shuri's Black Panther, allowing the character to continue in the MCU and pay tribute to Chadwick Boseman's legacy.",
      characters: ["T'Challa", "Shuri"]
    },
    {
      title: "Secret Wars Sees Captain America And Iron Man Return For Civil War 2",
      theory: "Alternate versions of Captain America and Iron Man return, leading to a new Civil War on Battleworld, but ultimately unite to prevent Kang from winning.",
      characters: ["Captain America", "Iron Man", "Kang the Conqueror"]
    },
    {
      title: "Contessa Valentina Allegra de Fontaine Is Secret Wars' Villain",
      theory: "Valentina is revealed to be a Skrull in disguise, assembling her own team to further a hidden agenda, positioning her as the main antagonist in Secret Wars.",
      characters: ["Contessa Valentina Allegra de Fontaine", "Skrulls"]
    },
    {
      title: "The Afterlife Will Play A Major Role In Secret Wars",
      theory: "After Kang kills several multiverse heroes, they find each other in various afterlife realms and use their connections to the multiverse to return and stop him.",
      characters: ["Kang the Conqueror", "Black Panther", "Thor", "Moon Knight"]
    },
    {
      title: "The Eternals Movie Is Key To Kang's Plan",
      theory: "Kang's technology is linked to the Celestials', suggesting that the events and technology introduced in Eternals are integral to Kang's plan and the multiverse's fate.",
      characters: ["Kang the Conqueror", "Celestials", "Eternals"]
    },
    {
      title: "Willem Dafoe's Norman Osborn Will Play A Major Role In Secret Wars",
      theory: "Norman Osborn, portrayed by Willem Dafoe, becomes a central villain in Secret Wars, filling a role similar to Doctor Doom's in the comics, wielding immense power in the multiverse.",
      characters: ["Norman Osborn", "Green Goblin", "Doctor Doom"]
    }
  ]

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