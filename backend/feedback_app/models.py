from django.db import models
import uuid

class FeedbackSubmission(models.Model):
    """User feedback and inquiries submitted through the website."""
    CATEGORY_CHOICES = [
        ('incorrect_data', 'Incorrect Calendar Information / தவறான தகவல்'),
        ('website_issue', 'Website Issue / இணையதள பிரச்சனை'),
        ('language_issue', 'Language or Translation Issue / மொழிபெயர்ப்பு குறைபாடு'),
        ('feature_suggestion', 'Feature Suggestion / புதிய வசதி பரிந்துரை'),
        ('general', 'General Feedback / பொதுவான கருத்து'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('reviewed', 'Reviewed'),
        ('resolved', 'Resolved'),
        ('spam', 'Spam / Ignored'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=120, blank=True, default='')
    email = models.EmailField(blank=True, default='')
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES, default='general')
    subject = models.CharField(max_length=200, blank=True, default='')
    message = models.TextField()
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default='pending')
    ip_hash = models.CharField(max_length=64, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_category_display()} - {self.email or 'Anonymous'} ({self.created_at.strftime('%Y-%m-%d')})"
