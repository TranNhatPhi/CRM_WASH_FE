// Dashboard Types
export interface DashboardStats {
  totalCars: number;
  totalRevenue: number;
  averageRevenue: number;
  activeStations: number;
}

export interface HourlyStats {
  hour: string;
  carsPerHour: number;
  grossPerHour: number;
  grossPerCarHour: number;
}

export interface ComparisonData {
  date: string;
  carsYesterday: number;
  carsToday: number;
  grossYesterday: number;
  grossToday: number;
}

export interface WashPackage {
  id: string;
  name: string;
  price: number;
  color: string;
  percentage: number;
}

export interface LaborData {
  employee: string;
  hrsToday: number;
  hrsYesterday: number;
}

export interface MonthlyComparison {
  month: string;
  carsFeb: number;
  carsMarch: number;
  grossFeb: number;
  grossMarch: number;
}

// Chart Data Types
export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension?: number;
  }[];
}

export interface PieChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

// User and System Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator';
  avatar?: string;
}

export interface Station {
  id: string;
  name: string;
  status: 'active' | 'maintenance' | 'offline';
  lastUpdate: Date;
}

export interface Transaction {
  id: string;
  timestamp: Date;
  packageId: string;
  amount: number;
  stationId: string;
  customerInfo?: {
    id?: string;
    name?: string;
    phone?: string;
  };
}

// POS System Types
export interface POSService {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
  category: 'basic' | 'premium' | 'deluxe' | 'addon' | 'wash' | 'detailing' | 'protection' | 'maintenance';
  color: string;
  image?: string;
}

export interface CartItem {
  service: POSService;
  quantity: number;
  subtotal: number;
}

export interface POSCustomer {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  vehiclePlate?: string;
  isVIP?: boolean;
  totalVisits?: number;
  loyaltyPoints?: number;
}

export interface POSTransaction {
  id: string;
  customer: POSCustomer;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'digital';
  timestamp: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  estimatedCompletion?: Date;
  notes?: string;
}

// Vehicle Wash Status Types
export type VehicleWashStatus =
  | 'pending'     // Pending - Waiting
  | 'started'     // Started - In progress
  | 'late'        // Late - Overdue
  | 'finished'    // Finished - Completed
  | 'unpaid'      // Unpaid - Payment pending
  | 'collected'   // Collected - Vehicle picked up (hidden)
  | 'cancelled';  // Cancelled - Service cancelled (hidden)

// Vehicle Management Types
export interface Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  type: string;
  color: string;
  ownerName: string;
  phone: string;
  lastWash: Date;
  totalWashes: number;
  totalSpent: number;
  status: 'Active' | 'VIP' | 'New' | 'Inactive';
  washStatus?: VehicleWashStatus;
  washStatusUpdated?: Date;
  estimatedCompletion?: Date;
  currentServiceId?: string;
}
