# makedb.py
import os
import json
import requests
import re
from dotenv import load_dotenv
import time
import random

load_dotenv()

# Load API keys from .env file
API_KEYS_STR = os.getenv("GROQ_API_KEYS")
assert API_KEYS_STR, "Please set the GROQ_API_KEYS environment variable."
API_KEYS = API_KEYS_STR.split(",")
CURRENT_API_KEY_INDEX = 0

def get_next_api_key():
    """Cycles through available API keys."""
    global CURRENT_API_KEY_INDEX
    api_key = API_KEYS[CURRENT_API_KEY_INDEX]
    CURRENT_API_KEY_INDEX = (CURRENT_API_KEY_INDEX + 1) % len(API_KEYS)
    print(f"Using API Key (Index: {CURRENT_API_KEY_INDEX-1}): {api_key[:5]}******") # Print first 5 characters for debugging
    return api_key


def extract_entities_with_llm(movie_title, plot, synopsis):
    """Extracts entities from plot and synopsis using Groq API."""
    api_key = get_next_api_key() # Get a key
    api_url = "https://api.groq.com/openai/v1/chat/completions"

    prompt = f"""
You are a highly accurate Named Entity Recognition (NER) engine designed to extract structured information from movie plots and synopses — specifically for the Marvel Cinematic Universe (MCU).

🎯 OBJECTIVE:
Carefully analyze the given *plot* and *synopsis* of the Marvel movie titled **"{movie_title}"**, and extract only the **explicitly mentioned entities** that can participate in relationships. This means: extract only real-world entities such as people, aliens, AIs, organizations, locations, weapons, vehicles, or timestamps — **exclude events** or abstract narrative terms.

🚫 DO NOT include events or battles — only extract entities suitable as **nodes in a knowledge graph**.

✅ TASK:
Return a JSON array of entities directly mentioned in the input.

🟨 OUTPUT FORMAT (strict):
[
  {{
    "text": "Captain America",
    "label": "human"
  }},
  {{
    "text": "SHIELD",
    "label": "organization"
  }}
  // ... more entities
]

📌 ALLOWED LABELS:
Use ONLY these labels:
- "character" → superheroes, soldiers, agents, extra-terrestrial beings (e.g., "Tony Stark", "Nick Fury", "Thanos", "Loki", "Thor")
- "ai" → artificial intelligence or robotic entities (e.g., "JARVIS", "Ultron")
- "organization" → teams, agencies, companies (e.g., "SHIELD", "Hydra")
- "location" → places like cities, countries, planets (e.g., "New York", "Asgard")
- "weapon" → named or special weapons (e.g., "Mjolnir", "Infinity Gauntlet")
- "vehicle" → named transportation (e.g., "Quinjet", "Helicarrier")
- "timelines" → times/dates/months/year (e.g., "post-blip", "2012", "November")

📏 STRICT RULES:
- Extract **only** what is mentioned in the plot and synopsis — no prior knowledge or guessing.
- Do NOT include "event" entities or narrative phrases like "Battle of X" or "Snap".
- Do NOT fabricate or complete partial names — copy from text.
- No duplicates.
- If no entities are present, return an empty array: `[]`.

⬇️ INPUT TO PROCESS:
===== MOVIE TITLE =====
{movie_title}

===== PLOT =====
{plot}

===== SYNOPSIS =====
{synopsis}

Return only the JSON array of relationships — no explanation, no extra commentary.
"""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.0, # set temperature to 0 for more consistent results
        # "max_tokens": 1024
    }

    try:
        
        time.sleep(random.uniform(5, 10)) 
        response = requests.post(api_url, headers=headers, data=json.dumps(data))
        response.raise_for_status()
        json_output = response.json()
        raw_text_response = json_output["choices"][0]["message"]["content"]
        print(f"Raw entite : {raw_text_response}")

        # Extract JSON from the text response
          # Extract JSON from the text response
        json_string = re.search(r'\[.*\]', raw_text_response, re.DOTALL)

        if json_string:
            json_string = json_string.group(0)
            # Try to remove ```json and ``` if present
            json_string = json_string.replace("```json", "").replace("```", "")

            try:
                entities = json.loads(json_string)
                valid_entities = []
                for entity in entities:
                    if isinstance(entity, dict) and "text" in entity and "label" in entity:
                        valid_entities.append(entity)
                    else:
                        print(f"Warning: Invalid entity format found: {entity}")
                print(f"Successfully extracted entities for {movie_title}")
                return valid_entities
            except json.JSONDecodeError as e:
                print(f"JSON Decode Error: {e}, Raw Response: {raw_text_response}")
                return []
        else:
            print("No JSON string found in the response.")
            return []

    except requests.exceptions.RequestException as e:
        print(f"Groq API Request failed: {e}")
        return []
    except KeyError as e:
        print(f"KeyError when parsing Groq API response: {e}, Full response: {response.text}")
        return []

def extract_relations_with_llm(movie_title, plot, synopsis, entities):
    """Extracts relations from plot and synopsis using Groq API."""
    api_key = get_next_api_key() # get next key
    api_url = "https://api.groq.com/openai/v1/chat/completions"

    prompt = f"""
You are a precise and strict dependency and relationship extraction engine designed to identify factual and explicitly stated relationships from Marvel Cinematic Universe (MCU) movie plots and synopses.

🎯 OBJECTIVE:
Extract all possible **explicit** relationships that are clearly stated in the given *plot* and *synopsis* of the Marvel movie titled **"{movie_title}"** — but only where BOTH the subject and object are present in the list of extracted entities. Both subject and object HAVE to be present in the entities.

Your output will be used to form edges in a knowledge graph. Therefore, no hallucination, no story completion, and no guesswork is allowed.

🟨 OUTPUT FORMAT (strict):
Return the relationships as a JSON array like this:
[
  {{
    "subject": "Tony Stark",
    "predicate": "founded",
    "object": "Stark Industries"
  }},
  {{
    "subject": "Thor",
    "predicate": "wields",
    "object": "Mjolnir"
  }}
]

🟥 HARD RULES:
- Use ONLY entities from the list provided below.
- Do NOT introduce any subjects or objects that are not present in that list.
- The relationship must be clearly and explicitly mentioned — do NOT infer or imagine.
- Even the **slightest** stated relation should be included.
- If no relationships exist between any two given entities, return an empty array `[]`.
- Avoid duplicates.
- Use verbs or logical phrases as the `predicate` that capture the relationship from the text.



⬇️ INPUT TO PROCESS:
===== MOVIE TITLE =====
{movie_title}

===== PLOT =====
{plot}

===== SYNOPSIS =====
{synopsis}

===== ENTITIESS =====
{json.dumps(entities, indent=2)}
"The SUBJECT and OUTPUT of the output HAVE to be part of the ENTITIY list

Return only the JSON array of relationships — no explanation, no extra commentary.
"""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama3-8b-8192",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.1,  # Keep temperature low for consistency
        "max_tokens": 1024
    }

    try:
        time.sleep(random.uniform(5, 10))
        response = requests.post(api_url, headers=headers, data=json.dumps(data))
        response.raise_for_status()

        json_output = response.json()
        raw_text_response = json_output["choices"][0]["message"]["content"]
        print(f"Raw response: {raw_text_response}")

        # Extract JSON from the text response
        # json_string = re.search(r'\[.*\]', raw_text_response, re.DOTALL)
        json_string = raw_text_response

        if json_string:
            json_string = json_string.group(0)
            # Try to remove ```json and ``` if present
            # raw_text_response is already a string, so just clean and parse it
            json_string = raw_text_response

            # Clean any markdown formatting if present
            json_string = json_string.replace("```json", "").replace("```", "").strip()

            try:
                relations = json.loads(json_string)
                print(f"Successfully extracted relations for {movie_title}")
                return relations
            except json.JSONDecodeError as e:
                print(f"JSON Decode Error: {e}, Raw Response: {raw_text_response}")
                return []

        else:
            print("No JSON string found in the response.")
            return []

    except requests.exceptions.RequestException as e:
        print(f"Groq API Request failed: {e}")
        return []
    except KeyError as e:
        print(f"KeyError when parsing Groq API response: {e}, Full response: {response.text}")
        return []
    
import json
import requests
import time
import random

def extract_relations_with_llm2(movie_title, plot, synopsis, entities):
    """Extracts relations from plot and synopsis using Groq API."""
    api_key = get_next_api_key()  # Get next key
    api_url = "https://api.groq.com/openai/v1/chat/completions"

    prompt = f"""
You are a precise and strict dependency and relationship extraction engine designed to identify factual and explicitly stated relationships from Marvel Cinematic Universe (MCU) movie plots and synopses.

🎯 OBJECTIVE:
Extract all possible **explicit** relationships that are clearly stated in the given *plot* and *synopsis* of the Marvel movie titled **"{movie_title}"** — but only where BOTH the subject and object are present in the list of extracted entities provided as input. Both subject and object HAVE to be present in the entities.

Your output will be used to form edges in a knowledge graph. Therefore, no hallucination, no story completion, and no guesswork is allowed.

🟨 OUTPUT FORMAT (strict):
Return the relationships as a JSON array like this:
[
  {{
    "subject": "Tony Stark",
    "predicate": "founded",
    "object": "Stark Industries"
  }},
  {{
    "subject": "Thor",
    "predicate": "wields",
    "object": "Mjolnir"
  }}
]

🟥 HARD RULES:
- Use ONLY entities from the list provided below.
- Do NOT introduce any subjects or objects that are not present in that list.
- The relationship must be clearly and explicitly mentioned — do NOT infer or imagine.
- Even the **slightest** stated relation should be included.
- If no relationships exist between any two given entities, return an empty array `[]`.
- Avoid duplicates.
- Use verbs or logical phrases as the `predicate` that capture the relationship from the text.

⬇️ INPUT TO PROCESS:
===== MOVIE TITLE =====
{movie_title}

===== PLOT =====
{plot}

===== SYNOPSIS =====
{synopsis}

===== ENTITIES =====
{json.dumps(entities, indent=2)}

Return only the JSON array of relationships — no explanation, no extra commentary.
"""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.1,
        # "max_tokens": 1024
    }

    try:
        time.sleep(random.uniform(5, 10))
        response = requests.post(api_url, headers=headers, data=json.dumps(data))
        response.raise_for_status()

        json_output = response.json()
        raw_text_response = json_output["choices"][0]["message"]["content"]
        print(f"Raw response: {raw_text_response}")

        # Clean up markdown formatting if included
        # Extract only the JSON part from the LLM response
        match = re.search(r'\[\s*{.*?}\s*\]', raw_text_response, re.DOTALL)

        # Remove any leading explanation and extract JSON array
        json_start = raw_text_response.find("[")
        if json_start != -1:
            cleaned = raw_text_response[json_start:].strip()
            try:
                relations = json.loads(cleaned)
                valid_relations = []
                for rel in relations:
                    if isinstance(rel, dict) and "subject" in rel and "predicate" in rel and "object" in rel:
                        valid_relations.append(rel)
                    else:
                        print(f"Warning: Invalid relation format: {rel}")
                print(f"Successfully extracted relations for {movie_title}")
                return valid_relations
            except json.JSONDecodeError as e:
                print(f"JSON Decode Error: {e}\nExtracted:\n{cleaned}")
                return []
        else:
            print("No JSON array found in the response.")
            return []



    except requests.exceptions.RequestException as e:
        print(f"Groq API Request failed: {e}")
        return []
    except KeyError as e:
        print(f"KeyError when parsing Groq API response: {e}, Full response: {response.text}")
        return []



def process_movie(movie_data):
    """Extracts entities and relations from a single movie's data."""
    time.sleep(random.uniform(5, 10))
    movie_title = movie_data.get('title', 'N/A')

    # Extract entities
    entities = extract_entities_with_llm(movie_title, movie_data.get('plot', ''), movie_data.get('synopsis', ''))
    movie_data['entities'] = entities # Add the extracted entities into movie_data

    # Extract relations
    relations = extract_relations_with_llm(movie_title, movie_data.get('plot', ''), movie_data.get('synopsis', ''), entities)
    movie_data['relations'] = relations # Add the extracted relations into movie_data

    return movie_data

def create_final_dataset(input_file, output_file):
    """Processes all movies and saves the final dataset."""
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            mcu_movies_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: Input file '{input_file}' not found.")
        return
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{input_file}'.")
        return

    final_dataset = []
    total_movies = len(mcu_movies_data)

    for i, movie_data in enumerate(mcu_movies_data):
        print(f"Processing movie {i + 1}/{total_movies}: {movie_data.get('title', 'N/A')}")

        try:
            processed_movie = process_movie(movie_data)
            final_dataset.append(processed_movie)
        except Exception as e:
            print(f"Error processing movie '{movie_data.get('title', 'N/A')}': {e}")

    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(final_dataset, f, indent=2, ensure_ascii=False)
        print(f"Successfully saved final dataset to '{output_file}'.")
    except IOError:
        print(f"Error: Could not write to output file '{output_file}'.")
    except Exception as e:
        print(f"An unexpected error occurred while saving: {e}")


# # Main execution
# if __name__ == "__main__":
#     # input_file = "data/mcu_movies_data.json"
#     # output_file = "data/final2_mcu_dataset.json"

#     # # Create the 'data' directory if it doesn't exist
#     # data_dir = os.path.dirname(input_file)
#     # if not os.path.exists(data_dir):
#     #     os.makedirs(data_dir)

#     # create_final_dataset(input_file, output_file)
#     data = {
#         "title": "Avengers: Endgame",
#         "link": "https://marvelcinematicuniverse.fandom.com/wiki/Avengers:_Endgame",
#         "universe": "Earth-199999",
#         "release_date": "3-May-2019",
#         "synopsis": "Thegrave course of eventsset in motion byThanosthatwiped out half the universeand fractured theAvengersranks compels the remaining Avengers to take one final stand inMarvel Studios' grand conclusion to twenty-two films,Avengers: Endgame.\nAdvertisement",
#         "plot": "\nIn2018,Clint Barton, who is under house arrest following his actions during theAvengers Civil War, guides his daughterLilain archery at hishomesteadwhile his wifeLauraand histwosonsprepare a picnic. Suddenly, everyone except Clint vanishes into dust.\nTwenty-three days later,Tony StarkandNebulaare adrift in space on theBenatar, their fuel and supplies dwindling. As Stark, still injured from his fight with Thanos and close to starving to death, records a message for his fiancéePepper Pottsin preparation for his demise,Carol Danverslocates the spaceship and brings them back toEarth. Stark reunites with Potts,Steve Rogers,Natasha Romanoff,Bruce BannerandJames Rhodes;Rocketjoins Nebula as they mourn the fall of their fellowGuardians of the Galaxy.\n\nIt has been three weeks sinceThanosdecimated half the universe's population with asnapof his fingers. Stark furiously confronts Rogers accusing him of being the one who broke apart theAvengersand as a result they were unable to stand united during theirconflictwith the Mad Titan. He questions why the Avengers only do their bestafterthe worst has already come to pass before passing out due to exhaustion. With a tip from Nebula about her father's location, along with a Snap-like energy signature from two days prior, the team head into space for theGarden, intending to take theInfinity Stonesback and reverse the destruction.\n\nThey discover Thanos, now horribly scarred, alone and undefended cooking a meal when they launch anambushquickly pinning him down and cutting off the arm wearing theInfinity Gauntletonly to find it emptied of its Stones. Thanos revealed that he had destroyed them using their own powers, which nearly killed him, as he considered his work done and wanted to remove the temptation of using them again. Although suspected of lying by Rhodes, Nebula vouches for her father, as he is never a liar. Surprised with the affirmation, Thanos reconsiders his torturous treatment on his daughter, but he is then immediately beheaded byThor. Although the Mad Titan is dead, they failed to accomplish their mission of resurrecting his victims and have no choice but to accept defeat.\n\nFive years later, the surviving population has yet to cope with their losses. Rogers now runs asupport groupfor people to try and help them come to terms with what happened. Stark and Potts are now married and are living in aremote cabinwith their daughterMorgan. InSan Francisco,Scott Langescapes from theQuantum Realmwhen a rat activates controls left behind bythevan Dynefamilybefore they vanished. Lang wanders through the disheveled city and realizes something terrible has happened. He approaches theWall of the Vanished, a massive memorial containing the names of everyone in the city who was killed in the Snap. He frantically searches it hoping to not findCassie's name, only to find his own (as no-one remaining knew what happened to him). Scott rushes to Cassie's house and finds that she is now a teenager. Father and daughter tearfully reunite.\n\nAt theAvengers Compound, Romanoff now commands the team as they perform various assignments. Rhodes informs her of a recent cartel massacre carried out by Barton, expressing his concern over how far their former comrade had fallen. Lang arrives at the compound and reveals to Romanoff and Rogers that although five years had passed, he spent five hours in the realm. He proposes that they could find a way to exploit the realm's time-bending nature to travel into the past and retrieve the Stones from different times. But since the three have no knowledge with the handling with quantum physics, they seek out Stark.\n\nInitially declining to help them, as he believes it would mean putting  Morgan in danger of being erased from existence, Stark later decides to spring into action after coming across an old photo of him andPeter Parker. He successfully develops aTime-Space GPSbased on an inverted Möbius strip. Stark consults with Potts on his new discovery, who encourages him to do what's right for everyone else. Meanwhile, the other Avengers recruit Banner, who merged his intellect with Hulk's physique, to run time travel tests on Lang using hisvan. The experiment does not turn out as expected, as Lang constantly shifts between different ages. Afterwards, Stark arrives at the facility with the GPS and returns Rogers'shieldto him, signifying their reconciliation, but makes it clear he won't sacrifice his daughter to undo what Thanos did. Rogers agrees.\n\nThe remaining Avengers begin to regroup. As Nebula returns to New York, Banner and Rocket travel toNew Asgardand recruit Thor, who has become an overweight drunkard traumatized with his perceived failure to stop Thanos. Romanoff goes toTokyoand finds Barton, who massacred a group of Yakuza as part of his vengeful crusade against criminals who survived the Snap. Rocket and Stark build a time machine, while Barton volunteers to submit himself for a test run into the past. Grabbing a baseball mitt from his homestead, he successfully carries it back to the present as evidence that their plan works.\n\nThe Avengers plan out theirTime Heist, using points from their past to pinpoint locations for the Infinity Stones: theSpace,Mind, andTime Stonesare found in2012New York, theReality Stonein2013Asgard, and thePowerandSoul StonesonMoragandVormirrespectively in2014. They split into three teams and travel back in time to begin their missions, mindful that they only have a finite amount ofPym ParticlessinceHank Pymalso perished in the Snap.\n\nRogers, Stark, Banner, and Lang arrive in analternate 2012in the midst of theBattle of New York. Banner approaches theNew York Sanctumand finds theAncient One, who refuses to lend the Time Stone to him. However, she relents after learning thatDoctor Strangehad given it away to Thanos in the future, fearing that it was done for a reason. AtStark Tower, Lang and Stark attempt to steal theTesseract, but loses it toLoki, who uses it to teleport away. Rogers obtains theScepterfromSTRIKEpossession by feigningHYDRAaffiliation, but is forced to fight his 2012selfwho confuses him for Loki. After defeating his past self, Rogers rendezvous with Stark and Lang.\n\nWith only enoughPym Particlesfor one more trip each, Stark and Rogers decide to go back further toCamp Lehighto analternate 1970, where they have another shot to grab the Tesseract and more Pym Particles. Lang is left with the Scepter to return to the present day. At theS.H.I.E.L.D.base, Rogers stealthily obtains the Particles fromHank Pym, but runs intoPeggy Carter's office while evading security. He tearfully observes as she works in her office. Meanwhile, Stark encounters his fatherHowardafter obtaining the Tesseract. With the latter's wifeMariaexpecting a baby, Tony (under the guise of \"Howard Potts\") offers parenting advice, saying that the good times he had with his father is what all that mattered. Before they part ways, Tony hugs his alternate father, having finally obtained his closure.\n\nArriving on Asgard in analternate 2013, Thor experiences a panic attack after seeing his motherFrigga, recalling this is the day of her demise. Rocket attempts to encourage him to settle his grief and help him extract the Aether fromJane Foster's body, but Thor runs away, leaving the raccoon to do it himself. Thor unsuccessfully attempts to hide from Frigga and runs into her, who knows that her alternatesonis from the future. Sharing a talk, Frigga lectures her son on the importance of failure, advising him to follow his own path rather than try and live up to what he was supposed to be. Thor attempts to warn his mother about her impending death, but she silences him. As Rocket returns with the Aether in hand, Thor shares one last hug with Frigga before reaching out to retrieveMjølnir, finding that he remains worthy of wielding the hammer.\n\nIn analternate 2014, Barton and Romanoff board theBenatarfor Vormir, while Nebula and Rhodes remain on Morag and wait forPeter Quillto arrive and lead them to theOrb's chamber. They knock Quill out and collect the Stone, but when the two attempt to travel back, Nebula is left behind when her memories are entangled with those of her past self. TheThanosof that time uses the link to see into the future, learning that the same humans who had foiled his 2012 invasion are returning to reverse his ultimate victory. Determined to know more, Thanos captures Nebula as she attempts to warn Barton and Romanoff of his newfound involvement.Past Nebulaconfronts her future self and collects her GPS and Pym Particles, handing it over to her father.\n\nMeanwhile, Barton and Romanoff arrive on Vormir. They meetRed Skull, who informs them that the sacrifice of a loved one must be carried out in order for one to retrieve the stone. Barton laughs at the concept, but Romanoff deduces that it is indeed the truth, as Thanos had murdered his daughterGamorathere in their time. Understanding the severity of the situation, the two struggle to decide who should give their life for the cause; while Barton insists he should do it due to the carnage he left behind in the wake of his grief, Romanoff declares that her life's work has led her to this moment. As they dash to the cliff, they wrestle to keep each other away from sacrificing themselves. Ultimately, Romanoff makes the jump and dies, leaving the Soul Stone with Barton.\n\nThe Avengers return to the present day. Stricken with the loss of one of their own, they realize that her death cannot be undone, and that their efforts to save the universe must not leave her death in vain. They construct anew gauntletand load the six Stones onto it. Thor attempts to volunteer to perform the snap, but Banner steps in due to the Stones' gamma radiation. While severely scarring his arm, he successfullysnapshis fingers and brings the victims of the Snap back to life. Elsewhere, Past Nebula — who traveled to the present in place of her future self — opens a time portal, allowing Thanos to bringSanctuary IIforward from 2014. The Avengers barely have time to celebrate their success when the ship abruptly opens fire on the compound with a barrage of missiles, leveling the facility to a pile of rubble.\n\nAs Thanos sends Past Nebula to retrieve the Stones, her future self reveals to Gamora their improved relationship in the future. Gamora decides to join Nebula to stop her father. Meanwhile, Rhodes, Rocket and Banner are trapped in a flooding area, forcing Lang to come and save them. Barton lands next to the gauntlet in the sewers, which is infested withOutriders. After escaping them, he unknowingly passes the apparatus to Past Nebula, who is then confronted by Gamora and Nebula; the latter kills her past self once she threatens her sister. Stark, Rogers and Thor confront Thanos on the ground, who intends to rebuild the entire universe using the Stones. After Stark and Thor are overpowered and knocked aside in the ensuing fight, Rogers wields Mjølnir against the time-displaced Titan. However, Thanos severely injures him and nearly destroys his shield with hissword.\n\nThanos summons the rest of his army, which include theChitauriand theBlack Order, to lay siege on Earth. Just as Rogers prepares to face them alone, a series of portals appear behind him. TheMasters of the Mystic Artshave arrived with reinforcements fromKamar-Taj,Wakanda,Contraxiaand New Asgard, along with the Avengers' resurrected allies from Wakanda,Titanand San Francisco. Lang, growing to giant size, retrieves Banner, Rhodes and Rocket from the flooded depths. With the scales now balanced, Rogers calls for the Avengers to assemble and leads his allies into thebattlefor the fate of the universe.\n\nBanner tells Barton that they must get the Stones back to their respective times and away from Thanos. With their main time machine destroyed in the initial attack, their only other option is the van; Ant-Man andWaspjump to hotwire the dead vehicle. As Thanos' forces close in on Barton. he passes the gauntlet ontoBlack Panther. As Thanos prepares to charge at T'Challa, he suddenly finds his path blocked by a vengefulWanda Maximoff, seeking revenge for his 2018 self's murder ofVision. As Wanda engages Thanos, T'Challa runs, only to become entrapped byEbony Maw. Seeing T'Challa's predicament,Spider-Manswoops in and snatches the gauntlet.\nMeanwhile, Maximoff's attacks leave Thanos at her mercy, as she effortlessly breaks his sword and lifts him into the air, the whole time ripping chunks of armor from his body. In order to escape her grasp, Thanos orders another missile barrage fromSanctuary II(againstCorvus Glaive's protests) that deals great damage to both sides. One of the missiles takes out a dam, forcingDoctor Strangeout of the fight to prevent the battlefield from flooding.\n\nSuddenly,Sanctuary IIredirects its fire to an object arriving from outer space. It was Carol Danvers, who comes to single-handedly destroy the warship. Retrieving the gauntlet from Parker, she enlists the aid of her fellow female combatants as she dashes to the now-activated van. However, Thanos uses his sword to destroy the vehicle and the quantum portal. With the gauntlet in Thanos' reach, Stark, Rogers, Thor and Danvers make their last stand to keep it out of his hands. However, he manages to shake all of his opposition aside and equip the gauntlet. Strange informs Stark thatthisis the one future that ends in their victory. Determined, Stark dashes at Thanos one last time, but he is knocked aside as the Titan snaps his fingers. Nothing happens, as the Stones have been stolen by Stark and transferred onto his suit. With the very being that has haunted him for the past eleven years now at his mercy, Stark snaps his own fingers.\n\nThanos watches in horror as his own forces crumble to dust in front of him, only to meet that same fate soon after. Stark is mortally wounded from his usage of the Stones, and is greeted by Rhodes, Parker and Potts as he lays dying. Potts assures her husband that they are going to be alright, and allows him to rest. Stark'sArc Reactorthen permanently shuts off, Potts giving him one last kiss. Rogers and Thor mournfully watch at a distance.\n\nThe Mad Titan's final defeat and the return of the Vanished calls for celebrations all around the world, including in Wakanda and San Francisco. At Stark's funeral, he leaves a final holographic message for his family and closest friends, including a heartfelt goodbye for Morgan. Stark's original Arc Reactor is set adrift in the lake outside their cabin, with the Avengers and their allies in attendance, including those who had past grievances with Stark, such as the Pym family, Wanda, andBucky Barnes.\n\nOutside New Asgard, Thor namesValkyrieas Asgard's new ruler while he abdicates to join the Guardians of the Galaxy, following his mother's advice. Meanwhile, Rogers prepares to go back in time to return the Stones and Mjølnir, bidding goodbye to Barnes. As Banner is unable to bring him back when prompted, Barnes alertsSam Wilsonto the presence of an elderly man nearby. It is an aged up Rogers, who had chosen to remain in the past and live out a full life withPeggy Carter. He presents Wilson with a new shield, passing the mantle of Captain America on to him.\nAdvertisement"
#     }
#     print(process_movie(data))