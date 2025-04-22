import json

def load_json_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json_file(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def clean_relations(data):
    # Build a set of entity names from the "text" field
    entity_names = {entity["text"] for entity in data.get("entities", []) if isinstance(entity, dict) and "text" in entity}

    valid_relations = []
    invalid_relations = []

    for relation in data.get("relations", []):
        subject = relation.get("subject")
        obj = relation.get("object")

        if subject in entity_names and obj in entity_names:
            valid_relations.append(relation)
        else:
            invalid_relations.append(relation)

    print("❌ Invalid Relations:")
    for ir in invalid_relations:
        print(json.dumps(ir, indent=2))

    data["relations"] = valid_relations
    print("Valid Relations:")
    for ir in valid_relations:
        print(json.dumps(ir, indent=2))

    return data

# Run the script
filename = "test_ant.json"
data = load_json_file(filename)
cleaned_data = clean_relations(data)
# save_json_file(cleaned_data, filename)
print("\n✅ Cleaned and saved valid relations.")
