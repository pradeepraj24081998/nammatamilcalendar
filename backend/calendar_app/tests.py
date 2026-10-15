from django.test import TestCase
from django.urls import reverse
from datetime import date
from calendar_app.models import CalendarDay, PanchangamData, AuspiciousTiming, InauspiciousTiming, RasiPalan
from calendar_app.services.normalizer import CalendarDataNormalizer
from calendar_app.services.upstream_client import UpstreamCalendarClient

class CalendarApiTests(TestCase):
    def setUp(self):
        self.day1 = CalendarDay.objects.create(
            date=date(2026, 10, 16),
            weekday=4,
            tamil_month="புரட்டாசி",
            tamil_date=29,
            tamil_year="பராபவ",
            is_muhurtham=False,
            day_auspicious="சஷ்டி விரதம்",
            festival_info="தைப்பொங்கல்",
            festival_addon="கரி நாள்",
            status="S"
        )
        PanchangamData.objects.create(
            day=self.day1,
            nakshatra="கேட்டை",
            tithi="பஞ்சமி",
            yogam="அமிர்த",
            chandrashtamam="ரோகிணி"
        )
        AuspiciousTiming.objects.create(
            day=self.day1,
            nalla_neram_morning="09:15 - 10:15",
            nalla_neram_evening="02:00 - 03:00"
        )
        InauspiciousTiming.objects.create(
            day=self.day1,
            rahu_kalam="10:30 AM - 12:00 PM"
        )
        RasiPalan.objects.create(
            day=self.day1,
            mesham="முயற்சி"
        )

        self.muhurtham_day = CalendarDay.objects.create(
            date=date(2026, 10, 20),
            weekday=1,
            tamil_month="ஐப்பசி",
            tamil_date=3,
            tamil_year="பராபவ",
            is_muhurtham=True,
            festival_info="தீபாவளி பண்டிகை",
            status="S"
        )

    def test_day_endpoint_valid_date(self):
        response = self.client.get('/api/v1/calendar/day/?date=2026-10-16')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['date'], '2026-10-16')
        self.assertEqual(data['tamil_month'], 'புரட்டாசி')
        self.assertEqual(data['panchangam']['chandrashtamam'], 'ரோகிணி')
        self.assertEqual(data['auspicious_timings']['nalla_neram_morning'], '09:15 - 10:15')

    def test_day_endpoint_missing_date(self):
        response = self.client.get('/api/v1/calendar/day/?date=2028-01-01')
        self.assertEqual(response.status_code, 404)

    def test_day_endpoint_invalid_date_format(self):
        response = self.client.get('/api/v1/calendar/day/?date=not-a-date')
        self.assertEqual(response.status_code, 400)

    def test_month_endpoint(self):
        response = self.client.get('/api/v1/calendar/month/?year=2026&month=10')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['count'], 2)

    def test_festivals_endpoint(self):
        response = self.client.get('/api/v1/festivals/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['count'], 2)

    def test_muhurtham_dates_endpoint(self):
        response = self.client.get('/api/v1/muhurtham-dates/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['count'], 1)
        self.assertEqual(data['muhurtham_dates'][0]['date'], '2026-10-20')

    def test_normalizer_service(self):
        payload = {
            "cdate": "2026-11-01",
            "tmonth": "ஐப்பசி",
            "tdate": 15,
            "tyear": "பராபவ",
            "status": "S",
            "muthrtham": "Y",
            "dayfestival": {"info": "மாத சிவராத்திரி", "addOn": ""},
            "panchagam": {"nakshatra": "அசுவினி", "tithi": "சதுர்த்தசி", "chandrastram": "அஸ்தம்"},
            "inauspicioustime": {"rahu": "04:30 PM - 06:00 PM"},
            "nneram": {"m": "07:30 - 08:30"},
            "rasipalan": {"1": "வெற்றி"}
        }
        day = CalendarDataNormalizer.save_payload(payload)
        self.assertTrue(day.is_muhurtham)
        self.assertEqual(day.tamil_month, "ஐப்பசி")
        self.assertEqual(day.panchangam.nakshatra, "அசுவினி")
        self.assertEqual(day.rasipalan.mesham, "வெற்றி")
