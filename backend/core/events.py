"""

This file contains the classes and methods to manage the dates of the application.
Author: Juan Felipe Guevara Olaya <> Junquito <>

"""
from datetime import date, datetime
from pydantic import BaseModel
from typing import List


class Event(BaseModel):
    """This class represents the behavior of a date"""

    day : date
    type_of_event : str
    name : str
    notif_bool : bool
    email_adresses_list : List
    notif_time : datetime
    