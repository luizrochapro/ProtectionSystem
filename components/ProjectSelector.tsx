'use client';

import { useQuery } from '@tanstack/react-query';
import { projectService } from '@/api/services/projectService';
import { useProjectSelector } from '@/hooks/useProjectSelector';
import { Project } from '@/types';

interface ProjectSelectorProps {
  onProjectChange?: (project: Project | null) => void;
}

export default function ProjectSelector({ onProjectChange }: ProjectSelectorProps) {
  const { selectedProjectId, setSelectedProjectId } = useProjectSelector();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
  });

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value;
    const project = projects.find((p) => p.id === projectId) || null;
    setSelectedProjectId(projectId || null);
    onProjectChange?.(project);
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="project-select" className="text-sm font-medium text-gray-700">
        Project:
      </label>
      <select
        id="project-select"
        value={selectedProjectId || ''}
        onChange={handleProjectChange}
        className="block w-64 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Select a project...</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
}
