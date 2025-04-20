"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockCharacters } from "@/lib/mock-data"

interface CharacterSearchProps {
  onSearch: (query: string) => void
  onCharacterSelect: (character: string | null) => void
  selectedCharacter: string | null
}

export default function CharacterSearch({ onSearch, onCharacterSelect, selectedCharacter }: CharacterSearchProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [filteredCharacters, setFilteredCharacters] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter characters based on search query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockCharacters
        .filter((char) => char.name.toLowerCase().includes(query.toLowerCase()))
        .map((char) => char.name)
        .slice(0, 5) // Limit to 5 results
      setFilteredCharacters(filtered)
    } else {
      setFilteredCharacters([])
    }

    onSearch(query)
  }, [query, onSearch])

  // Handle character selection
  const handleCharacterSelect = (character: string) => {
    onCharacterSelect(character)
    setQuery("")
    setFilteredCharacters([])
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  // Clear search and selection
  const handleClear = () => {
    setQuery("")
    onSearch("")
    if (selectedCharacter) {
      onCharacterSelect(null)
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <motion.div
          className={cn(
            "absolute inset-0 rounded-md",
            isFocused ? "border-2 border-red-500" : "border-2 border-transparent",
          )}
          animate={{
            boxShadow: isFocused ? "0 0 0 2px rgba(239, 68, 68, 0.5)" : "0 0 0 0 rgba(239, 68, 68, 0)",
          }}
          transition={{ duration: 0.2 }}
        />

        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />

          <Input
            ref={inputRef}
            type="text"
            placeholder="Search characters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pl-9 pr-8 py-2 bg-zinc-800 border-2 border-zinc-700 text-white rounded-md w-64 font-comic"
          />

          {(query || selectedCharacter) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400 hover:text-white"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Search results dropdown */}
      <AnimatePresence>
        {filteredCharacters.length > 0 && isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-1 w-full bg-zinc-800 border-2 border-zinc-700 rounded-md shadow-lg overflow-hidden"
          >
            <ul className="py-1">
              {filteredCharacters.map((character) => (
                <motion.li
                  key={character}
                  whileHover={{ backgroundColor: "rgba(234, 179, 8, 0.2)" }}
                  className="px-3 py-2 cursor-pointer text-zinc-200 hover:text-white font-comic"
                  onClick={() => handleCharacterSelect(character)}
                >
                  {character}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper function to conditionally join classNames
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
