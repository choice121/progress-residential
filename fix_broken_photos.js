async function run() {
  const SUPABASE_URL = "https://poqgtsltsziuwvzskgth.supabase.co";
  const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E");
  
  const headers = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' };
  
  const badIds = ["prop-0e836f1c", "prop-beb8c409"];
  
  for (const id of badIds) {
    // 1. Delete the broken photos
    const delRes = await fetch(`${SUPABASE_URL}/rest/v1/property_photos?property_id=eq.${id}`, {
      method: 'DELETE',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    console.log(`Deleted broken photos for ${id}: status`, delRes.status);
    
    // 2. Unpublish (archive) the property since it no longer has >= 6 photos
    const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/properties?id=eq.${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ status: 'archived' })
    });
    console.log(`Archived ${id}: status`, patchRes.status);
  }
}
run();
