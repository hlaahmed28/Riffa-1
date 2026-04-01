import React from 'react';
import { LayoutDashboard, ShoppingBag, ShoppingCart, Users, Ticket, Settings, LogOut, ChevronRight, MessageSquare, Image as ImageIcon, BarChart3 } from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: any) => void;
  onLogout: () => void;
  logo?: string;
}

export function AdminSidebar({ activeSection, setActiveSection, onLogout, logo }: AdminSidebarProps) {
  const [logoError, setLogoError] = React.useState(false);
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'products', label: 'Products Manager', icon: ShoppingBag },
    { id: 'orders', label: 'Orders Manager', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'promo', label: 'Promo Codes', icon: Ticket },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'covers', label: 'Website Covers', icon: ImageIcon },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#2d2535] text-[#faf8f5] h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-50">
      <div className="p-8 border-b border-white/10">
        {logo && !logoError ? (
          <img 
            src={logo} 
            alt="RIFFA" 
            className="h-10 w-auto object-contain brightness-0 invert" 
            referrerPolicy="no-referrer"
            onError={() => setLogoError(true)}
          />
        ) : (
          <h1 className="text-2xl font-cormorant font-bold text-[#c9a96e] tracking-wider">RIFFA</h1>
        )}
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">Management Suite</p>
      </div>

      <nav className="flex-grow py-8 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
              activeSection === item.id 
                ? 'bg-[#c9a96e] text-[#2d2535] shadow-lg shadow-[#c9a96e]/20' 
                : 'hover:bg-white/5 text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-[#2d2535]' : 'text-[#c9a96e]'}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {activeSection === item.id && <ChevronRight className="w-4 h-4" />}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
