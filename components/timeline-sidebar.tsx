"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Years in the MCU timeline
const timelineYears = [
  { year: 1943, events: 3 },
  { year: 1945, events: 2 },
  { year: 1995, events: 4 },
  { year: 2008, events: 5 },
  { year: 2010, events: 3 },
  { year: 2011, events: 6 },
  { year: 2012, events: 8 },
  { year: 2013, events: 4 },
  { year: 2014, events: 7 },
  { year: 2015, events: 5 },
  { year: 2016, events: 9 },
  { year: 2017, events: 6 },
  { year: 2018, events: 10 },
  { year: 2019, events: 3 },
  { year: 2023, events: 8 },
  { year: 2024, events: 5 },
  { year: 2025, events: 2 },
]

interface TimelineSidebarProps {
  selectedYear: number | null
  onYearSelect: (year: number | null) => void
}

export default function TimelineSidebar({ selectedYear, onYearSelect }: TimelineSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <motion.div
      className={cn("bg-zinc-800 border-r-4 border-yellow-500 relative", isCollapsed ? "w-16" : "w-64")}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b-4 border-yellow-500 flex items-center justify-between">
        <motion.div
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          className="font-bangers text-xl font-bold text-yellow-400"
        >
          MCU Timeline
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-yellow-400 hover:text-yellow-300 hover:bg-zinc-700"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
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
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full text-xs">{item.events}</span>
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
