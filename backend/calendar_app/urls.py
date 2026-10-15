from django.urls import path
from .views import (
    TodayCalendarView,
    DayCalendarView,
    MonthCalendarView,
    YearCalendarView,
    FestivalsView,
    UpcomingFestivalsView,
    MuhurthamDatesView
)

urlpatterns = [
    path('calendar/today/', TodayCalendarView.as_view(), name='calendar-today'),
    path('calendar/day/', DayCalendarView.as_view(), name='calendar-day'),
    path('calendar/month/', MonthCalendarView.as_view(), name='calendar-month'),
    path('calendar/year/', YearCalendarView.as_view(), name='calendar-year'),
    path('festivals/', FestivalsView.as_view(), name='festivals-list'),
    path('festivals/upcoming/', UpcomingFestivalsView.as_view(), name='festivals-upcoming'),
    path('muhurtham-dates/', MuhurthamDatesView.as_view(), name='muhurtham-dates'),
]
