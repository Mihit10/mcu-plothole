from transformers import AutoTokenizer, AutoModelForTokenClassification
import torch

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("nielsr/coref-bert-large")
model = AutoModelForTokenClassification.from_pretrained("nielsr/coref-bert-large")

# Input sentence
text = "Tony Stark founded Stark Industries. He was also Iron Man."

# Tokenize
inputs = tokenizer(text, return_tensors="pt")

# Get predictions
with torch.no_grad():
    outputs = model(**inputs)

# Get logits and predictions
logits = outputs.logits
predictions = torch.argmax(logits, dim=-1)

# Decode tokens
tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
labels = predictions[0].tolist()

# Print results
print("Token\tPrediction")
for token, label in zip(tokens, labels):
    print(f"{token}\t{label}")
