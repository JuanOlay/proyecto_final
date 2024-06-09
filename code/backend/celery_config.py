"""
Este archivo contiene la configuración de Celery para la aplicación.
"""
# pylint: disable=wrong-import-order
# pylint: disable=import-error
from celery import Celery , shared_task
from core import make_notification_email
from datetime import datetime
import pytz
import time

# Configura Celery
app = Celery('tasks', broker='redis://localhost:6379/0', backend='redis://localhost:6379/0')

# Define la ruta de importación para las tareas
app.autodiscover_tasks(['app_name'])

@shared_task
def send_notification_email(json_event):
    """
    This method sends a notification email for a given event.
    """
    timezone = pytz.timezone("America/Bogota")
    desired_datetime = datetime.strptime(json_event['notif_time'], '%Y-%m-%dT%H:%M:%S')
    desired_datetime = timezone.localize(desired_datetime)
    now = datetime.now(timezone)
    time_until_send = (desired_datetime - now).total_seconds()
    if time_until_send > 0:
        # pylint: disable=line-too-long
        print(f"Correo programado para enviarse en {time_until_send} segundos ({json_event['notif_time']})."
            )
        time.sleep(time_until_send)
        make_notification_email(json_event)
    else:
        print(f"La fecha y hora deseadas ({json_event['notif_time']}) ya han pasado.")
