"""This file  has theentry point implementtion for RESTapi services."""
# pylint: disable=wrong-import-order
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# pylint: disable=E0401
from users_sub import User
from core import Calendar, Event

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los encabezados
)

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

@app.get("/calendar/show_by_type/{type_of_event}", response_model = List[Event])
def show_by_type(type_of_event: str):
    """This service lets show the events by type"""
    return Calendar.show_by_type(type_of_event = type_of_event)

@app.delete("/user/delete_event/{name}")
def delete_event(name: str):
    """This service lets delete an event"""
    Calendar.delete_event(name)
