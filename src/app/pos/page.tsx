'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { POSService, CartItem } from '@/types';
import { formatCurrency } from '@/utils';
import { Minus, Plus, X, ShoppingCart, CreditCard, Sun, Moon } from 'lucide-react';

// Updated service data with improved colors
const washServices = [
  { id: 'w1', name: 'Outside Sedan', price: 15.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w2', name: 'Outside SUV', price: 18.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w3', name: 'Outside 4WD', price: 22.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w4', name: 'Full Sedan', price: 25.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w5', name: 'Full SUV', price: 30.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w6', name: 'Full 4WD', price: 35.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w7', name: 'Polish Sedan', price: 40.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w8', name: 'Polish SUV', price: 45.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w9', name: 'Polish 4WD', price: 50.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w10', name: 'Express Wash', price: 12.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w11', name: 'Premium Small', price: 55.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w12', name: 'Premium Large', price: 65.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w13', name: 'Eco Wash', price: 20.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w14', name: 'Luxury Package', price: 75.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w15', name: 'Basic Rinse', price: 8.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
  { id: 'w16', name: 'VIP Service', price: 95.00, category: 'wash', color: '#14B8A6', darkColor: '#0D9488' },
];

const addonServices = [
  { id: 'a1', name: 'Door Scratches', price: 8.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a2', name: 'Bug/Tar Removal', price: 12.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a3', name: 'Trim Polish', price: 15.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a4', name: 'Mat Steam Clean', price: 20.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a5', name: 'Protective Wax', price: 10.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a6', name: 'Dash Detail', price: 18.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a7', name: 'Clay Bar', price: 25.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a8', name: 'Miscellaneous', price: 5.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a9', name: 'Tire Shine', price: 7.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a10', name: 'Air Freshener', price: 6.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a11', name: 'Glass Treatment', price: 14.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a12', name: 'Headlight Fix', price: 22.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a13', name: 'Chrome Polish', price: 16.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a14', name: 'Fabric Shield', price: 24.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a15', name: 'Engine Clean', price: 30.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
  { id: 'a16', name: 'Pet Hair Removal', price: 18.00, category: 'addon', color: '#F97316', darkColor: '#EA580C' },
];

const detailingServices = [
  { id: 'd1', name: 'Hand Wax', price: 35.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd2', name: 'Leather Clean', price: 30.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd3', name: 'Carpet Steam', price: 25.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd4', name: 'Seat Steam', price: 28.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd5', name: 'Cut & Polish', price: 45.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd6', name: 'Interior Steam', price: 32.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd7', name: 'Full Detail', price: 80.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd8', name: 'Mini Detail', price: 40.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd9', name: 'Paint Fix', price: 55.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd10', name: 'Clay Treatment', price: 38.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd11', name: 'Swirl Removal', price: 42.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd12', name: 'Machine Polish', price: 48.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd13', name: 'Ceramic Prep', price: 65.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd14', name: 'Oxide Removal', price: 52.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd15', name: 'Deep Clean', price: 75.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
  { id: 'd16', name: 'Show Finish', price: 95.00, category: 'detailing', color: '#059669', darkColor: '#047857' },
];

const protectionServices = [
  { id: 'p1', name: 'Interior Shield', price: 60.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p2', name: 'Paint Shield', price: 120.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p3', name: 'Scratch Repair', price: 80.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p4', name: 'Wheel Repair', price: 50.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p5', name: 'Bumper Fix', price: 70.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p6', name: 'Panel Repair', price: 90.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p7', name: 'Ceramic Coat', price: 150.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p8', name: 'Paint Sealant', price: 85.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p9', name: 'Under Shield', price: 95.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p10', name: 'Glass Film', price: 75.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p11', name: 'Rust Shield', price: 65.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p12', name: 'Chip Repair', price: 45.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p13', name: 'Clear Bra', price: 200.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p14', name: 'Water Shield', price: 55.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
  { id: 'p15', name: 'UV Package', price: 100.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' }, { id: 'p16', name: 'Complete Suite', price: 300.00, category: 'protection', color: '#8B5CF6', darkColor: '#7C3AED' },
];

// Staff members data
const staffMembers = [
  { id: 'staff1', name: 'John Smith', role: 'Manager' },
  { id: 'staff2', name: 'Sarah Wilson', role: 'Senior Washer' },
  { id: 'staff3', name: 'Mike Johnson', role: 'Detailer' },
  { id: 'staff4', name: 'Emma Davis', role: 'Cashier' },
  { id: 'staff5', name: 'David Brown', role: 'Washer' },
  { id: 'staff6', name: 'Lisa Garcia', role: 'Supervisor' },
];

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('WASHES');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [carRego, setCarRego] = useState('');
  const router = useRouter();

  useEffect(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    setTotal(subtotal);
  }, [cart]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const addToCart = (service: any) => {
    const posService: POSService = {
      id: service.id,
      name: service.name,
      price: service.price,
      duration: 30,
      description: service.name,
      category: service.category as 'basic' | 'premium' | 'deluxe' | 'addon' | 'wash' | 'detailing' | 'protection' | 'maintenance',
      color: service.color
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.service.id === service.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1, subtotal: item.subtotal + service.price }
            : item
        );
      } else {
        return [...prevCart, { service: posService, quantity: 1, subtotal: service.price }];
      }
    });
  };

  const updateQuantity = (serviceId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.service.id !== serviceId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.service.id === serviceId
            ? { ...item, quantity: newQuantity, subtotal: item.service.price * newQuantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (serviceId: string) => {
    setCart(prevCart => prevCart.filter(item => item.service.id !== serviceId));
  };

  const clearCart = () => {
    setCart([]);
  }; const processTransaction = () => {
    if (cart.length === 0) {
      alert('Please add services to cart');
      return;
    }

    // Optional validation for staff and car registration
    if (!selectedStaff) {
      const proceed = confirm('No staff member selected. Continue anyway?');
      if (!proceed) return;
    }

    if (!carRego.trim()) {
      const proceed = confirm('No car registration entered. Continue anyway?');
      if (!proceed) return;
    }

    // Prepare transaction data
    const transactionData = {
      cart,
      staffMember: selectedStaff ? staffMembers.find(staff => staff.id === selectedStaff) : null,
      carRegistration: carRego.trim() || null,
      timestamp: new Date().toISOString(),
    };

    // Save transaction data to localStorage for payment page
    localStorage.setItem('pos-cart', JSON.stringify(transactionData));

    // Navigate to payment page
    router.push('/payment');
  };// Service Button Component - Optimized for compact display
  const ServiceButton = ({ service, onClick }: { service: any; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`h-12 border rounded transition-all duration-200 text-xs font-medium p-1.5 text-center shadow-sm hover:shadow-md transform hover:scale-102 ${isDarkMode
        ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 text-white'
        : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-900'
        }`}
      style={{
        borderTopColor: isDarkMode ? service.darkColor : service.color,
        borderTopWidth: '2px',
      }}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="font-medium text-center text-xs leading-tight line-clamp-2">
          {service.name}
        </div>
        <div className={`font-bold text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          ${service.price.toFixed(2)}
        </div>
      </div>
    </button>
  );
  const categories = [
    { id: 'WASHES', name: 'WASHES', color: 'bg-blue-600', active: true },
    { id: 'BAKERY', name: 'BAKERY', color: 'bg-orange-500' },
    { id: 'SANDWICHES', name: 'SANDWICHES', color: 'bg-amber-600' },
    { id: 'PASTRIES', name: 'PASTRIES', color: 'bg-yellow-600' },
    { id: 'ICE_CREAMS', name: 'ICE CREAMS', color: 'bg-cyan-500' },
    { id: 'COLD_DRINKS', name: 'COLD DRINKS', color: 'bg-green-500' },
    { id: 'HOT_DRINKS', name: 'HOT DRINKS', color: 'bg-red-500' },
  ];
  return (
    <div className={`h-screen flex flex-col transition-all duration-300 ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-blue-50 via-white to-gray-100'
      }`}>      {/* Header */}
      <div className={`border-b p-4 shadow-lg backdrop-blur-sm ${isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-600'
        : 'bg-gradient-to-br from-blue-50 via-white to-gray-100 border-gray-200'
        }`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            🚗 Point of Sale
          </h1>
          <div className="flex items-center space-x-6">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${isDarkMode
                ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
                : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
              Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </div>
            <div className={`text-lg font-bold ${isDarkMode ? 'text-emerald-300' : 'text-green-600'}`}>
              Total: {formatCurrency(total)}
            </div>
          </div>
        </div>
      </div>{/* Main Content - Horizontal Layout */}
      <div className="flex-1 flex gap-4 p-4">        {/* Left Sidebar - Category Navigation */}
        <div className="w-48 flex flex-col space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full p-3 text-center font-bold text-white rounded-lg shadow-lg transition-all duration-200 text-sm ${activeCategory === category.id
                ? category.color + ' opacity-100'
                : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-500 hover:bg-gray-600')
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Main Services Area */}
        <div className="flex-1 flex gap-4">
          {/* Services Panel */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">              {/* Header Bar */}
              <div className={`border-b p-3 flex items-center justify-between ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-500' : 'bg-gradient-to-br from-blue-50 via-white to-gray-100 border-gray-200'}`}>
                <div className="flex items-center space-x-4">
                  <h2 className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Washes</h2>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    NOTES
                  </button>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  100%
                </div>
              </div>{/* Services Content - Balanced Symmetrical Layout */}
              <div className="p-3 h-full space-y-3 overflow-hidden">
                {/* Top Row - Washes and Detailing (Symmetrical) */}
                <div className="grid grid-cols-2 gap-4 h-1/2">                  {/* Washes Section */}
                  <div className="flex flex-col h-full">                    <div className={`border-b pb-1 mb-2 ${isDarkMode ? 'border-gray-500' : 'border-gray-200'}`}>
                    <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Washes</h3>
                  </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="grid grid-cols-4 gap-1.5">
                        {washServices.slice(0, 8).map((service) => (
                          <ServiceButton
                            key={service.id}
                            service={service}
                            onClick={() => addToCart(service)}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {washServices.slice(8, 16).map((service) => (
                          <ServiceButton
                            key={service.id}
                            service={service}
                            onClick={() => addToCart(service)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Detailing Section */}
                  <div className="flex flex-col h-full">                    <div className={`border-b pb-1 mb-2 ${isDarkMode ? 'border-gray-500' : 'border-gray-200'}`}>
                    <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Detailing</h3>
                  </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="grid grid-cols-4 gap-1.5">
                        {detailingServices.slice(0, 8).map((service) => (
                          <ServiceButton
                            key={service.id}
                            service={service}
                            onClick={() => addToCart(service)}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {detailingServices.slice(8, 16).map((service) => (
                          <ServiceButton
                            key={service.id}
                            service={service}
                            onClick={() => addToCart(service)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Addons and New Car Protection (Symmetrical) */}
                <div className="grid grid-cols-2 gap-4 h-1/2">                  {/* Addons Section */}
                  <div className="flex flex-col h-full">
                    <div className={`border-b pb-1 mb-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>                      <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Addons</h3>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="grid grid-cols-4 gap-1.5">
                        {addonServices.slice(0, 8).map((service) => (
                          <ServiceButton
                            key={service.id}
                            service={service}
                            onClick={() => addToCart(service)}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {addonServices.slice(8, 16).map((service) => (
                          <ServiceButton
                            key={service.id}
                            service={service}
                            onClick={() => addToCart(service)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* New Car Protection Section */}
                  <div className="flex flex-col h-full">                    <div className={`border-b pb-1 mb-2 ${isDarkMode ? 'border-gray-500' : 'border-gray-200'}`}>
                    <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>New Car Protection</h3>
                  </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="grid grid-cols-4 gap-1.5">
                        {protectionServices.slice(0, 8).map((service) => (
                          <ServiceButton
                            key={service.id}
                            service={service}
                            onClick={() => addToCart(service)}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {protectionServices.slice(8, 16).map((service) => (
                          <ServiceButton
                            key={service.id}
                            service={service}
                            onClick={() => addToCart(service)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* Right Panel - Staff, Car, and Cart */}
          <div className="w-64 flex flex-col space-y-3">            {/* Staff Selection Section */}            <div className={`rounded-lg border p-3 shadow-lg backdrop-blur-sm ${isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-500'
            : 'bg-gradient-to-br from-blue-50 via-white to-gray-100 border-gray-300'
            }`}>
            <h3 className={`font-bold text-sm flex items-center mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              👤 Staff Member
            </h3>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className={`w-full p-2 rounded border text-xs transition-colors ${isDarkMode
                ? 'bg-gray-700 border-gray-500 text-gray-100 focus:border-blue-300'
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
            >
              <option value="">Select Staff Member</option>
              {staffMembers.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} ({staff.role})
                </option>
              ))}
            </select>
          </div>            {/* Car Registration Section */}
            <div className={`rounded-lg border p-3 shadow-lg backdrop-blur-sm ${isDarkMode
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-500'
              : 'bg-gradient-to-br from-blue-50 via-white to-gray-100 border-gray-300'
              }`}>
              <h3 className={`font-bold text-sm flex items-center mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                🚗 Car Registration
              </h3>
              <input
                type="text"
                value={carRego}
                onChange={(e) => setCarRego(e.target.value.toUpperCase())}
                placeholder="Enter rego (e.g. ABC123)"
                className={`w-full p-2 rounded border text-xs transition-colors ${isDarkMode
                  ? 'bg-gray-700 border-gray-500 text-gray-100 placeholder-gray-300 focus:border-blue-300'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  }`}
                maxLength={8}
              />
            </div>            {/* Shopping Cart Panel */}            <div className={`rounded-lg border p-3 shadow-xl backdrop-blur-sm flex-1 ${isDarkMode
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-500'
              : 'bg-gradient-to-br from-blue-50 via-white to-gray-100 border-gray-300'
              }`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-bold text-base flex items-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  <ShoppingCart className={`w-4 h-4 mr-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                  Cart
                </h3>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className={`text-xs font-medium transition-colors hover:scale-105 ${isDarkMode
                      ? 'text-red-300 hover:text-red-200'
                      : 'text-red-600 hover:text-red-800'
                      }`}
                  >
                    Clear
                  </button>
                )}
              </div><div className="flex-1 overflow-y-auto mb-3" style={{ maxHeight: 'calc(100vh - 450px)' }}>
                {cart.length === 0 ? (
                  <div className={`text-center py-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    <ShoppingCart className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-300'}`} />
                    <p className="text-sm">Cart is empty</p>
                  </div>
                ) : (<div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.service.id} className={`rounded-lg p-2 border transition-all duration-200 ${isDarkMode
                      ? 'bg-gray-700/70 border-gray-500 hover:bg-gray-700/90'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-semibold text-xs leading-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {item.service.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.service.id)}
                          className={`ml-1 transition-colors hover:scale-110 ${isDarkMode
                            ? 'text-red-300 hover:text-red-200'
                            : 'text-red-500 hover:text-red-700'
                            }`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all hover:scale-110 ${isDarkMode
                              ? 'bg-gray-600 hover:bg-gray-500 text-gray-100'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                              }`}
                          >
                            <Minus className="w-2 h-2" />
                          </button>
                          <span className={`w-6 text-center text-xs font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all hover:scale-110 ${isDarkMode
                              ? 'bg-gray-600 hover:bg-gray-500 text-gray-100'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                              }`}
                          >
                            <Plus className="w-2 h-2" />
                          </button>
                        </div>
                        <span className={`font-bold text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                          {formatCurrency(item.subtotal)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>              {/* Cart Summary */}
              <div className={`border-t pt-2 ${isDarkMode ? 'border-gray-500' : 'border-gray-200'}`}>
                <div className={`rounded-md p-2 shadow-sm ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-600' : 'bg-gradient-to-br from-blue-50 via-white to-gray-100 border border-gray-100'}`}>
                  <div className={`space-y-1 text-xs ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className={isDarkMode ? 'text-gray-100' : 'text-gray-800'}>{formatCurrency(cart.reduce((sum, item) => sum + item.subtotal, 0))}</span>
                    </div>
                    <div className={`flex justify-between font-bold text-sm border-t pt-1 ${isDarkMode ? 'border-gray-500' : 'border-gray-200'}`}>
                      <span>Total:</span>
                      <span className={isDarkMode ? 'text-emerald-300' : 'text-green-600'}>
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Process Transaction Button */}
                <button
                  onClick={processTransaction}
                  disabled={cart.length === 0}
                  className={`w-full mt-2 py-2 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center shadow-md ${cart.length === 0
                    ? isDarkMode
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed border border-gray-500'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isDarkMode
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white border border-blue-400 shadow-blue-500/20'
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white'
                    }`}
                >
                  <CreditCard className="w-4 h-4 mr-1" />
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
