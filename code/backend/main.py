"""This file  has theentry point implementtion for RESTapi services."""
# pylint: disable=wrong-import-order
from typing import List
# pylint: disable=import-error
from celery_config import send_notification_email
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# pylint: disable=E0401
from users_sub import User
from core import Calendar, Event
# pylint: disable=E0401
from sqlalchemy import MetaData, Table, Column, String
from sqlalchemy.orm import sessionmaker
from db_connection import PostgresConnection

metadata = MetaData()
engine = PostgresConnection(
    db_user ="postgres",
    password ="password",
    host ="localhost",
    port=5432,
    database_name="Calendario_para_proyecto_final"
).engine
Session = sessionmaker(bind=engine)
session = Session()

users = Table(
    "users",
    metadata,
    Column("gmail", String, primary_key=True),
    Column("password", String)
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los encabezados
)

@app.post("/user/register", response_model=User)
def register(user : User):
    """
    This method registers a new user.

    Args:
        user (User): The user to be registered.
    """
    query = users.insert().values(gmail = user.gmail , password = user.password)
    session.execute(query)
    session.commit()
    return User.register(user)

@app.get("/")
async def read_root():
    """This service lets get the root of the API"""

    return {"Hello": "World"}

@app.get("/calendar/by_month/{year}/{month}")
def get_calendar_by_month(year : int ,month: int):
    """This service lets get the calendar by month"""
    flattened_calendar = [
        day if day != 0 else '-' for week in
        Calendar.show_calendar_by_month(year , month) for day in week]
    return flattened_calendar

@app.post("/login", response_model=User)
def login(credentials: dict):
    """
    This method validates if a user is valid or not.

    Args:
        credentials (dict): gmail and password of the user
    """
    return User.login(credentials["gmail"], credentials["password"], credentials["grants"])

@app.get("/view_events")
def view_events():
    """This service lets view all events"""
    return Calendar.events


@app.post("/user/save_event")
def save_event(event: Event):
    """This service lets add a new event"""
    json_event = event.to_json()
    Calendar.add_events(json_event)
    send_notification_email(json_event)
    return {
        "message":
        "Evento guardado y notificación por correo electrónico en cola para ser enviada."
        }

@app.get("/calendar/show_by_type/{type_of_event}", response_model = List[Event])
def show_by_type(type_of_event: str):
    """This service lets show the events by type"""
    return Calendar.show_by_type(type_of_event = type_of_event)

@app.delete("/user/delete_event/{name}")
def delete_event(name: str):
    """This service lets delete an event"""
    Calendar.delete_event(name)

@app.get("/calendar/show_by_name/{name}", response_model = List[Event])
def show_by_name(name: str):
    """This service lets show the events by name"""
    return Calendar.get_event(name)
