from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import hashlib
from .serializers import FeedbackSubmissionSerializer

class FeedbackView(APIView):
    """Submit user feedback with privacy-respecting client IP hashing."""
    def post(self, request):
        serializer = FeedbackSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            # Hash IP address to prevent duplicate spam while respecting user privacy
            client_ip = request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR', ''))
            ip_hash = hashlib.sha256(client_ip.encode()).hexdigest() if client_ip else ''
            
            serializer.save(ip_hash=ip_hash)
            return Response(
                {"message": "Feedback submitted successfully! / உங்கள் கருத்து வெற்றிகரமாக பெறப்பட்டது.", "id": serializer.data['id']},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
