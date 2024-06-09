"""
This file contains the methods od the services of the calendar.

Author: Juan Felipe Guevara Olaya <> Junquito <>
"""

from typing import List
from fastapi import APIRouter
from core import Calendar , Event

router_calendar = APIRouter()

@router_calendar.get("/calendario/show_by_type/{type_of_event}", response_model = List[Event])
def show_by_type(type_of_event: str):
    """
    This method is used to show the dates by type.

    Args:
        type (str): type of the dates.
    
    Returns:
        A the list of dates by type.
    """
    return Calendar.show_by_type(type_of_event)