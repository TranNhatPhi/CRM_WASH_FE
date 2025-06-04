'use client';

import React, { useState } from 'react';
import { POSCustomer } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Phone, Mail, Car, Star } from 'lucide-react';

interface CustomerFormProps {
  customer: POSCustomer | null;
  onCustomerChange: (customer: POSCustomer | null) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onCustomerChange }) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    phone: customer?.phone || '',
    email: customer?.email || '',
    vehiclePlate: customer?.vehiclePlate || '',
    isVIP: customer?.isVIP || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const newCustomer: POSCustomer = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        vehiclePlate: formData.vehiclePlate.trim() || undefined,
        isVIP: formData.isVIP,
      };

      onCustomerChange(newCustomer);
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      vehiclePlate: '',
      isVIP: false,
    });
    setErrors({});
    onCustomerChange(null);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span className="hidden sm:inline">Customer Information</span>
          <span className="sm:hidden">Customer</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Customer Name *
            </label>
            <div className="relative">
              <User className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600 dark:text-white ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                  }`}
                placeholder="Enter customer name"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600 dark:text-white ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                  }`}
                placeholder="+1-555-0123"
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <span className="hidden sm:inline">Email (Optional)</span>
              <span className="sm:hidden">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                  }`}
                placeholder="customer@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Vehicle Plate Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <span className="hidden sm:inline">Vehicle Plate (Optional)</span>
              <span className="sm:hidden">License Plate</span>
            </label>
            <div className="relative">
              <Car className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="text"
                value={formData.vehiclePlate}
                onChange={(e) => handleInputChange('vehiclePlate', e.target.value.toUpperCase())}
                className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
                placeholder="ABC123"
              />
            </div>
          </div>

          {/* VIP Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <input
              type="checkbox"
              id="isVIP"
              checked={formData.isVIP}
              onChange={(e) => handleInputChange('isVIP', e.target.checked)}
              className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <label htmlFor="isVIP" className="flex items-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-amber-500" />
              <span className="hidden sm:inline">VIP Customer (10% discount)</span>
              <span className="sm:hidden">VIP (10% off)</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              type="submit"
              className="flex-1 text-xs sm:text-sm py-1.5 sm:py-2"
              disabled={!formData.name.trim() || !formData.phone.trim()}
            >
              <span className="hidden sm:inline">
                {customer ? 'Update Customer' : 'Add Customer'}
              </span>
              <span className="sm:hidden">
                {customer ? 'Update' : 'Add'}
              </span>
            </Button>

            {(customer || formData.name || formData.phone) && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                className="text-gray-600 hover:text-gray-700 text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-3"
              >
                Clear
              </Button>
            )}
          </div>
        </form>

        {/* Customer Preview */}
        {customer && (
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-medium text-green-900 dark:text-green-300 truncate">
                  {customer.name}
                  {customer.isVIP && (
                    <Star className="inline w-3 h-3 sm:w-4 sm:h-4 ml-1 text-amber-500" />
                  )}
                </h4>
                <p className="text-xs text-green-700 dark:text-green-400 truncate">
                  {customer.phone}
                  {customer.vehiclePlate && ` • ${customer.vehiclePlate}`}
                </p>
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 ml-2">
                ✓ Ready
              </div>
            </div>
          </div>
        )}</CardContent>
    </Card>
  );
};
