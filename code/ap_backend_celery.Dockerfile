# syntax=docker/dockerfile:1.2

# Use an official Python runtime as a parent image
FROM python:3.11-slim-buster

# Set the working directory in the container to /app
WORKDIR /backend

# Copy the requirements.txt file into the container at /app
COPY requirements_backend.txt /backend/
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements_backend.txt

# Copy the current directory contents into the container at /app
COPY ./backend /backend/

# Install Celery
RUN pip install celery

# Run Celery worker
CMD celery -A celery_app worker --loglevel=info
