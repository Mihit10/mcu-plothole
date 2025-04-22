import os
import json
from makedb import extract_entities_with_llm
from makedb import extract_relations_with_llm
from makedb import extract_relations_with_llm2

# Load the MCU movie data from the JSON file
with open('mcu_movies_data.json', 'r', encoding='utf-8') as file:
    movies_data = json.load(file)

# Create the 'final' folder if it doesn't exist
if not os.path.exists('final'):
    os.makedirs('final')

# Loop through all the movies in the dataset
for movie in movies_data:
    movie_title = movie.get("title")
    print(f"Processing {movie_title}...")

    # Extract entities and relations for each movie
    entities = extract_entities_with_llm(movie['title'], movie['plot'], movie['synopsis'])
    movie['entities'] = entities
    
    movie['relations'] = extract_relations_with_llm2(movie['title'], movie['plot'], movie['synopsis'], movie['entities'])
    
    # Save the movie data as a JSON file in the 'final' folder
    sanitized_title = movie_title.replace(' ', '_').replace(':', '_').replace('/', '_')

    # Save the movie data as a JSON file in the 'final' folder
    movie_filename = f"final/{sanitized_title}.json"
    
    try:
        with open(movie_filename, 'w', encoding='utf-8') as file:
            json.dump(movie, file, indent=2, ensure_ascii=False)
        print(f"✅ Saved {movie_title} to {movie_filename}")
    except Exception as e:
        print(f"Error saving {movie_title}: {e}")

print("All movies processed and saved successfully!")
