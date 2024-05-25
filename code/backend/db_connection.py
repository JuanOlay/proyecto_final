"""
This file contains the classes and methods to authenticate and manage the conection to a PostgreSQL database.

Author: Juan Felipe Guevara Olaya <> Junquito <>
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class PostgresConnection:
    """
    A class representing a connection to a PostgreSQL database.

    Args:
        gmail (str): The Gmail account used for authentication.
        password (str): The password for the Gmail account.
        host (str): The host address of the PostgreSQL server.
        port (int): The port number of the PostgreSQL server.
        database_name (str): The name of the database to connect to.

    Attributes:
        engine: The SQLAlchemy engine object for connecting to the database.
        session: The SQLAlchemy session object for executing database queries.

    """

    def __init__(
        self, gmail: str, password: str, host: str, port: int, database_name: str
    ):
        self.engine = create_engine(
            f"postgresql://{gmail}:{password}@{host}:{port}/{database_name}"
        )
        self.session = sessionmaker(bind=self.engine)
