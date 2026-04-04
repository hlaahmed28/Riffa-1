export interface Product {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  colors: string[];
  sizes: string[];
  season: 'Summer' | 'Winter' | 'All Year';
  image: string;
  images: string[];
  description: string;
  material: string;
  care: string;
  origin: string;
  isBestseller?: boolean;
  status: 'Active' | 'Draft' | 'Out of Stock';
  category: 'Heavy Pashmina' | 'Light Pashmina' | 'Shawls';
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  governorate: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentScreenshot?: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  governorate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
  isFeatured: boolean;
}

export interface AppSettings {
  storeName: string;
  whatsappNumber: string;
  address: string;
  shippingFeeStandard: number;
  governorateShippingFees: { [key: string]: number };
  freeShippingThreshold: number;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  announcementBar: string;
  aboutText: string;
  heroImage: string;
  logo: string;
  categoryCovers: {
    'Heavy Pashmina': string;
    'Light Pashmina': string;
    'Shawls': string;
  };
}

export type Page = 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'confirmation' | 'about' | 'contact' | 'shipping-returns' | 'admin';

export const GOVERNORATES = [
  "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira", "Fayoum", "Gharbia", "Ismailia", "Monufia", "Minya", "Qalyubia", "New Valley", "Suez", "Aswan", "Assiut", "Beni Suef", "Port Said", "Damietta", "South Sinai", "Kafr El Sheikh", "Matrouh", "Luxor", "Qena", "North Sinai", "Sohag"
];



export const INITIAL_SETTINGS: AppSettings = {
  storeName: "RIFFA Style",
  whatsappNumber: "+201001234567",
  address: "Zamalek, Cairo, Egypt",
  shippingFeeStandard: 50,
  governorateShippingFees: {
    "Cairo": 50,
    "Giza": 50,
    "Alexandria": 65,
    "Dakahlia": 75,
    "Red Sea": 100,
    "Beheira": 75,
    "Fayoum": 75,
    "Gharbia": 75,
    "Ismailia": 75,
    "Monufia": 75,
    "Minya": 85,
    "Qalyubia": 60,
    "New Valley": 120,
    "Suez": 75,
    "Aswan": 100,
    "Assiut": 85,
    "Beni Suef": 85,
    "Port Said": 75,
    "Damietta": 75,
    "South Sinai": 120,
    "Kafr El Sheikh": 75,
    "Matrouh": 100,
    "Luxor": 100,
    "Qena": 100,
    "North Sinai": 120,
    "Sohag": 100
  },
  freeShippingThreshold: 2000,
  instagramUrl: "https://instagram.com/riffa",
  facebookUrl: "https://facebook.com/riffa",
  tiktokUrl: "https://tiktok.com/@riffa",
  announcementBar: "Free shipping on orders above 2000 EGP! Shop the new Summer Collection now.",
  aboutText: "At RIFFA, we believe that every pashmina tells a story. Our journey began in the heart of Cairo, where we sought to revive the ancient art of Egyptian weaving. Each piece is a testament to the skill of our local artisans, combining traditional techniques with modern luxury.",
  heroImage: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=1920",
  logo: "https://storage.googleapis.com/aistudio-build-assets/riffa-logo.png",
  categoryCovers: {
    'Heavy Pashmina': 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800',
    'Light Pashmina': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    'Shawls': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800'
  }
};
