const url = 'https://zvahmhesedbpppkgfswa.supabase.co/rest/v1/products?select=*&limit=1';
const anonKey = 'sb_publishable_AsuQgudqBeEJpmcPiv3kXg_Dr-A4zvK';

async function fetchProducts() {
  try {
    const res = await fetch(url, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`
      }
    });

    const data = await res.json();
    if (data && data.length > 0) {
      console.log("SUCCESS! EXACT COLUMNS:");
      console.log(Object.keys(data[0]));
    } else {
      console.log("Empty or error:", data);
    }
  } catch (err) {
    console.error("Fetch error", err);
  }
}

fetchProducts();
