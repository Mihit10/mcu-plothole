"use client"

import { motion } from "framer-motion"
import { X, MapPin, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Character } from "@/lib/types"

interface CharacterCardProps {
  character: Character
  onClose: () => void
  selectedYear: number | null
}

export default function CharacterCard({ character, onClose, selectedYear }: CharacterCardProps) {
  // Determine if character is alive in the selected year
  const isAlive = selectedYear
    ? (character.deathYear ? selectedYear < character.deathYear : true) && selectedYear >= character.firstAppearance
    : true

  // Get character's location in the selected year
  const getLocationForYear = () => {
    if (!selectedYear) return character.lastKnownLocation

    // Find the most recent location before or at the selected year
    const locations = [...character.locationHistory]
      .filter((loc) => loc.year <= selectedYear)
      .sort((a, b) => b.year - a.year)

    return locations.length > 0 ? locations[0].location : "Unknown"
  }

  const currentLocation = getLocationForYear()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="mb-8 bg-zinc-800 border-4 border-red-500 rounded-lg overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_transparent_20%,_black_70%)] bg-[length:4px_4px] opacity-10 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-gradient-to-br from-red-600 to-red-900 p-6 flex items-center justify-center">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${character.avatar || "/placeholder.svg?height=200&width=200"})` }}
            />

            {/* Status indicator */}
            <div
              className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${isAlive ? "bg-green-500" : "bg-red-500"}`}
            >
              <span className="sr-only">{isAlive ? "Alive" : "Deceased"}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold font-comic text-white">{character.name}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-zinc-700"
            >
              <X />
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-zinc-300">{character.bio}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-zinc-300">
                <Calendar className="mr-2 h-5 w-5 text-yellow-500" />
                <span>First Appearance: {character.firstAppearance}</span>
              </div>

              <div className="flex items-center text-zinc-300">
                <MapPin className="mr-2 h-5 w-5 text-yellow-500" />
                <span>Current Location: {currentLocation}</span>
              </div>

              {!isAlive && character.deathYear && (
                <div className="flex items-center text-zinc-300 col-span-full">
                  <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                  <span>Deceased in {character.deathYear}</span>
                </div>
              )}
            </div>

            {selectedYear && (
              <div className="mt-4 p-3 bg-zinc-700 rounded-md">
                <h3 className="text-lg font-comic font-bold text-yellow-400 mb-2">Status in {selectedYear}</h3>
                <p className="text-zinc-300">
                  {isAlive
                    ? `${character.name} is active in the MCU during this year.`
                    : character.deathYear && character.deathYear < selectedYear
                      ? `${character.name} is no longer alive in this year.`
                      : `${character.name} has not yet appeared in the MCU.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
