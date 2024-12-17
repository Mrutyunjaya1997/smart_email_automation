import pandas as pd
from sqlalchemy.orm import Session
from models import Emails_Data


def insert_dataframe_into_db(df: pd.DataFrame, db: Session):
    db.query(Emails_Data).delete()
    for _, row in df.iterrows():
        entry = Emails_Data(
            subject = row['subject'],  # Replace with actual column names
            body=row['body'],
            priority = row['Priority'],
            sentiment = row['Sentiment']
        )
        db.add(entry)
    db.commit()
