async function run() {
  const SUPABASE_URL = "https://poqgtsltsziuwvzskgth.supabase.co";
  const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E");
  
  const headers = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' };
  
  // Mark the un-enriched, non-conforming original ID as inactive/archived
  const duplicateId = "14c68ec5-8cb3-4097-837f-238272dae4bd";
  
  const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/properties?id=eq.${duplicateId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status: 'archived' })
  });
  
  console.log("Archive status:", patchRes.status);
}
run();
