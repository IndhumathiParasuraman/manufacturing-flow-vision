
import { mockBOM, mockEmployees, mockPurchaseOrders, mockSchedule, mockSuppliers } from '@/data/mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const USE_MOCK_DATA = !API_URL || API_URL === '';

// Function to fetch data from API with fallback to mock data
async function fetchFromApi<T>(endpoint: string, mockData: T[]): Promise<T[]> {
  if (USE_MOCK_DATA) {
    console.log(`Using mock data for ${endpoint} - API URL not configured`);
    return Promise.resolve(mockData);
  }
  
  try {
    console.log(`Fetching from API: ${API_URL}/${endpoint}`);
    const response = await fetch(`${API_URL}/${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API error (${response.status}): ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from API (${endpoint}):`, error);
    console.log(`Falling back to mock data for ${endpoint}`);
    return mockData;
  }
}

// Database services using API with mock data fallback
export const bomService = {
  getAllBOM: async () => {
    return fetchFromApi('bom', mockBOM);
  },
  
  getBOMByParentId: async (parentItemId: number) => {
    try {
      if (USE_MOCK_DATA) {
        return mockBOM.filter(item => item.parent_item_id === parentItemId);
      }
      return await fetchFromApi(`bom/${parentItemId}`, 
        mockBOM.filter(item => item.parent_item_id === parentItemId));
    } catch (error) {
      console.error('Error fetching BOM by parent ID:', error);
      return mockBOM.filter(item => item.parent_item_id === parentItemId);
    }
  },
  
  addBOMItem: async (parentItemId: number, componentId: number, quantityNeeded: number) => {
    if (USE_MOCK_DATA) {
      console.log('Mock adding BOM item', { parentItemId, componentId, quantityNeeded });
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${API_URL}/bom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parentItemId, componentId, quantityNeeded })
      });
      
      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding BOM item:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};

export const productionService = {
  getAllSchedules: async () => {
    const data = await fetchFromApi('production', mockSchedule);
    return data.map((item: any) => ({
      ...item,
      start_date: new Date(item.start_date),
      end_date: new Date(item.end_date)
    }));
  },
  
  getScheduleById: async (scheduleId: number) => {
    if (USE_MOCK_DATA) {
      const filtered = mockSchedule.filter(item => item.schedule_id === scheduleId);
      return filtered;
    }
    
    try {
      const response = await fetch(`${API_URL}/production/${scheduleId}`);
      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.map((item: any) => ({
        ...item,
        start_date: new Date(item.start_date),
        end_date: new Date(item.end_date)
      }));
    } catch (error) {
      console.error('Error fetching schedule by ID:', error);
      return mockSchedule.filter(item => item.schedule_id === scheduleId);
    }
  },
  
  addSchedule: async (itemId: number, startDate: Date, endDate: Date, plannedQty: number) => {
    if (USE_MOCK_DATA) {
      console.log('Mock adding production schedule', { itemId, startDate, endDate, plannedQty });
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${API_URL}/production`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, startDate, endDate, plannedQty })
      });
      
      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding production schedule:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};

export const purchaseOrderService = {
  getAllOrders: async () => {
    const data = await fetchFromApi('purchase-orders', mockPurchaseOrders);
    return data.map((item: any) => ({
      ...item,
      order_date: new Date(item.order_date),
      expected_date: new Date(item.expected_date)
    }));
  },
  
  getOrderById: async (orderId: number) => {
    if (USE_MOCK_DATA) {
      const filtered = mockPurchaseOrders.filter(item => item.order_id === orderId);
      return filtered;
    }
    
    try {
      const response = await fetch(`${API_URL}/purchase-orders/${orderId}`);
      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.map((item: any) => ({
        ...item,
        order_date: new Date(item.order_date),
        expected_date: new Date(item.expected_date)
      }));
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      return mockPurchaseOrders.filter(item => item.order_id === orderId);
    }
  },
  
  addOrder: async (itemId: number, supplierId: number, quantityOrdered: number, 
                  orderDate: Date, expectedDate: Date, status: string) => {
    if (USE_MOCK_DATA) {
      console.log('Mock adding purchase order', { itemId, supplierId, quantityOrdered, orderDate, expectedDate, status });
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${API_URL}/purchase-orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, supplierId, quantityOrdered, orderDate, expectedDate, status })
      });
      
      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding purchase order:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },
  
  updateOrderStatus: async (orderId: number, status: string) => {
    if (USE_MOCK_DATA) {
      console.log('Mock updating order status', { orderId, status });
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${API_URL}/purchase-orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};

export const employeeService = {
  getAllEmployees: async () => {
    return fetchFromApi('employees', mockEmployees);
  },
  
  getEmployeesByDepartment: async (department: string) => {
    if (USE_MOCK_DATA) {
      return mockEmployees.filter(item => item.department === department);
    }
    
    try {
      const response = await fetch(`${API_URL}/employees?department=${encodeURIComponent(department)}`);
      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching employees by department:', error);
      return mockEmployees.filter(item => item.department === department);
    }
  },
  
  addEmployee: async (name: string, role: string, department: string, shift: string) => {
    if (USE_MOCK_DATA) {
      console.log('Mock adding employee', { name, role, department, shift });
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, department, shift })
      });
      
      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding employee:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};

export const supplierService = {
  getAllSuppliers: async () => {
    return fetchFromApi('suppliers', mockSuppliers);
  },
  
  getSupplierById: async (supplierId: number) => {
    if (USE_MOCK_DATA) {
      return mockSuppliers.filter(item => item.supplier_id === supplierId);
    }
    
    try {
      const response = await fetch(`${API_URL}/suppliers/${supplierId}`);
      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching supplier by ID:', error);
      return mockSuppliers.filter(item => item.supplier_id === supplierId);
    }
  },
  
  addSupplier: async (supplierId: number, name: string, contactInfo: string, rating: number) => {
    if (USE_MOCK_DATA) {
      console.log('Mock adding supplier', { supplierId, name, contactInfo, rating });
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${API_URL}/suppliers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supplierId, name, contactInfo, rating })
      });
      
      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding supplier:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },
  
  updateSupplierRating: async (supplierId: number, rating: number) => {
    if (USE_MOCK_DATA) {
      console.log('Mock updating supplier rating', { supplierId, rating });
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${API_URL}/suppliers/${supplierId}/rating`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating })
      });
      
      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating supplier rating:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};

// Test connection function - now checks real database connection if API_URL is set
export const testConnection = async () => {
  if (USE_MOCK_DATA) {
    console.log('BROWSER ENVIRONMENT: Using mock data (API_URL not configured)');
    console.log('To use real MySQL data, set VITE_API_URL in your .env file and run the backend server');
    return true;
  }
  
  try {
    console.log(`Testing connection to backend API at ${API_URL}/test-connection`);
    const response = await fetch(`${API_URL}/test-connection`);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error connecting to API:', error);
    return false;
  }
};

// Generic query executor (not used directly in browser - handled by API)
export const executeQuery = async <T>(query: string, params: any[] = []): Promise<T[]> => {
  console.log('BROWSER ENVIRONMENT: SQL queries are executed by the backend API');
  console.log('This function is a placeholder and will return an empty array');
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
