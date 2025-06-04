'use client';

import React from 'react';
import { CartItem, POSCustomer } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingCart as ShoppingCartIcon, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/utils';

interface ShoppingCartProps {
  items: CartItem[];
  customer: POSCustomer | null;
  onUpdateQuantity: (serviceId: string, quantity: number) => void;
  onRemoveItem: (serviceId: string) => void;
  onClearCart: () => void;
  onProcessTransaction: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  customer,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProcessTransaction,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const discount = customer?.isVIP ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + tax;

  const isCartEmpty = items.length === 0;
  const canProcessTransaction = !isCartEmpty && customer !== null;
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span className="hidden sm:inline">Shopping Cart</span>
          <span className="sm:hidden">Cart</span>
          {items.length > 0 && (
            <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
              {items.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4">
        {/* Cart Items */}
        {isCartEmpty ? (
          <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
            <ShoppingCartIcon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 opacity-50" />
            <p className="text-xs sm:text-sm">Your cart is empty</p>
            <p className="text-xs mt-1 hidden sm:block">Add services to get started</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.service.id}
                className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-slate-800 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.service.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatCurrency(item.service.price)} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-1 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.service.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-7 h-7 flex items-center justify-center rounded text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium w-8 text-center text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.service.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.service.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}        {/* Cart Summary */}
        {!isCartEmpty && (
          <div className="border-t border-gray-200 dark:border-slate-700 pt-3 sm:pt-4 space-y-1 sm:space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
              <span className="text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-xs sm:text-sm text-green-600 dark:text-green-400">
                <span>VIP Discount (10%):</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-600 dark:text-gray-400">Tax (10%):</span>
              <span className="text-gray-900 dark:text-white">{formatCurrency(tax)}</span>
            </div>

            <div className="flex justify-between text-sm sm:text-lg font-semibold border-t border-gray-200 dark:border-slate-700 pt-1 sm:pt-2">
              <span className="text-gray-900 dark:text-white">Total:</span>
              <span className="text-gray-900 dark:text-white">{formatCurrency(total)}</span>
            </div>
          </div>
        )}

        {/* Customer Info */}
        {customer && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 sm:p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-xs sm:text-sm font-medium text-blue-900 dark:text-blue-300">
              <span className="hidden sm:inline">Customer: </span>{customer.name}
              {customer.isVIP && (
                <span className="ml-1 sm:ml-2 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-1 sm:px-2 py-1 rounded">
                  VIP
                </span>
              )}
            </h4>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
              {customer.phone}
              {customer.vehiclePlate && ` • ${customer.vehiclePlate}`}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {!isCartEmpty && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearCart}
              className="w-full text-gray-600 hover:text-gray-700 text-xs sm:text-sm"
            >
              Clear Cart
            </Button>
          )}

          <Button
            onClick={onProcessTransaction}
            disabled={!canProcessTransaction}
            className="w-full text-xs sm:text-sm"
            size="lg"
          >
            <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            {!customer ? (
              <>
                <span className="hidden sm:inline">Add Customer Info</span>
                <span className="sm:hidden">Add Customer</span>
              </>
            ) : isCartEmpty ? (
              'Cart is Empty'
            ) : (
              <>
                <span className="hidden sm:inline">Process Payment • {formatCurrency(total)}</span>
                <span className="sm:hidden">Pay {formatCurrency(total)}</span>
              </>
            )}
          </Button>
        </div>

        {/* Customer Required Notice */}
        {!customer && !isCartEmpty && (
          <p className="text-xs text-amber-600 dark:text-amber-400 text-center mt-2">
            <span className="hidden sm:inline">Please add customer information to proceed</span>
            <span className="sm:hidden">Customer info required</span>
          </p>
        )}</CardContent>
    </Card>
  );
};
