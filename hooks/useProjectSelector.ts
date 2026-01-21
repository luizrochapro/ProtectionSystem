import { useLocalStorage } from './useLocalStorage';
import { Project } from '@/types';

export function useProjectSelector() {
  const [selectedProjectId, setSelectedProjectId] = useLocalStorage<string | null>(
    'selectedProjectId',
    null
  );

  const selectProject = (project: Project | null) => {
    setSelectedProjectId(project?.id || null);
  };

  return {
    selectedProjectId,
    selectProject,
    setSelectedProjectId,
  };
}
