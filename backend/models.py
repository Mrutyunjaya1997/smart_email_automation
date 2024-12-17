from database import Base
from sqlalchemy import Column, Integer, String

class Emails_Data(Base):
    __tablename__ = 'emails_data'

    id = Column(Integer, primary_key= True, index=True, autoincrement=True)
    subject = Column(String)
    body = Column(String)
    priority = Column(String)
    sentiment = Column(String)

class ReadEmail(Base):
    __tablename__ = "read_emails"

    id = Column(Integer, primary_key=True, index=True)  # ID of the read email