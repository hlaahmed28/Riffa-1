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
    
    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      compareAtPrice: p.compare_at_price || p.compareatprice || p.compareAtPrice,
      stockQuantity: p.stock_quantity || p.stockquantity || p.stockQuantity,
      colors: p.colors,
      sizes: p.sizes,
      season: p.season,
      image: p.image,
      images: p.images,
      description: p.description,
      material: p.material,
      care: p.care,
      origin: p.origin,
      isBestseller: p.is_bestseller || p.isbestseller || p.isBestseller,
      status: p.status,
      category: p.category
    })) as Product[];
  },

  async updateProduct(product: Product) {
    const supabase = getSupabase();
    if (!supabase) return null;

    const dbProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      compare_at_price: product.compareAtPrice,
      stock_quantity: product.stockQuantity,
      colors: product.colors,
      sizes: product.sizes,
      season: product.season,
      image: product.image,
      images: product.images,
      description: product.description,
      material: product.material,
      care: product.care,
      origin: product.origin,
      is_bestseller: product.isBestseller,
      status: product.status,
      category: product.category
    };

    const { error } = await supabase
      .from('products')
      .upsert(dbProduct);
    
    if (error) {
      console.error('Supabase save error:', error);
      throw new Error(`Failed to save product: ${error.message}`);
    }
    return product;
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

    const orderId = Math.random().toString(36).substr(2, 9);
    const dbOrder = {
      id: orderId,
      order_number: order.orderNumber,
      created_at: order.date || new Date().toISOString(),
      customer_name: order.customerName,
      email: order.email,
      phone: order.phone,
      governorate: order.governorate,
      address: order.address,
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      payment_method: order.paymentMethod,
      payment_screenshot: order.paymentScreenshot,
      status: order.status || 'Pending',
      notes: order.notes
    };

    const dbItems = items.map(item => ({
      id: Math.random().toString(36).substr(2, 9),
      order_id: orderId,
      product_id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      selected_color: item.selectedColor,
      selected_size: item.selectedSize
    }));

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([dbOrder])
      .select()
      .single();
    
    if (orderError) throw orderError;

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(dbItems);
    
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
    
    return data.map((o: any) => ({
      id: o.id,
      orderNumber: o.order_number || o.ordernumber || o.orderNumber,
      date: o.created_at || o.createdat || o.date,
      customerName: o.customer_name || o.customername || o.customerName,
      email: o.email,
      phone: o.phone,
      governorate: o.governorate,
      address: o.address,
      subtotal: o.subtotal,
      shipping: o.shipping,
      total: o.total,
      paymentMethod: o.payment_method || o.paymentmethod || o.paymentMethod,
      paymentScreenshot: o.payment_screenshot || o.paymentscreenshot || o.paymentScreenshot,
      status: o.status,
      notes: o.notes,
      items: (o.order_items || []).map((item: any) => ({
        id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedColor: item.selected_color || item.selectedcolor || item.selectedColor,
        selectedSize: item.selected_size || item.selectedsize || item.selectedSize
      }))
    })) as Order[];
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

  // --- Settings ---
  async getSettings() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return null;
    
    return {
      storeName: data.store_name || data.storename || data.storeName,
      whatsappNumber: data.whatsapp_number || data.whatsappnumber || data.whatsappNumber,
      shippingFeeStandard: data.shipping_fee_standard || data.shippingfeestandard || data.shippingFeeStandard,
      governorateShippingFees: data.governorate_shipping_fees || data.governorateshippingfees || data.governorateShippingFees || {},
      freeShippingThreshold: data.free_shipping_threshold || data.freeshippingthreshold || data.freeShippingThreshold,
      instagramUrl: data.instagram_url || data.instagramurl || data.instagramUrl,
      facebookUrl: data.facebook_url || data.facebookurl || data.facebookUrl,
      tiktokUrl: data.tiktok_url || data.tiktokurl || data.tiktokUrl,
      announcementBar: data.announcement_bar || data.announcementbar || data.announcementBar,
      aboutText: data.about_text || data.abouttext || data.aboutText,
      heroImage: data.hero_image || data.heroimage || data.heroImage,
      categoryCovers: data.category_covers || data.categorycovers || data.categoryCovers || {}
    } as AppSettings;
  },

  async updateSettings(settings: AppSettings) {
    const supabase = getSupabase();
    if (!supabase) return null;

    const dbSettings = {
      id: 1,
      store_name: settings.storeName,
      whatsapp_number: settings.whatsappNumber,
      shipping_fee_standard: settings.shippingFeeStandard,
      governorate_shipping_fees: settings.governorateShippingFees,
      free_shipping_threshold: settings.freeShippingThreshold,
      instagram_url: settings.instagramUrl,
      facebook_url: settings.facebookUrl,
      tiktok_url: settings.tiktokUrl,
      announcement_bar: settings.announcementBar,
      about_text: settings.aboutText,
      hero_image: settings.heroImage,
      category_covers: settings.categoryCovers
    };

    const { error } = await supabase
      .from('settings')
      .upsert(dbSettings);
    
    if (error) throw error;
    return settings;
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
    
    return data.map((r: any) => ({
      id: r.id,
      customerName: r.customer_name || r.customername || r.customerName,
      rating: r.rating,
      comment: r.comment,
      date: r.date,
      isFeatured: r.is_featured || r.isfeatured || r.isFeatured
    })) as Review[];
  },

  async updateReview(review: Review) {
    const supabase = getSupabase();
    if (!supabase) return null;

    const dbReview = {
      id: review.id,
      customer_name: review.customerName,
      rating: review.rating,
      comment: review.comment,
      date: review.date,
      is_featured: review.isFeatured
    };

    const { error } = await supabase
      .from('reviews')
      .upsert(dbReview);
    
    if (error) throw error;
    return review;
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
    
    return data.map((c: any) => ({
      id: c.id,
      code: c.code,
      type: c.type || c.discount_type || c.discounttype,
      value: c.value || c.discount_value || c.discountvalue,
      minOrder: c.min_order || c.minorder || c.minOrder,
      expiryDate: c.expiry_date || c.expirydate || c.expiryDate,
      usageLimit: c.usage_limit || c.usagelimit || c.usageLimit,
      usageCount: c.usage_count || c.usagecount || c.usageCount,
      isActive: c.is_active || c.isactive || c.isActive
    })) as PromoCode[];
  },

  async updatePromoCode(promo: PromoCode) {
    const supabase = getSupabase();
    if (!supabase) return null;

    const dbPromo = {
      id: promo.id,
      code: promo.code,
      type: promo.type,
      value: promo.value,
      min_order: promo.minOrder,
      expiry_date: promo.expiryDate,
      usage_limit: promo.usageLimit,
      usage_count: promo.usageCount,
      is_active: promo.isActive
    };

    const { error } = await supabase
      .from('promo_codes')
      .upsert(dbPromo);
    
    if (error) throw error;
    return promo;
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
    
    return data.map((c: any) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      governorate: c.governorate,
      totalOrders: c.total_orders || c.totalorders || c.totalOrders || 0,
      totalSpent: c.total_spent || c.totalspent || c.totalSpent || 0,
      lastOrderDate: c.last_order_date || c.lastorderdate || c.lastOrderDate
    })) as Customer[];
  },

  async updateCustomer(customer: Customer) {
    const supabase = getSupabase();
    if (!supabase) return null;

    const dbCustomer = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      governorate: customer.governorate,
      total_orders: customer.totalOrders,
      total_spent: customer.totalSpent,
      last_order_date: customer.lastOrderDate
    };

    const { error } = await supabase
      .from('customers')
      .upsert(dbCustomer);
    
    if (error) throw error;
    return customer;
  },

  // --- Connection Test ---
  async testConnection() {
    const supabase = getSupabase();
    if (!supabase) return { success: false, message: 'Client not initialized' };
    
    try {
      const { error } = await supabase.from('settings').select('id').limit(1);
      if (error) return { success: false, message: error.message };
      return { success: true, message: 'Connected to Supabase' };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }
};
