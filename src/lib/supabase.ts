import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;
let isInitialized = false;

export const getSupabase = () => {
  if (isInitialized) return supabaseInstance;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // Check if credentials are provided and look like valid strings (not placeholders)
  const isValidUrl = supabaseUrl && supabaseUrl.startsWith('http');
  const isValidKey = supabaseAnonKey && supabaseAnonKey.length > 20;

  if (!isValidUrl || !isValidKey) {
    isInitialized = true;
    supabaseInstance = null;
    return null;
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    isInitialized = true;
    return supabaseInstance;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    isInitialized = true;
    supabaseInstance = null;
    return null;
  }
};

// For backward compatibility
export const supabase = getSupabase();
