from rest_framework import serializers
from .models import FeedbackSubmission

class FeedbackSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackSubmission
        fields = ['id', 'name', 'email', 'category', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_message(self, value):
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError("Feedback message must be at least 5 characters long.")
        if len(value) > 2000:
            raise serializers.ValidationError("Feedback message cannot exceed 2000 characters.")
        return value.strip()
