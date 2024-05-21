"""This file  has theentry point implementtion for RESTapi services."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from users_sub import User
from core import Calendar, Event
from typing import List
from datetime import date, datetime


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
    return {"Hello": "World"}

@app.get("/calendar/by_month/{year}/{month}")
def get_calendar_by_month(year : int ,month: int):
    """This service lets get the calendar by month"""
    flattened_calendar = [day if day != 0 else '-' for week in Calendar.show_calendar_by_month(year , month) for day in week]
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

@app.put("/user/update_event/{name}")
def update_events(day : date, type_of_event : str,
        notif_bool : bool, email_adresses_list : List, notif_time : datetime
        ): 
    Calendar.update_event(day, type_of_event,
        notif_bool, email_adresses_list, notif_time)

"""
no estoy seguro de esta mierda
@app.get("/calendar/get_type_of_dates", response_model=List[str])
def get_type_of_dates():

osea tipo faltaria una lista de los tipos de eventos en el calendario o seria en eventos ? creo que mas bien seria en eventos sip seria en eventos -pipe habla solo pq sueña con aullarle a la luna
"""
    

@app.get("/calendar/show_by_type/{type_of_event}", response_model = List[Event])
def show_by_type(type_of_event: str):
    return Calendar.show_by_type(type_of_event = type_of_event)

"""
@app.patch("/event/mark_receive_notifications/{event}")
def mark_receive_notifications(event : Event) -> bool:
    #This is a service to decide receive notifications
    event = Event
    return event.mark_receive_notifications(event)
"""
@app.delete("/user/delete_event/{name}")
def delete_event(name: str):
    Calendar.delete_event(name)