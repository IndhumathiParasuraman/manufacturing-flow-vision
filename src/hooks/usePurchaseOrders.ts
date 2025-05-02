
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { purchaseOrderService } from '@/lib/mysql';
import { PurchaseOrder } from '@/types/mrp';

export const usePurchaseOrders = () => {
  const queryClient = useQueryClient();

  const getAllOrders = () => {
    return useQuery({
      queryKey: ['purchaseOrders'],
      queryFn: async () => {
        const data = await purchaseOrderService.getAllOrders();
        return data.map((order: any) => ({
          ...order,
          order_date: new Date(order.order_date),
          expected_date: new Date(order.expected_date)
        })) as PurchaseOrder[];
      }
    });
  };

  const getOrderById = (orderId: number) => {
    return useQuery({
      queryKey: ['purchaseOrder', orderId],
      queryFn: async () => {
        const data = await purchaseOrderService.getOrderById(orderId);
        if (data.length === 0) return null;
        
        const order = data[0];
        return {
          ...order,
          order_date: new Date(order.order_date),
          expected_date: new Date(order.expected_date)
        } as PurchaseOrder;
      }
    });
  };

  const addOrder = () => {
    return useMutation({
      mutationFn: ({ 
        itemId, 
        supplierId, 
        quantityOrdered, 
        orderDate, 
        expectedDate, 
        status 
      }: {
        itemId: number;
        supplierId: number;
        quantityOrdered: number;
        orderDate: Date;
        expectedDate: Date;
        status: 'Ordered' | 'Received' | 'Cancelled' | 'Processing';
      }) => {
        return purchaseOrderService.addOrder(itemId, supplierId, quantityOrdered, orderDate, expectedDate, status);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['purchaseOrders'] });
      }
    });
  };

  const updateOrderStatus = () => {
    return useMutation({
      mutationFn: ({ 
        orderId, 
        status 
      }: {
        orderId: number;
        status: 'Ordered' | 'Received' | 'Cancelled' | 'Processing';
      }) => {
        return purchaseOrderService.updateOrderStatus(orderId, status);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['purchaseOrders'] });
      }
    });
  };

  return {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrderStatus
  };
};
