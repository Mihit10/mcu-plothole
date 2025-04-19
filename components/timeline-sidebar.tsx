"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define the Event interface based on your mock data structure
interface Event {
  id: string;
  title: string;
  year: number;
  month: number;
  description: string;
  location: string;
  characters: string[];
  type: string;
  universe: string;
}

// Import mock data - using a dynamic import to avoid module resolution issues
const mockEvents: Event[] = [
  {
    "id": "1",
    "title": "Crash of Mar‑Vell's Light‑Speed Engine",
    "year": 1995,
    "month": 6,
    "description": "Kree scientist Mar‑Vell's experimental engine malfunctions, causing a crash that strands Carol Danvers on Earth.",
    "location": "California, USA",
    "characters": ["Mar‑Vell", "Carol Danvers", "Nick Fury", "Talos"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "2",
    "title": "Carol Danvers Gains Binary Powers",
    "year": 1995,
    "month": 6,
    "description": "Exposure to the Tesseract‑fueled engine grants Carol Danvers cosmic energy abilities.",
    "location": "California, USA",
    "characters": ["Carol Danvers", "Mar‑Vell"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "3",
    "title": "Tony Stark Kidnapped by the Ten Rings",
    "year": 2008,
    "month": 5,
    "description": "Arms dealer Tony Stark is ambushed in Afghanistan by the Ten Rings and held captive.",
    "location": "Afghanistan",
    "characters": ["Tony Stark", "Obadiah Stane", "Ho Yinsen", "Raza"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "4",
    "title": "Construction of Iron Man Mark I",
    "year": 2008,
    "month": 5,
    "description": "Using scrap metal and Stark tech, Tony builds the first Iron Man suit to escape captivity.",
    "location": "Afghanistan",
    "characters": ["Tony Stark", "Ho Yinsen"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "5",
    "title": "Yinsen's Sacrifice",
    "year": 2008,
    "month": 5,
    "description": "Physician Ho Yinsen gives his life to buy Stark time to power up the Mark I armor.",
    "location": "Afghanistan",
    "characters": ["Ho Yinsen", "Tony Stark"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "6",
    "title": "Public Revelation as Iron Man",
    "year": 2008,
    "month": 6,
    "description": "In a press conference, Tony Stark declares 'I am Iron Man,' unveiling his superhero identity.",
    "location": "Los Angeles, USA",
    "characters": ["Tony Stark", "Pepper Potts", "James Rhodes"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "7",
    "title": "Gamma Bomb Test and Hulk Transformation",
    "year": 2008,
    "month": 6,
    "description": "Bruce Banner's gamma radiation experiment goes awry, triggering his first Hulk transformation.",
    "location": "Roxxon Oil Facility, New Mexico, USA",
    "characters": ["Bruce Banner", "General Ross", "Emil Blonsky"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "8",
    "title": "Hulk Rampages in Harlem",
    "year": 2008,
    "month": 6,
    "description": "On the run, the Hulk lays waste to parts of Harlem while Banner tries to evade capture.",
    "location": "Harlem, New York, USA",
    "characters": ["Bruce Banner", "Betty Ross"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "9",
    "title": "Abomination Emerges and Hulk Battle",
    "year": 2008,
    "month": 6,
    "description": "General Ross’s enforcer Emil Blonsky becomes the Abomination and clashes violently with the Hulk.",
    "location": "Harlem, New York, USA",
    "characters": ["Bruce Banner", "Emil Blonsky", "Betty Ross", "General Ross"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "10",
    "title": "Thor's Banishment from Asgard",
    "year": 2011,
    "month": 5,
    "description": "Odin strips Thor of his powers and casts him to Earth as punishment for his recklessness.",
    "location": "New Mexico, USA",
    "characters": ["Thor", "Odin", "Loki"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "11",
    "title": "Battle of New York",
    "year": 2012,
    "month": 5,
    "description": "Earth’s mightiest heroes unite to repel the Chitauri invasion in Manhattan.",
    "location": "New York City, USA",
    "characters": ["Iron Man", "Captain America", "Thor", "Hulk", "Black Widow", "Hawkeye", "Loki"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "12",
    "title": "Extremis Test Explosion in Malibu",
    "year": 2012,
    "month": 12,
    "description": "A failed Extremis experiment causes a massive explosion at Tony Stark’s Malibu mansion.",
    "location": "Malibu, California, USA",
    "characters": ["Tony Stark", "Aldrich Killian", "Pepper Potts"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "13",
    "title": "Convergence Event in Greenwich",
    "year": 2013,
    "month": 10,
    "description": "The Aether awakens another dimensional convergence, endangering London until Thor intervenes.",
    "location": "Greenwich, London, UK",
    "characters": ["Thor", "Jane Foster", "Malekith"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "14",
    "title": "Formation of the Guardians of the Galaxy",
    "year": 2014,
    "month": 8,
    "description": "After escaping the Kyln, Star‑Lord, Gamora, Drax, Rocket, and Groot band together.",
    "location": "Xandar, Nova Empire",
    "characters": ["Star‑Lord", "Gamora", "Drax", "Rocket", "Groot"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "15",
    "title": "S.H.I.E.L.D. Collapse (Hydra Uprising)",
    "year": 2014,
    "month": 3,
    "description": "Hydra’s secret infiltration of S.H.I.E.L.D. is exposed, leading to the destruction of Helicarriers and the agency’s fall.",
    "location": "Washington, D.C., USA",
    "characters": ["Nick Fury", "Steve Rogers", "Natasha Romanoff", "Alexander Pierce"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "16",
    "title": "Battle of Sokovia",
    "year": 2015,
    "month": 5,
    "description": "Ultron elevates Sokovia’s capital into the sky in a genocidal scheme; the Avengers intervene and defeat him.",
    "location": "Sokovia, Eastern Europe",
    "characters": ["Iron Man", "Captain America", "Thor", "Wintersoldier", "Vision", "Ultron"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "17",
    "title": "Scott Lang Becomes Ant‑Man",
    "year": 2015,
    "month": 11,
    "description": "With Hank Pym’s technology, Scott Lang steals the Ant‑Man suit and embraces heroism.",
    "location": "Los Angeles, USA",
    "characters": ["Scott Lang", "Hank Pym", "Hope van Dyne"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "18",
    "title": "Signing of the Sokovia Accords",
    "year": 2016,
    "month": 5,
    "description": "Governments worldwide mandate superhero oversight, fracturing the Avengers.",
    "location": "Vienna, Austria",
    "characters": ["Tony Stark", "Steve Rogers", "Natasha Romanoff", "T'Challa"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "19",
    "title": "Airport Battle at Leipzig/Halle",
    "year": 2016,
    "month": 5,
    "description": "Team Iron Man and Team Captain America clash over Bucky Barnes in Germany.",
    "location": "Leipzig/Halle Airport, Germany",
    "characters": ["Iron Man", "Captain America", "Winter Soldier", "Black Panther"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "20",
    "title": "Defeat of Dormammu in London",
    "year": 2016,
    "month": 11,
    "description": "Doctor Strange bargains with Dormammu in a time loop to save Earth.",
    "location": "London, UK",
    "characters": ["Doctor Strange", "Wong", "Dormammu"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "21",
    "title": "T'Challa Crowned King of Wakanda",
    "year": 2017,
    "month": 2,
    "description": "Following his father’s death, T'Challa ascends the throne and assumes the Black Panther mantle.",
    "location": "Wakanda, Africa",
    "characters": ["T'Challa", "Shuri", "Okoye"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "22",
    "title": "Thor Unleashes Surtur to Destroy Asgard",
    "year": 2017,
    "month": 11,
    "description": "To thwart Hela, Thor resurrects Surtur and fulfills the prophecy of Ragnarök.",
    "location": "Asgard",
    "characters": ["Thor", "Hela", "Valkyrie", "Loki"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "23",
    "title": "Battle on Titan",
    "year": 2018,
    "month": 4,
    "description": "The Guardians and Avengers attempt to strip Thanos of the Infinity Gauntlet on Titan.",
    "location": "Titan",
    "characters": ["Iron Man", "Doctor Strange", "Spider‑Man", "Star‑Lord", "Gamora", "Drax", "Mantis"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "24",
    "title": "Thanos Collects All Six Infinity Stones",
    "year": 2018,
    "month": 4,
    "description": "With every Stone assembled, Thanos gains omnipotence.",
    "location": "Various Worlds",
    "characters": ["Thanos", "Gamora", "Nebula"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "25",
    "title": "The Snap Erases Half of All Life",
    "year": 2018,
    "month": 4,
    "description": "Thanos snaps his fingers, instantly wiping out 50% of the universe.",
    "location": "Universal",
    "characters": ["Thanos"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "26",
    "title": "The Blip",
    "year": 2018,
    "month": 4,
    "description": "A five‑year period following Thanos’ snap during which half of the universe’s population remains disintegrated.",
    "location": "Various",
    "characters": ["Half the population"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "27",
    "title": "Hulk's Snap Reverses the Blip",
    "year": 2023,
    "month": 4,
    "description": "Bruce Banner uses the Infinity Stones to restore everyone vanished in the Snap.",
    "location": "New York City, USA",
    "characters": ["Bruce Banner", "Captain America", "Iron Man"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "28",
    "title": "Time Heist",
    "year": 2023,
    "month": 4,
    "description": "The Avengers travel through time via the Quantum Tunnel to retrieve Infinity Stones from past timelines.",
    "location": "Quantum Realm",
    "characters": ["Tony Stark", "Scott Lang", "Bruce Banner", "Steve Rogers"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "29",
    "title": "Battle of Earth",
    "year": 2023,
    "month": 4,
    "description": "Allied forces converge at the ruined Avengers Compound to defeat Thanos and his army.",
    "location": "Avengers Compound, New York, USA",
    "characters": ["Every hero on Earth"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "30",
    "title": "Tony Stark's Sacrificial Final Snap",
    "year": 2023,
    "month": 4,
    "description": "Iron Man wields the Stones one last time, sacrificing himself to save the universe.",
    "location": "Avengers Compound, New York, USA",
    "characters": ["Tony Stark", "Pepper Potts"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "31",
    "title": "Westview Anomaly Created by Wanda Maximoff",
    "year": 2023,
    "month": 1,
    "description": "Mourning Vision, Wanda warps reality around Westview to live in an idealized sitcom world.",
    "location": "Westview, New Jersey, USA",
    "characters": ["Wanda Maximoff", "Vision"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "32",
    "title": "Loki Captured by the TVA",
    "year": 2023,
    "month": 6,
    "description": "A variant Loki steals the Tesseract and is arrested by the Time Variance Authority.",
    "location": "Mobile Timeline Headquarters",
    "characters": ["Loki", "Mobius"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "33",
    "title": "Battle at the Ten Rings Compound",
    "year": 2021,
    "month": 9,
    "description": "Shang‑Chi and allies assault Wenwu’s desert fortress and the village of Ta Lo, ending the Ten Rings threat.",
    "location": "Desert Fortress & Ta Lo, Mongolia",
    "characters": ["Shang‑Chi", "Wenwu", "Xialing", "Katy"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "34",
    "title": "Emergence of the Deviants (Eternals)",
    "year": 2021,
    "month": 11,
    "description": "Post‑Blip, the Eternals reunite to confront Deviant Kro and prevent the Emergence of a new Celestial.",
    "location": "South Dakota, USA",
    "characters": ["Sersi", "Ikaris", "Kro"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "35",
    "title": "Battle of Wakanda",
    "year": 2018,
    "month": 4,
    "description": "Thanos’s Outriders attack Wakanda to stop Vision’s Mind Stone removal; King T’Challa and allies hold the line.",
    "location": "Wakanda, Africa",
    "characters": ["T’Challa", "Okoye", "Shuri", "Black Panther", "Hulk", "Thor"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "36",
    "title": "Skrull Refugee Rescue",
    "year": 1995,
    "month": 6,
    "description": "Nick Fury brokers asylum for displaced Skrulls and promises them a new home on Earth.",
    "location": "Marvel Facility, Earth",
    "characters": ["Nick Fury", "Talos", "Skrulls"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "37",
    "title": "Formation of the Avengers Initiative",
    "year": 2011,
    "month": 11,
    "description": "Nick Fury formally assembles the Avengers to counter global threats.",
    "location": "S.H.I.E.L.D. Helicarrier",
    "characters": ["Nick Fury", "Tony Stark", "Steve Rogers", "Bruce Banner", "Thor", "Natasha Romanoff", "Clint Barton"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "38",
    "title": "Ultron’s Creation",
    "year": 2015,
    "month": 5,
    "description": "Tony Stark and Bruce Banner’s AI peacekeeper goes rogue, dubbing itself Ultron.",
    "location": "Sokovian Hydra Warehouse",
    "characters": ["Tony Stark", "Bruce Banner", "Ultron"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "39",
    "title": "Vision’s Birth",
    "year": 2015,
    "month": 5,
    "description": "Ultron’s synthetic body is repurposed and brought to life by the Mind Stone as Vision.",
    "location": "Stark Tower, New York, USA",
    "characters": ["Vision", "Wanda Maximoff", "Thor"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "40",
    "title": "Scott Lang’s Rescue of Janet van Dyne",
    "year": 2018,
    "month": 7,
    "description": "Ant‑Man and Wasp infiltrate the Quantum Realm to bring Janet back to the present.",
    "location": "Quantum Realm",
    "characters": ["Scott Lang", "Hope van Dyne", "Janet van Dyne"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "41",
    "title": "Spider‑Man’s Upgraded Suit Reveal",
    "year": 2016,
    "month": 7,
    "description": "Tony Stark gifts Peter Parker an advanced Iron Spider suit after the airport battle.",
    "location": "Avengers Facility, Germany",
    "characters": ["Peter Parker", "Tony Stark"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "42",
    "title": "Black Panther’s UN Address",
    "year": 2018,
    "month": 2,
    "description": "King T’Challa announces Wakanda will share Vibranium and aid globally at the United Nations.",
    "location": "United Nations Headquarters, New York, USA",
    "characters": ["T’Challa", "Shuri"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "43",
    "title": "Spider‑Man: Homecoming Battle at the Mall",
    "year": 2017,
    "month": 7,
    "description": "Spider‑Man and Vulture clash during a drone heist at the Queens’ mall.",
    "location": "Queens Center Mall, New York, USA",
    "characters": ["Peter Parker", "Adrian Toomes"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "44",
    "title": "Doctor Strange Wields the Sling Ring",
    "year": 2016,
    "month": 11,
    "description": "Stephen Strange learns the mystic arts and master the Sling Ring under the Ancient One.",
    "location": "Kamar‑Taj, Kathmandu, Nepal",
    "characters": ["Doctor Strange", "Ancient One", "Mordo"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "45",
    "title": "Guardians Defend Xandar",
    "year": 2014,
    "month": 8,
    "description": "The Guardians repel Ronan’s forces to protect the Power Stone on Xandar.",
    "location": "Xandar, Nova Empire",
    "characters": ["Star‑Lord", "Gamora", "Drax", "Rocket", "Groot"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "46",
    "title": "Secret Invasion",
    "year": 2025,
    "month": 6,
    "description": "Shape‑shifting Skrulls covertly replace key figures to stage an Earth takeover.",
    "location": "Global",
    "characters": ["Nick Fury", "Talos", "Skrulls"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "47",
    "title": "Moon Knight’s First Manifestation",
    "year": 2025,
    "month": 3,
    "description": "Marc Spector embraces his role as Moon Knight under Khonshu’s guidance in London.",
    "location": "London, UK",
    "characters": ["Marc Spector", "Khonshu"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "48",
    "title": "Ms. Marvel’s Embiggening Powers",
    "year": 2025,
    "month": 8,
    "description": "Teenager Kamala Khan unlocks Inhuman-derived abilities, becoming Ms. Marvel in Jersey City.",
    "location": "Jersey City, USA",
    "characters": ["Kamala Khan", "Bruno Carrelli"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "49",
    "title": "Black Panther: Wakanda Forever Mourning",
    "year": 2024,
    "month": 11,
    "description": "Wakanda grieves King T’Challa’s death and faces Namor’s challenge under Queen Ramonda.",
    "location": "Wakanda, Africa",
    "characters": ["Shuri", "Queen Ramonda", "Namor"],
    "type": "Canon",
    "universe": "Earth-199999"
  },
  {
    "id": "50",
    "title": "Thor: Love and Thunder Quest",
    "year": 2025,
    "month": 7,
    "description": "Thor reunites with Jane Foster and King Valkyrie to thwart Gorr the God Butcher across the cosmos.",
    "location": "Various Worlds",
    "characters": ["Thor", "Jane Foster", "Valkyrie", "Gorr"],
    "type": "Canon",
    "universe": "Earth-199999"
  }
]

// Process the events to get the unique years and event counts
const processTimelineYears = () => {
  // Get unique years and count events for each year
  const yearCounts = mockEvents.reduce((acc: Record<number, number>, event: Event) => {
    const year = event.year;
    if (!acc[year]) {
      acc[year] = 0;
    }
    acc[year]++;
    return acc;
  }, {});

  // Convert to array format needed for the component
  return Object.entries(yearCounts)
    .map(([year, events]) => ({
      year: parseInt(year),
      events
    }))
    .sort((a, b) => a.year - b.year); // Sort chronologically
}

// Process the timeline data
const timelineYears = processTimelineYears();

interface TimelineSidebarProps {
  selectedYear: number | null
  onYearSelect: (year: number | null) => void
}

export default function TimelineSidebar({ selectedYear, onYearSelect }: TimelineSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Toggle sidebar expanded/collapsed state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <motion.div
      className={cn(
        "bg-zinc-800 border-r-4 border-yellow-500 relative h-screen",
        isCollapsed ? "w-16" : "w-64"
      )}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3 }}
    >
      {/* Improved toggle button that's always visible and properly styled */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="absolute -right-3 top-4 z-10 h-8 w-8 rounded-full bg-yellow-500 p-0 text-black hover:bg-yellow-400 shadow-md flex items-center justify-center"
      >
        {isCollapsed ? (
          <ChevronRight size={16} className="stroke-2" />
        ) : (
          <ChevronLeft size={16} className="stroke-2" />
        )}
      </Button>

      <div className="p-4 border-b-4 border-yellow-500 flex items-center">
        <motion.div
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          className="font-bangers text-xl font-bold text-yellow-400"
        >
          MCU Timeline
        </motion.div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        <div className="p-4">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-4 flex items-center justify-between"
              >
                <span className="text-zinc-400 font-comic">Filter by Year</span>
                {selectedYear && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onYearSelect(null)}
                    className="h-6 w-6 text-zinc-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            {timelineYears.map((item) => (
              <motion.button
                key={item.year}
                onClick={() => onYearSelect(item.year)}
                className={cn(
                  "w-full text-left rounded-md transition-all duration-200 relative overflow-hidden",
                  selectedYear === item.year
                    ? "bg-yellow-500 text-black font-bold"
                    : "bg-zinc-700 text-zinc-200 hover:bg-zinc-600",
                  isCollapsed ? "p-2 flex justify-center" : "p-3",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isCollapsed ? (
                  <Calendar className="h-5 w-5" />
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="font-comic">{item.year}</span>
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full text-xs">
                      {String(item.events)}
                    </span>
                  </div>
                )}

                {/* Comic-style decorative elements */}
                <div
                  className={cn(
                    "absolute inset-0 pointer-events-none",
                    selectedYear === item.year ? "opacity-20" : "opacity-0",
                  )}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_transparent_20%,_black_70%)] bg-[length:4px_4px]"></div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}