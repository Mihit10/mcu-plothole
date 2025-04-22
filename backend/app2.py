# makedb.py
import os
import json
import requests
import re
from dotenv import load_dotenv
import time
import random
import fitz  # PyMuPDF
import os
from flask import Flask, request, jsonify
from neo4j import GraphDatabase

# Path to your PDF
pdf_path = "song.pdf"

def extract_text_from_pdf(path):
    text = ""
    with fitz.open(path) as doc:
        for page in doc:
            text += page.get_text()
    return text.strip()

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


def extract_entities_with_llm(story_text):
    """Extracts named entities from story text using Groq API with flexible labels."""
    api_key = get_next_api_key()  # Get a key
    api_url = "https://api.groq.com/openai/v1/chat/completions"

    prompt = f"""
You are a high-performance Named Entity Recognition (NER) engine built to extract structured information from fictional stories — especially those inspired by the Marvel Cinematic Universe.

🎯 OBJECTIVE:
Given the following story text, extract all clearly **named entities** that represent real-world objects or concepts — such as characters, locations, organizations, AIs, items, or times. You must **analyze the story and decide the most appropriate label** for each entity based on context.

✅ TASK:
Return a JSON array. Each item should include:
- "text": The exact name or phrase found in the story.
- "label": A short, meaningful category that best describes what the entity is (e.g., "character", "location", "organization", "weapon", "ai", "timeline", etc.).

🟨 EXAMPLES:
[
  {{
    "text": "Tony Stark",
    "label": "character"
  }},
  {{
    "text": "Wakanda",
    "label": "location"
  }},
  {{
    "text": "S.H.I.E.L.D.",
    "label": "organization"
  }}
]

📏 RULES:
- Labels should reflect the **type** of entity based on its role in the story.
- Do NOT include vague or abstract concepts (like "love", "conflict", etc.)
- No duplicates.
- Return `[]` if there are no valid named entities.

⬇️ STORY TEXT:
{story_text}

Return only the JSON array. No extra explanation.
"""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.0,
    }

    try:
        time.sleep(random.uniform(5, 10))
        response = requests.post(api_url, headers=headers, data=json.dumps(data))
        response.raise_for_status()
        json_output = response.json()
        raw_text_response = json_output["choices"][0]["message"]["content"]
        print(f"Raw entity response: {raw_text_response}")

        json_string = re.search(r'\[.*\]', raw_text_response, re.DOTALL)

        if json_string:
            json_string = json_string.group(0)
            json_string = json_string.replace("```json", "").replace("```", "")
            try:
                entities = json.loads(json_string)
                valid_entities = []
                for entity in entities:
                    if isinstance(entity, dict) and "text" in entity and "label" in entity:
                        valid_entities.append(entity)
                    else:
                        print(f"Warning: Invalid entity format found: {entity}")
                print("✅ Successfully extracted entities")
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
        print(f"KeyError parsing Groq API response: {e}, Full response: {response.text}")
        return []
    
def extract_relations_with_llm2(story_text, entities):
    """Extracts relations from story text using Groq API."""
    api_key = get_next_api_key()  # Get next key
    api_url = "https://api.groq.com/openai/v1/chat/completions"

    prompt = f"""
You are a precise and strict relationship extraction engine trained to identify **factual and explicitly stated** relationships between known entities in narrative text.

🎯 OBJECTIVE:
Analyze the provided *story text* and extract all **explicit relationships** that are clearly mentioned — but **only where both the subject and object exist in the provided entity list**.

Your output will be used to construct edges in a knowledge graph. Therefore, any form of guessing, assumption, or inference is strictly prohibited.

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

🟥 RULES:
- Use ONLY entities from the list provided below.
- Do NOT introduce any subjects or objects not present in that list.
- The relationship must be clearly and explicitly mentioned in the story — no inference or world knowledge.
- Even the slightest stated relation should be included.
- If no relationships exist between any two entities, return an empty array `[]`.
- No duplicates.
- Use concise verbs or meaningful phrases as the `predicate` to describe the relationship.

⬇️ INPUT TO PROCESS:
===== STORY TEXT =====
{story_text}

===== ENTITIES =====
{json.dumps(entities, indent=2)}

Return only the JSON array of relationships — no explanation, no commentary.
"""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.1,
    }

    try:
        time.sleep(random.uniform(5, 10))
        response = requests.post(api_url, headers=headers, data=json.dumps(data))
        response.raise_for_status()

        json_output = response.json()
        raw_text_response = json_output["choices"][0]["message"]["content"]
        print(f"Raw response: {raw_text_response}")

        # Extract JSON array
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
                print("✅ Successfully extracted relations.")
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


import fitz  # PyMuPDF
import os

# Create entity node with dynamic labels
def create_entity(tx, name, label):
    # Ensure label is a valid Neo4j label (start with a letter, no spaces, etc.)
    safe_label = "".join(e for e in label.title() if e.isalnum())
    query = f"""
    MERGE (n:{safe_label} {{name: $name}})
    SET n.type = $label_type, n.confidence = $confidence
    """
    tx.run(query, name=name, label_type=label.lower(), confidence=0.9)

# Create relationship (predicate is normalized and uppercased)
def create_relation(tx, subject, predicate, obj):
    safe_predicate = f"`{predicate.upper().replace(' ', '_')}`"
    query = f"""
    MERGE (a {{name: $subject}})
    MERGE (b {{name: $object}})
    MERGE (a)-[r:{safe_predicate}]->(b)
    """
    tx.run(query, subject=subject, object=obj)

# Path to your PDF
pdf_path = "song.pdf"

def extract_text_from_pdf(path):
    text = ""
    with fitz.open(path) as doc:
        for page in doc:
            text += page.get_text()
    return text.strip()

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Neo4j connection setup
neo4j_driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "password"))

def format_node(node, labels):
    return {
        "identity": node.element_id,
        "labels": labels,  # from Cypher query
        "properties": dict(node),
        "elementId": node.element_id
    }

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


# Define the endpoint to upload PDF and process it
@app.route('/process_pdf', methods=['POST'])
def process_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Save the uploaded PDF file
    pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(pdf_path)
    
    # Step 1: Extract text from PDF
    if os.path.exists(pdf_path):
        story_text = extract_text_from_pdf(pdf_path)
        print(f"✅ Extracted text from PDF. Length: {len(story_text)} characters")
        
        # Step 2: Extract entities from the text
        entities = extract_entities_with_llm(story_text)
        print("🔍 Extracted Entities:")
        for ent in entities:
            print(ent)
        
        # Step 3: Extract relations from the text based on the entities
        relations = extract_relations_with_llm2(story_text, entities)

        # Step 4: Store entities and relations into Neo4j
        with neo4j_driver.session(database="sample") as session:
            # Create entity nodes
            for entity in entities:
                session.write_transaction(create_entity, entity["text"], entity["label"])
            
            # Create relationships
            for rel in relations:
                session.write_transaction(create_relation, rel["subject"], rel["predicate"], rel["object"])
        
        # Return a query to the Neo4j graph made by the entities and relations
        records = []

    with neo4j_driver.session(database="sample") as session:
        query = """
        MATCH (a)-[r]-(b)
        RETURN a, labels(a) AS labelsA, r, b, labels(b) AS labelsB

        """
        result = session.run(query)
        # print(result)

        
        for record in result:
            # print(record)
            formatted_record = {
                "a": format_node(record["a"], record["labelsA"]),
                "r": format_relationship(record["r"]),
                "b": format_node(record["b"], record["labelsB"])
            }
            records.append(formatted_record)

    return jsonify(records)
    
    return jsonify({"error": "PDF extraction failed"}), 500

# Run the Flask app
if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True, port=5010)