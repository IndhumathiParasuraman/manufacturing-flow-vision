
export interface InventoryItem {
  item_id: number;
  name: string;
  description: string;
  quantity_on_hand: number;
  reorder_point: number;
  unit_cost: number;
  category: string;
  last_updated: Date;
}

export interface BOMItem {
  parent_item_id: number;
  parent_name?: string;
  component_id: number;
  component_name?: string;
  quantity_needed: number;
}

export interface ProductionSchedule {
  schedule_id: number;
  item_id: number;
  item_name?: string;
  start_date: Date;
  end_date: Date;
  planned_qty: number;
}

export interface PurchaseOrder {
  order_id: number;
  item_id: number;
  item_name?: string;
  supplier_id: number;
  supplier_name?: string;
  quantity_ordered: number;
  order_date: Date;
  expected_date: Date;
  status: 'Ordered' | 'Received' | 'Cancelled' | 'Processing';
}

export interface Employee {
  employee_id: number;
  name: string;
  role: string;
  department: string;
  shift: string;
}

export interface Supplier {
  supplier_id: number;
  name: string;
  contact_info: string;
  rating: number;
}
