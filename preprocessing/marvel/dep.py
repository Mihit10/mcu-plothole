from transformers import pipeline

# Load the pipeline
pipe = pipeline("text2text-generation", model="engindemir/t5_dependencyparsing")

# Your input sentence
text = "Tony Stark founded Stark Industries. He was also Iron Man."

# Use the pipeline
output = pipe(text, max_length=512, clean_up_tokenization_spaces=True)[0]['generated_text']

print(output)
