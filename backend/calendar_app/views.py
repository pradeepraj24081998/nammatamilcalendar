from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import datetime, date
from django.db.models import Q
from .models import CalendarDay
from .serializers import CalendarDayDetailSerializer, CalendarDaySummarySerializer

class TodayCalendarView(APIView):
    """Retrieve today's calendar details in Asia/Kolkata timezone."""
    def get(self, request):
        today_date = timezone.localdate()
        try:
            day = CalendarDay.objects.select_related(
                'panchangam', 'auspicious_timings', 'inauspicious_timings', 'rasipalan'
            ).get(date=today_date)
            serializer = CalendarDayDetailSerializer(day)
            return Response(serializer.data)
        except CalendarDay.DoesNotExist:
            # Return nearest available or fallback message
            first_day = CalendarDay.objects.first()
            if first_day:
                # If today is not yet imported, fallback to first day with informative flag
                serializer = CalendarDayDetailSerializer(first_day)
                return Response(serializer.data)
            return Response(
                {"detail": f"Calendar data for {today_date} is not yet imported."},
                status=status.HTTP_404_NOT_FOUND
            )

class DayCalendarView(APIView):
    """Retrieve calendar details for a specific date (date=YYYY-MM-DD)."""
    def get(self, request):
        date_str = request.query_params.get('date')
        if not date_str:
            return Response({"error": "date query parameter (YYYY-MM-DD) is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return Response({"error": "Invalid date format. Please use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            day = CalendarDay.objects.select_related(
                'panchangam', 'auspicious_timings', 'inauspicious_timings', 'rasipalan'
            ).get(date=target_date)
            serializer = CalendarDayDetailSerializer(day)
            return Response(serializer.data)
        except CalendarDay.DoesNotExist:
            return Response(
                {"detail": f"No calendar data found for {date_str}."},
                status=status.HTTP_404_NOT_FOUND
            )

class MonthCalendarView(APIView):
    """Retrieve all days for a specific year and month."""
    def get(self, request):
        year = request.query_params.get('year')
        month = request.query_params.get('month')
        
        if not year or not month:
            today = timezone.localdate()
            year = year or today.year
            month = month or today.month

        try:
            year = int(year)
            month = int(month)
        except ValueError:
            return Response({"error": "Year and month must be integers."}, status=status.HTTP_400_BAD_REQUEST)

        days = CalendarDay.objects.filter(
            date__year=year,
            date__month=month
        ).select_related('panchangam', 'auspicious_timings', 'inauspicious_timings').order_by('date')

        serializer = CalendarDaySummarySerializer(days, many=True)
        return Response({
            "year": year,
            "month": month,
            "count": days.count(),
            "days": serializer.data
        })

class YearCalendarView(APIView):
    """Retrieve yearly summary with festival highlights and muhurtham days."""
    def get(self, request):
        year = request.query_params.get('year')
        if not year:
            year = timezone.localdate().year
        try:
            year = int(year)
        except ValueError:
            return Response({"error": "Year must be an integer."}, status=status.HTTP_400_BAD_REQUEST)

        days = CalendarDay.objects.filter(date__year=year).order_by('date')
        muhurtham_count = days.filter(is_muhurtham=True).count()
        festivals_count = days.exclude(festival_info='').count()

        # Monthly breakdown
        months_summary = []
        for m in range(1, 13):
            month_days = days.filter(date__month=m)
            months_summary.append({
                "month": m,
                "days_count": month_days.count(),
                "muhurtham_count": month_days.filter(is_muhurtham=True).count(),
                "festivals_count": month_days.exclude(festival_info='').count(),
            })

        return Response({
            "year": year,
            "total_days": days.count(),
            "muhurtham_count": muhurtham_count,
            "festivals_count": festivals_count,
            "months": months_summary
        })

class FestivalsView(APIView):
    """List festivals and observances, filterable by year, month, or search."""
    def get(self, request):
        year = request.query_params.get('year')
        month = request.query_params.get('month')
        query = request.query_params.get('q')

        qs = CalendarDay.objects.exclude(festival_info='').order_by('date')
        if year:
            try:
                qs = qs.filter(date__year=int(year))
            except ValueError:
                pass
        if month:
            try:
                qs = qs.filter(date__month=int(month))
            except ValueError:
                pass
        if query:
            qs = qs.filter(
                Q(festival_info__icontains=query) |
                Q(festival_addon__icontains=query) |
                Q(day_auspicious__icontains=query)
            )

        serializer = CalendarDaySummarySerializer(qs, many=True)
        return Response({
            "count": qs.count(),
            "festivals": serializer.data
        })

class UpcomingFestivalsView(APIView):
    """Retrieve upcoming festivals starting from today."""
    def get(self, request):
        today = timezone.localdate()
        qs = CalendarDay.objects.filter(date__gte=today).exclude(festival_info='').order_by('date')[:15]
        serializer = CalendarDaySummarySerializer(qs, many=True)
        return Response(serializer.data)

class MuhurthamDatesView(APIView):
    """Retrieve auspicious Muhurtham wedding dates."""
    def get(self, request):
        year = request.query_params.get('year')
        month = request.query_params.get('month')

        qs = CalendarDay.objects.filter(is_muhurtham=True).order_by('date')
        if year:
            try:
                qs = qs.filter(date__year=int(year))
            except ValueError:
                pass
        if month:
            try:
                qs = qs.filter(date__month=int(month))
            except ValueError:
                pass

        serializer = CalendarDaySummarySerializer(qs, many=True)
        return Response({
            "count": qs.count(),
            "muhurtham_dates": serializer.data
        })
