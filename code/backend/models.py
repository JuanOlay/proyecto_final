"""
This file contains the classes and methods to create a user credentials in the database.

Author: Juan Felipe Guevara Olaya <> Junquito <>
"""

from pydantic import BaseModel

class UserCredentials(BaseModel):
    """
    Represents a user's credentials.

    Attributes:
        gmail (str): The user's Gmail address.
        password (str): The user's password.
    """
    gmail: str
    password: str
