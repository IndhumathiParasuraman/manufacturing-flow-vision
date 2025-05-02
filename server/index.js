
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'manufacturing',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
app.get('/api/test-connection', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ success: true, message: 'Database connection successful' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ success: false, message: 'Database connection failed', error: error.message });
  }
});

// BOM API routes
app.get('/api/bom', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT b.parent_item_id, p.name as parent_name, b.component_id, 
             c.name as component_name, b.quantity_needed
      FROM bom b
      JOIN items p ON b.parent_item_id = p.item_id
      JOIN items c ON b.component_id = c.item_id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching BOM:', error);
    res.status(500).json({ message: 'Error fetching BOM data', error: error.message });
  }
});

app.get('/api/bom/:parentId', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT b.parent_item_id, p.name as parent_name, b.component_id, 
             c.name as component_name, b.quantity_needed
      FROM bom b
      JOIN items p ON b.parent_item_id = p.item_id
      JOIN items c ON b.component_id = c.item_id
      WHERE b.parent_item_id = ?
    `, [req.params.parentId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching BOM by parent ID:', error);
    res.status(500).json({ message: 'Error fetching BOM data by parent ID', error: error.message });
  }
});

// Production schedule API routes
app.get('/api/production', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT s.schedule_id, s.item_id, i.name as item_name, 
             s.start_date, s.end_date, s.planned_qty
      FROM production_schedule s
      JOIN items i ON s.item_id = i.item_id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching production schedules:', error);
    res.status(500).json({ message: 'Error fetching production schedules', error: error.message });
  }
});

// Purchase orders API routes
app.get('/api/purchase-orders', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT o.order_id, o.item_id, i.name as item_name,
             o.supplier_id, s.name as supplier_name, o.quantity_ordered,
             o.order_date, o.expected_date, o.status
      FROM purchase_orders o
      JOIN items i ON o.item_id = i.item_id
      JOIN suppliers s ON o.supplier_id = s.supplier_id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    res.status(500).json({ message: 'Error fetching purchase orders', error: error.message });
  }
});

// Employees API routes
app.get('/api/employees', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM employees
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
});

// Suppliers API routes
app.get('/api/suppliers', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM suppliers
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
