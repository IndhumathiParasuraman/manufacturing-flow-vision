
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeService } from '@/lib/mysql';
import { Employee } from '@/types/mrp';

export const useEmployees = () => {
  const queryClient = useQueryClient();

  const getAllEmployees = () => {
    return useQuery({
      queryKey: ['employees'],
      queryFn: async () => {
        const data = await employeeService.getAllEmployees();
        return data as Employee[];
      }
    });
  };

  const getEmployeesByDepartment = (department: string) => {
    return useQuery({
      queryKey: ['employees', department],
      queryFn: async () => {
        const data = await employeeService.getEmployeesByDepartment(department);
        return data as Employee[];
      }
    });
  };

  const addEmployee = () => {
    return useMutation({
      mutationFn: ({ 
        name, 
        role, 
        department, 
        shift 
      }: {
        name: string;
        role: string;
        department: string;
        shift: string;
      }) => {
        return employeeService.addEmployee(name, role, department, shift);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['employees'] });
      }
    });
  };

  return {
    getAllEmployees,
    getEmployeesByDepartment,
    addEmployee
  };
};
