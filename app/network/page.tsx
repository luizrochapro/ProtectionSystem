'use client';

import Layout from '@/components/Layout';
import ProjectSelector from '@/components/ProjectSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { networkService } from '@/api/services/networkService';
import { useProjectSelector } from '@/hooks/useProjectSelector';
import { Network, Plus, Save, Trash2 } from 'lucide-react';

export default function NetworkPage() {
  const { selectedProjectId } = useProjectSelector();

  const { data: networkModel, isLoading } = useQuery({
    queryKey: ['network', selectedProjectId],
    queryFn: () => networkService.getByProject(selectedProjectId!),
    enabled: !!selectedProjectId,
  });

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Network Model</h1>
          <p className="text-gray-600">Visualize and manage the electrical network topology</p>
        </div>

        {/* Project Selector */}
        <div className="mb-8">
          <ProjectSelector />
        </div>

        {!selectedProjectId ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Network className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Please select a project to view network model</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Network Topology Canvas */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Network className="mr-2 h-5 w-5" />
                    Network Topology
                  </span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-8 min-h-[600px] border-2 border-dashed border-gray-300 flex items-center justify-center">
                  {isLoading ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-500">Loading network model...</p>
                    </div>
                  ) : !networkModel ? (
                    <div className="text-center">
                      <Network className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">
                        No network model yet. Create your first network element.
                      </p>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Bus
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Network className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Network Model Loaded</p>
                      <div className="text-sm text-gray-500">
                        <p>Buses: {networkModel.buses?.length || 0}</p>
                        <p>Lines: {networkModel.lines?.length || 0}</p>
                        <p>Transformers: {networkModel.transformers?.length || 0}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Network Elements Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Network Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Bus
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Line
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Transformer
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Load
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Generator
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add External Grid
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Network Statistics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Buses:</span>
                      <span className="font-medium">{networkModel?.buses?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Lines:</span>
                      <span className="font-medium">{networkModel?.lines?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transformers:</span>
                      <span className="font-medium">{networkModel?.transformers?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loads:</span>
                      <span className="font-medium">{networkModel?.loads?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Generators:</span>
                      <span className="font-medium">{networkModel?.generators?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Network Information */}
        {selectedProjectId && networkModel && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Network Model Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Model Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-gray-600">Name:</span>{' '}
                      <span className="font-medium">{networkModel.name}</span>
                    </p>
                    <p>
                      <span className="text-gray-600">Last Updated:</span>{' '}
                      <span className="font-medium">
                        {new Date(networkModel.updatedAt).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Run Power Flow Analysis
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Run Short Circuit Analysis
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Export Network Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
