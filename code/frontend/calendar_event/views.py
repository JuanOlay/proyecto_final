from django.shortcuts import render

# Create your views here.
def login(request):
    return render(request, "login.html")

def index(request):
    return render(request, "index.html")

def add_event_form(request):
    return render(request, "add_event_form.html")

def calendar_events(request):
    return render(request, "calendar_events.html")
