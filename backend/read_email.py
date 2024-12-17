import requests
from msal import ConfidentialClientApplication
import pandas as pd
from extract_content import extract_email_content
from dotenv import load_dotenv
import os
from priority_analysis import analyze_priority
from sentiment_analysis import analyze_sentiment

# Load the .env file
load_dotenv()

# Access the environment variables
OPEN_AI_API_KEY = os.getenv('GPT_API_KEY')
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
TENANT_ID = os.getenv('TENANT_ID')
USER_EMAIL = os.getenv('USER_EMAIL')

def get_df_from_outlook():
    subject_list = []
    body_list = []
    sentiment_list = []
    priority_list = []
    message_dict = {}

    # Initialize MSAL app
    app = ConfidentialClientApplication(
        client_id=CLIENT_ID,
        authority=f"https://login.microsoftonline.com/{TENANT_ID}",
        client_credential=CLIENT_SECRET,
    )

    # Acquire token
    token_response = app.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])

    if "access_token" in token_response:
        access_token = token_response["access_token"]
        headers = {"Authorization": f"Bearer {access_token}"}

        user_email = USER_EMAIL  # Replace with the user's email
        messages_url = f"https://graph.microsoft.com/v1.0/users/{user_email}/messages?$top=50"

        all_subjects = []  # List to store all message subjects

        while messages_url:
            messages_response = requests.get(messages_url, headers=headers)

            if messages_response.status_code == 200:
                response_data = messages_response.json()
                messages = response_data.get("value", [])

                # Extract and store subjects
                for message in messages:
                    subject = message.get("subject", "No Subject")
                    subject_list.append(subject)
                    body = message.get("body", "No Body")
                    body_content = extract_email_content(body['content'])
                    body_list.append(body_content)
                    sentiment_list.append(analyze_sentiment(subject,OPEN_AI_API_KEY))
                    priority_list.append(analyze_priority(subject,OPEN_AI_API_KEY))

                # Get the nextLink if present
                messages_url = response_data.get("@odata.nextLink", None)
            else:
                print(f"Failed to fetch messages: {messages_response.json()}")
                break

    else:
        print(f"Error acquiring token: {token_response.get('error_description')}")

    # print(message_list)

    # df = pd.DataFrame([subject_list, body_list], columns=['Subject', 'Body'])
    message_dict['subject'] = subject_list
    message_dict['body'] = body_list
    message_dict['Sentiment'] = sentiment_list
    message_dict['Priority'] = priority_list
    df = pd.DataFrame(message_dict)
    
    return df

# if __name__ == '__main__':
#     df = get_df_from_outlook()
#     print(df)