from django.contrib import admin
from .models import FeedbackSubmission

@admin.register(FeedbackSubmission)
class FeedbackSubmissionAdmin(admin.ModelAdmin):
    list_display = ('category', 'name', 'email', 'status', 'created_at')
    list_filter = ('status', 'category', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('id', 'ip_hash', 'created_at')
