
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { POSService, CartItem } from '@/types';
import { formatCurrency } from '@/utils';
import { Minus, Plus, X, ShoppingCart, CreditCard, Sun, Moon } from 'lucide-react';
import { db, Service } from '@/lib/supabase';

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('WASHES');
  const [selectedStaff, setSelectedStaff] = useState('');  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [carRego, setCarRego] = useState('');
  const [staffMembers, setStaffMembers] = useState<any[]>([
    { id: 'staff1', name: 'John Doe', role: 'Senior Technician' },
    { id: 'staff2', name: 'Jane Smith', role: 'Detailing Specialist' },
    { id: 'staff3', name: 'Mike Johnson', role: 'Wash Attendant' }
  ]);
  const router = useRouter();
  useEffect(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    setTotal(subtotal);
  }, [cart]);
  // Load services from database
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const servicesData = await db.services.getAll();
        setServices(servicesData);
      } catch (err) {
        console.error('Error loading services:', err);
        setError('Failed to load services');
        // Fallback to sample data if database fails
        setServices([
          { id: '1', name: 'Basic Wash', price: 15, category: 'wash', description: 'Basic car wash', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: '2', name: 'Premium Wash', price: 25, category: 'wash', description: 'Premium car wash', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: '3', name: 'Interior Detail', price: 35, category: 'detailing', description: 'Interior detailing', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: '4', name: 'Wax Protection', price: 20, category: 'protection', description: 'Wax protection service', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  // Filter services by category
  const washServices = services.filter(service => service.category === 'wash');
  const detailingServices = services.filter(service => service.category === 'detailing');
  const addonServices = services.filter(service => service.category === 'addon');
  const protectionServices = services.filter(service => service.category === 'protection');

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
  };  // Service Button Component - Updated for database services
  const ServiceButton = ({ service, onClick }: { service: Service; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`min-h-[48px] h-auto border rounded transition-all duration-200 text-xs font-medium p-1.5 text-center shadow-sm hover:shadow-md transform hover:scale-102 ${isDarkMode
        ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 text-white'
        : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-900'
        }`}
      style={{
        borderTopColor: isDarkMode ? '#3B82F6' : '#2563EB',
        borderTopWidth: '2px',
      }}
    >
      <div className="flex flex-col justify-between h-full min-h-[44px]">
        <div className="font-medium text-center text-xs leading-tight line-clamp-2 flex-1 flex items-center justify-center">
          {service.name}
        </div>
        <div className={`font-bold text-xs mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
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
  ]; return (
    <div className={`h-screen flex flex-col transition-all duration-300 overflow-hidden ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-blue-50 via-white to-gray-100'
      }`}>      {/* Header */}
      <div className={`border-b p-2 shadow-lg backdrop-blur-sm flex-shrink-0 ${isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-600'
        : 'bg-gradient-to-br from-blue-50 via-white to-gray-100 border-gray-200'
        }`}><div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/pos-dashboard')}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-100 border border-gray-500'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm'
                }`}
              title="Back to POS Dashboard"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              🚗 Point of Sale
            </h1>
          </div>          <div className="flex items-center space-x-4">


            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${isDarkMode
                ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
                : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className={`text-xs ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
              Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </div>
            <div className={`text-sm font-bold ${isDarkMode ? 'text-emerald-300' : 'text-green-600'}`}>
              Total: {formatCurrency(total)}
            </div>
            {/* Staff Member Selection */}
            <div className="flex items-center space-x-4">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                👤 Staff Member:
              </span>
              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className={`p-2 rounded border text-sm transition-colors min-w-[140px] ${isDarkMode
                  ? 'bg-gray-700 border-gray-500 text-gray-100 focus:border-blue-300'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}
              >
                <option value="">Select Staff</option>
                {staffMembers.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>      {/* Main Content - Horizontal Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-2 p-2 min-h-0 overflow-hidden">        {/* Left Sidebar - Category Navigation */}
        <div className="w-full lg:w-40 flex flex-row lg:flex-col space-x-1 lg:space-x-0 lg:space-y-1 flex-shrink-0 overflow-x-auto lg:overflow-visible">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`min-w-max lg:w-full p-2 text-center font-bold text-white rounded-lg shadow-lg transition-all duration-200 text-xs ${activeCategory === category.id
                ? category.color + ' opacity-100'
                : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-500 hover:bg-gray-600')
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>        {/* Main Services Area */}
        <div className="flex-1 flex flex-col xl:flex-row gap-2 min-w-0 overflow-hidden">
          {/* Services Panel */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 flex flex-col">              {/* Header Bar */}
              <div className={`border-b p-3 flex items-center justify-between flex-shrink-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-500' : 'bg-gradient-to-br from-blue-50 via-white to-gray-100 border-gray-200'}`}>
                <div className="flex items-center space-x-4">
                  <h2 className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Washes</h2>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    NOTES
                  </button>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  100%
                </div>              </div>              {/* Services Content - Balanced Symmetrical Layout */}              
              <div className="p-2 flex-1 space-y-2 overflow-auto">
                {loading ? (
                  <div className={`flex items-center justify-center h-64 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p>Loading services...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className={`flex items-center justify-center h-64 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                    <div className="text-center">
                      <p className="mb-4">Error: {error}</p>
                      <button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Top Row - Washes and Detailing (Symmetrical) */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3" style={{ minHeight: '280px' }}>
                      {/* Washes Section */}
                      <div className="flex flex-col">                    
                        <div className={`border-b pb-1 mb-2 ${isDarkMode ? 'border-gray-500' : 'border-gray-200'}`}>
                          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Washes</h3>
                        </div>                    
                        <div className="flex-1 space-y-1.5">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                            {washServices.slice(0, 8).map((service) => (
                              <ServiceButton
                                key={service.id}
                                service={service}
                                onClick={() => addToCart(service)}
                              />
                            ))}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                            {washServices.slice(8, 16).map((service) => (
                              <ServiceButton
                                key={service.id}
                                service={service}
                                onClick={() => addToCart(service)}
                              />
                            ))}
                          </div>                    
                        </div>
                      </div>                      {/* Detailing Section */}
                      <div className="flex flex-col">                    
                        <div className={`border-b pb-1 mb-2 ${isDarkMode ? 'border-gray-500' : 'border-gray-200'}`}>
                          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Detailing</h3>
                        </div>                    
                        <div className="flex-1 space-y-1.5">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                            {detailingServices.slice(0, 8).map((service) => (
                              <ServiceButton
                                key={service.id}
                                service={service}
                                onClick={() => addToCart(service)}
                              />
                            ))}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
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
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3" style={{ minHeight: '280px' }}>
                      {/* Addons Section */}
                      <div className="flex flex-col">
                        <div className={`border-b pb-1 mb-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>                      
                          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Addons</h3>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                            {addonServices.slice(0, 8).map((service) => (
                              <ServiceButton
                                key={service.id}
                                service={service}
                                onClick={() => addToCart(service)}
                              />
                            ))}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
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
                      <div className="flex flex-col">                    
                        <div className={`border-b pb-1 mb-2 ${isDarkMode ? 'border-gray-500' : 'border-gray-200'}`}>
                          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>New Car Protection</h3>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                            {protectionServices.slice(0, 8).map((service) => (
                              <ServiceButton
                                key={service.id}
                                service={service}
                                onClick={() => addToCart(service)}
                              />
                            ))}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
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
                  </>
                )}
              </div>
                  </div>
                </div>
              </div>
            </div>          </div>          {/* Right Panel - Staff, Car, and Cart */}          <div className="w-full xl:w-60 flex flex-col space-y-2 flex-shrink-0">{/* Car Registration Section */}            <div className={`rounded-lg border p-2 shadow-lg backdrop-blur-sm ${isDarkMode
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-500'
              : 'bg-gradient-to-br from-blue-50 via-white to-gray-100 border-gray-300'
              }`}>
              <h3 className={`font-bold text-xs flex items-center mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                🚗 Car Registration
              </h3>
              <input
                type="text"
                value={carRego}
                onChange={(e) => setCarRego(e.target.value.toUpperCase())} placeholder="Enter rego (e.g. ABC123)"
                className={`w-full p-1.5 rounded border text-xs transition-colors ${isDarkMode
                  ? 'bg-gray-700 border-gray-500 text-gray-100 placeholder-gray-300 focus:border-blue-300'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  }`}
                maxLength={8}
              />
            </div>            {/* Shopping Cart Panel */}            <div className={`rounded-lg border p-2 shadow-xl backdrop-blur-sm flex-1 ${isDarkMode
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-500'
              : 'bg-gradient-to-br from-blue-50 via-white to-gray-100 border-gray-300'
              }`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-bold text-sm flex items-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  <ShoppingCart className={`w-3 h-3 mr-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />
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
                    Clear                  </button>)}
              </div>
              <div className="flex-1 overflow-y-auto mb-2 max-h-40">
                {cart.length === 0 ? (
                  <div className={`text-center py-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    <ShoppingCart className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-300'}`} />
                    <p className="text-sm">Cart is empty</p>
                  </div>
                ) : (<div className="space-y-2 pr-1">
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
              </div>             Cart Summary
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
