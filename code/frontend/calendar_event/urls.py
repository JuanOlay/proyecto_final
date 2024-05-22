from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('index/', views.index, name='index'),
    path('add_event_form/', views.add_event_form, name='add_event_form'),
    path('calendar_events/', views.calendar_events, name='calendar_events'),
]