import os
import http.client
import json

conn = http.client.HTTPSConnection('poqgtsltsziuwvzskgth.supabase.co', timeout=30)
headers = {
    'apikey': os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E"),
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZm13ZXRtaHRocHlyeXRyY2ZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE4MzAyNCwiZXhwIjoyMDkwNzU5MDI0fQ.oO9N8LslPcDjQrzZWiUoTkOlDBqUVHBiVhRSGLC-EPE',
    'Accept': 'application/json',
}

dup_id = "fddd5956-87b9-4d70-b272-d86a70727929"
conn.request('DELETE', f'/rest/v1/property_photos?property_id=eq.{dup_id}', headers=headers)
r1 = conn.getresponse()
print("Delete dup photos:", r1.status)
r1.read()

conn.request('DELETE', f'/rest/v1/properties?id=eq.{dup_id}', headers=headers)
r2 = conn.getresponse()
print("Delete dup property:", r2.status)
r2.read()
