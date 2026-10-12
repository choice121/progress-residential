import os
import http.client
import json

conn = http.client.HTTPSConnection('poqgtsltsziuwvzskgth.supabase.co', timeout=30)
headers = {
    'apikey': os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E"),
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZm13ZXRtaHRocHlyeXRyY2ZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE4MzAyNCwiZXhwIjoyMDkwNzU5MDI0fQ.oO9N8LslPcDjQrzZWiUoTkOlDBqUVHBiVhRSGLC-EPE',
    'Accept': 'application/json',
    'Accept-Profile': 'pipeline',
    'Content-Profile': 'pipeline'
}

ids = ["PP-22E7981C", "PP-B9678771", "PP-38CD979B", "PP-43A471D3", "PP-2D86AF71", "PP-28D9AE64", "PP-60665706"]

for pid in ids:
    conn.request('GET', f'/rest/v1/pipeline_properties?id=eq.{pid}&select=*', headers=headers)
    resp = conn.getresponse()
    raw = resp.read().decode()
    items = json.loads(raw)
    if items:
        p = items[0]
        photos = p.get('photos') or []
        raw_photos = (p.get('raw_data') or {}).get('photos') or []
        print(f"\n==========================================")
        print(f"ID: {p.get('id')} | {p.get('address')}, {p.get('city')}, {p.get('state')} {p.get('zip')}")
        print(f"Rent: ${p.get('monthly_rent')} | Beds: {p.get('bedrooms')} | Baths: {p.get('bathrooms')} | Sqft: {p.get('sqft')}")
        print(f"Photos in photos field: {len(photos)}, in raw_data: {len(raw_photos)}")
        print(f"Amenities: {p.get('amenities')}")
        print(f"Description sample: {(p.get('description') or '')[:200]}...")
