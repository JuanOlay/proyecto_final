"""
This module contains the classes and methods to manage the users of the application.

Author: Juan Felipe Guevara Olaya <> Junquito
"""
from pydantic import BaseModel
from .core import Calendar, Event

class User(BaseModel):
    gmail : str
    password : str
    calendar : Calendar

    @staticmethod
    def login(gmail: str, password: str):
        """
        This method is used to login into the application.

        Args:
            gmail (str): the gmail of the user
            password (str): the password of the user
        """
