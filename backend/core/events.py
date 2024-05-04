"""

This file contains the classes and methods to manage the dates of the application.
Author: Juan Felipe Guevara Olaya <> Junquito <>

"""
from datetime import date, datetime
from pydantic import BaseModel
from typing import List
from db_connection import PostgresConnection
from sqlalchemy import Column, String, Date, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base

class Event(BaseModel):
    """This class represents the behavior of a date"""

    day : date
    type_of_event : str
    name : str
    notif_bool : bool
    email_adresses_list : List
    notif_time : datetime

    def __init__(self):
        self.connection = PostgresConnection(
            "ud_ap_user", "P4$$w0rd", "localhost", 5432, "ud_ad_project"
        )

    def add_to_db(self):
        session = self.connection.session()
        events_db = EventDB(
            day = self.day,
            type_of_event = self.type_of_event,
            name = self.name,
            notif_bool = self.notif_bool,
            email_adresses_list = self.email_adresses_list,
            notif_time = self.notif_time
        )

        self.session.add(events_db)
        self.session.commit()
        self.session.close()

    class Config:
        orm_mode = True


Base = declarative_base()

class EventDB(Base):
    __tablename__ = "events"

    day = Column(Date, primary_key = True)
    type_of_event = Column(String)
    name = Column(String)
    notif_bool = Column(Boolean)
    email_adresses_list = Column(String)
    notif_time = Column(DateTime)