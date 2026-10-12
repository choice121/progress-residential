const https = require('https');
const token = process.env.sup;

async function execute() {
  console.log('Step 1: Clearing published properties from public.properties and public.property_photos...');
  
  const clearSql = `
    DELETE FROM public.property_photos;
    DELETE FROM public.properties;
  `;
  
  await runSql(clearSql);
  console.log('✓ Cleared public.properties and public.property_photos.');

  console.log('Step 2: Staging properties into pipeline.pipeline_properties...');
  const rawProperties = require('../pipeline_9_properties.json');

  for (const p of rawProperties) {
    const pipeRecord = {
      id: p.id,
      source: p.source || 'zillow',
      source_url: p.source_url || null,
      source_listing_id: p.source_listing_id || null,
      status: 'scraped', // Staged in pipeline, NOT published
      title: p.title,
      address: p.address,
      city: p.city,
      state: p.state,
      zip: p.zip,
      county: p.county || 'Tulsa County',
      lat: p.lat,
      lng: p.lng,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      half_bathrooms: p.half_bathrooms || 0,
      total_bathrooms: p.total_bathrooms || p.bathrooms,
      square_footage: p.square_footage,
      lot_size_sqft: p.lot_size_sqft || null,
      monthly_rent: p.monthly_rent,
      property_type: p.property_type || 'TOWNHOUSE',
      year_built: p.year_built || null,
      description: p.description,
      original_description: p.original_description || p.description,
      showing_instructions: null,
      available_date: null,
      parking: p.parking || 'Off-Street Parking',
      garage_spaces: p.garage_spaces || null,
      pets_allowed: true,
      pet_types_allowed: ['Dogs', 'Cats'],
      smoking_allowed: false,
      lease_terms: null,
      minimum_lease_months: null,
      security_deposit: p.monthly_rent,
      application_fee: 50,
      amenities: p.amenities || '[]',
      appliances: p.appliances || '[]',
      flooring: p.flooring || '[]',
      heating_type: p.heating_type || 'Forced Air',
      cooling_type: p.cooling_type || 'Central Air Conditioning',
      laundry_type: p.laundry_type || 'In-Unit Hookups Available',
      has_basement: p.has_basement ?? false,
      has_central_air: p.has_central_air ?? true,
      original_image_urls: p.original_image_urls,
      local_image_paths: p.local_image_paths || null,
      data_quality_score: p.data_quality_score || 95,
      choice_property_id: null,
      published_at: null,
      scraped_at: p.scraped_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const fields = Object.keys(pipeRecord);
    const values = fields.map(k => {
      const v = pipeRecord[k];
      if (v === null || v === undefined) return 'NULL';
      if (typeof v === 'boolean' || typeof v === 'number') return v;
      if (Array.isArray(v)) return `ARRAY[${v.map(x => "'" + String(x).replace(/'/g, "''") + "'").join(',')}]::text[]`;
      return `'${String(v).replace(/'/g, "''")}'`;
    });

    const updateSet = fields.filter(k => k !== 'id').map(k => {
      const v = pipeRecord[k];
      if (v === null || v === undefined) return `"${k}" = NULL`;
      if (typeof v === 'boolean' || typeof v === 'number') return `"${k}" = ${v}`;
      if (Array.isArray(v)) return `"${k}" = ARRAY[${v.map(x => "'" + String(x).replace(/'/g, "''") + "'").join(',')}]::text[]`;
      return `"${k}" = '${String(v).replace(/'/g, "''")}'`;
    }).join(', ');

    const insertSql = `
      INSERT INTO pipeline.pipeline_properties (${fields.map(f => `"${f}"`).join(', ')})
      VALUES (${values.join(', ')})
      ON CONFLICT (id) DO UPDATE SET ${updateSet};
    `;

    await runSql(insertSql);
    console.log(`✓ Staged into pipeline: ${p.id} (${p.address}, ${p.city}, ${p.state})`);
  }

  console.log('\nStep 3: Verification of database state on poqgtsltsziuwvzskgth...');
  const pubCountRes = await runSql('SELECT count(*) as count FROM public.properties;');
  console.log('Published properties count in public.properties:', pubCountRes);

  const pipeCountRes = await runSql('SELECT count(*) as count, status FROM pipeline.pipeline_properties GROUP BY status;');
  console.log('Pipeline status breakdown in pipeline.pipeline_properties:', pipeCountRes);
}

function runSql(sql) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ query: sql });
    const req = https.request({
      hostname: 'api.supabase.com',
      path: '/v1/projects/poqgtsltsziuwvzskgth/database/query',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(d));
        } catch {
          resolve(d);
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

execute().catch(console.error);
