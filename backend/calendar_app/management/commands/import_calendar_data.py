import time
from datetime import datetime, timedelta, date
from django.core.management.base import BaseCommand
from calendar_app.services.upstream_client import UpstreamCalendarClient
from calendar_app.services.normalizer import CalendarDataNormalizer
from calendar_app.models import CalendarDay, SourceImportLog

class Command(BaseCommand):
    help = 'Idempotently import Tamil calendar data from upstream API for given date range.'

    def add_arguments(self, parser):
        parser.add_argument('--start-date', type=str, default='2025-01-01', help='Start date in YYYY-MM-DD')
        parser.add_argument('--end-date', type=str, default='2026-12-31', help='End date in YYYY-MM-DD')
        parser.add_argument('--dry-run', action='store_true', help='Validate and fetch without persisting to DB')
        parser.add_argument('--force', action='store_true', help='Force re-import of existing dates')
        parser.add_argument('--delay', type=float, default=0.05, help='Polite delay in seconds between API requests')
        parser.add_argument('--batch-size', type=int, default=50, help='Batch progress reporting interval')

    def handle(self, *args, **options):
        start_date_str = options['start_date']
        end_date_str = options['end_date']
        dry_run = options['dry_run']
        force = options['force']
        delay = options['delay']
        batch_size = options['batch_size']

        try:
            start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
            end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date()
        except ValueError:
            self.stderr.write(self.style.ERROR("Invalid date format. Use YYYY-MM-DD."))
            return

        if start_date > end_date:
            self.stderr.write(self.style.ERROR("start-date must be earlier than or equal to end-date."))
            return

        total_days = (end_date - start_date).days + 1
        self.stdout.write(self.style.SUCCESS(f"Starting import from {start_date} to {end_date} ({total_days} dates total)..."))

        client = UpstreamCalendarClient()
        success_count = 0
        skipped_count = 0
        failed_count = 0
        errors = {}

        curr = start_date
        idx = 0

        while curr <= end_date:
            idx += 1
            curr_str = curr.strftime("%Y-%m-%d")

            # Skip existing unless force is set
            if not force and CalendarDay.objects.filter(date=curr).exists():
                skipped_count += 1
                curr += timedelta(days=1)
                continue

            payload = client.fetch_date(curr)
            if payload:
                if not dry_run:
                    try:
                        CalendarDataNormalizer.save_payload(payload)
                        success_count += 1
                    except Exception as e:
                        failed_count += 1
                        errors[curr_str] = str(e)
                else:
                    success_count += 1
            else:
                failed_count += 1
                errors[curr_str] = "Failed to fetch or invalid upstream payload"

            if idx % batch_size == 0 or curr == end_date:
                self.stdout.write(f"[{idx}/{total_days}] Processed {curr_str} — Success: {success_count}, Skipped: {skipped_count}, Failed: {failed_count}")

            if delay > 0:
                time.sleep(delay)

            curr += timedelta(days=1)

        # Log import outcome
        if not dry_run:
            SourceImportLog.objects.create(
                start_date=start_date,
                end_date=end_date,
                total_dates=total_days,
                success_count=success_count,
                failed_count=failed_count,
                skipped_count=skipped_count,
                errors=errors
            )

        self.stdout.write(self.style.SUCCESS(
            f"\nImport Finished!\n"
            f"Total: {total_days} | Success: {success_count} | Skipped: {skipped_count} | Failed: {failed_count}"
        ))
