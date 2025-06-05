'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, X, Printer, Gift, Mail, Sun, Moon } from 'lucide-react';
import { formatCurrency } from '@/utils';

interface CartItem {
    service: {
        id: string;
        name: string;
        price: number;
    };
    quantity: number;
    subtotal: number;
}

function PaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [showCashModal, setShowCashModal] = useState(false);
    const [amountGiven, setAmountGiven] = useState('');
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false); useEffect(() => {
        // Get cart data from localStorage or URL params
        const cartData = localStorage.getItem('pos-cart');
        if (cartData) {
            const parsedData = JSON.parse(cartData);
            // Handle both old format (direct cart array) and new format (transaction object)
            const cartItems = Array.isArray(parsedData) ? parsedData : parsedData.cart || [];
            setCart(cartItems);

            const subtotalAmount = cartItems.reduce((sum: number, item: CartItem) => sum + item.subtotal, 0);
            const taxAmount = subtotalAmount * 0.1; // 10% tax

            setSubtotal(subtotalAmount);
            setTax(taxAmount);
            setTotal(subtotalAmount + taxAmount);
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handlePaymentMethod = (method: string) => {
        setPaymentMethod(method);
        if (method === 'Cash') {
            setShowCashModal(true);
        } else {
            // For other payment methods, complete payment immediately
            completePayment(method);
        }
    };

    const handleCashPayment = () => {
        const given = parseFloat(amountGiven);
        if (given >= total) {
            completePayment('Cash');
            setShowCashModal(false);
        }
    };

    const completePayment = (method: string) => {
        setPaymentComplete(true);
        setPaymentMethod(method);
        // Clear cart from localStorage
        localStorage.removeItem('pos-cart');
    };

    const handleCompleteSale = () => {
        router.push('/pos');
    };

    const handleBack = () => {
        router.push('/pos');
    };
    if (paymentComplete) {
        return (
            <div className={`h-screen flex transition-all duration-300 ${isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-blue-50 via-white to-gray-100'
                }`}>
                {/* Left Panel - Sale Details */}
                <div className={`w-2/5 p-6 shadow-2xl backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
                    }`}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <button onClick={handleBack} className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <ArrowLeft className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                            </button>
                            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>🚗 Sale</h2>
                        </div>
                        {/* Theme Toggle */}
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
                    </div>

                    <div className="space-y-4 mb-6">
                        {cart.map((item, index) => (
                            <div key={item.service.id} className={`p-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                                }`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {item.service.name}
                                        </div>
                                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Qty: {item.quantity}
                                        </div>
                                    </div>
                                    <div className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                        {formatCurrency(item.subtotal)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`border-t pt-4 space-y-3 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span>Tax (10%)</span>
                            <span>{formatCurrency(tax)}</span>
                        </div>
                        <div className={`flex justify-between font-bold text-lg border-t pt-3 ${isDarkMode ? 'border-gray-600 text-white' : 'border-gray-200 text-gray-900'
                            }`}>
                            <span>SALE TOTAL</span>
                            <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
                                {formatCurrency(total)}
                            </span>
                        </div>
                    </div>

                    <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        <div className="flex justify-between mb-2">
                            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {paymentMethod}
                            </span>
                            <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                                {formatCurrency(total)}
                            </span>
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                        </div>
                        <div className={`flex justify-between font-bold text-lg mt-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            <span>TO PAY</span>
                            <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>$0.00</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Payment Received */}
                <div className={`flex-1 p-8 flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50/50'
                    }`}>
                    <div className="text-center max-w-md">
                        <div className="mb-8">
                            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-green-600' : 'bg-green-500'
                                }`}>
                                <span className="text-4xl">✓</span>
                            </div>
                            <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                Payment Received
                            </h1>
                            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Transaction completed successfully
                            </p>
                        </div>

                        <div className="flex flex-col space-y-4 mb-8">
                            <div className="flex space-x-4">
                                <button className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}>
                                    <Printer className="w-5 h-5 mr-2" />
                                    Print Receipt
                                </button>
                                <button className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode
                                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                                    }`}>
                                    <Gift className="w-5 h-5 mr-2" />
                                    Gift Receipt
                                </button>
                            </div>

                            <div className={`flex items-center justify-center p-4 rounded-lg border-2 border-dashed ${isDarkMode
                                ? 'border-gray-600 bg-gray-700/30 text-gray-300'
                                : 'border-gray-300 bg-gray-50 text-gray-600'
                                }`}>
                                <Mail className="w-5 h-5 mr-2" />
                                <span>Add customer to email receipt</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCompleteSale}
                            className={`w-full py-4 text-xl font-bold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg ${isDarkMode
                                ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white'
                                : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white'
                                }`}
                        >
                            Complete Sale
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className={`h-screen flex transition-all duration-300 ${isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-blue-50 via-white to-gray-100'
            }`}>
            {/* Left Panel - Sale Details */}
            <div className={`w-2/5 p-6 shadow-2xl backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
                }`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <button onClick={handleBack} className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <ArrowLeft className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                        </button>
                        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>🚗 Sale</h2>
                    </div>
                    {/* Theme Toggle */}
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
                </div>

                <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                        <div key={item.service.id} className={`p-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                            }`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {item.service.name}
                                    </div>
                                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Qty: {item.quantity}
                                    </div>
                                </div>
                                <div className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                    {formatCurrency(item.subtotal)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`border-t pt-4 space-y-3 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span>Tax (10%)</span>
                        <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className={`flex justify-between font-bold text-lg border-t pt-3 ${isDarkMode ? 'border-gray-600 text-white' : 'border-gray-200 text-gray-900'
                        }`}>
                        <span>SALE TOTAL</span>
                        <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
                            {formatCurrency(total)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Payment Options */}
            <div className={`flex-1 p-8 ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50/50'}`}>
                <div className="text-center mb-8">
                    <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Amount to Pay
                    </h1>
                    <div className={`text-5xl font-bold mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                        {formatCurrency(total)}
                    </div>
                    <button className={`text-sm hover:underline transition-colors ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                        }`}>
                        Edit to make a partial payment
                    </button>
                </div>

                {/* Payment Method Buttons */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <button
                        onClick={() => handlePaymentMethod('Cash')}
                        className={`py-6 px-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${isDarkMode
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white'
                            : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white'
                            }`}
                    >
                        💵 Cash
                    </button>
                    <button
                        onClick={() => handlePaymentMethod('Gift Card')}
                        className={`py-6 px-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${isDarkMode
                            ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white'
                            : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white'
                            }`}
                    >
                        🎁 Gift Card
                    </button>
                    <button
                        onClick={() => handlePaymentMethod('Card Payment')}
                        className={`py-6 px-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${isDarkMode
                            ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white'
                            : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white'
                            }`}
                    >
                        💳 Card Payment
                    </button>
                </div>

                <div className="mb-8">
                    <button
                        onClick={() => handlePaymentMethod('Lightspeed Payments')}
                        className={`w-full py-4 text-xl font-bold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${isDarkMode
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white'
                            : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white'
                            }`}
                    >
                        ⚡ Lightspeed Payments
                    </button>
                </div>

                {/* Customer Options */}
                <div className="text-center">
                    <div className={`flex items-center justify-center mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        <span>Add a customer to pay with the following options:</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <button className={`py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode
                            ? 'bg-gray-600 hover:bg-gray-500 text-white'
                            : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                            }`}>
                            🏆 Loyalty
                        </button>
                        <button className={`py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode
                            ? 'bg-gray-600 hover:bg-gray-500 text-white'
                            : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                            }`}>
                            📦 Layby
                        </button>
                        <button className={`py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode
                            ? 'bg-gray-600 hover:bg-gray-500 text-white'
                            : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                            }`}>
                            💰 Store Credit
                        </button>
                    </div>
                    <button className={`w-full py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode
                        ? 'bg-gray-600 hover:bg-gray-500 text-white'
                        : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                        }`}>
                        📋 On Account
                    </button>
                </div>
            </div>            {/* Cash Payment Modal */}
            {showCashModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`rounded-lg p-6 w-96 shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Cash Payment
                            </h3>
                            <button onClick={() => setShowCashModal(false)}>
                                <X className={`w-6 h-6 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`} />
                            </button>
                        </div>

                        <div className="mb-4">
                            <div className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Amount to pay: {formatCurrency(total)}
                            </div>
                            <div className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Amount given by customer:
                            </div>

                            <div className="flex items-center space-x-2 mb-4">
                                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$</span>
                                <input
                                    type="number"
                                    value={amountGiven}
                                    onChange={(e) => setAmountGiven(e.target.value)}
                                    className={`flex-1 px-3 py-2 border rounded text-right text-xl ${isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        }`}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => setAmountGiven(total.toFixed(2))}
                                    className={`py-2 px-4 rounded transition-colors ${isDarkMode
                                        ? 'bg-gray-600 text-white hover:bg-gray-500'
                                        : 'bg-gray-600 text-white hover:bg-gray-700'
                                        }`}
                                >
                                    {formatCurrency(total)}
                                </button>
                                <button
                                    onClick={() => setAmountGiven((Math.ceil(total)).toFixed(2))}
                                    className={`py-2 px-4 rounded transition-colors ${isDarkMode
                                        ? 'bg-gray-600 text-white hover:bg-gray-500'
                                        : 'bg-gray-600 text-white hover:bg-gray-700'
                                        }`}
                                >
                                    ${Math.ceil(total)}.00
                                </button>
                                <button
                                    onClick={() => setAmountGiven('100.00')}
                                    className={`py-2 px-4 rounded transition-colors ${isDarkMode
                                        ? 'bg-gray-600 text-white hover:bg-gray-500'
                                        : 'bg-gray-600 text-white hover:bg-gray-700'
                                        }`}
                                >
                                    $100.00
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowCashModal(false)}
                                className={`flex-1 py-2 px-4 border rounded transition-colors ${isDarkMode
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCashPayment}
                                disabled={!amountGiven || parseFloat(amountGiven) < total}
                                className={`flex-1 py-2 px-4 rounded transition-colors ${!amountGiven || parseFloat(amountGiven) < total
                                    ? isDarkMode
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : isDarkMode
                                        ? 'bg-blue-600 text-white hover:bg-blue-500'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                Complete Payment
                            </button>
                        </div>
                    </div>                </div>
            )}
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading payment page...</p>
                </div>
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}
