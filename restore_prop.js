const fs = require('fs');
async function run() {
  const SUPABASE_URL = "https://poqgtsltsziuwvzskgth.supabase.co";
  const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E");
  
  const props = JSON.parse(fs.readFileSync('props.json'));
  const p = props.find(x => x.id === "0b12ac7f-e316-4d60-8e09-9e362ca73f48");
  
  // Need to use the enriched description we just generated for it
  p.description = "Finding a two-bedroom residence with 1,250 square feet of living space is a rare architectural treat, resulting in exceptionally large rooms and an uncrowded atmosphere. The expansive living and dining areas easily accommodate oversized furniture arrangements without feeling cramped. Throughout the interior, large windows pull in shifting sunlight, highlighting the updated flooring and clean finishes. The kitchen provides extensive countertop surfaces and abundant cabinetry, catering to those who genuinely enjoy cooking at home. Both bedrooms are scaled generously, featuring deep closets and excellent wall space for various bed configurations. A streamlined full bathroom serves the home efficiently. Progress Residential invites pet owners to apply, with an application fee set at $50.";
  delete p.search_tsv;
  
  const postRes = await fetch(`${SUPABASE_URL}/rest/v1/properties`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(p)
  });
  console.log("Restore status:", postRes.status, await postRes.text());
}
run();
