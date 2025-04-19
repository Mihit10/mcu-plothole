"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Info, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Character, Event } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TimelineGraphProps {
  events: Event[]
  characters: Character[]
  selectedYear: number | null
  onSelectCharacter: (character: string | null) => void
  selectedCharacter: string | null; 
}

export default function TimelineGraph({
  events,
  characters,
  selectedYear,
  onSelectCharacter,
}: TimelineGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([])
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null)
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null)
  const [visibleMonths, setVisibleMonths] = useState({ start: 1, end: 12 })
  const [zoomLevel, setZoomLevel] = useState(1)

  // Filter events based on selected year
  useEffect(() => {
    if (selectedYear) {
      setVisibleEvents(events.filter(event => event.year === selectedYear))
    } else {
      // If no year selected, show a reasonable number of events
      setVisibleEvents(events.slice(0, 15))
    }
  }, [events, selectedYear])

  // Update visible months based on events
  useEffect(() => {
    if (visibleEvents.length > 0 && selectedYear) {
      const months = visibleEvents.map(event => event.month)
      const minMonth = Math.max(1, Math.min(...months) - 1)
      const maxMonth = Math.min(12, Math.max(...months) + 1)
      setVisibleMonths({ start: minMonth, end: maxMonth })
    } else {
      setVisibleMonths({ start: 1, end: 12 })
    }
  }, [visibleEvents, selectedYear])

  // Get month name
  const getMonthName = (month: number): string => {
    return new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })
  }

  // Handle horizontal scrolling
  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.5
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Increase zoom level
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2))
  }

  // Decrease zoom level
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5))
  }

  // Reset zoom level
  const handleResetZoom = () => {
    setZoomLevel(1)
  }

  // Get character color
  const getCharacterColor = (characterName: string): string => {
    // Generate a consistent color based on character name
    const hash = characterName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const hue = hash % 360
    return `hsl(${hue}, 70%, 60%)`
  }

  return (
    <div className="relative h-full w-full bg-zinc-900 rounded-lg border-4 border-yellow-500 overflow-hidden font-comic">
      {/* Comic-style background pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_transparent_20%,_black_70%)] bg-[length:4px_4px] opacity-10 pointer-events-none"></div>
      
      {/* Title header */}
      <div className="p-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold flex items-center justify-between border-b-4 border-black">
        <div className="flex items-center">
          <Shield className="h-6 w-6 mr-2" />
          {selectedYear ? `MCU Timeline: ${selectedYear}` : "MCU Timeline: All Events"}
        </div>
        
        {/* Zoom controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            className="bg-yellow-400 hover:bg-yellow-300 text-black border-black"
          >
            -
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetZoom}
            className="bg-yellow-400 hover:bg-yellow-300 text-black border-black"
          >
            1x
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            className="bg-yellow-400 hover:bg-yellow-300 text-black border-black"
          >
            +
          </Button>
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleScroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-yellow-500 border-black text-black hover:bg-yellow-400"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleScroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-yellow-500 border-black text-black hover:bg-yellow-400"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Timeline content container */}
      <div 
        ref={containerRef}
        className="overflow-x-auto h-[calc(100%-64px)] relative"
      >
        {/* Month labels */}
        {selectedYear && (
          <div className="sticky top-0 z-10 flex border-b-2 border-yellow-500 bg-zinc-800 text-yellow-400 font-bold">
            {Array.from({ length: visibleMonths.end - visibleMonths.start + 1 }, (_, i) => visibleMonths.start + i).map((month) => (
              <div 
                key={month}
                className="p-2 flex-none text-center border-r border-yellow-500/50"
                style={{ width: `${200 * zoomLevel}px` }}
              >
                {getMonthName(month)}
              </div>
            ))}
          </div>
        )}

        {/* Timeline content */}
        <div 
          className="relative mt-4"
          style={{ 
            minHeight: visibleEvents.length > 0 ? visibleEvents.length * 120 : 200,
            minWidth: selectedYear ? (visibleMonths.end - visibleMonths.start + 1) * 200 * zoomLevel : 1200 * zoomLevel
          }}
        >
          {/* Timeline center line */}
          <div className="absolute left-0 right-0 h-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 z-0"></div>

          {/* No events message */}
          {visibleEvents.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-lg">
              No events to display for {selectedYear ? `year ${selectedYear}` : "the selected filters"}
            </div>
          )}

          {/* Event nodes */}
          {visibleEvents.map((event, index) => {
            const position = selectedYear 
              ? ((event.month - visibleMonths.start) / (visibleMonths.end - visibleMonths.start + 1)) * 100 
              : (index / (visibleEvents.length - 1 || 1)) * 100
            
            const topPosition = index % 2 === 0 ? "15%" : "65%"
            const eventColor = getEventColor(event.type)
            
            return (
              <div 
                key={event.id}
                className={cn(
                  "absolute transform -translate-x-1/2 transition-all duration-300",
                  hoveredEvent?.id === event.id ? "z-30" : "z-10"
                )}
                style={{ 
                  left: `${position}%`,
                  top: topPosition
                }}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Connection line to timeline */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-transparent via-zinc-300 to-zinc-300"
                  style={{
                    top: topPosition === "15%" ? "100%" : "auto",
                    bottom: topPosition === "65%" ? "100%" : "auto",
                    height: "75px"
                  }}
                ></div>
                
                {/* Event node */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "rounded-lg p-3 w-48 border-4 shadow-lg cursor-pointer",
                    hoveredEvent?.id === event.id ? "ring-4 ring-white" : ""
                  )}
                  style={{ 
                    backgroundColor: eventColor,
                    borderColor: hoveredEvent?.id === event.id ? "white" : "black",
                  }}
                >
                  <h3 className="font-bold text-black text-sm truncate">{event.title}</h3>
                  <div className="text-xs text-black/80 mt-1">{event.location}</div>
                  
                  {/* Character tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {event.characters.slice(0, 3).map((char) => (
                      <div
                        key={`${event.id}-${char}`}
                        className="text-xs px-2 py-0.5 rounded-full bg-black/20 text-black font-bold cursor-pointer"
                        style={{ borderBottom: `2px solid ${getCharacterColor(char)}` }}
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectCharacter(char)
                        }}
                        onMouseEnter={() => setHoveredCharacter(char)}
                        onMouseLeave={() => setHoveredCharacter(null)}
                      >
                        {char}
                      </div>
                    ))}
                    {event.characters.length > 3 && (
                      <div className="text-xs px-2 py-0.5 rounded-full bg-black/20 text-black">
                        +{event.characters.length - 3}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Event details popup */}
      <AnimatePresence>
        {hoveredEvent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 w-72 bg-zinc-800 p-4 rounded-lg border-4 border-yellow-500 shadow-lg z-50"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-yellow-400">{hoveredEvent.title}</h3>
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getEventColor(hoveredEvent.type) }}
              >
                <Info className="h-3 w-3 text-black" />
              </div>
            </div>
            
            <div className="text-xs text-zinc-400 mt-1">
              {hoveredEvent.year} • {getMonthName(hoveredEvent.month)} • {hoveredEvent.location}
            </div>
            
            <p className="text-sm mt-2 text-zinc-300">{hoveredEvent.description}</p>
            
            <div className="mt-3">
              <div className="text-xs text-zinc-400 mb-1">Featured Characters:</div>
              <div className="flex flex-wrap gap-1">
                {hoveredEvent.characters.map((char) => (
                  <div
                    key={`popup-${char}`}
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full cursor-pointer transition-all",
                      hoveredCharacter === char 
                        ? "bg-yellow-500 text-black"
                        : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                    )}
                    style={{ borderLeft: `3px solid ${getCharacterColor(char)}` }}
                    onClick={() => onSelectCharacter(char)}
                    onMouseEnter={() => setHoveredCharacter(char)}
                    onMouseLeave={() => setHoveredCharacter(null)}
                  >
                    {char}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-3 text-xs text-zinc-400">
              Universe: <span className="text-zinc-300">{hoveredEvent.universe}</span> • 
              Type: <span className="text-zinc-300">{hoveredEvent.type}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-zinc-800/90 p-3 rounded-md border-2 border-yellow-500 font-comic z-10">
        <div className="text-sm text-yellow-400 mb-2">Event Types:</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getEventColor("Canon") }}></div>
          <span className="text-xs">Canon</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getEventColor("Theory") }}></div>
          <span className="text-xs">Theory</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getEventColor("Retcon") }}></div>
          <span className="text-xs">Retcon</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getEventColor("Rumor") }}></div>
          <span className="text-xs">Rumor</span>
        </div>
      </div>
    </div>
  )
}

// Helper function to get event color - re-used from KnowledgeGraph
function getEventColor(type: string): string {
  switch (type) {
    case "Canon":
      return "#3B82F6" // blue-500
    case "Theory":
      return "#8B5CF6" // purple-500
    case "Retcon":
      return "#F97316" // orange-500
    case "Rumor":
      return "#EF4444" // red-500
    default:
      return "#6B7280" // gray-500
  }
}