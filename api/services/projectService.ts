import apiClient from '../client';
import { Project, ApiResponse, PaginatedResponse } from '@/types';

export const projectService = {
  // Get all projects
  getAll: async (): Promise<Project[]> => {
    const response = await apiClient.get<ApiResponse<Project[]>>('/api/projects');
    return response.data.data;
  },

  // Get project by ID
  getById: async (id: string): Promise<Project> => {
    const response = await apiClient.get<ApiResponse<Project>>(`/api/projects/${id}`);
    return response.data.data;
  },

  // Create new project
  create: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    const response = await apiClient.post<ApiResponse<Project>>('/api/projects', project);
    return response.data.data;
  },

  // Update project
  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const response = await apiClient.put<ApiResponse<Project>>(`/api/projects/${id}`, project);
    return response.data.data;
  },

  // Delete project
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/projects/${id}`);
  },
};
