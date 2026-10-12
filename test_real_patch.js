async function run() {
  const SUPABASE_URL = "https://poqgtsltsziuwvzskgth.supabase.co";
  const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E");
  
  const targetId = "0b12ac7f-e316-4d60-8e09-9e362ca73f48";
  const newId = "prop-a1b2c3d4";
  
  const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/properties?id=eq.${targetId}`, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ id: newId })
  });
  
  console.log("Patch status:", patchRes.status, await patchRes.text());
  
  // revert
  if (patchRes.status < 300) {
    const revertRes = await fetch(`${SUPABASE_URL}/rest/v1/properties?id=eq.${newId}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: targetId })
    });
    console.log("Revert status:", revertRes.status);
  }
}
run();
