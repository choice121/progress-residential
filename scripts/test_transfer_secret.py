import os
import http.client
import json

conn = http.client.HTTPSConnection('poqgtsltsziuwvzskgth.supabase.co', timeout=30)
headers = {
    'apikey': os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E"),
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZm13ZXRtaHRocHlyeXRyY2ZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE4MzAyNCwiZXhwIjoyMDkwNzU5MDI0fQ.oO9N8LslPcDjQrzZWiUoTkOlDBqUVHBiVhRSGLC-EPE',
    'x-import-secret': 'cp_import_7Kx3m9P2w5',
    'Content-Type': 'application/json'
}

body = json.dumps({"pipeline_id": "PP-22E7981C", "property_id": "fddd5956-87b9-4d70-b272-d86a70727929"})
conn.request('POST', '/functions/v1/import-pipeline-photos', body=body, headers=headers)
resp = conn.getresponse()
print("Photo transfer HTTP:", resp.status)
print("Photo transfer body:", resp.read().decode())
