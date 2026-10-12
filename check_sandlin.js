async function run() {
  const SUPABASE_URL = "https://poqgtsltsziuwvzskgth.supabase.co";
  const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E");
  const targetId = "prop-4e99b2e9";
  const res = await fetch(`${SUPABASE_URL}/rest/v1/property_photos?property_id=eq.${targetId}`, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } });
  const data = await res.json();
  if (data.length > 0) {
      console.log(data[0].url);
  }
}
run();
