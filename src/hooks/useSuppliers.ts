
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supplierService } from '@/lib/mysql';
import { Supplier } from '@/types/mrp';

export const useSuppliers = () => {
  const queryClient = useQueryClient();

  const getAllSuppliers = () => {
    return useQuery({
      queryKey: ['suppliers'],
      queryFn: async () => {
        const data = await supplierService.getAllSuppliers();
        return data as Supplier[];
      }
    });
  };

  const getSupplierById = (supplierId: number) => {
    return useQuery({
      queryKey: ['supplier', supplierId],
      queryFn: async () => {
        const data = await supplierService.getSupplierById(supplierId);
        return data.length > 0 ? data[0] as Supplier : null;
      }
    });
  };

  const addSupplier = () => {
    return useMutation({
      mutationFn: ({ 
        supplierId,
        name, 
        contactInfo, 
        rating 
      }: {
        supplierId: number;
        name: string;
        contactInfo: string;
        rating: number;
      }) => {
        return supplierService.addSupplier(supplierId, name, contactInfo, rating);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      }
    });
  };

  const updateSupplierRating = () => {
    return useMutation({
      mutationFn: ({ 
        supplierId, 
        rating 
      }: {
        supplierId: number;
        rating: number;
      }) => {
        return supplierService.updateSupplierRating(supplierId, rating);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      }
    });
  };

  return {
    getAllSuppliers,
    getSupplierById,
    addSupplier,
    updateSupplierRating
  };
};
