const SUPABASE_URL = process.env.SUPABASE_URL || "https://poqgtsltsziuwvzskgth.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E";

async function run() {
  const url = `${SUPABASE_URL}/rest/v1/properties?city=eq.Columbus&bedrooms=in.(2,3)&monthly_rent=gte.1000&monthly_rent=lte.1400&select=id,address,city,state,zip,monthly_rent,bedrooms,bathrooms,property_type,status`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
run();
