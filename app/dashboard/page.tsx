'use client';

import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import ProjectSelector from '@/components/ProjectSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { projectService } from '@/api/services/projectService';
import { equipmentService } from '@/api/services/equipmentService';
import { useProjectSelector } from '@/hooks/useProjectSelector';
import { FolderKanban, Zap, Activity, CheckCircle, Plus, LineChart } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { selectedProjectId } = useProjectSelector();

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
  });

  const { data: equipments = [] } = useQuery({
    queryKey: ['equipments', selectedProjectId],
    queryFn: () => equipmentService.getByProject(selectedProjectId!),
    enabled: !!selectedProjectId,
  });

  const stats = {
    totalProjects: projects.length,
    totalEquipments: equipments.length,
    activeSimulations: 0,
    completedSimulations: 0,
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome to PowerProtect - Your power system protection and coordination solution
          </p>
        </div>

        {/* Project Selector */}
        <div className="mb-8">
          <ProjectSelector />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            icon={FolderKanban}
            color="blue"
            delay={0}
          />
          <StatCard
            title="Total Equipments"
            value={stats.totalEquipments}
            icon={Zap}
            color="green"
            delay={0.1}
          />
          <StatCard
            title="Active Simulations"
            value={stats.activeSimulations}
            icon={Activity}
            color="purple"
            delay={0.2}
          />
          <StatCard
            title="Completed Simulations"
            value={stats.completedSimulations}
            icon={CheckCircle}
            color="orange"
            delay={0.3}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/projects">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Project
                </Button>
              </Link>
              <Link href="/equipments">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  disabled={!selectedProjectId}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Add Equipment
                </Button>
              </Link>
              <Link href="/coordination">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  disabled={!selectedProjectId}
                >
                  <LineChart className="mr-2 h-4 w-4" />
                  Analyze Coordination
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No recent activity. Create your first project to get started.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {projects.slice(0, 5).map((project) => (
                      <div key={project.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{project.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(project.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Link href="/projects">
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Information */}
        {selectedProjectId && (
          <Card>
            <CardHeader>
              <CardTitle>Selected Project Information</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const project = projects.find((p) => p.id === selectedProjectId);
                if (!project) return null;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Voltage</p>
                      <p className="text-lg font-semibold text-gray-900">{project.voltage} kV</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Frequency</p>
                      <p className="text-lg font-semibold text-gray-900">{project.frequency} Hz</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Equipments</p>
                      <p className="text-lg font-semibold text-gray-900">{equipments.length}</p>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
