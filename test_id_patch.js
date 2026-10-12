async function run() {
  const SUPABASE_URL = "https://poqgtsltsziuwvzskgth.supabase.co";
  const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E");
  
  // Create a test property, then try to change its ID
  const newId = "test-prop-12345678";
  
  const createRes = await fetch(`${SUPABASE_URL}/rest/v1/properties`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      id: newId,
      address: "123 Test St",
      city: "Test",
      state: "OH",
      zip: "43201",
      monthly_rent: 1500
    })
  });
  console.log("Create:", await createRes.text());
  
  const updatedId = "prop-1234abcd";
  const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/properties?id=eq.${newId}`, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: updatedId
    })
  });
  console.log("Patch status:", patchRes.status, await patchRes.text());
  
  // Delete it
  await fetch(`${SUPABASE_URL}/rest/v1/properties?id=eq.${updatedId}`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  
  // Delete original if it failed to update
  await fetch(`${SUPABASE_URL}/rest/v1/properties?id=eq.${newId}`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
}
run();
