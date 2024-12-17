import openai
import os
from dotenv import load_dotenv

def analyze_sentiment(text, API_KEY):
    openai.api_key = API_KEY
    messages = [
        {"role": "system", "content": "You are a sentiment analysis assistant."},
        {"role": "user", "content": f"Classify the sentiment of the following text as Positive, Negative, or Neutral:\n\n{text}"}
    ]
    
    response = openai.ChatCompletion.create(
        model="gpt-4",  # Replace with "gpt-4" if needed
        messages=messages,
        temperature=0  # Makes the model's responses more deterministic
    )
    
    sentiment = response['choices'][0]['message']['content'].strip()
    return sentiment

# if __name__== '_main__':
#     # Example usage
#     text = """
#             I am writing to express my concern regarding the delays we’ve been facing on the current project. Despite several reminders, there seems to be little progress, and it’s becoming increasingly difficult to meet our original deadline.
    
#             I understand there may be unforeseen challenges, but it is crucial that we address these issues immediately to avoid further setbacks. I expect a detailed update on your progress and how we can get back on track.
    
#             Regards,
#         """
#     sentiment = analyze_sentiment(text)
#     print(f"Sentiment: {sentiment}")
