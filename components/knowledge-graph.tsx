"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
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

  // Get darker event colors for better contrast against the light background
  function getEventColor(type: string): string {
    switch (type) {
      case "Canon":
        return "#60A5FA" // blue-400
      case "Theory":
        return "#A78BFA" // purple-400
      case "Retcon":
        return "#FB923C" // orange-400
      case "Rumor":
        return "#F87171" // red-400
      default:
        return "#9CA3AF" // gray-400
    }
  }

  return (
    <div className="relative h-full w-full bg-amber-50 rounded-lg border-4 border-yellow-500 overflow-hidden font-comic">
      {/* Comic-style background pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_transparent_20%,_#FFEDD5_70%)] bg-[length:8px_8px] opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full" style={{background: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"none\" stroke=\"%23DDD6FE\" stroke-width=\"0.5\" stroke-dasharray=\"5,5\"/></svg>')"}}></div>
      
      {/* Title header */}
      <div className="p-3 bg-yellow-300 text-black font-bold flex items-center justify-between border-b-4 border-black shadow-md">
        <div className="flex flex-col">
          <div className="text-2xl font-black uppercase tracking-wide">MCU TIMELINE</div>
          <div className="text-sm font-medium">Explore events year by year</div>
        </div>
        
        {/* Zoom controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            className="bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black font-bold shadow-md transform active:scale-95"
          >
            -
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetZoom}
            className="bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black font-bold shadow-md transform active:scale-95"
          >
            1x
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            className="bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black font-bold shadow-md transform active:scale-95"
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
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-yellow-500 border-2 border-black text-black hover:bg-yellow-400 shadow-md transform active:scale-95"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleScroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-yellow-500 border-2 border-black text-black hover:bg-yellow-400 shadow-md transform active:scale-95"
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
          <div className="sticky top-0 z-10 flex border-b-2 border-yellow-600 bg-yellow-100 text-yellow-800 font-bold shadow-md">
            {Array.from({ length: visibleMonths.end - visibleMonths.start + 1 }, (_, i) => visibleMonths.start + i).map((month) => (
              <div 
                key={month}
                className="p-2 flex-none text-center border-r border-yellow-600/50"
                style={{ width: `${200 * zoomLevel}px` }}
              >
                {getMonthName(month)}
              </div>
            ))}
          </div>
        )}

        {/* Timeline content */}
        <div 
          className="relative mt-4 px-4"
          style={{ 
            minHeight: visibleEvents.length > 0 ? visibleEvents.length * 120 + 100 : 300,
            minWidth: selectedYear ? (visibleMonths.end - visibleMonths.start + 1) * 200 * zoomLevel : 1200 * zoomLevel
          }}
        >
          {/* Timeline center line */}
          <div className="absolute left-0 right-0 h-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 z-0 border-t-2 border-b-2 border-black"></div>

          {/* No events message */}
          {visibleEvents.length === 0 && (
            <div className="relative inset-0 flex items-center justify-center text-yellow-800 text-lg bg-yellow-100/50 rounded-lg m-8 border-2 border-dashed border-yellow-600">
              No events to display for {selectedYear ? `year ${selectedYear}` : "the selected filters"}
            </div>
          )}

          {/* Event nodes - Modified to remove rotation and animations */}
          {visibleEvents.map((event, index) => {
            const position = selectedYear 
              ? ((event.month - visibleMonths.start) / (visibleMonths.end - visibleMonths.start + 1)) * 100 
              : (index / (visibleEvents.length - 1 || 1)) * 100
            
            // Improved vertical spacing with alternating positions
            const topPosition = index % 2 === 0 ? "20%" : "70%"
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
                  top: topPosition,
                  maxWidth: "180px"
                }}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Connection line to timeline */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-transparent via-yellow-600 to-yellow-600"
                  style={{
                    top: topPosition === "20%" ? "100%" : "auto",
                    bottom: topPosition === "70%" ? "100%" : "auto",
                    height: "65px"
                  }}
                ></div>
                
                {/* Event card - Removed rotation and initial animation, kept hover effect */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "rounded-lg p-3 border-4 shadow-lg",
                    hoveredEvent?.id === event.id ? "ring-4 ring-white" : ""
                  )}
                  style={{ 
                    backgroundColor: eventColor,
                    borderColor: "black",
                    boxShadow: "3px 3px 0 rgba(0,0,0,0.3)",
                    width: "150px",
                    overflow: "hidden"
                  }}
                >
                  <h3 className="font-bold text-white text-sm truncate" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}>{event.title}</h3>
                  <div className="text-xs text-white mt-1" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}>{event.location}</div>
                  
                  {/* Character tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {event.characters.slice(0, 2).map((char) => (
                      <div
                        key={`${event.id}-${char}`}
                        className="text-xs px-2 py-0.5 rounded-full bg-white/40 text-black font-bold"
                        style={{ 
                          borderBottom: `2px solid ${getCharacterColor(char)}`,
                          boxShadow: "1px 1px 0 rgba(0,0,0,0.2)"
                        }}
                      >
                        {char}
                      </div>
                    ))}
                    {event.characters.length > 2 && (
                      <div className="text-xs px-2 py-0.5 rounded-full bg-white/40 text-black font-bold">
                        +{event.characters.length - 2}
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
            className="absolute bottom-16 left-4 w-64 bg-white p-4 rounded-lg border-4 border-yellow-500 shadow-lg z-50"
            style={{ 
              boxShadow: "5px 5px 0 rgba(0,0,0,0.2)",
              background: "white url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"none\" stroke=\"%23FDBA74\" stroke-width=\"0.5\" stroke-dasharray=\"2,2\"/></svg>')"
            }}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-yellow-800 text-sm">{hoveredEvent.title}</h3>
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-black"
                style={{ backgroundColor: getEventColor(hoveredEvent.type) }}
              >
                <Info className="h-3 w-3 text-white" />
              </div>
            </div>
            
            <div className="text-xs text-yellow-700 mt-1">
              {hoveredEvent.year} • {getMonthName(hoveredEvent.month)} • {hoveredEvent.location}
            </div>
            
            <p className="text-xs mt-2 text-yellow-900 bg-yellow-50/70 p-2 rounded border border-yellow-200">{hoveredEvent.description}</p>
            
            <div className="mt-3">
              <div className="text-xs text-yellow-700 mb-1 font-bold">Featured Characters:</div>
              <div className="flex flex-wrap gap-1">
                {hoveredEvent.characters.map((char) => (
                  <div
                    key={`popup-${char}`}
                    className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-900"
                    style={{ 
                      borderLeft: `3px solid ${getCharacterColor(char)}`,
                      boxShadow: "1px 1px 0 rgba(0,0,0,0.1)"
                    }}
                  >
                    {char}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-3 text-xs text-yellow-700">
              Universe: <span className="text-yellow-900 font-bold">{hoveredEvent.universe}</span> • 
              Type: <span className="text-yellow-900 font-bold">{hoveredEvent.type}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute top-16 right-4 bg-white p-3 rounded-md border-2 border-yellow-500 font-comic z-10" style={{ boxShadow: "3px 3px 0 rgba(0,0,0,0.2)" }}>
        <div className="text-sm text-yellow-800 mb-2 font-bold">Event Types:</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full border border-black" style={{ backgroundColor: getEventColor("Canon") }}></div>
          <span className="text-xs text-yellow-900">Canon</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full border border-black" style={{ backgroundColor: getEventColor("Theory") }}></div>
          <span className="text-xs text-yellow-900">Theory</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full border border-black" style={{ backgroundColor: getEventColor("Retcon") }}></div>
          <span className="text-xs text-yellow-900">Retcon</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-black" style={{ backgroundColor: getEventColor("Rumor") }}></div>
          <span className="text-xs text-yellow-900">Rumor</span>
        </div>
      </div>
    </div>
  )
}