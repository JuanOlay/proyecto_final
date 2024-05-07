import unittest
from fastapi.testclient import TestClient
from main import app
from core import Event
import json

client = TestClient(app)

class TestApp(unittest.TestCase):

    def test_login(self):
        credentials = {
            "gmail": "felipe.guevara.o.1211@gmail.com",
            "password": "Password",
            "grants": {"access" : True}
        }
        response = client.post("/login", json=credentials)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"gmail": "felipe.guevara.o.1211@gmail.com", "password": "Password" , "grants": {"access" : True}})

    def test_save_event(self):
        event = Event(
            day = "2022-01-01",
            type_of_event = "Work",
            name = "Meeting",
            notif_bool = True,
            email_adresses_list = ["test1@gmail.com", "test2@gmail.com"],
            notif_time = "2022-01-01T10:00:00"
        )
        json_event = json.dumps(event.to_json())
        response = client.post("/user/save_event", json = json_event)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Event saved successfully"})

    def test_update_event(self):
        name = "Meeting"
        day = "2022-01-01"
        type_of_event = "Work"
        notif_bool = True
        email_adresses_list = ["test1@gmail.com", "test2@gmail.com"]
        notif_time = "2022-01-01T10:00:00"
        response = client.put(f"/user/update_event/{name}", json={
            "day": day,
            "type_of_event": type_of_event,
            "notif_bool": notif_bool,
            "email_adresses_list": email_adresses_list,
            "notif_time": notif_time
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Event updated successfully"})

    def test_show_by_type(self):
        type_of_event = "Work"
        event_test = Event(
            day = "2022-01-01",
            type_of_event = "Work",
            name = "Meeting",
            notif_bool = True,
            email_adresses_list = ["test1@gmail.com", "test2@gmail.com"],
            notif_time = "2022-01-01T10:00:00"
        )
        list_events = []
        list_events.append(event_test)
        response = client.get(f"/calendar/show_by_type/{type_of_event}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [event_test])

if __name__ == "__main__":
    unittest.main()