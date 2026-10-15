import requests
import time
import random
import logging
import urllib3
from typing import Optional, Dict, Any
from datetime import date

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

logger = logging.getLogger(__name__)

class UpstreamCalendarClient:
    """Client for fetching and validating daily calendar records from upstream provider."""
    
    DEFAULT_ENDPOINT = "https://omtamilcalendar.com:52300/get_calendar_data"
    
    def __init__(self, endpoint: Optional[str] = None, timeout: int = 10, max_retries: int = 3):
        self.endpoint = endpoint or self.DEFAULT_ENDPOINT
        self.timeout = timeout
        self.max_retries = max_retries
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "NammaTamilCalendar/1.0 (+https://nammatamilcalendar.in)",
            "Accept": "application/json, text/plain, */*",
        })

    def fetch_date(self, target_date: date) -> Optional[Dict[str, Any]]:
        """Fetch daily calendar payload for a given Gregorian date with retries."""
        date_str = target_date.strftime("%Y-%m-%d")
        payload = {"cdate": date_str}

        for attempt in range(1, self.max_retries + 1):
            try:
                # We verify=False because the upstream IP/port has self-signed/domain mismatch cert
                response = self.session.post(
                    self.endpoint,
                    data=payload,
                    timeout=self.timeout,
                    verify=False
                )
                if response.status_code == 200:
                    data = response.json()
                    if self.validate_payload(data, date_str):
                        return data
                    else:
                        logger.warning(f"Validation failed for date {date_str}: {data}")
                        return None
                elif response.status_code in (502, 503, 429):
                    logger.warning(f"Upstream temporary error {response.status_code} for {date_str}, backing off...")
                    time.sleep(1.5 * attempt)
                else:
                    logger.warning(f"Upstream returned HTTP {response.status_code} for {date_str}")
            except Exception as e:
                logger.error(f"Attempt {attempt}/{self.max_retries} failed for {date_str}: {e}")
                if attempt < self.max_retries:
                    backoff = (2 ** attempt) + random.uniform(0.1, 0.8)
                    time.sleep(backoff)
        return None

    @staticmethod
    def validate_payload(data: Any, expected_date: str) -> bool:
        """Validate that upstream payload contains valid calendar structure."""
        if not isinstance(data, dict):
            return False
        if data.get("status") != "S":
            return False
        if data.get("cdate") != expected_date:
            return False
        if not data.get("tmonth"):
            return False
        return True
