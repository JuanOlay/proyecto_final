"""
This module contains the classes and methods to manage the users of the application.

Author: Juan Felipe Guevara Olaya <> Junquito
"""
from pydantic import BaseModel

class User(BaseModel):
    """
    A class representing a user of the application.
    """
    __tablename__ = "users"
    gmail: str
    password: str

    @staticmethod
    def login(gmail: str, password: str):
        """
        This method is used to login into the application.

        Args:
            gmail (str): the gmail of the user
            password (str): the password of the user
        """
        # Lógica para el inicio de sesión
        return User(gmail=gmail, password=password)

    @staticmethod
    def register(user: 'User'):
        """
        This method is used to register a new user.

        Args:
            user (User): the user to register
        """
        # Lógica para el registro de usuarios
        return User(gmail=user.gmail, password=user.password)

# pylint: disable=pointless-string-statement
"""
def can_access_calendar(self, calendar: Calendar , grants = {"access" : True}):
        
        This method is used to check if the user can access the calendar.

        Args:
            calendar (Calendar): the calendar to check
        
        return self.grants.get("access")
    #no estoy seguro de la utilidad de esta funcion :p
"""
