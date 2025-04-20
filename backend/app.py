import requests
import json
from neo4j import GraphDatabase
import time
import random
from dotenv import load_dotenv
import os


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

# Initialize Neo4j connection
uri = "bolt://localhost:7687"  # Replace with your Neo4j URI
username = "neo4j"
password = "password"
database_name = "final"
driver = GraphDatabase.driver(uri, auth=(username, password))

def get_character_from_prompt(prompt):
    """
    Use Groq API to get the prominent character's real name from the provided prompt.
    """
    api_key = get_next_api_key()  # Replace with your API key
    api_url = "https://api.groq.com/openai/v1/chat/completions"

    groq_prompt = f"""
You are a Marvel expert. From the following user query, extract the name of the most relevant and prominent Marvel Cinematic Universe (MCU) character mentioned or implied.

🛑 RULES:
- Return the character's **real full name** (e.g., "Tony Stark", "Steve Rogers", "Thor", "Bucky Barnes").
- If a superhero alias is mentioned (e.g., "Iron Man", "Captain America"), convert it to their real identity.
- Return only one name — the most central or prominent character related to the query.
- Do not include any extra commentary, explanation, or formatting.

🔍 QUERY:
"{prompt}"

✅ RESPONSE FORMAT:
Just return the name like:
Tony Stark
"""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama3-8b-8192",
        "messages": [{"role": "user", "content": groq_prompt}],
        "temperature": 0.1,
        "max_tokens": 50
    }

    try:
        response = requests.post(api_url, headers=headers, data=json.dumps(data))
        response.raise_for_status()
        json_output = response.json()

        # Extract the character's name from the Groq response
        character_name = json_output['choices'][0]['message']['content'].strip()
        return character_name

    except requests.exceptions.RequestException as e:
        print(f"Error during Groq API call: {e}")
        return None



def get_relations_from_neo4j(character_name):
    """
    Query Neo4j database to find all relations for the given character,
    including movie title and release date from the relationship.
    Keeps the character_name as 'subject' for consistency.
    """
    with driver.session(database="final") as session:
        query = """
        MATCH (a)-[r]-(b)
        WHERE a.name = $character_name OR b.name = $character_name
        RETURN 
            a.name AS NodeA, 
            b.name AS NodeB, 
            type(r) AS RelationshipType, 
            r.movie_title AS MovieTitle, 
            r.release_date AS ReleaseDate
        """
        
        result = session.run(query, character_name=character_name)

        relations = []
        for record in result:
            node_a = record["NodeA"]
            node_b = record["NodeB"]
            if node_a == character_name:
                subject = node_a
                obj = node_b
            else:
                subject = node_b
                obj = node_a

            relations.append({
                "subject": subject,
                "predicate": record["RelationshipType"],
                "object": obj,
                "movie_title": record["MovieTitle"],
                "release_date": record["ReleaseDate"]
            })

        return relations



def validate_with_llama(character_name, relations, theory):
    """
    Validate character relations using LLaMA by checking against a user's theory.
    The relations contain movie titles and release dates in '2-May-2008' format.
    LLaMA will sort and analyze them chronologically.
    """
    api_key = get_next_api_key()
    api_url = "https://api.groq.com/openai/v1/chat/completions"

    llama_prompt = f"""
You are an intelligent validator for timeline-based reasoning over a knowledge graph of MCU characters.

You will receive:
- A list of relations connected to the character "{character_name}".
- Each relation includes two nodes and an edge with:
  - `predicate`: the type of relationship
  - `movie_title`: the movie this relation occurred in
  - `release_date`: the movie's release date in format like "2-May-2008"

🎯 YOUR TASK:
1. Sort the relations **chronologically** based on `release_date`.
2. Use the `movie_title` and `release_date` to **walk through the story timeline**.
3. **Check the user’s theory** against this timeline:
   - If it's consistent, explain why.
   - If it's contradictory, highlight where and why.

🟨 OUTPUT FORMAT:
1. 🗂️ Timeline Summary (ordered by release_date)
2. 📌 Theory Analysis with references to movie titles
3. ✅ Final Conclusion (Valid theory / Contradiction found)

===== RELATIONS =====
{json.dumps(relations, indent=2)}

===== USER THEORY =====
{theory}

Strictly use only the provided data. Do not hallucinate events or fill in gaps.
"""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": llama_prompt}],
        "temperature": 0.1,
        "max_tokens": 2048
    }

    try:
        time.sleep(random.uniform(5, 10))
        response = requests.post(api_url, headers=headers, data=json.dumps(data))
        response.raise_for_status()
        json_output = response.json()

        return json_output['choices'][0]['message']['content']

    except requests.exceptions.RequestException as e:
        print(f"Error during LLaMA API call: {e}")
        return None


def process_prompt(prompt, theory):
    """
    Full function to process the prompt, find character, get relations, and validate with Llama.
    """
    # Step 1: Get the character from the prompt using Groq API
    character_name = get_character_from_prompt(prompt)
    if not character_name:
        return "Unable to identify the character from the prompt."
    
    print(f"Character identified: {character_name}")
    
    # Step 2: Get relations for the character from the Neo4j database
    relations = get_relations_from_neo4j(character_name)
    if not relations:
        return f"No relations found for character: {character_name}"
    
    print(f"Relations found: {relations}")
    
    # Step 3: Validate the relations with Llama API against the user's theory
    validation_result = validate_with_llama(character_name, relations, theory)
    return validation_result



# Function to get raw graph data
def get_raw_graph_data(character_name):
    """
    Query Neo4j database to get raw graph data for the given character.
    Returns a dictionary suitable for visualization.
    """
    with driver.session() as session:
        query = """
        MATCH (a)-[r]-(b)
        WHERE a.name = $character_name OR b.name = $character_name
        RETURN DISTINCT a, r, b
        """
        result = session.run(query, character_name=character_name)
        
        nodes = set()
        edges = []

        # Iterate over the result to create nodes and edges
        for record in result:
            node_a = record["a"]
            node_b = record["b"]
            relationship = record["r"]
            
            # Add nodes to the set (set ensures uniqueness)
            nodes.add({
                "id": node_a.id,
                "name": node_a["name"],
                "label": "Character"
            })
            nodes.add({
                "id": node_b.id,
                "name": node_b["name"],
                "label": "Location" if "Realm" in node_b["name"] else "Character"
            })

            # Add the relationship (edge)
            edges.append({
                "from": node_a.id,
                "to": node_b.id,
                "label": relationship.type
            })
        
        # Convert to a list to return as JSON
        return {
            "nodes": list(nodes),
            "edges": edges
        }


from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Optional: Enable CORS if calling from frontend

# ---- Route 1: Get Relations ---- #
@app.route("/relations", methods=["POST"])
def get_relations():
    data = request.json
    prompt = data.get("prompt")
    
    if not prompt:
        return jsonify({"error": "Missing prompt"}), 400

    character_name = get_character_from_prompt(prompt)
    
    if not character_name:
        return jsonify({"error": "Could not extract character name"}), 500
    
    relations = get_relations_from_neo4j(character_name)
    if not relations:
        return jsonify({"message": "No relations found", "character": character_name, "relations": []}), 404

    return jsonify({
        "character": character_name,
        "relations": relations
    })


# ---- Route 2: Full Validation ---- #
@app.route("/validate", methods=["POST"])
def validate_theory():
    data = request.json
    prompt = data.get("prompt")
    theory = data.get("theory")

    if not prompt or not theory:
        return jsonify({"error": "Missing prompt or theory"}), 400

    result = process_prompt(prompt, theory)
    return jsonify({"result": result})

def serialize_node(node):
    return {
        "identity": node.id,
        "labels": list(node.labels),
        "properties": dict(node),
        "elementId": node.element_id
    }

def serialize_relationship(rel):
    return {
        "identity": rel.id,
        "start": rel.start_node.id,
        "end": rel.end_node.id,
        "type": rel.type,
        "properties": dict(rel),
        "elementId": rel.element_id,
        "startNodeElementId": rel.start_node.element_id,
        "endNodeElementId": rel.end_node.element_id
    }

# def format_node(node):
#     return {
#         "identity": node.id,
#         "labels": list(node.labels),
#         "properties": dict(node),
#         "elementId": node.element_id
#     }

def format_relationship(rel):
    return {
        "identity": rel.element_id,
        "start": rel.start_node.id,
        "end": rel.end_node.id,
        "type": rel.type,
        "properties": dict(rel),
        "elementId": rel.element_id,
        "startNodeElementId": rel.start_node.element_id,
        "endNodeElementId": rel.end_node.element_id
    }

def format_node(node, labels):
    return {
        "identity": node.element_id,
        "labels": labels,  # from Cypher query
        "properties": dict(node),
        "elementId": node.element_id
    }

@app.route('/graph', methods=['POST'])
def get_graph():
    data = request.get_json()
    prompt = data.get('prompt', '')
    character_name = get_character_from_prompt(prompt)
    print(character_name)

    records = []

    with driver.session(database="final") as session:
        query = """
        MATCH (a)-[r]-(b)
        WHERE (a.name = $name OR b.name = $name)
          AND a.name IS NOT NULL AND b.name IS NOT NULL
        RETURN a, labels(a) AS labelsA, r, b, labels(b) AS labelsB
        """
        result = session.run(query, name=character_name)
        print(result)

        
        for record in result:
            print(record)
            formatted_record = {
                "a": format_node(record["a"], record["labelsA"]),
                "r": format_relationship(record["r"]),
                "b": format_node(record["b"], record["labelsB"])
            }
            records.append(formatted_record)

    return jsonify(records)

@app.route('/', methods=['GET'])
def fun_hi():
    res = "hi"
    return res

@app.route('/graph', methods=['GET'])
def get_graphall():



    records = []

    with driver.session(database="final") as session:
        query = """
        MATCH (a)-[r]-(b)
        RETURN a, labels(a) AS labelsA, r, b, labels(b) AS labelsB

        """
        result = session.run(query)
        print(result)

        
        for record in result:
            print(record)
            formatted_record = {
                "a": format_node(record["a"], record["labelsA"]),
                "r": format_relationship(record["r"]),
                "b": format_node(record["b"], record["labelsB"])
            }
            records.append(formatted_record)

    return jsonify(records)

if __name__ == "__main__":
    app.run(debug=True, port=5005)

