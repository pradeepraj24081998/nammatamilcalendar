from rest_framework import serializers
from .models import CalendarDay, PanchangamData, AuspiciousTiming, InauspiciousTiming, RasiPalan

class PanchangamSerializer(serializers.ModelSerializer):
    class Meta:
        model = PanchangamData
        fields = ['nakshatra', 'nakshatra_time', 'tithi', 'tithi_time', 'yogam', 'chandrashtamam', 'pirai']

class AuspiciousTimingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuspiciousTiming
        fields = ['nalla_neram_morning', 'nalla_neram_evening', 'gowri_morning', 'gowri_evening']

class InauspiciousTimingSerializer(serializers.ModelSerializer):
    class Meta:
        model = InauspiciousTiming
        fields = ['rahu_kalam', 'yamagandam', 'kuligai']

class RasiPalanSerializer(serializers.ModelSerializer):
    class Meta:
        model = RasiPalan
        fields = [
            'mesham', 'rishabam', 'mithunam', 'katakam',
            'simmam', 'kanni', 'thulam', 'viruchigam',
            'dhanusu', 'makaram', 'kumbam', 'meenam'
        ]

class CalendarDayDetailSerializer(serializers.ModelSerializer):
    panchangam = PanchangamSerializer(read_only=True)
    auspicious_timings = AuspiciousTimingSerializer(read_only=True)
    inauspicious_timings = InauspiciousTimingSerializer(read_only=True)
    rasipalan = RasiPalanSerializer(read_only=True)

    class Meta:
        model = CalendarDay
        fields = [
            'id', 'date', 'weekday', 'tamil_month', 'tamil_date', 'tamil_year',
            'is_muhurtham', 'day_auspicious', 'festival_info', 'festival_addon',
            'status', 'panchangam', 'auspicious_timings', 'inauspicious_timings',
            'rasipalan'
        ]

class CalendarDaySummarySerializer(serializers.ModelSerializer):
    panchangam = PanchangamSerializer(read_only=True)
    auspicious_timings = AuspiciousTimingSerializer(read_only=True)
    inauspicious_timings = InauspiciousTimingSerializer(read_only=True)

    class Meta:
        model = CalendarDay
        fields = [
            'id', 'date', 'weekday', 'tamil_month', 'tamil_date', 'tamil_year',
            'is_muhurtham', 'day_auspicious', 'festival_info', 'festival_addon',
            'panchangam', 'auspicious_timings', 'inauspicious_timings'
        ]
