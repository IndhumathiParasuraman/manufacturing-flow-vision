
-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS manufacturing;
USE manufacturing;

-- Drop tables if they exist (in case of reset)
DROP TABLE IF EXISTS bom;
DROP TABLE IF EXISTS production_schedule;
DROP TABLE IF EXISTS purchase_orders;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS items;

-- Create items table (required for foreign key relationships)
CREATE TABLE items (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  unit_of_measure VARCHAR(20),
  cost DECIMAL(10, 2)
);

-- Create bom table with proper foreign keys
CREATE TABLE bom (
  id INT AUTO_INCREMENT PRIMARY KEY,
  parent_item_id INT NOT NULL,
  component_id INT NOT NULL,
  quantity_needed DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (parent_item_id) REFERENCES items(item_id),
  FOREIGN KEY (component_id) REFERENCES items(item_id)
);

-- Create production_schedule table with foreign keys
CREATE TABLE production_schedule (
  schedule_id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  planned_qty INT NOT NULL,
  FOREIGN KEY (item_id) REFERENCES items(item_id)
);

-- Create suppliers table
CREATE TABLE suppliers (
  supplier_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_info VARCHAR(255),
  rating INT DEFAULT 3
);

-- Create purchase_orders table with foreign keys
CREATE TABLE purchase_orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  supplier_id INT NOT NULL,
  quantity_ordered INT NOT NULL,
  order_date DATE NOT NULL,
  expected_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL,
  FOREIGN KEY (item_id) REFERENCES items(item_id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

-- Create employees table
CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100),
  department VARCHAR(100),
  shift VARCHAR(50)
);

-- Insert sample data into items table
INSERT INTO items (name, description, category, unit_of_measure, cost) VALUES
('Bicycle Frame', 'Standard bicycle frame', 'Finished Good', 'each', 120.00),
('Wheel Set', 'Set of 2 wheels', 'Subassembly', 'pair', 80.00),
('Handlebar', 'Standard handlebar', 'Component', 'each', 25.00),
('Tire', 'Standard bicycle tire', 'Component', 'each', 15.00),
('Rim', 'Aluminum wheel rim', 'Component', 'each', 20.00),
('Pedal Set', 'Set of 2 pedals', 'Component', 'pair', 12.00),
('Seat', 'Comfort bicycle seat', 'Component', 'each', 18.00),
('Brake System', 'Complete brake assembly', 'Subassembly', 'set', 45.00);

-- Insert sample data into suppliers
INSERT INTO suppliers (name, contact_info, rating) VALUES
('BikePartsCo', 'contact@bikepartsco.com', 4),
('WheelMakers', 'info@wheelmakers.com', 5),
('MetalFrames', 'sales@metalframes.com', 3),
('ComponentsInc', 'support@componentsinc.com', 4);

-- Insert sample data into employees
INSERT INTO employees (name, role, department, shift) VALUES
('John Smith', 'Assembly Technician', 'Production', 'Morning'),
('Sarah Johnson', 'Quality Inspector', 'Quality Assurance', 'Morning'),
('Michael Brown', 'Assembly Technician', 'Production', 'Evening'),
('Emily Davis', 'Production Manager', 'Production', 'Morning'),
('David Wilson', 'Inventory Specialist', 'Warehouse', 'Morning'),
('Lisa Thompson', 'Purchasing Agent', 'Procurement', 'Morning'),
('Robert Garcia', 'Assembly Technician', 'Production', 'Night'),
('Jennifer Martinez', 'Quality Inspector', 'Quality Assurance', 'Evening');

-- Insert sample data into bom
INSERT INTO bom (parent_item_id, component_id, quantity_needed) VALUES
(1, 2, 1),  -- Bicycle Frame needs 1 Wheel Set
(1, 3, 1),  -- Bicycle Frame needs 1 Handlebar
(1, 6, 1),  -- Bicycle Frame needs 1 Pedal Set
(1, 7, 1),  -- Bicycle Frame needs 1 Seat
(1, 8, 1),  -- Bicycle Frame needs 1 Brake System
(2, 4, 2),  -- Wheel Set needs 2 Tires
(2, 5, 2);  -- Wheel Set needs 2 Rims

-- Insert sample data into production_schedule
INSERT INTO production_schedule (item_id, start_date, end_date, planned_qty) VALUES
(1, '2025-05-10', '2025-05-20', 100),  -- Produce 100 Bicycle Frames
(2, '2025-05-05', '2025-05-15', 120);  -- Produce 120 Wheel Sets

-- Insert sample data into purchase_orders
INSERT INTO purchase_orders (item_id, supplier_id, quantity_ordered, order_date, expected_date, status) VALUES
(3, 4, 150, '2025-04-25', '2025-05-05', 'Received'),  -- Order for Handlebars
(4, 2, 300, '2025-04-28', '2025-05-08', 'Ordered'),   -- Order for Tires
(5, 2, 300, '2025-04-28', '2025-05-12', 'Processing'),-- Order for Rims
(6, 4, 150, '2025-04-30', '2025-05-10', 'Ordered'),   -- Order for Pedal Sets
(7, 4, 150, '2025-05-01', '2025-05-15', 'Processing'),-- Order for Seats
(8, 1, 120, '2025-04-25', '2025-05-03', 'Received');  -- Order for Brake Systems
