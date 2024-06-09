"""Views for the calendar_event app."""
from django.shortcuts import render

# Create your views here.
def login(request):
    """View for the login page."""
    return render(request, "login.html")

def index(request):
    """View for the index page."""
    return render(request, "index.html")

def add_event_form(request):
    """View for adding an event to the calendar."""
    return render(request, "add_event_form.html")

def calendar_events(request):
    """View for the calendar events page."""
    return render(request, "calendar_events.html")
