const https = require('https');

async function run() {
  const SUPABASE_URL = "https://poqgtsltsziuwvzskgth.supabase.co";
  const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E");
  
  const targetIds = [
    "prop-eff4c43a", // 48 S Richardson
    "prop-4e99b2e9", // 1245 Sandlin
    "prop-340fcd2a", // 3451 Clarkston
    "prop-b4f1959c", // 151 S Eureka
    "prop-0e836f1c", // 293 N Burgess
    "prop-beb8c409", // 1868 Argyle
    "prop-a1c63623"  // 1256 E 15th
  ];
  
  for (const id of targetIds) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/property_photos?property_id=eq.${id}`, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } });
    const photos = await res.json();
    if (photos.length > 0) {
      const url = photos[0].url;
      try {
        const headRes = await fetch(url, { method: 'HEAD' });
        console.log(`${id}: ${photos.length} photos. First photo HEAD status: ${headRes.status}`);
      } catch (e) {
        console.log(`${id}: error fetching URL ${url}`);
      }
    } else {
      console.log(`${id}: NO PHOTOS IN DB`);
    }
  }
}
run();
