import os
import http.client
import json

conn = http.client.HTTPSConnection('poqgtsltsziuwvzskgth.supabase.co', timeout=30)
headers = {
    'apikey': os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E"),
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZm13ZXRtaHRocHlyeXRyY2ZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE4MzAyNCwiZXhwIjoyMDkwNzU5MDI0fQ.oO9N8LslPcDjQrzZWiUoTkOlDBqUVHBiVhRSGLC-EPE',
    'Accept': 'application/json',
}

conn.request('GET', '/rest/v1/properties?id=eq.e1a595fe-4b1f-4fe0-ba61-928053f75646&select=*', headers=headers)
resp = conn.getresponse()
print("Get prop status:", resp.status)
data = json.loads(resp.read().decode())
if data:
    for k, v in data[0].items():
        print(f"  {k}: {repr(v)[:80]}")
