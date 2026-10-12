async function run() {
  const SUPABASE_URL = "https://poqgtsltsziuwvzskgth.supabase.co";
  const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E");
  
  const addrs = ["293 N Burgess Ave", "1868 Argyle Dr"];
  const res = await fetch(`${SUPABASE_URL}/rest/v1/pipeline_properties?address=in.("${addrs.join('","')}")`, { 
      headers: { 
          'apikey': SUPABASE_KEY, 
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Accept-Profile': 'pipeline'
      } 
  });
  
  if (res.status >= 300) { console.log(res.status, await res.text()); return; }
  
  const data = await res.json();
  data.forEach(d => {
     console.log('Address:', d.address, 'ZPID:', d.zpid);
     console.log('Photos:', d.photos ? d.photos.length : 0);
     if (d.photos && d.photos.length > 0) {
         console.log('Sample photo:', d.photos[0]);
     }
  });
}
run();
