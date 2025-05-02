
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productionService } from '@/lib/mysql';
import { ProductionSchedule } from '@/types/mrp';

export const useProductionSchedule = () => {
  const queryClient = useQueryClient();

  const getAllSchedules = () => {
    return useQuery({
      queryKey: ['productionSchedules'],
      queryFn: async () => {
        const data = await productionService.getAllSchedules();
        return data.map((schedule: any) => ({
          ...schedule,
          start_date: new Date(schedule.start_date),
          end_date: new Date(schedule.end_date)
        })) as ProductionSchedule[];
      }
    });
  };

  const getScheduleById = (scheduleId: number) => {
    return useQuery({
      queryKey: ['productionSchedule', scheduleId],
      queryFn: async () => {
        const data = await productionService.getScheduleById(scheduleId);
        if (data.length === 0) return null;
        
        const schedule = data[0];
        return {
          ...schedule,
          start_date: new Date(schedule.start_date),
          end_date: new Date(schedule.end_date)
        } as ProductionSchedule;
      }
    });
  };

  const addSchedule = () => {
    return useMutation({
      mutationFn: ({ 
        itemId, 
        startDate, 
        endDate, 
        plannedQty 
      }: {
        itemId: number;
        startDate: Date;
        endDate: Date;
        plannedQty: number;
      }) => {
        return productionService.addSchedule(itemId, startDate, endDate, plannedQty);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['productionSchedules'] });
      }
    });
  };

  return {
    getAllSchedules,
    getScheduleById,
    addSchedule
  };
};
