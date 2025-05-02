import { mockBOM, mockEmployees, mockPurchaseOrders, mockSchedule, mockSuppliers } from '@/data/mockData';

// IMPORTANT: This file uses mock data for the browser environment
// To connect to a real MySQL database, you need a backend server (Node.js/Express)
// that exposes API endpoints which this frontend can call

// Database services using mock data
export const bomService = {
  getAllBOM: async () => {
    console.log('Using mock BOM data - To use real MySQL, implement a backend API');
    return Promise.resolve(mockBOM);
  },
  
  getBOMByParentId: async (parentItemId: number) => {
    console.log('Using mock BOM data filtered by parent ID', parentItemId);
    return Promise.resolve(mockBOM.filter(item => item.parent_item_id === parentItemId));
  },
  
  addBOMItem: async (parentItemId: number, componentId: number, quantityNeeded: number) => {
    console.log('Mock adding BOM item', { parentItemId, componentId, quantityNeeded });
    return Promise.resolve({ success: true });
  }
};

export const productionService = {
  getAllSchedules: async () => {
    console.log('Using mock production schedule data - To use real MySQL, implement a backend API');
    return Promise.resolve(mockSchedule);
  },
  
  getScheduleById: async (scheduleId: number) => {
    console.log('Using mock production schedule data filtered by ID', scheduleId);
    return Promise.resolve(mockSchedule.filter(item => item.schedule_id === scheduleId));
  },
  
  addSchedule: async (itemId: number, startDate: Date, endDate: Date, plannedQty: number) => {
    console.log('Mock adding production schedule', { itemId, startDate, endDate, plannedQty });
    return Promise.resolve({ success: true });
  }
};

export const purchaseOrderService = {
  getAllOrders: async () => {
    console.log('Using mock purchase order data - To use real MySQL, implement a backend API');
    return Promise.resolve(mockPurchaseOrders);
  },
  
  getOrderById: async (orderId: number) => {
    console.log('Using mock purchase order data filtered by ID', orderId);
    return Promise.resolve(mockPurchaseOrders.filter(item => item.order_id === orderId));
  },
  
  addOrder: async (itemId: number, supplierId: number, quantityOrdered: number, 
                  orderDate: Date, expectedDate: Date, status: string) => {
    console.log('Mock adding purchase order', { itemId, supplierId, quantityOrdered, orderDate, expectedDate, status });
    return Promise.resolve({ success: true });
  },
  
  updateOrderStatus: async (orderId: number, status: string) => {
    console.log('Mock updating order status', { orderId, status });
    return Promise.resolve({ success: true });
  }
};

export const employeeService = {
  getAllEmployees: async () => {
    console.log('Using mock employee data - To use real MySQL, implement a backend API');
    return Promise.resolve(mockEmployees);
  },
  
  getEmployeesByDepartment: async (department: string) => {
    console.log('Using mock employee data filtered by department', department);
    return Promise.resolve(mockEmployees.filter(item => item.department === department));
  },
  
  addEmployee: async (name: string, role: string, department: string, shift: string) => {
    console.log('Mock adding employee', { name, role, department, shift });
    return Promise.resolve({ success: true });
  }
};

export const supplierService = {
  getAllSuppliers: async () => {
    console.log('Using mock supplier data - To use real MySQL, implement a backend API');
    return Promise.resolve(mockSuppliers);
  },
  
  getSupplierById: async (supplierId: number) => {
    console.log('Using mock supplier data filtered by ID', supplierId);
    return Promise.resolve(mockSuppliers.filter(item => item.supplier_id === supplierId));
  },
  
  addSupplier: async (supplierId: number, name: string, contactInfo: string, rating: number) => {
    console.log('Mock adding supplier', { supplierId, name, contactInfo, rating });
    return Promise.resolve({ success: true });
  },
  
  updateSupplierRating: async (supplierId: number, rating: number) => {
    console.log('Mock updating supplier rating', { supplierId, rating });
    return Promise.resolve({ success: true });
  }
};

// Test connection function - in browser we'll just simulate a connection
export const testConnection = async () => {
  try {
    console.log('BROWSER ENVIRONMENT: Cannot connect directly to MySQL from browser');
    console.log('To use real MySQL data, implement a backend API (Node.js/Express) that this frontend can call');
    
    // In a real implementation with a backend API, this would call an endpoint to test the connection
    // return fetch('api/database/test-connection').then(res => res.json()).then(data => data.success);
    
    // For now, we'll just simulate a successful connection
    return true;
  } catch (error) {
    console.error('Error connecting to database:', error);
    return false;
  }
};

// Generic query executor (mock implementation for browser)
export const executeQuery = async <T>(query: string, params: any[] = []): Promise<T[]> => {
  console.log('BROWSER ENVIRONMENT: Cannot execute MySQL queries directly from browser');
  console.log('To execute real queries, implement a backend API that this frontend can call');
  console.log('Mock query that would be sent to backend:', { query, params });
  return Promise.resolve([]) as Promise<T[]>;
};

// Export default for easy importing
export default {
  testConnection,
  executeQuery,
  bomService,
  productionService,
  purchaseOrderService,
  employeeService,
  supplierService
};
