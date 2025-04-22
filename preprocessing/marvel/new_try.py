from makedb import extract_entities_with_llm
from makedb import extract_relations_with_llm
from makedb import extract_relations_with_llm2

import json

# Load JSON data from a file
with open('mcu_movies_data.json', 'r', encoding='utf-8') as file:
    movies_data = json.load(file)

endgame_movie = None

for movie in movies_data:
    if movie.get("title") == "Ant-Man & The Wasp":
        endgame_movie = movie
        break

if endgame_movie:
    print("Movie found:")
    print(endgame_movie)
else:
    print("Movie not found.")

entities = extract_entities_with_llm(endgame_movie['title'],endgame_movie['plot'],endgame_movie['synopsis'])

endgame_movie['entities'] = entities


# Save endgame_movie dictionary to a JSON file
with open('endgame_1.json', 'w', encoding='utf-8') as file:
    json.dump(endgame_movie, file, indent=2, ensure_ascii=False)

print("✅ Saved as endgame_1.json")


endgame_movie['relations'] = extract_relations_with_llm2(endgame_movie['title'],endgame_movie['plot'],endgame_movie['synopsis'],endgame_movie['entities'])

if endgame_movie:
    with open('test_ant.json', 'w', encoding='utf-8') as file:
        json.dump(endgame_movie, file, indent=4, ensure_ascii=False)
    print("Movie saved to test_ant.json")
else:
    print("No movie data to save.")