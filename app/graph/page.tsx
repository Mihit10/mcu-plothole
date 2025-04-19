"use client"
import MCUGraph from '@/components/main-graph';
import MainQuery from '@/components/main-query';

// Your page component
export default function GraphPage() {
  // Your data fetching logic here
  const graphData = [
    {
      "a": {
        "identity": 3,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Tony Stark",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
      },
      "r": {
        "identity": 1155173304420532227,
        "start": 3,
        "end": 43,
        "type": "FOUNDED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1155173304420532227",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:43"
      },
      "b": {
        "identity": 43,
        "labels": [
          "Organization"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Avengers",
          "type": "organization"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:43"
      }
    },
    {
      "a": {
        "identity": 3,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Tony Stark",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
      },
      "r": {
        "identity": 6917529027641081911,
        "start": 3,
        "end": 55,
        "type": "FOUNDED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917529027641081911",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:55"
      },
      "b": {
        "identity": 55,
        "labels": [],
        "properties": {
          "name": "None"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:55"
      }
    },
    {
      "a": {
        "identity": 3,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Tony Stark",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
      },
      "r": {
        "identity": 1152922604118474755,
        "start": 3,
        "end": 6,
        "type": "MARRIED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152922604118474755",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:6"
      },
      "b": {
        "identity": 6,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Pepper Potts",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:6"
      }
    },
    {
      "a": {
        "identity": 3,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Tony Stark",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
      },
      "r": {
        "identity": 6917537823734104121,
        "start": 3,
        "end": 57,
        "type": "DEVELOPS",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917537823734104121",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:57"
      },
      "b": {
        "identity": 57,
        "labels": [],
        "properties": {
          "name": "Time-Space GPS"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:57"
      }
    },
    {
      "a": {
        "identity": 3,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Tony Stark",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
      },
      "r": {
        "identity": 1152931400211496963,
        "start": 3,
        "end": 35,
        "type": "SNAPS",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152931400211496963",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:35"
      },
      "b": {
        "identity": 35,
        "labels": [
          "Weapon"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Infinity Stones",
          "type": "weapon"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:35"
      }
    },
    {
      "a": {
        "identity": 3,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Tony Stark",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
      },
      "r": {
        "identity": 1152934698746380291,
        "start": 3,
        "end": 73,
        "type": "KILLED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152934698746380291",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:73"
      },
      "b": {
        "identity": 73,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Ebony Maw",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:73"
      }
    },
    {
      "a": {
        "identity": 3,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Tony Stark",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
      },
      "r": {
        "identity": 1152943494839402499,
        "start": 3,
        "end": 9,
        "type": "MET",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152943494839402499",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      },
      "b": {
        "identity": 9,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Bruce Banner",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      }
    },
    {
      "a": {
        "identity": 4,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Nebula",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:4"
      },
      "r": {
        "identity": 1152929201188241412,
        "start": 4,
        "end": 12,
        "type": "VOUCHES_FOR",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152929201188241412",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:4",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "b": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      }
    },
    {
      "a": {
        "identity": 7,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Steve Rogers",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7"
      },
      "r": {
        "identity": 1152923703630102535,
        "start": 7,
        "end": 43,
        "type": "LEADS",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152923703630102535",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:43"
      },
      "b": {
        "identity": 43,
        "labels": [
          "Organization"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Avengers",
          "type": "organization"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:43"
      }
    },
    {
      "a": {
        "identity": 7,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Steve Rogers",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7"
      },
      "r": {
        "identity": 1152925902653358087,
        "start": 7,
        "end": 33,
        "type": "WIELDS",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152925902653358087",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:33"
      },
      "b": {
        "identity": 33,
        "labels": [
          "Weapon"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Mjolnir",
          "type": "weapon"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:33"
      }
    },
    {
      "a": {
        "identity": 7,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Steve Rogers",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7"
      },
      "r": {
        "identity": 6917541122268987451,
        "start": 7,
        "end": 59,
        "type": "PASSES_MANTLE_TO",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917541122268987451",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:59"
      },
      "b": {
        "identity": 59,
        "labels": [],
        "properties": {
          "name": "Sam Wilson"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:59"
      }
    },
    {
      "a": {
        "identity": 7,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Steve Rogers",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7"
      },
      "r": {
        "identity": 1152944594351030279,
        "start": 7,
        "end": 9,
        "type": "CONTACTED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152944594351030279",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      },
      "b": {
        "identity": 9,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Bruce Banner",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      }
    },
    {
      "a": {
        "identity": 7,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Steve Rogers",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7"
      },
      "r": {
        "identity": 1152948992397541383,
        "start": 7,
        "end": 64,
        "type": "DEFENDED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152948992397541383",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      },
      "b": {
        "identity": 64,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Vision",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      }
    },
    {
      "a": {
        "identity": 8,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Natasha Romanoff",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:8"
      },
      "r": {
        "identity": 1152924803141730312,
        "start": 8,
        "end": 43,
        "type": "COMMANDS",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152924803141730312",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:8",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:43"
      },
      "b": {
        "identity": 43,
        "labels": [
          "Organization"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Avengers",
          "type": "organization"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:43"
      }
    },
    {
      "a": {
        "identity": 9,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Bruce Banner",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      },
      "r": {
        "identity": 6917534525199220792,
        "start": 9,
        "end": 56,
        "type": "MERGED_WITH",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917534525199220792",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:56"
      },
      "b": {
        "identity": 56,
        "labels": [],
        "properties": {
          "name": "Hulk"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:56"
      }
    },
    {
      "a": {
        "identity": 9,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Bruce Banner",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      },
      "r": {
        "identity": 1152931400211496969,
        "start": 9,
        "end": 35,
        "type": "SNAPS",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152931400211496969",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:35"
      },
      "b": {
        "identity": 35,
        "labels": [
          "Weapon"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Infinity Stones",
          "type": "weapon"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:35"
      }
    },
    {
      "a": {
        "identity": 9,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Bruce Banner",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      },
      "r": {
        "identity": 6917542221780615242,
        "start": 9,
        "end": 74,
        "type": "KILLED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917542221780615242",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:74"
      },
      "b": {
        "identity": 74,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Cull Obsidian",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:74"
      }
    },
    {
      "a": {
        "identity": 9,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Bruce Banner",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      },
      "r": {
        "identity": 1152941295816146953,
        "start": 9,
        "end": 62,
        "type": "INFORMED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152941295816146953",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:62"
      },
      "b": {
        "identity": 62,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Doctor Strange",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:62"
      }
    },
    {
      "a": {
        "identity": 9,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Bruce Banner",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      },
      "r": {
        "identity": 1155195294653087753,
        "start": 9,
        "end": 3,
        "type": "MET",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1155195294653087753",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
      },
      "b": {
        "identity": 3,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Tony Stark",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
      }
    },
    {
      "a": {
        "identity": 9,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Bruce Banner",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      },
      "r": {
        "identity": 1152945693862658057,
        "start": 9,
        "end": 7,
        "type": "CONTACTED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152945693862658057",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7"
      },
      "b": {
        "identity": 7,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Steve Rogers",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:7"
      }
    },
    {
      "a": {
        "identity": 11,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Rocket",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:11"
      },
      "r": {
        "identity": 1152928101676613643,
        "start": 11,
        "end": 45,
        "type": "JOINS",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152928101676613643",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:11",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:45"
      },
      "b": {
        "identity": 45,
        "labels": [
          "Organization"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Guardians of the Galaxy",
          "type": "organization"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:45"
      }
    },
    {
      "a": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "r": {
        "identity": 1152925902653358092,
        "start": 12,
        "end": 34,
        "type": "WIELDS",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152925902653358092",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:34"
      },
      "b": {
        "identity": 34,
        "labels": [
          "Weapon"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Infinity Gauntlet",
          "type": "weapon"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:34"
      }
    },
    {
      "a": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "r": {
        "identity": 1155186498560065548,
        "start": 12,
        "end": 13,
        "type": "KILLED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1155186498560065548",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:13"
      },
      "b": {
        "identity": 13,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Loki",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:13"
      }
    },
    {
      "a": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "r": {
        "identity": 1152934698746380300,
        "start": 12,
        "end": 60,
        "type": "KILLED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152934698746380300",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:60"
      },
      "b": {
        "identity": 60,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Heimdall",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:60"
      }
    },
    {
      "a": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "r": {
        "identity": 6917542221780615232,
        "start": 12,
        "end": 64,
        "type": "KILLED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917542221780615232",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      },
      "b": {
        "identity": 64,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Vision",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      }
    },
    {
      "a": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "r": {
        "identity": 1157438298373750796,
        "start": 12,
        "end": 66,
        "type": "KILLED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1157438298373750796",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:66"
      },
      "b": {
        "identity": 66,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Gamora",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:66"
      }
    },
    {
      "a": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "r": {
        "identity": 1157439397885378572,
        "start": 12,
        "end": 14,
        "type": "DEFEATED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1157439397885378572",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      },
      "b": {
        "identity": 14,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thor",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      }
    },
    {
      "a": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "r": {
        "identity": 1152935798258008076,
        "start": 12,
        "end": 56,
        "type": "DEFEATED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152935798258008076",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:56"
      },
      "b": {
        "identity": 56,
        "labels": [],
        "properties": {
          "name": "Hulk"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:56"
      }
    },
    {
      "a": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "r": {
        "identity": 1155187598071693324,
        "start": 12,
        "end": 61,
        "type": "DEFEATED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1155187598071693324",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:61"
      },
      "b": {
        "identity": 61,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Hulk",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:61"
      }
    },
    {
      "a": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "r": {
        "identity": 6917543321292243006,
        "start": 12,
        "end": 62,
        "type": "DEFEATED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917543321292243006",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:62"
      },
      "b": {
        "identity": 62,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Doctor Strange",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:62"
      }
    },
    {
      "a": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "r": {
        "identity": 6917562012989915233,
        "start": 12,
        "end": 97,
        "type": "OBTAINED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917562012989915233",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:97"
      },
      "b": {
        "identity": 97,
        "labels": [],
        "properties": {
          "name": "Soul Stone"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:97"
      }
    },
    {
      "a": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "r": {
        "identity": 1152955589467308044,
        "start": 12,
        "end": 34,
        "type": "USED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152955589467308044",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:34"
      },
      "b": {
        "identity": 34,
        "labels": [
          "Weapon"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Infinity Gauntlet",
          "type": "weapon"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:34"
      }
    },
    {
      "a": {
        "identity": 14,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thor",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      },
      "r": {
        "identity": 1152925902653358094,
        "start": 14,
        "end": 33,
        "type": "WIELDS",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152925902653358094",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:33"
      },
      "b": {
        "identity": 33,
        "labels": [
          "Weapon"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Mjolnir",
          "type": "weapon"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:33"
      }
    },
    {
      "a": {
        "identity": 14,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thor",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      },
      "r": {
        "identity": 1152928101676613646,
        "start": 14,
        "end": 45,
        "type": "JOINS",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152928101676613646",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:45"
      },
      "b": {
        "identity": 45,
        "labels": [
          "Organization"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Guardians of the Galaxy",
          "type": "organization"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:45"
      }
    },
    {
      "a": {
        "identity": 14,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thor",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      },
      "r": {
        "identity": 1152939096792891406,
        "start": 14,
        "end": 45,
        "type": "RESCUED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152939096792891406",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:45"
      },
      "b": {
        "identity": 45,
        "labels": [
          "Organization"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Guardians of the Galaxy",
          "type": "organization"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:45"
      }
    },
    {
      "a": {
        "identity": 14,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thor",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      },
      "r": {
        "identity": 1152950091909169166,
        "start": 14,
        "end": 90,
        "type": "CRAFTED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152950091909169166",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:90"
      },
      "b": {
        "identity": 90,
        "labels": [
          "Weapon"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Stormbreaker",
          "type": "weapon"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:90"
      }
    },
    {
      "a": {
        "identity": 14,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thor",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      },
      "r": {
        "identity": 1152952290932424718,
        "start": 14,
        "end": 78,
        "type": "HELPED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152952290932424718",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:78"
      },
      "b": {
        "identity": 78,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Eitri",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:78"
      }
    },
    {
      "a": {
        "identity": 14,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thor",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      },
      "r": {
        "identity": 1152959987513819150,
        "start": 14,
        "end": 12,
        "type": "DEFEATED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152959987513819150",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "b": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      }
    },
    {
      "a": {
        "identity": 45,
        "labels": [
          "Organization"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Guardians of the Galaxy",
          "type": "organization"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:45"
      },
      "r": {
        "identity": 1152940196304519213,
        "start": 45,
        "end": 14,
        "type": "RESCUED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152940196304519213",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:45",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      },
      "b": {
        "identity": 14,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thor",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      }
    },
    {
      "a": {
        "identity": 56,
        "labels": [],
        "properties": {
          "name": "Hulk"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:56"
      },
      "r": {
        "identity": 1152936897769635896,
        "start": 56,
        "end": 60,
        "type": "SAVED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152936897769635896",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:56",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:60"
      },
      "b": {
        "identity": 60,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Heimdall",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:60"
      }
    },
    {
      "a": {
        "identity": 58,
        "labels": [],
        "properties": {
          "name": "Valkyrie"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:58"
      },
      "r": {
        "identity": 1152932499723124794,
        "start": 58,
        "end": 21,
        "type": "BECOMES_RULER_OF",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152932499723124794",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:58",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:21"
      },
      "b": {
        "identity": 21,
        "labels": [
          "Location"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Asgard",
          "type": "location"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:21"
      }
    },
    {
      "a": {
        "identity": 60,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Heimdall",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:60"
      },
      "r": {
        "identity": 1152937997281263676,
        "start": 60,
        "end": 56,
        "type": "SAVED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152937997281263676",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:60",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:56"
      },
      "b": {
        "identity": 56,
        "labels": [],
        "properties": {
          "name": "Hulk"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:56"
      }
    },
    {
      "a": {
        "identity": 60,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Heimdall",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:60"
      },
      "r": {
        "identity": 1155189797094948924,
        "start": 60,
        "end": 61,
        "type": "SAVED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1155189797094948924",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:60",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:61"
      },
      "b": {
        "identity": 61,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Hulk",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:61"
      }
    },
    {
      "a": {
        "identity": 61,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Hulk",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:61"
      },
      "r": {
        "identity": 1152936897769635901,
        "start": 61,
        "end": 60,
        "type": "SAVED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152936897769635901",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:61",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:60"
      },
      "b": {
        "identity": 60,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Heimdall",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:60"
      }
    },
    {
      "a": {
        "identity": 62,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Doctor Strange",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:62"
      },
      "r": {
        "identity": 1152942395327774782,
        "start": 62,
        "end": 9,
        "type": "INFORMED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152942395327774782",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:62",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      },
      "b": {
        "identity": 9,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Bruce Banner",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      }
    },
    {
      "a": {
        "identity": 62,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Doctor Strange",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:62"
      },
      "r": {
        "identity": 1152959987513819198,
        "start": 62,
        "end": 12,
        "type": "DEFEATED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152959987513819198",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:62",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      },
      "b": {
        "identity": 12,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thanos",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:12"
      }
    },
    {
      "a": {
        "identity": 64,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Vision",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      },
      "r": {
        "identity": 1155186498560065600,
        "start": 64,
        "end": 76,
        "type": "KILLED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1155186498560065600",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:76"
      },
      "b": {
        "identity": 76,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Corvus Glaive",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:76"
      }
    },
    {
      "a": {
        "identity": 64,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Vision",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      },
      "r": {
        "identity": 1152946793374285888,
        "start": 64,
        "end": 75,
        "type": "ATTACKED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152946793374285888",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:75"
      },
      "b": {
        "identity": 75,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Proxima Midnight",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:75"
      }
    },
    {
      "a": {
        "identity": 65,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Wanda Maximoff",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:65"
      },
      "r": {
        "identity": 1152934698746380353,
        "start": 65,
        "end": 75,
        "type": "KILLED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152934698746380353",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:65",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:75"
      },
      "b": {
        "identity": 75,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Proxima Midnight",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:75"
      }
    },
    {
      "a": {
        "identity": 65,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Wanda Maximoff",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:65"
      },
      "r": {
        "identity": 1152948992397541441,
        "start": 65,
        "end": 64,
        "type": "DEFENDED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152948992397541441",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:65",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      },
      "b": {
        "identity": 64,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Vision",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      }
    },
    {
      "a": {
        "identity": 65,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Wanda Maximoff",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:65"
      },
      "r": {
        "identity": 6917564212013170786,
        "start": 65,
        "end": 98,
        "type": "DESTROYED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917564212013170786",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:65",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:98"
      },
      "b": {
        "identity": 98,
        "labels": [],
        "properties": {
          "name": "Mind Stone"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:98"
      }
    },
    {
      "a": {
        "identity": 68,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Groot",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:68"
      },
      "r": {
        "identity": 1152953390444052548,
        "start": 68,
        "end": 14,
        "type": "SACRIFICED_FOR",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152953390444052548",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:68",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      },
      "b": {
        "identity": 14,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thor",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      }
    },
    {
      "a": {
        "identity": 68,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Groot",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:68"
      },
      "r": {
        "identity": 1155205190257737796,
        "start": 68,
        "end": 90,
        "type": "SACRIFICED_FOR",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1155205190257737796",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:68",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:90"
      },
      "b": {
        "identity": 90,
        "labels": [
          "Weapon"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Stormbreaker",
          "type": "weapon"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:90"
      }
    },
    {
      "a": {
        "identity": 71,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Nick Fury",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:71"
      },
      "r": {
        "identity": 6917566411036426339,
        "start": 71,
        "end": 99,
        "type": "SENT_DISTRESS_SIGNAL_TO",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917566411036426339",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:71",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:99"
      },
      "b": {
        "identity": 99,
        "labels": [],
        "properties": {
          "name": "Unknown"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:99"
      }
    },
    {
      "a": {
        "identity": 73,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Ebony Maw",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:73"
      },
      "r": {
        "identity": 1152957788490563657,
        "start": 73,
        "end": 3,
        "type": "KILLED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152957788490563657",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:73",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
      },
      "b": {
        "identity": 3,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Tony Stark",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
      }
    },
    {
      "a": {
        "identity": 74,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Cull Obsidian",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:74"
      },
      "r": {
        "identity": 1152957788490563658,
        "start": 74,
        "end": 9,
        "type": "KILLED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152957788490563658",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:74",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      },
      "b": {
        "identity": 9,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Bruce Banner",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:9"
      }
    },
    {
      "a": {
        "identity": 75,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Proxima Midnight",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:75"
      },
      "r": {
        "identity": 1152947892885913675,
        "start": 75,
        "end": 64,
        "type": "ATTACKED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152947892885913675",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:75",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      },
      "b": {
        "identity": 64,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Vision",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      }
    },
    {
      "a": {
        "identity": 75,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Proxima Midnight",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:75"
      },
      "r": {
        "identity": 1152957788490563659,
        "start": 75,
        "end": 65,
        "type": "KILLED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152957788490563659",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:75",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:65"
      },
      "b": {
        "identity": 65,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Wanda Maximoff",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:65"
      }
    },
    {
      "a": {
        "identity": 76,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Corvus Glaive",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:76"
      },
      "r": {
        "identity": 1152957788490563660,
        "start": 76,
        "end": 64,
        "type": "KILLED_BY",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152957788490563660",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:76",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      },
      "b": {
        "identity": 64,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Vision",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:64"
      }
    },
    {
      "a": {
        "identity": 78,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Eitri",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:78"
      },
      "r": {
        "identity": 1152950091909169230,
        "start": 78,
        "end": 34,
        "type": "CRAFTED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152950091909169230",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:78",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:34"
      },
      "b": {
        "identity": 34,
        "labels": [
          "Weapon"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Infinity Gauntlet",
          "type": "weapon"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:34"
      }
    },
    {
      "a": {
        "identity": 78,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Eitri",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:78"
      },
      "r": {
        "identity": 1152951191420797006,
        "start": 78,
        "end": 14,
        "type": "HELPED",
        "properties": {
  
        },
        "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152951191420797006",
        "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:78",
        "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      },
      "b": {
        "identity": 14,
        "labels": [
          "Human"
        ],
        "properties": {
          "confidence": 0.9,
          "name": "Thor",
          "type": "character"
        },
        "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:14"
      }
    }
  ]; // Your graph data
  
  return (
    <div className="p-4">
      <MCUGraph data={graphData} className="w-full" />
      <MainQuery />
    </div>
  );
}