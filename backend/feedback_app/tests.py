from django.test import TestCase
from feedback_app.models import FeedbackSubmission

class FeedbackApiTests(TestCase):
    def test_submit_valid_feedback(self):
        data = {
            "name": "Selvan",
            "email": "selvan@example.com",
            "category": "feature_suggestion",
            "subject": "Add Horai timings",
            "message": "Please consider adding Hora timings to the calendar views."
        }
        response = self.client.post('/api/v1/feedback/', data, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(FeedbackSubmission.objects.count(), 1)
        sub = FeedbackSubmission.objects.first()
        self.assertEqual(sub.name, "Selvan")
        self.assertEqual(sub.status, "pending")

    def test_submit_invalid_feedback_short_message(self):
        data = {
            "message": "hi"
        }
        response = self.client.post('/api/v1/feedback/', data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn("message", response.json())
