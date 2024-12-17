import openai
import os
from dotenv import load_dotenv

def analyze_priority(text, API_KEY):
    openai.api_key = API_KEY
    messages = [
        {"role": "system", "content": "You are an email priority classification assistant."},
        {
            "role": "user",
            "content": (
                "Classify the priority of the following email into one of three categories: High, Medium, or Low. "
                "The classification should be based on the urgency, importance, and actionable nature of the email content:\n\n"
                f"{text}"
            ),
        },
    ]
    
    response = openai.ChatCompletion.create(
        model="gpt-4",  # Use "gpt-4" for higher accuracy or "gpt-3.5-turbo" for faster results
        messages=messages,
        temperature=0  # Makes the model's responses more deterministic
    )
    
    priority = response['choices'][0]['message']['content'].strip()
    return priority

# if __name__ == '__main__':
#     # Example usage
#     email_text = """
#             I am writing to express my concern regarding the delays we’ve been facing on the current project. Despite several reminders, there seems to be little progress, and it’s becoming increasingly difficult to meet our original deadline.
    
#             I understand there may be unforeseen challenges, but it is crucial that we address these issues immediately to avoid further setbacks. I expect a detailed update on your progress and how we can get back on track.
    
#             Regards,
#         """
#     priority = analyze_priority(email_text)
#     print(f"Email Priority: {priority}")
