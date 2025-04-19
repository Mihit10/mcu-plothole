"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { ZoomIn, ZoomOut, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Character, Event } from "@/lib/types"
import { cn } from "@/lib/utils"

interface KnowledgeGraphProps {
  characters: Character[]
  events: Event[]
  selectedCharacter: string | null
  onSelectCharacter: (character: string | null) => void
}

export default function KnowledgeGraph({
  characters,
  events,
  selectedCharacter,
  onSelectCharacter,
}: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(1)
  const [nodes, setNodes] = useState<any[]>([])
  const [links, setLinks] = useState<any[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  // Initialize the graph
  useEffect(() => {
    // Create character nodes
    const characterNodes = characters.map((char) => ({
      id: char.name,
      type: "character",
      radius: 30,
      color: "#FFC72C", // Yellow
      x: Math.random() * 800,
      y: Math.random() * 600,
      data: char,
    }))

    // Create event nodes
    const eventNodes = events.map((event) => ({
      id: event.id,
      type: "event",
      radius: 20,
      color: getEventColor(event.type),
      x: Math.random() * 800,
      y: Math.random() * 600,
      data: event,
    }))

    // Create links between characters and events
    const eventLinks: any[] = []
    events.forEach((event) => {
      event.characters.forEach((charName) => {
        eventLinks.push({
          source: event.id,
          target: charName,
          strength: 0.1,
        })
      })
    })

    setNodes([...characterNodes, ...eventNodes])
    setLinks(eventLinks)
  }, [characters, events])

  // Draw the graph
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply zoom and offset
    ctx.save()
    ctx.translate(offset.x, offset.y)
    ctx.scale(zoom, zoom)

    // Draw links
    ctx.lineWidth = 1
    links.forEach((link) => {
      const source = nodes.find((n) => n.id === link.source)
      const target = nodes.find((n) => n.id === link.target)

      if (source && target) {
        ctx.beginPath()
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(target.x, target.y)

        // Highlight links connected to selected character
        if (selectedCharacter && (source.id === selectedCharacter || target.id === selectedCharacter)) {
          ctx.strokeStyle = "#FFC72C"
          ctx.lineWidth = 2
        } else {
          ctx.strokeStyle = "#444444"
          ctx.lineWidth = 1
        }

        ctx.stroke()
      }
    })

    // Draw nodes
    nodes.forEach((node) => {
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)

      // Fill based on node type and selection state
      if (node.id === selectedCharacter || node.id === hoveredNode) {
        ctx.fillStyle = "#FFFFFF"
        ctx.strokeStyle = node.color
        ctx.lineWidth = 4
      } else {
        ctx.fillStyle = node.color
        ctx.strokeStyle = "#333333"
        ctx.lineWidth = 2
      }

      ctx.fill()
      ctx.stroke()

      // Draw node label
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "12px Comic Neue, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const label =
        node.type === "character"
          ? node.id
          : node.data.title.length > 15
            ? node.data.title.substring(0, 15) + "..."
            : node.data.title

      ctx.fillText(label, node.x, node.y)
    })

    ctx.restore()
  }, [nodes, links, zoom, offset, selectedCharacter, hoveredNode])

  // Handle mouse interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left - offset.x) / zoom
    const y = (e.clientY - rect.top - offset.y) / zoom

    // Check if hovering over a node
    const hovered = nodes.find((node) => {
      const dx = node.x - x
      const dy = node.y - y
      return Math.sqrt(dx * dx + dy * dy) < node.radius
    })

    setHoveredNode(hovered ? hovered.id : null)

    // Handle dragging
    if (isDragging) {
      setOffset({
        x: offset.x + e.movementX,
        y: offset.y + e.movementY,
      })
    }
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)

    // If clicked on a node, select it
    if (hoveredNode && !isDragging) {
      const node = nodes.find((n) => n.id === hoveredNode)
      if (node && node.type === "character") {
        onSelectCharacter(hoveredNode === selectedCharacter ? null : hoveredNode)
      }
    }
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  return (
    <div className="relative h-full w-full bg-zinc-900 rounded-lg border-4 border-blue-500 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_transparent_20%,_black_70%)] bg-[length:4px_4px] opacity-10 pointer-events-none"></div>

      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {hoveredNode && (
        <div className="absolute bottom-4 left-4 bg-zinc-800 p-3 rounded-md border-2 border-zinc-700 font-comic z-10">
          {nodes.find((n) => n.id === hoveredNode)?.type === "character" ? (
            <div>
              <div className="font-bold text-yellow-400">{hoveredNode}</div>
              <div className="text-sm text-zinc-300">
                {nodes.find((n) => n.id === hoveredNode)?.data.bio.substring(0, 100)}...
              </div>
            </div>
          ) : (
            <div>
              <div className="font-bold text-blue-400">{nodes.find((n) => n.id === hoveredNode)?.data.title}</div>
              <div className="text-sm text-zinc-300">
                {nodes.find((n) => n.id === hoveredNode)?.data.year} -{" "}
                {nodes.find((n) => n.id === hoveredNode)?.data.location}
              </div>
            </div>
          )}
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={1000}
        height={800}
        className={cn("w-full h-full cursor-grab", isDragging && "cursor-grabbing")}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDragging(false)
          setHoveredNode(null)
        }}
      />

      <div className="absolute bottom-4 right-4 bg-zinc-800 p-3 rounded-md border-2 border-zinc-700 font-comic z-10">
        <div className="text-sm text-zinc-400 mb-2">Legend:</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <span className="text-xs">Characters</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs">Canon Events</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-xs">Theories</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-xs">Retcons</span>
        </div>
      </div>
    </div>
  )
}

// Helper function to get event node color
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
