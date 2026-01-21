import apiClient from '../client';
import { ProtectionCurve, ApiResponse } from '@/types';

export const protectionCurveService = {
  // Get all protection curves for an equipment
  getByEquipment: async (equipmentId: string): Promise<ProtectionCurve[]> => {
    const response = await apiClient.get<ApiResponse<ProtectionCurve[]>>(
      `/api/equipments/${equipmentId}/curves`
    );
    return response.data.data;
  },

  // Get protection curve by ID
  getById: async (id: string): Promise<ProtectionCurve> => {
    const response = await apiClient.get<ApiResponse<ProtectionCurve>>(`/api/curves/${id}`);
    return response.data.data;
  },

  // Create new protection curve
  create: async (
    curve: Omit<ProtectionCurve, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ProtectionCurve> => {
    const response = await apiClient.post<ApiResponse<ProtectionCurve>>('/api/curves', curve);
    return response.data.data;
  },

  // Update protection curve
  update: async (id: string, curve: Partial<ProtectionCurve>): Promise<ProtectionCurve> => {
    const response = await apiClient.put<ApiResponse<ProtectionCurve>>(`/api/curves/${id}`, curve);
    return response.data.data;
  },

  // Delete protection curve
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/curves/${id}`);
  },
};
