export interface Event {
  id: string
  title: string
  year: number
  description: string
  location: string
  characters: string[]
  image?: string
  type: "Canon" | "Theory" | "Retcon" | "Rumor"
  universe?: string
}

export interface Character {
  name: string
  bio: string
  avatar?: string
  firstAppearance: number
  deathYear?: number
  lastKnownLocation: string
  locationHistory: {
    year: number
    location: string
  }[]
}

export interface MultiverseTimeline {
  id: string
  name: string
  description: string
  characters: string[]
  events: string[]
  status: "active" | "pruned" | "sacred"
}
