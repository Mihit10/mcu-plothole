"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Info, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface EventCardProps {
  event: Event
  onCharacterClick: (character: string) => void
  isHighlighted: boolean
}

// Define image paths
const images = [
  "/img/f1.jpg",
  "/img/f2.jpg",
  "/img/f3.jpg",
  "/img/f4.jpg",
  "/img/f5.jpg",
];

// Function to get a random image from the array
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

export default function EventCard({ event, onCharacterClick, isHighlighted }: EventCardProps) {
  // State to hold the randomly assigned image for this card
  const [randomImage, setRandomImage] = useState("");
  
  // Assign a random image when the component mounts
  // useEffect(() => {
  //   setRandomImage(getRandomImage());
  // }, []);

  // Determine the border color based on the event type
  const getBorderColor = () => {
    switch (event.type) {
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

  // Get badge color based on event type
  const getBadgeVariant = () => {
    switch (event.type) {
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

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "bg-zinc-800 rounded-lg overflow-hidden border-4 relative",
        getBorderColor(),
        isHighlighted && "ring-4 ring-yellow-500 ring-opacity-70",
      )}
    >
      {/* Comic book halftone texture */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_transparent_20%,_black_70%)] bg-[length:4px_4px] opacity-10 pointer-events-none"></div>

      {/* Event image */}
      <div
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${event.image || randomImage || "/placeholder.svg?height=300&width=500"})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>

        <div className="absolute bottom-0 left-0 p-4 w-full">
          <Badge className={cn("font-comic", getBadgeVariant())}>{event.type}</Badge>
          <h3 className="text-xl font-bold mt-2 text-white font-comic drop-shadow-md">{event.title}</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center text-zinc-400 text-sm mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{event.year}</span>
          </div>

          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-zinc-300 mb-4 font-comic">{event.description}</p>

        {event.characters.length > 0 && (
          <div className="mt-3">
            <div className="text-sm text-zinc-400 mb-2 flex items-center">
              <Shield className="mr-1 h-4 w-4" />
              <span>Characters Involved:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.characters.map((character) => (
                <Button
                  key={character}
                  variant="outline"
                  size="sm"
                  onClick={() => onCharacterClick(character)}
                  className="bg-zinc-700 hover:bg-zinc-600 text-zinc-200 border-zinc-600 font-comic text-xs"
                >
                  {character}
                </Button>
              ))}
            </div>
          </div>
        )}

        {event.universe && event.universe !== "Earth-199999" && (
          <div className="mt-4 flex items-center">
            <Info className="mr-1 h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-400">Universe: {event.universe}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}