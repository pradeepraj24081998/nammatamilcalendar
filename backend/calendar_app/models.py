from django.db import models
import uuid

class CalendarDay(models.Model):
    """Authoritative daily Tamil and Gregorian calendar record."""
    date = models.DateField(unique=True, db_index=True)
    weekday = models.IntegerField(help_text='0=Monday, 6=Sunday')
    tamil_month = models.CharField(max_length=64, db_index=True)
    tamil_date = models.IntegerField(db_index=True)
    tamil_year = models.CharField(max_length=64)
    is_muhurtham = models.BooleanField(default=False, db_index=True)
    day_auspicious = models.CharField(max_length=255, blank=True, default='')
    festival_info = models.CharField(max_length=255, blank=True, default='')
    festival_addon = models.CharField(max_length=255, blank=True, default='')
    status = models.CharField(max_length=16, default='S')
    raw_payload = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['date']
        indexes = [
            models.Index(fields=['date']),
            models.Index(fields=['tamil_month', 'tamil_date']),
            models.Index(fields=['is_muhurtham', 'date']),
        ]

    def __str__(self):
        return f"{self.date} ({self.tamil_month} {self.tamil_date}, {self.tamil_year})"


class PanchangamData(models.Model):
    """Panchangam parameters for a given calendar day."""
    day = models.OneToOneField(CalendarDay, on_delete=models.CASCADE, related_name='panchangam')
    nakshatra = models.CharField(max_length=255, blank=True, default='')
    nakshatra_time = models.CharField(max_length=128, blank=True, default='')
    tithi = models.CharField(max_length=255, blank=True, default='')
    tithi_time = models.CharField(max_length=128, blank=True, default='')
    yogam = models.CharField(max_length=128, blank=True, default='')
    chandrashtamam = models.CharField(max_length=128, blank=True, default='')
    pirai = models.CharField(max_length=64, blank=True, default='')

    def __str__(self):
        return f"Panchangam for {self.day.date}"


class AuspiciousTiming(models.Model):
    """Auspicious timings including Nalla Neram and Gowri Nalla Neram."""
    day = models.OneToOneField(CalendarDay, on_delete=models.CASCADE, related_name='auspicious_timings')
    nalla_neram_morning = models.CharField(max_length=64, blank=True, default='')
    nalla_neram_evening = models.CharField(max_length=64, blank=True, default='')
    gowri_morning = models.CharField(max_length=64, blank=True, default='')
    gowri_evening = models.CharField(max_length=64, blank=True, default='')

    def __str__(self):
        return f"Auspicious Timings for {self.day.date}"


class InauspiciousTiming(models.Model):
    """Inauspicious timings including Rahu Kalam, Yamagandam, Kuligai."""
    day = models.OneToOneField(CalendarDay, on_delete=models.CASCADE, related_name='inauspicious_timings')
    rahu_kalam = models.CharField(max_length=64, blank=True, default='')
    yamagandam = models.CharField(max_length=64, blank=True, default='')
    kuligai = models.CharField(max_length=64, blank=True, default='')

    def __str__(self):
        return f"Inauspicious Timings for {self.day.date}"


class RasiPalan(models.Model):
    """Daily Rasi Palan forecast for 12 zodiac signs."""
    day = models.OneToOneField(CalendarDay, on_delete=models.CASCADE, related_name='rasipalan')
    mesham = models.CharField(max_length=128, blank=True, default='')
    rishabam = models.CharField(max_length=128, blank=True, default='')
    mithunam = models.CharField(max_length=128, blank=True, default='')
    katakam = models.CharField(max_length=128, blank=True, default='')
    simmam = models.CharField(max_length=128, blank=True, default='')
    kanni = models.CharField(max_length=128, blank=True, default='')
    thulam = models.CharField(max_length=128, blank=True, default='')
    viruchigam = models.CharField(max_length=128, blank=True, default='')
    dhanusu = models.CharField(max_length=128, blank=True, default='')
    makaram = models.CharField(max_length=128, blank=True, default='')
    kumbam = models.CharField(max_length=128, blank=True, default='')
    meenam = models.CharField(max_length=128, blank=True, default='')

    def __str__(self):
        return f"Rasi Palan for {self.day.date}"


class SourceImportLog(models.Model):
    """Audit log tracking calendar data imports and sync jobs."""
    batch_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    start_date = models.DateField()
    end_date = models.DateField()
    total_dates = models.IntegerField(default=0)
    success_count = models.IntegerField(default=0)
    failed_count = models.IntegerField(default=0)
    skipped_count = models.IntegerField(default=0)
    errors = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Batch {self.batch_id} ({self.start_date} to {self.end_date}): {self.success_count}/{self.total_dates}"
