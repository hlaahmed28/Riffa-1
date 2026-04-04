const url = 'https://zvahmhesedbpppkgfswa.supabase.co/rest/v1/products?limit=1';
const anonKey = 'sb_publishable_AsuQgudqBeEJpmcPiv3kXg_Dr-A4zvK';

async function checkCols() {
  try {
    const res = await fetch(url, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`
      }
    });
    
    if (!res.ok) {
      console.log('Error fetching:', res.status, await res.text());
      return;
    }
    
    const data = await res.json();
    if (data.length > 0) {
      console.log('Columns in products:', Object.keys(data[0]));
    } else {
      console.log('Products table exists but is empty. We need the OpenAPI schema.');
      
      // Fetch openapi spec
      const openapiRes = await fetch('https://zvahmhesedbpppkgfswa.supabase.co/rest/v1/?apikey=' + anonKey);
      const openapi = await openapiRes.json();
      console.log('Products columns from schema:', Object.keys(openapi.definitions.products.properties));
    }
  } catch(e) {
    console.error(e);
  }
}
checkCols();
