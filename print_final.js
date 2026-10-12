const fs = require('fs');
async function run() {
  const SUPABASE_URL = "https://poqgtsltsziuwvzskgth.supabase.co";
  const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E");
  
  const getHeaders = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };
  
  const addresses = [
    "48 S Richardson Ave",
    "1245 Sandlin Ave",
    "3451 Clarkston Ave",
    "151 S Eureka Ave",
    "293 N Burgess Ave",
    "1868 Argyle Dr",
    "1256 E 15th Ave",
    "5950 Brady Dr",
    "4365 Glenmawr Ave",
    "3067 Neil Ave"
  ];
  
  const url = `${SUPABASE_URL}/rest/v1/properties?address=in.(${addresses.map(a => `"${a}"`).join(',')})&select=id,address,city,state,zip,monthly_rent,bedrooms,bathrooms`;
  const res = await fetch(url, { headers: getHeaders });
  let data = await res.json();
  
  // Sort them exactly as they were in the original list
  data.sort((a, b) => addresses.indexOf(a.address) - addresses.indexOf(b.address));
  
  data.forEach((p, index) => {
    const formattedRent = p.monthly_rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log(`${index + 1}. ${p.address}, ${p.city}, ${p.state} ${p.zip} ($${formattedRent}/mo | ${p.bedrooms} Bed / ${p.bathrooms} Bath) — https://progress-residential.pages.dev/property.html?id=${p.id}\n`);
  });
}
run();
