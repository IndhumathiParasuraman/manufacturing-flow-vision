
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bomService } from '@/lib/mysql';
import { BOMItem } from '@/types/mrp';

export const useBOM = () => {
  const queryClient = useQueryClient();

  const getAllBOM = () => {
    return useQuery({
      queryKey: ['bom'],
      queryFn: async () => {
        const data = await bomService.getAllBOM();
        return data as BOMItem[];
      }
    });
  };

  const getBOMByParentId = (parentItemId: number) => {
    return useQuery({
      queryKey: ['bom', parentItemId],
      queryFn: async () => {
        const data = await bomService.getBOMByParentId(parentItemId);
        return data as BOMItem[];
      }
    });
  };

  const addBOMItem = () => {
    return useMutation({
      mutationFn: ({ 
        parentItemId, 
        componentId, 
        quantityNeeded 
      }: {
        parentItemId: number;
        componentId: number;
        quantityNeeded: number;
      }) => {
        return bomService.addBOMItem(parentItemId, componentId, quantityNeeded);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['bom'] });
      }
    });
  };

  return {
    getAllBOM,
    getBOMByParentId,
    addBOMItem
  };
};
