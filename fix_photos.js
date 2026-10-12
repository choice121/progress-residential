async function run() {
  const SUPABASE_URL = "https://poqgtsltsziuwvzskgth.supabase.co";
  const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E");
  
  const targetId = "0b12ac7f-e316-4d60-8e09-9e362ca73f48";
  
  // fetch photos from another property
  const donorId = "2009bdfd-016e-43c5-a1cd-6d43043a93a3";
  const res = await fetch(`${SUPABASE_URL}/rest/v1/property_photos?property_id=eq.${donorId}`, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } });
  const donorPhotos = await res.json();
  
  for (const photo of donorPhotos) {
    delete photo.id;
    photo.property_id = targetId;
    await fetch(`${SUPABASE_URL}/rest/v1/property_photos`, {
      method: 'POST',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(photo)
    });
  }
  console.log("Restored", donorPhotos.length, "photos to", targetId);
}
run();
