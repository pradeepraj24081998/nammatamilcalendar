import urllib.request
import ssl
import re
from datetime import datetime
from django.core.management.base import BaseCommand
from calendar_app.models import CalendarDay, PanchangamData

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

month_map = {
    'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
    'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12,
    'january': 1, 'february': 2, 'march': 3, 'april': 4,
    'june': 6, 'july': 7, 'august': 8, 'september': 9,
    'october': 10, 'november': 11, 'december': 12
}

class Command(BaseCommand):
    help = 'Import verified festival and muhurtham dates for 2026 and 2027 from TamilDailyCalendar.'

    def handle(self, *args, **options):
        self.stdout.write("Fetching 2026 & 2027 festival and muhurtham data from tamildailycalendar.com...")

        for year in [2026, 2027]:
            # 1. Festivals
            festivals = self.parse_festivals(year)
            self.stdout.write(f"Parsed {len(festivals)} festivals for {year}.")
            f_updated = 0
            for d_str, fest_name in festivals:
                target_date = datetime.strptime(d_str, "%Y-%m-%d").date()
                day, created = CalendarDay.objects.get_or_create(
                    date=target_date,
                    defaults={
                        'weekday': target_date.weekday(),
                        'tamil_month': '',
                        'tamil_date': 1,
                        'tamil_year': 'பராபவ' if year == 2026 else 'பிலவ',
                        'festival_info': fest_name,
                        'status': 'S',
                    }
                )
                if not created:
                    # Append or set festival
                    if day.festival_info and fest_name not in day.festival_info:
                        day.festival_info = f"{day.festival_info}, {fest_name}"
                    else:
                        day.festival_info = fest_name
                    day.save(update_fields=['festival_info'])
                f_updated += 1

            # 2. Muhurthams
            muhurthams = self.parse_muhurthams(year)
            self.stdout.write(f"Parsed {len(muhurthams)} muhurtham dates for {year}.")
            m_updated = 0
            for m in muhurthams:
                target_date = datetime.strptime(m['date'], "%Y-%m-%d").date()
                day, created = CalendarDay.objects.get_or_create(
                    date=target_date,
                    defaults={
                        'weekday': target_date.weekday(),
                        'tamil_month': m['tmonth'],
                        'tamil_date': int(m['tdate']) if m['tdate'].isdigit() else 1,
                        'tamil_year': m['tyear'],
                        'is_muhurtham': True,
                        'status': 'S',
                    }
                )
                day.is_muhurtham = True
                if m['tmonth'] and not day.tamil_month:
                    day.tamil_month = m['tmonth']
                if m['tdate'].isdigit() and day.tamil_date == 1:
                    day.tamil_date = int(m['tdate'])
                if m['tyear'] and not day.tamil_year:
                    day.tamil_year = m['tyear']
                day.save()

                if m['pirai']:
                    panch, _ = PanchangamData.objects.get_or_create(day=day)
                    panch.pirai = m['pirai']
                    panch.save(update_fields=['pirai'])

                m_updated += 1

            self.stdout.write(self.style.SUCCESS(f"Finished {year}: {f_updated} festivals, {m_updated} muhurtham dates stored."))

    def parse_festivals(self, year):
        url = f"https://www.tamildailycalendar.com/tamil_festival_dates.php?Year={year}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
            html = r.read().decode('utf-8', errors='replace')
        
        rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL | re.IGNORECASE)
        festivals = []
        pattern = re.compile(r'(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})\s*-\s*[A-Za-z]+\s*(.*)', re.DOTALL)
        
        for r in rows:
            cells = [re.sub(r'<[^>]+>', '', c).strip() for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, re.DOTALL)]
            for text in cells:
                m = pattern.search(text)
                if m:
                    d, mon_str, yr, name = m.groups()
                    mon = month_map.get(mon_str.lower()[:3])
                    name = name.strip()
                    if mon and name and not name.startswith('&'):
                        date_str = f"{yr}-{int(mon):02d}-{int(d):02d}"
                        festivals.append((date_str, name))
        return festivals

    def parse_muhurthams(self, year):
        url = f"https://www.tamildailycalendar.com/tamil_muhurtham_dates.php?Year={year}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
            html = r.read().decode('utf-8', errors='replace')
        
        rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL | re.IGNORECASE)
        muhurthams = []
        
        for r in rows:
            cells = [re.sub(r'<[^>]+>', '', c).strip() for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, re.DOTALL)]
            if len(cells) >= 5:
                d_parts = cells[0].split()
                m_parts = cells[1].split()
                y_parts = cells[2].split()
                pirai_parts = cells[4].split()
                
                if d_parts and m_parts and y_parts:
                    g_day = d_parts[0]
                    t_day = d_parts[1] if len(d_parts) > 1 else '1'
                    g_mon_str = m_parts[0].lower()
                    t_mon = m_parts[1] if len(m_parts) > 1 else ''
                    g_yr = y_parts[0]
                    t_yr = y_parts[1] if len(y_parts) > 1 else ''
                    pirai = pirai_parts[1] if len(pirai_parts) > 1 else pirai_parts[0] if pirai_parts else ''
                    
                    mon = month_map.get(g_mon_str[:3])
                    if mon and g_day.isdigit() and g_yr.isdigit():
                        date_str = f"{g_yr}-{int(mon):02d}-{int(g_day):02d}"
                        muhurthams.append({
                            'date': date_str,
                            'tdate': t_day,
                            'tmonth': t_mon,
                            'tyear': t_yr,
                            'pirai': pirai
                        })
        return muhurthams
