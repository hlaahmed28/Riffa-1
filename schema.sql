-- Drop existing tables to recreate them with standard column names
DROP TABLE IF EXISTS "public"."order_items";
DROP TABLE IF EXISTS "public"."orders";
DROP TABLE IF EXISTS "public"."products";
DROP TABLE IF EXISTS "public"."settings";
DROP TABLE IF EXISTS "public"."reviews";
DROP TABLE IF EXISTS "public"."promo_codes";
DROP TABLE IF EXISTS "public"."customers";

-- Products Table
CREATE TABLE public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    compare_at_price NUMERIC,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    colors JSONB,
    sizes JSONB,
    season TEXT,
    image TEXT,
    images JSONB,
    description TEXT,
    material TEXT,
    care TEXT,
    origin TEXT,
    is_bestseller BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'Draft',
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Settings Table (Ensure ID is strictly 1 for the singleton)
CREATE TABLE public.settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    store_name TEXT NOT NULL,
    whatsapp_number TEXT,
    shipping_fee_standard NUMERIC DEFAULT 0,
    governorate_shipping_fees JSONB DEFAULT '{}'::jsonb,
    free_shipping_threshold NUMERIC,
    instagram_url TEXT,
    facebook_url TEXT,
    tiktok_url TEXT,
    announcement_bar TEXT,
    about_text TEXT,
    hero_image TEXT,
    category_covers JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Customers Table
CREATE TABLE public.customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    governorate TEXT,
    total_orders INTEGER DEFAULT 0,
    total_spent NUMERIC DEFAULT 0,
    last_order_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Orders Table
CREATE TABLE public.orders (
    id TEXT PRIMARY KEY,
    order_number TEXT NOT NULL,
    customer_id TEXT REFERENCES public.customers(id),
    customer_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    governorate TEXT,
    address TEXT,
    subtotal NUMERIC NOT NULL,
    shipping NUMERIC NOT NULL,
    total NUMERIC NOT NULL,
    payment_method TEXT,
    payment_screenshot TEXT,
    status TEXT DEFAULT 'Pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Order Items Table
CREATE TABLE public.order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES public.products(id),
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    quantity INTEGER NOT NULL,
    selected_color TEXT,
    selected_size TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Reviews Table
CREATE TABLE public.reviews (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    date TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Promo Codes Table
CREATE TABLE public.promo_codes (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    value NUMERIC NOT NULL,
    min_order NUMERIC,
    expiry_date TEXT,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Disable Row Level Security (RLS) so the frontend UI can freely fetch and update!
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes DISABLE ROW LEVEL SECURITY;

-- Insert initial empty settings row so fetching doesnt crash
INSERT INTO public.settings (
    id, store_name, whatsapp_number, shipping_fee_standard, free_shipping_threshold
) VALUES (
    1, 'RIFFA Style', '201000000000', 80, 2000
) ON CONFLICT (id) DO NOTHING;
