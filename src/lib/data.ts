import { DashboardStats, HourlyStats, ComparisonData, WashPackage, LaborData, MonthlyComparison, POSService, POSTransaction, CartItem } from '@/types';

// Mock data generator for development
export const mockDashboardStats: DashboardStats = {
  totalCars: 1273,
  totalRevenue: 45678900,
  averageRevenue: 35875,
  activeStations: 6,
};

export const mockHourlyStats: HourlyStats[] = [
  { hour: '06:00', carsPerHour: 12, grossPerHour: 450000, grossPerCarHour: 37500 },
  { hour: '07:00', carsPerHour: 25, grossPerHour: 875000, grossPerCarHour: 35000 },
  { hour: '08:00', carsPerHour: 45, grossPerHour: 1575000, grossPerCarHour: 35000 },
  { hour: '09:00', carsPerHour: 38, grossPerHour: 1330000, grossPerCarHour: 35000 },
  { hour: '10:00', carsPerHour: 52, grossPerHour: 1820000, grossPerCarHour: 35000 },
  { hour: '11:00', carsPerHour: 48, grossPerHour: 1680000, grossPerCarHour: 35000 },
  { hour: '12:00', carsPerHour: 65, grossPerHour: 2275000, grossPerCarHour: 35000 },
  { hour: '13:00', carsPerHour: 58, grossPerHour: 2030000, grossPerCarHour: 35000 },
  { hour: '14:00', carsPerHour: 42, grossPerHour: 1470000, grossPerCarHour: 35000 },
  { hour: '15:00', carsPerHour: 35, grossPerHour: 1225000, grossPerCarHour: 35000 },
  { hour: '16:00', carsPerHour: 28, grossPerHour: 980000, grossPerCarHour: 35000 },
  { hour: '17:00', carsPerHour: 22, grossPerHour: 770000, grossPerCarHour: 35000 },
];

export const mockComparisonData: ComparisonData[] = [
  { date: '06:00', carsYesterday: 15, carsToday: 12, grossYesterday: 525000, grossToday: 450000 },
  { date: '07:00', carsYesterday: 22, carsToday: 25, grossYesterday: 770000, grossToday: 875000 },
  { date: '08:00', carsYesterday: 40, carsToday: 45, grossYesterday: 1400000, grossToday: 1575000 },
  { date: '09:00', carsYesterday: 35, carsToday: 38, grossYesterday: 1225000, grossToday: 1330000 },
  { date: '10:00', carsYesterday: 48, carsToday: 52, grossYesterday: 1680000, grossToday: 1820000 },
  { date: '11:00', carsYesterday: 45, carsToday: 48, grossYesterday: 1575000, grossToday: 1680000 },
  { date: '12:00', carsYesterday: 60, carsToday: 65, grossYesterday: 2100000, grossToday: 2275000 },
];

export const mockWashPackages: WashPackage[] = [
  { id: '1', name: 'BASIC PACKAGE', price: 25000, color: '#22C55E', percentage: 34.5 },
  { id: '2', name: 'SEMI CLEAN', price: 35000, color: '#3B82F6', percentage: 22.3 },
  { id: '3', name: 'PROTECT', price: 45000, color: '#F59E0B', percentage: 15.8 },
  { id: '4', name: 'WASH & PROTECT', price: 55000, color: '#EF4444', percentage: 12.1 },
  { id: '5', name: 'WAX & SUPER CLEAN', price: 75000, color: '#8B5CF6', percentage: 8.7 },
  { id: '6', name: 'EXPRESS WAX', price: 65000, color: '#06B6D4', percentage: 6.6 },
];

export const mockLaborData: LaborData[] = [
  { employee: 'John Smith', hrsToday: 8.5, hrsYesterday: 8.0 },
  { employee: 'Sarah Johnson', hrsToday: 7.8, hrsYesterday: 8.2 },
  { employee: 'Michael Brown', hrsToday: 8.2, hrsYesterday: 7.5 },
  { employee: 'Emily Davis', hrsToday: 8.0, hrsYesterday: 8.0 },
];

export const mockMonthlyComparison: MonthlyComparison[] = [
  { month: 'Mon', carsFeb: 450, carsMarch: 520, grossFeb: 15750000, grossMarch: 18200000 },
  { month: 'Tue', carsFeb: 380, carsMarch: 420, grossFeb: 13300000, grossMarch: 14700000 },
  { month: 'Wed', carsFeb: 520, carsMarch: 580, grossFeb: 18200000, grossMarch: 20300000 },
  { month: 'Thu', carsFeb: 480, carsMarch: 540, grossFeb: 16800000, grossMarch: 18900000 },
  { month: 'Fri', carsFeb: 420, carsMarch: 460, grossFeb: 14700000, grossMarch: 16100000 },
  { month: 'Sat', carsFeb: 380, carsMarch: 410, grossFeb: 13300000, grossMarch: 14350000 },
  { month: 'Sun', carsFeb: 320, carsMarch: 350, grossFeb: 11200000, grossMarch: 12250000 },
];

// Chart colors
export const chartColors = {
  primary: '#3B82F6',
  secondary: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
  purple: '#8B5CF6',
  pink: '#EC4899',
  indigo: '#6366F1',
};

export const packageColors = [
  '#22C55E', '#3B82F6', '#F59E0B', '#EF4444', 
  '#8B5CF6', '#06B6D4', '#84CC16', '#F97316',
  '#EC4899', '#6366F1', '#14B8A6', '#F43F5E'
];

// API simulation functions
export const fetchDashboardData = async (): Promise<DashboardStats> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return mockDashboardStats;
};

export const fetchHourlyStats = async (): Promise<HourlyStats[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockHourlyStats;
};

export const fetchComparisonData = async (): Promise<ComparisonData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockComparisonData;
};

export const fetchWashPackages = async (): Promise<WashPackage[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockWashPackages;
};

export const fetchLaborData = async (): Promise<LaborData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockLaborData;
};

export const fetchMonthlyComparison = async (): Promise<MonthlyComparison[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMonthlyComparison;
};

// POS System Mock Data
export const mockPOSServices: POSService[] = [
  // Basic Services
  {
    id: 'basic-1',
    name: 'Express Wash',
    price: 25000,
    duration: 15,
    description: 'Quick exterior wash with soap and rinse',
    category: 'basic',
    color: '#10B981',
  },
  {
    id: 'basic-2',
    name: 'Basic Package',
    price: 35000,
    duration: 25,
    description: 'Exterior wash, tire cleaning, and interior vacuum',
    category: 'basic',
    color: '#10B981',
  },
  // Premium Services
  {
    id: 'premium-1',
    name: 'Premium Wash',
    price: 55000,
    duration: 35,
    description: 'Full wash, wax application, interior cleaning, and tire shine',
    category: 'premium',
    color: '#3B82F6',
  },
  {
    id: 'premium-2',
    name: 'Semi Clean',
    price: 45000,
    duration: 30,
    description: 'Exterior wash, basic interior clean, dashboard wipe',
    category: 'premium',
    color: '#3B82F6',
  },
  // Deluxe Services
  {
    id: 'deluxe-1',
    name: 'Detail Wash',
    price: 85000,
    duration: 60,
    description: 'Complete detailing, leather treatment, engine bay cleaning',
    category: 'deluxe',
    color: '#8B5CF6',
  },
  {
    id: 'deluxe-2',
    name: 'Supreme Package',
    price: 120000,
    duration: 90,
    description: 'Ultimate care package with ceramic coating and full detailing',
    category: 'deluxe',
    color: '#8B5CF6',
  },
  // Add-on Services
  {
    id: 'addon-1',
    name: 'Wax Protection',
    price: 25000,
    duration: 10,
    description: 'Premium wax application for paint protection',
    category: 'addon',
    color: '#F59E0B',
  },
  {
    id: 'addon-2',
    name: 'Interior Protection',
    price: 35000,
    duration: 15,
    description: 'Fabric protection and leather conditioning',
    category: 'addon',
    color: '#F59E0B',
  },
  {
    id: 'addon-3',
    name: 'Air Freshener',
    price: 15000,
    duration: 5,
    description: 'Premium car air freshener application',
    category: 'addon',
    color: '#F59E0B',
  },
  {
    id: 'addon-4',
    name: 'Tire Black',
    price: 20000,
    duration: 10,
    description: 'Tire shine and protection treatment',
    category: 'addon',
    color: '#F59E0B',
  },
];

export const fetchPOSServices = async (): Promise<POSService[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPOSServices), 100);
  });
};

export const generatePOSTransactions = (): POSTransaction[] => {
  const transactions: POSTransaction[] = [];
  const customers = [
    { name: 'John Smith', phone: '+1-555-0123', vehiclePlate: 'ABC123' },
    { name: 'Sarah Johnson', phone: '+1-555-0456', vehiclePlate: 'XYZ789', isVIP: true },
    { name: 'Michael Brown', phone: '+1-555-0789', vehiclePlate: 'DEF456' },
    { name: 'Emily Davis', phone: '+1-555-0234', vehiclePlate: 'GHI789', isVIP: true },
  ];

  for (let i = 0; i < 20; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const services = mockPOSServices
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);
    
    const items: CartItem[] = services.map(service => ({
      service,
      quantity: 1,
      subtotal: service.price,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const discount = customer.isVIP ? subtotal * 0.1 : 0;
    const tax = (subtotal - discount) * 0.1;
    const total = subtotal - discount + tax;

    const transaction: POSTransaction = {
      id: `TXN-${String(i + 1).padStart(4, '0')}`,
      customer,
      items,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod: ['cash', 'card', 'digital'][Math.floor(Math.random() * 3)] as any,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      status: ['completed', 'in-progress', 'pending'][Math.floor(Math.random() * 3)] as any,
    };

    transactions.push(transaction);
  }

  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Mock data for Analytics page
export const generateMonthlyRevenueData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    revenue: Math.floor(Math.random() * 50000000) + 20000000, // 20-70M VND
  }));
};

export const generateCustomerAnalytics = () => [
  { type: 'VIP Customers', count: 245 },
  { type: 'Regular Customers', count: 1580 },
  { type: 'New Customers', count: 892 },
  { type: 'Potential Customers', count: 456 },
];

export const generateWashTypeAnalytics = () => [
  { type: 'Basic Wash', percentage: 35 },
  { type: 'Premium Wash', percentage: 28 },
  { type: 'Detail Wash', percentage: 22 },
  { type: 'Quick Wash', percentage: 10 },
  { type: 'Other Services', percentage: 5 },
];

export const generateHourlyCustomerData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map(hour => ({
    hour,
    customers: hour >= 6 && hour <= 22 
      ? Math.floor(Math.random() * 25) + (hour >= 8 && hour <= 18 ? 15 : 5)
      : Math.floor(Math.random() * 3),
  }));
};

// Mock data for Cars page
export const generateCarData = () => {
  const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Pickup', 'Van', 'Luxury'];
  const brands = ['Toyota', 'Honda', 'Mazda', 'Ford', 'Hyundai', 'KIA', 'BMW', 'Mercedes'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    licensePlate: `${Math.floor(Math.random() * 90) + 10}A-${Math.floor(Math.random() * 999) + 100}.${Math.floor(Math.random() * 99) + 10}`,
    brand: brands[Math.floor(Math.random() * brands.length)],
    model: `Model ${Math.floor(Math.random() * 10) + 1}`,
    type: carTypes[Math.floor(Math.random() * carTypes.length)],
    color: ['White', 'Black', 'Silver', 'Red', 'Blue'][Math.floor(Math.random() * 5)],
    ownerName: `Customer ${i + 1}`,
    phone: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
    lastWash: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    totalWashes: Math.floor(Math.random() * 50) + 1,
    totalSpent: Math.floor(Math.random() * 10000000) + 500000,
    status: ['Active', 'VIP', 'New', 'Inactive'][Math.floor(Math.random() * 4)],
  }));
};

// Mock data for Staff page
export const generateStaffData = () => {
  const positions = ['Shift Manager', 'Wash Technician', 'Cashier', 'Security', 'Maintenance Technician'];
  const shifts = ['Morning Shift', 'Afternoon Shift', 'Evening Shift', 'Full-time'];
  
  return Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    position: positions[Math.floor(Math.random() * positions.length)],
    shift: shifts[Math.floor(Math.random() * shifts.length)],
    phone: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
    email: `employee${i + 1}@company.com`,
    hireDate: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
    salary: Math.floor(Math.random() * 10000000) + 8000000,
    performance: Math.floor(Math.random() * 40) + 60, // 60-100%
    status: ['Working', 'On Leave', 'Inactive'][Math.floor(Math.random() * 3)],
    tasksCompleted: Math.floor(Math.random() * 100) + 50,
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
  }));
};

// Mock data for Revenue page
export const generateRevenueData = () => {
  const services = ['Basic Wash', 'Premium Wash', 'Detail Wash', 'Additional Services'];
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 5000000) + 1000000,
      transactions: Math.floor(Math.random() * 100) + 20,
      services: services.map(service => ({
        name: service,
        revenue: Math.floor(Math.random() * 1000000) + 200000,
        count: Math.floor(Math.random() * 30) + 5,
      })),
    };
  });
  
  return last30Days;
};

export const generateExpenseData = () => [
  { category: 'Personnel', amount: 45000000, percentage: 35 },
  { category: 'Supplies', amount: 25000000, percentage: 20 },
  { category: 'Utilities', amount: 15000000, percentage: 12 },
  { category: 'Maintenance', amount: 12000000, percentage: 10 },
  { category: 'Marketing', amount: 8000000, percentage: 6 },
  { category: 'Other', amount: 22000000, percentage: 17 },
];

// Mock data for Reports page
export const generateReportData = () => ({
  daily: {
    customers: Math.floor(Math.random() * 200) + 100,
    revenue: Math.floor(Math.random() * 10000000) + 5000000,
    averageTicket: Math.floor(Math.random() * 200000) + 100000,
    efficiency: Math.floor(Math.random() * 30) + 70,
  },
  weekly: {
    customers: Math.floor(Math.random() * 1000) + 500,
    revenue: Math.floor(Math.random() * 50000000) + 25000000,
    averageTicket: Math.floor(Math.random() * 200000) + 100000,
    efficiency: Math.floor(Math.random() * 30) + 70,
  },
  monthly: {
    customers: Math.floor(Math.random() * 4000) + 2000,
    revenue: Math.floor(Math.random() * 200000000) + 100000000,
    averageTicket: Math.floor(Math.random() * 200000) + 100000,
    efficiency: Math.floor(Math.random() * 30) + 70,
  },
});
