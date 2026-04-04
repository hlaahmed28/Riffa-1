import { createClient } from '@supabase/supabase-js';

const url = 'https://zvahmhesedbpppkgfswa.supabase.co';
const anonKey = 'sb_publishable_AsuQgudqBeEJpmcPiv3kXg_Dr-A4zvK';

async function checkSupabase() {
  const supabase = createClient(url, anonKey);
  
  // 1. Try to fetch products to see the structure and error
  console.log('Fetching products...');
  const { data: fetchProducts, error: fetchError } = await supabase.from('products').select('*');
  
  if (fetchError) {
    console.error('Fetch Error Details:', JSON.stringify(fetchError, null, 2));
  } else {
    console.log('Products fetched successfully. Count:', fetchProducts?.length);
    if (fetchProducts?.length > 0) {
      console.log('First product structure:', Object.keys(fetchProducts[0]));
    }
  }

  // 2. Try to insert a dummy product to see the insertion error
  console.log('\nTrying to insert a dummy product...');
  const dummyProduct = {
    id: "test-" + Date.now(),
    name: "Test Update Product",
    price: 100,
    compareAtPrice: 150,
    stockQuantity: 10,
    colors: ["Red"],
    sizes: ["OS"],
    season: "All Year",
    image: "https://example.com/img.jpg",
    images: [],
    description: "Test description",
    material: "100% Test",
    care: "Test care",
    origin: "Test origin",
    isBestseller: false,
    status: "Draft",
    category: "Shawls"
  };

  const { data: insertData, error: insertError } = await supabase.from('products').upsert(dummyProduct).select();
  
  if (insertError) {
    console.error('Insert Error Details:', JSON.stringify(insertError, null, 2));
  } else {
    console.log('Insert successful:', insertData);
    // clean up
    await supabase.from('products').delete().eq('id', dummyProduct.id);
    console.log('Cleaned up dummy product');
  }
}

checkSupabase().catch(console.error);
