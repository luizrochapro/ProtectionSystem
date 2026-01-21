import apiClient from '../client';
import { NetworkModel, ApiResponse } from '@/types';

export const networkService = {
  // Get network model for a project
  getByProject: async (projectId: string): Promise<NetworkModel | null> => {
    try {
      const response = await apiClient.get<ApiResponse<NetworkModel>>(
        `/api/projects/${projectId}/network`
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  },

  // Create or update network model
  save: async (projectId: string, network: Partial<NetworkModel>): Promise<NetworkModel> => {
    const response = await apiClient.post<ApiResponse<NetworkModel>>(
      `/api/projects/${projectId}/network`,
      network
    );
    return response.data.data;
  },
};
