from datetime import datetime, date
from django.db import transaction
from calendar_app.models import CalendarDay, PanchangamData, AuspiciousTiming, InauspiciousTiming, RasiPalan
from typing import Dict, Any

class CalendarDataNormalizer:
    """Normalizes raw upstream payload into typed Django models."""

    @classmethod
    @transaction.atomic
    def save_payload(cls, payload: Dict[str, Any]) -> CalendarDay:
        date_str = payload.get("cdate")
        target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        weekday = target_date.weekday()

        day_festival = payload.get("dayfestival", {}) or {}
        festival_info = day_festival.get("info", "") or ""
        festival_addon = day_festival.get("addOn", "") or ""

        day_auspicious = payload.get("dayauspicious", "") or ""
        is_muhurtham = payload.get("muthrtham", "N") == "Y"

        # Update or create CalendarDay
        calendar_day, _ = CalendarDay.objects.update_or_create(
            date=target_date,
            defaults={
                "weekday": weekday,
                "tamil_month": payload.get("tmonth", "") or "",
                "tamil_date": int(payload.get("tdate", 1) or 1),
                "tamil_year": payload.get("tyear", "") or "",
                "is_muhurtham": is_muhurtham,
                "day_auspicious": day_auspicious,
                "festival_info": festival_info,
                "festival_addon": festival_addon,
                "status": payload.get("status", "S"),
                "raw_payload": payload,
            }
        )

        # Panchangam
        panch = payload.get("panchagam", {}) or {}
        PanchangamData.objects.update_or_create(
            day=calendar_day,
            defaults={
                "nakshatra": panch.get("nakshatra", "") or "",
                "nakshatra_time": panch.get("nakshatraTime", "") or "",
                "tithi": panch.get("tithi", "") or "",
                "tithi_time": panch.get("tithiTime", "") or "",
                "yogam": panch.get("yogam", "") or "",
                "chandrashtamam": panch.get("chandrastram", "") or "",
                "pirai": payload.get("pirai", "") or "",
            }
        )

        # Auspicious timings
        nneram = payload.get("nneram", {}) or {}
        gneram = payload.get("gneram", {}) or {}
        AuspiciousTiming.objects.update_or_create(
            day=calendar_day,
            defaults={
                "nalla_neram_morning": nneram.get("m", "") or "",
                "nalla_neram_evening": nneram.get("e", "") or "",
                "gowri_morning": gneram.get("m", "") or "",
                "gowri_evening": gneram.get("e", "") or "",
            }
        )

        # Inauspicious timings
        inausp = payload.get("inauspicioustime", {}) or {}
        InauspiciousTiming.objects.update_or_create(
            day=calendar_day,
            defaults={
                "rahu_kalam": inausp.get("rahu", "") or "",
                "yamagandam": inausp.get("yama", "") or "",
                "kuligai": inausp.get("kuligai", "") or "",
            }
        )

        # Rasi Palan
        rasi = payload.get("rasipalan", {}) or {}
        RasiPalan.objects.update_or_create(
            day=calendar_day,
            defaults={
                "mesham": rasi.get("1", "") or "",
                "rishabam": rasi.get("2", "") or "",
                "mithunam": rasi.get("3", "") or "",
                "katakam": rasi.get("4", "") or "",
                "simmam": rasi.get("5", "") or "",
                "kanni": rasi.get("6", "") or "",
                "thulam": rasi.get("7", "") or "",
                "viruchigam": rasi.get("8", "") or "",
                "dhanusu": rasi.get("9", "") or "",
                "makaram": rasi.get("10", "") or "",
                "kumbam": rasi.get("11", "") or "",
                "meenam": rasi.get("12", "") or "",
            }
        )

        return calendar_day
