import apiClient from '../client';
import { Equipment, ApiResponse } from '@/types';

export const equipmentService = {
  // Get all equipments for a project
  getByProject: async (projectId: string): Promise<Equipment[]> => {
    const response = await apiClient.get<ApiResponse<Equipment[]>>(
      `/api/projects/${projectId}/equipments`
    );
    return response.data.data;
  },

  // Get equipment by ID
  getById: async (id: string): Promise<Equipment> => {
    const response = await apiClient.get<ApiResponse<Equipment>>(`/api/equipments/${id}`);
    return response.data.data;
  },

  // Create new equipment
  create: async (equipment: Omit<Equipment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Equipment> => {
    const response = await apiClient.post<ApiResponse<Equipment>>('/api/equipments', equipment);
    return response.data.data;
  },

  // Update equipment
  update: async (id: string, equipment: Partial<Equipment>): Promise<Equipment> => {
    const response = await apiClient.put<ApiResponse<Equipment>>(
      `/api/equipments/${id}`,
      equipment
    );
    return response.data.data;
  },

  // Delete equipment
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/equipments/${id}`);
  },
};
