"""
This module contains the classes and methods to manage the users of the application.

Author: Juan Felipe Guevara Olaya <> Junquito
"""
from pydantic import BaseModel
from core import Calendar

class User(BaseModel):
    gmail : str
    password : str
    grants : dict

    @staticmethod
    def login(gmail: str, password: str, grants : dict):
        """
        This method is used to login into the application.

        Args:
            gmail (str): the gmail of the user
            password (str): the password of the user
        """
        return User(gmail="felipe.guevara.o.1211@gmail.com", password="Password" , grants={"access" : True})

    def can_access_calendar(self, calendar: Calendar , grants = {"access" : True}):
        """
        This method is used to check if the user can access the calendar.

        Args:
            calendar (Calendar): the calendar to check
        """
        return self.grants.get("access")
    #no estoy seguro de la utilidad de esta funcion :p