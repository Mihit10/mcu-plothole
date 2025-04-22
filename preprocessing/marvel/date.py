import requests
import json
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


def enrich_relation_with_llama(relation):
    """
    Enrich a single relation with an approximate in-universe MCU date using LLaMA (Groq API).
    Tries to return a specific date, or at least a month or year. Falls back to "unknown"

    Input:
    {
      "subject": "Tony Stark",
      "predicate": "married",
      "object": "Pepper Potts"
    }

    Output:
    {
      "subject": "Tony Stark",
      "predicate": "married",
      "object": "Pepper Potts",
      "date": "17-06-2023"
    }
    """

    api_key = get_next_api_key()  # You manage this function
    api_url = "https://api.groq.com/openai/v1/chat/completions"

    query = f"When did {relation['subject']} {relation['predicate']} {relation['object']} in the Marvel Cinematic Universe?"

    prompt = f"""
🎯 TASK:
Give the **in-universe date** when this event happened in the Marvel Cinematic Universe (MCU):

📘 EVENT:
{query}

📜 INSTRUCTIONS:
- Try your best to identify when this happened in the Marvel timeline.
- If the exact date is unavailable, return the most likely month and/or year, e.g. "May 2012", "1999", or "Late 2023".
- Use the format: "DD-MM-YYYY", "MM-YYYY", or just "YYYY", whichever is most appropriate.
- Do NOT hallucinate — base your answer on established MCU events.
- If you truly cannot determine an approximate time, return: `"unknown"`
- Do NOT explain — just respond in this exact format:
{{ "date": "..." }}
"""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": [{"role": "user", "content": prompt.strip()}],
        "temperature": 0.2,
        "max_tokens": 50
    }

    try:
        time.sleep(random.uniform(5, 10))  # Prevent rapid-fire calls
        response = requests.post(api_url, headers=headers, data=json.dumps(data))
        response.raise_for_status()

        content = response.json()['choices'][0]['message']['content']
        date_result = json.loads(content.strip())
        relation['date'] = date_result.get('date', 'unknown')

    except Exception as e:
        print(f"⚠️ Error: {e}")
        relation['date'] = "unknown"

    return relation

eg = {
      "subject": "Tony Stark",
      "predicate": "married",
      "object": "Pepper Potts"
    }

eg = enrich_relation_with_llama(eg)
print(eg['date'])
