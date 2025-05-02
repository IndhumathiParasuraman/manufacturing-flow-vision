
import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: import.meta.env.VITE_DB_HOST || 'localhost',
  user: import.meta.env.VITE_DB_USER || 'root',
  password: import.meta.env.VITE_DB_PASSWORD || '',
  database: import.meta.env.VITE_DB_NAME || 'manufacturing',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create the connection pool
const pool = mysql.createPool(dbConfig);

// Test the connection
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error connecting to database:', error);
    return false;
  }
};

// Generic query executor
export const executeQuery = async <T>(
  query: string,
  params: any[] = []
): Promise<T[]> => {
  try {
    const [rows] = await pool.execute(query, params);
    return rows as T[];
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

// Database services for each entity
export const bomService = {
  getAllBOM: async () => {
    return executeQuery<any>(
      `SELECT b.*, 
        p.name as parent_name, 
        c.name as component_name 
      FROM BillOfMaterials b
      LEFT JOIN Inventory p ON b.parent_item_id = p.item_id
      LEFT JOIN Inventory c ON b.component_id = c.item_id`
    );
  },
  
  getBOMByParentId: async (parentItemId: number) => {
    return executeQuery<any>(
      `SELECT b.*, 
        p.name as parent_name, 
        c.name as component_name 
      FROM BillOfMaterials b
      LEFT JOIN Inventory p ON b.parent_item_id = p.item_id
      LEFT JOIN Inventory c ON b.component_id = c.item_id
      WHERE b.parent_item_id = ?`,
      [parentItemId]
    );
  },
  
  addBOMItem: async (parentItemId: number, componentId: number, quantityNeeded: number) => {
    return executeQuery(
      'INSERT INTO BillOfMaterials (parent_item_id, component_id, quantity_needed) VALUES (?, ?, ?)',
      [parentItemId, componentId, quantityNeeded]
    );
  }
};

export const productionService = {
  getAllSchedules: async () => {
    return executeQuery<any>(
      `SELECT ps.*, i.name as item_name 
      FROM ProductionSchedule ps
      LEFT JOIN Inventory i ON ps.item_id = i.item_id`
    );
  },
  
  getScheduleById: async (scheduleId: number) => {
    return executeQuery<any>(
      `SELECT ps.*, i.name as item_name 
      FROM ProductionSchedule ps
      LEFT JOIN Inventory i ON ps.item_id = i.item_id
      WHERE ps.schedule_id = ?`,
      [scheduleId]
    );
  },
  
  addSchedule: async (itemId: number, startDate: Date, endDate: Date, plannedQty: number) => {
    return executeQuery(
      'INSERT INTO ProductionSchedule (item_id, start_date, end_date, planned_qty) VALUES (?, ?, ?, ?)',
      [itemId, startDate, endDate, plannedQty]
    );
  }
};

export const purchaseOrderService = {
  getAllOrders: async () => {
    return executeQuery<any>(
      `SELECT po.*, i.name as item_name, s.name as supplier_name 
      FROM PurchaseOrders po
      LEFT JOIN Inventory i ON po.item_id = i.item_id
      LEFT JOIN Suppliers s ON po.supplier_id = s.supplier_id`
    );
  },
  
  getOrderById: async (orderId: number) => {
    return executeQuery<any>(
      `SELECT po.*, i.name as item_name, s.name as supplier_name 
      FROM PurchaseOrders po
      LEFT JOIN Inventory i ON po.item_id = i.item_id
      LEFT JOIN Suppliers s ON po.supplier_id = s.supplier_id
      WHERE po.order_id = ?`,
      [orderId]
    );
  },
  
  addOrder: async (itemId: number, supplierId: number, quantityOrdered: number, 
                  orderDate: Date, expectedDate: Date, status: string) => {
    return executeQuery(
      'INSERT INTO PurchaseOrders (item_id, supplier_id, quantity_ordered, order_date, expected_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [itemId, supplierId, quantityOrdered, orderDate, expectedDate, status]
    );
  },
  
  updateOrderStatus: async (orderId: number, status: string) => {
    return executeQuery(
      'UPDATE PurchaseOrders SET status = ? WHERE order_id = ?',
      [status, orderId]
    );
  }
};

export const employeeService = {
  getAllEmployees: async () => {
    return executeQuery<any>('SELECT * FROM Employees');
  },
  
  getEmployeesByDepartment: async (department: string) => {
    return executeQuery<any>('SELECT * FROM Employees WHERE department = ?', [department]);
  },
  
  addEmployee: async (name: string, role: string, department: string, shift: string) => {
    return executeQuery(
      'INSERT INTO Employees (name, role, department, shift) VALUES (?, ?, ?, ?)',
      [name, role, department, shift]
    );
  }
};

export const supplierService = {
  getAllSuppliers: async () => {
    return executeQuery<any>('SELECT * FROM Suppliers');
  },
  
  getSupplierById: async (supplierId: number) => {
    return executeQuery<any>('SELECT * FROM Suppliers WHERE supplier_id = ?', [supplierId]);
  },
  
  addSupplier: async (supplierId: number, name: string, contactInfo: string, rating: number) => {
    return executeQuery(
      'INSERT INTO Suppliers (supplier_id, name, contact_info, rating) VALUES (?, ?, ?, ?)',
      [supplierId, name, contactInfo, rating]
    );
  },
  
  updateSupplierRating: async (supplierId: number, rating: number) => {
    return executeQuery(
      'UPDATE Suppliers SET rating = ? WHERE supplier_id = ?',
      [rating, supplierId]
    );
  }
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
