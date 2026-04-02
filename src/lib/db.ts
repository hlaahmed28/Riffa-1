import { getSupabase } from './supabase';
import { Product, Order, OrderItem, PromoCode, Review, AppSettings, Customer } from '../types';

export const db = {
  // --- Products ---
  async getProducts() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Product[];
  },

  async updateProduct(product: Product) {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('products')
      .upsert(product)
      .select()
      .single();
    
    if (error) throw error;
    return data as Product;
  },

  async deleteProduct(id: string) {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // --- Orders ---
  async createOrder(order: Omit<Order, 'id'>, items: OrderItem[]) {
    const supabase = getSupabase();
    if (!supabase) return null;
    // 1. Insert Order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();
    
    if (orderError) throw orderError;

    // 2. Insert Order Items
    const itemsWithOrderId = items.map(item => ({
      ...item,
      order_id: orderData.id
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsWithOrderId);
    
    if (itemsError) throw itemsError;

    return orderData;
  },

  async getOrders() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // --- Settings ---
  async getSettings() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (error) throw error;
    return data as AppSettings;
  },

  async updateSettings(settings: AppSettings) {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('settings')
      .update(settings)
      .eq('id', 1)
      .select()
      .single();
    
    if (error) throw error;
    return data as AppSettings;
  },

  // --- Reviews ---
  async getReviews() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Review[];
  },

  async updateReview(review: Review) {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('reviews')
      .upsert(review)
      .select()
      .single();
    
    if (error) throw error;
    return data as Review;
  },

  async deleteReview(id: string) {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // --- Promo Codes ---
  async getPromoCodes() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as PromoCode[];
  },

  async updatePromoCode(promoCode: PromoCode) {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('promo_codes')
      .upsert(promoCode)
      .select()
      .single();
    
    if (error) throw error;
    return data as PromoCode;
  },

  async deletePromoCode(id: string) {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { error } = await supabase
      .from('promo_codes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // --- Customers ---
  async getCustomers() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('total_spent', { ascending: false });
    
    if (error) throw error;
    return data as Customer[];
  },

  async updateCustomer(customer: Customer) {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('customers')
      .upsert(customer)
      .select()
      .single();
    
    if (error) throw error;
    return data as Customer;
  },

  async updateOrderStatus(id: string, status: Order['status']) {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // --- Connection Test ---
  async testConnection() {
    const supabase = getSupabase();
    if (!supabase) {
      return { success: false, message: 'Supabase client not initialized. Check your environment variables.' };
    }
    
    try {
      // Try to fetch a single row from the settings table as a connection test
      const { data, error } = await supabase
        .from('settings')
        .select('id')
        .limit(1);
      
      if (error) {
        return { success: false, message: `Connection failed: ${error.message}` };
      }
      
      return { success: true, message: 'Successfully connected to Supabase!' };
    } catch (error: any) {
      return { success: false, message: `Connection error: ${error.message || 'Unknown error'}` };
    }
  }
};
