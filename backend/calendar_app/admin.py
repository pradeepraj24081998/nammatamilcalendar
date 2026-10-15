from django.contrib import admin
from .models import CalendarDay, PanchangamData, AuspiciousTiming, InauspiciousTiming, RasiPalan, SourceImportLog

class PanchangamInline(admin.StackedInline):
    model = PanchangamData
    extra = 0

class AuspiciousTimingInline(admin.StackedInline):
    model = AuspiciousTiming
    extra = 0

class InauspiciousTimingInline(admin.StackedInline):
    model = InauspiciousTiming
    extra = 0

class RasiPalanInline(admin.StackedInline):
    model = RasiPalan
    extra = 0

@admin.register(CalendarDay)
class CalendarDayAdmin(admin.ModelAdmin):
    list_display = ('date', 'weekday_name', 'tamil_month', 'tamil_date', 'tamil_year', 'is_muhurtham', 'festival_info')
    list_filter = ('tamil_month', 'is_muhurtham', 'date')
    search_fields = ('date', 'tamil_month', 'tamil_year', 'festival_info', 'day_auspicious')
    inlines = [PanchangamInline, AuspiciousTimingInline, InauspiciousTimingInline, RasiPalanInline]
    date_hierarchy = 'date'

    def weekday_name(self, obj):
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        return days[obj.weekday] if 0 <= obj.weekday <= 6 else ''
    weekday_name.short_description = 'Weekday'

@admin.register(SourceImportLog)
class SourceImportLogAdmin(admin.ModelAdmin):
    list_display = ('batch_id', 'start_date', 'end_date', 'total_dates', 'success_count', 'failed_count', 'created_at')
    list_filter = ('created_at',)
    readonly_fields = ('batch_id', 'created_at')
